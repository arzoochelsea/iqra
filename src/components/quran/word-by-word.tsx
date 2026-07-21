"use client";

import { useId, useState } from "react";
import type { QuranWord } from "@/types/quran";

type WordResponse = { surahNumber: number; ayahNumber: number; words: QuranWord[] };
type LoadState = { status: "idle" | "loading" | "ready" | "error"; words?: readonly QuranWord[] };
const wordCache = new Map<string, Promise<readonly QuranWord[]>>();

function validateResponse(payload: unknown, surahNumber: number, ayahNumber: number) {
  const response = payload as Partial<WordResponse>;
  if (response.surahNumber !== surahNumber || response.ayahNumber !== ayahNumber || !Array.isArray(response.words) || response.words.length === 0) throw new Error("Mismatched word response.");
  const positions = new Set<number>();
  response.words.forEach((word, index) => {
    if (!word || word.position !== index + 1 || positions.has(word.position) || typeof word.arabic !== "string" || !word.arabic.trim() || typeof word.meaningEnglish !== "string" || !word.meaningEnglish.trim()) throw new Error("Invalid word response.");
    positions.add(word.position);
  });
  return response.words;
}

function loadWords(surahNumber: number, ayahNumber: number) {
  const key = `${surahNumber}:${ayahNumber}`;
  const existing = wordCache.get(key);
  if (existing) return existing;
  const request = fetch(`/api/surahs/${surahNumber}/ayahs/${ayahNumber}/words`)
    .then(async (response) => {
      if (!response.ok) throw new Error("Word request failed.");
      return validateResponse(await response.json(), surahNumber, ayahNumber);
    })
    .catch((error) => { wordCache.delete(key); throw error; });
  wordCache.set(key, request);
  return request;
}

export function WordByWord({ surahNumber, ayahNumber, showMeanings }: { surahNumber: number; ayahNumber: number; showMeanings: boolean }) {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [state, setState] = useState<LoadState>({ status: "idle" });

  function toggle() {
    const nextExpanded = !expanded;
    setExpanded(nextExpanded);
    if (nextExpanded && (state.status === "idle" || state.status === "error")) {
      setState({ status: "loading" });
      loadWords(surahNumber, ayahNumber).then((words) => setState({ status: "ready", words })).catch(() => setState({ status: "error" }));
    }
  }

  return <div className="word-study">
    <button type="button" className="word-study-toggle focus-ring" aria-expanded={expanded} aria-controls={panelId} onClick={toggle}><span>Word meanings</span><span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
    {expanded && <div id={panelId} className="word-study-panel" aria-live="polite">
      {state.status === "loading" && <div className="word-loading" role="status"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /><p>Loading verified word meanings…</p></div>}
      {state.status === "error" && <div><p className="word-unavailable" role="status">Verified word-by-word meanings are not currently available for this ayah.</p><button type="button" className="word-control mt-3 focus-ring" onClick={() => { setState({ status: "loading" }); loadWords(surahNumber, ayahNumber).then((words) => setState({ status: "ready", words })).catch(() => setState({ status: "error" })); }}>Try again</button></div>}
      {state.status === "ready" && state.words && <>
        <div className="word-study-controls" aria-label="Word-by-word display controls"><button type="button" className="word-control focus-ring" aria-pressed={showTransliteration} onClick={() => setShowTransliteration((value) => !value)}>{showTransliteration ? "Hide transliteration" : "Show transliteration"}</button></div>
        <ul className="word-grid">{state.words.map((word) => <li key={word.position} className="word-unit"><span dir="rtl" lang="ar" translate="no" className="arabic word-arabic">{word.arabic}</span>{showTransliteration && <span className="word-transliteration">{word.transliteration ?? "Transliteration unavailable"}</span>}{showMeanings && <span dir="ltr" className="word-meaning">{word.meaningEnglish}</span>}</li>)}</ul>
        <p className="word-source">Word-by-word meanings provided by <a href="https://docs.islamic.app/api-reference/words" target="_blank" rel="noreferrer" className="text-link focus-ring">islamic.app</a>, using Quran.com API v4 data.</p>
      </>}
    </div>}
  </div>;
}
