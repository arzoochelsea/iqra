"use client";

import { useState } from "react";
import type { SurahTafsirData } from "@/types/surah-tafsir";

type LoadState = "idle" | "loading" | "ready" | "error";

export function SurahTafsirAccordion({ surahNumber }: { surahNumber: number }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<LoadState>("idle");
  const [data, setData] = useState<SurahTafsirData | null>(null);
  const panelId = `surah-tafsir-panel-${surahNumber}`;

  async function toggle() {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen && status === "idle") {
      setStatus("loading");
      try {
        const tafsirData = await import("@/data/surah-tafsir");
        setData(tafsirData.getSurahTafsir(surahNumber));
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
  }

  return (
    <section id="tafsir" className={`surah-tafsir${open ? " is-open" : ""}`} aria-labelledby={`surah-tafsir-title-${surahNumber}`}>
      <button type="button" className="surah-tafsir-trigger focus-ring" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
        <span>
          <strong id={`surah-tafsir-title-${surahNumber}`}>Tafsir &amp; Background</strong>
          <small>Explore the meaning, context, themes, and lessons of this Surah.</small>
        </span>
        <span className="surah-tafsir-chevron" aria-hidden="true">⌄</span>
      </button>
      {open && <div id={panelId} className="surah-tafsir-panel">
        {status === "loading" && <p className="surah-tafsir-status" role="status">Loading carefully reviewed content…</p>}
        {status === "error" && <p className="surah-tafsir-status" role="alert">Tafsir content could not be loaded right now.</p>}
        {status === "ready" && !data && <p className="surah-tafsir-status">Tafsir content for this Surah is being carefully prepared.</p>}
        {status === "ready" && data && <div className="surah-tafsir-content">
          <TafsirSection title="Overview"><p>{data.overview}</p></TafsirSection>
          <TafsirSection title="Historical Background"><p>{data.historicalBackground}</p></TafsirSection>
          <TafsirSection title="Key Themes"><ul className="surah-tafsir-themes">{data.keyThemes.map((theme) => <li key={theme}>{theme}</li>)}</ul></TafsirSection>
          <TafsirSection title="Tafsir Summary"><div className="surah-tafsir-summary">{data.tafsirSummary.map((item) => <div key={item.heading}><h4>{item.heading}</h4><p>{item.content}</p></div>)}</div></TafsirSection>
          <TafsirSection title="Lessons and Reflection"><ul>{data.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul></TafsirSection>
          <TafsirSection title="Sources"><ul className="surah-tafsir-sources">{data.sources.map((source) => <li key={source.url}><a className="text-link focus-ring" href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>{source.author && <span>{source.author}</span>}<p>{source.reference}</p></li>)}</ul></TafsirSection>
          <p className="surah-tafsir-disclaimer">This material is a concise, source-attributed learning summary. Consult qualified scholars for detailed interpretation or religious rulings.</p>
        </div>}
      </div>}
    </section>
  );
}

function TafsirSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3>{title}</h3>{children}</section>;
}
