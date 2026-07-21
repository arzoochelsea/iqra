"use client";

import { useId, useState } from "react";
import type { QuranWord } from "@/types/quran";

export function WordByWord({ words }: { words?: readonly QuranWord[] }) {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const [showMeanings, setShowMeanings] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  return <div className="word-study">
    <button type="button" className="word-study-toggle focus-ring" aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpanded((value) => !value)}><span>Word by Word</span><span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
    {expanded && <div id={panelId} className="word-study-panel">
      {words?.length ? <>
        <div className="word-study-controls" aria-label="Word-by-word display controls">
          <button type="button" className="word-control focus-ring" aria-pressed={showMeanings} onClick={() => setShowMeanings((value) => !value)}>{showMeanings ? "Hide" : "Show"} word meanings</button>
          <button type="button" className="word-control focus-ring" aria-pressed={showTransliteration} onClick={() => setShowTransliteration((value) => !value)}>{showTransliteration ? "Hide" : "Show"} transliteration</button>
        </div>
        <ul className="word-grid">{words.map((word) => <li key={word.position} className="word-unit">
          <span dir="rtl" lang="ar" translate="no" className="arabic word-arabic">{word.arabic}</span>
          {showTransliteration && <span className="word-transliteration">{word.transliteration ?? "Transliteration unavailable"}</span>}
          {showMeanings && <span dir="ltr" className="word-meaning">{word.meaningEnglish}</span>}
        </li>)}</ul>
        <p className="word-source">Word-by-word meanings and transliteration provided by <a href="https://docs.islamic.app/api-reference/words" target="_blank" rel="noreferrer" className="text-link focus-ring">islamic.app</a>.</p>
      </> : <p className="word-unavailable" role="status">Word-by-word learning is not yet available for this ayah.</p>}
    </div>}
  </div>;
}
