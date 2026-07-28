"use client";

import { useCallback, useEffect, useState } from "react";

interface AllahName { number: number; name: string; transliteration: string; meaning: string; }

export function AllahNames() {
  const [names, setNames] = useState<AllahName[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [expanded, setExpanded] = useState(false);

  const loadNames = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/names-of-allah", { cache: "no-store" });
      if (!response.ok) throw new Error("Names request failed.");
      const payload: unknown = await response.json();
      setNames(parseNames(payload));
      setStatus("ready");
    } catch { setStatus("error"); }
  }, []);

  useEffect(() => { const frame = window.requestAnimationFrame(loadNames); return () => window.cancelAnimationFrame(frame); }, [loadNames]);

  return <section className="allah-names iqra-home-shell" aria-labelledby="allah-names-title">
    <header>
      <p>Al-Asma al-Husna</p>
      <h2 id="allah-names-title">The 99 Names of Allah</h2>
      <span>Reflect on the beautiful names and their meanings.</span>
    </header>
    {status === "loading" && <div className="allah-names-status" role="status">Loading the beautiful names…</div>}
    {status === "error" && <div className="allah-names-status" role="alert"><p>The names could not be loaded right now.</p><button type="button" className="focus-ring" onClick={loadNames}>Try again</button></div>}
    {status === "ready" && <>
      <ol className={`allah-names-grid${expanded ? " is-expanded" : ""}`}>
        {(expanded ? names : names.slice(0, 12)).map((item) => <li key={item.number}>
          <span>{String(item.number).padStart(2, "0")}</span>
          <strong className="arabic" lang="ar" dir="rtl">{item.name}</strong>
          <b>{item.transliteration}</b>
          <small>{item.meaning}</small>
        </li>)}
      </ol>
      <button type="button" className="allah-names-toggle focus-ring" aria-expanded={expanded} onClick={() => setExpanded((current) => !current)}>{expanded ? "Show fewer names" : "View all 99 names"}</button>
    </>}
    <a className="allah-names-source focus-ring" href="https://api.aladhan.com/v1/asmaAlHusna" target="_blank" rel="noreferrer">Source: AlAdhan Asma al-Husna ↗</a>
  </section>;
}

function parseNames(payload: unknown): AllahName[] {
  if (!isRecord(payload) || !Array.isArray(payload.data) || payload.data.length !== 99) throw new Error("Invalid names response.");
  return payload.data.map((item) => {
    if (!isRecord(item) || !isRecord(item.en) || typeof item.number !== "number" || typeof item.name !== "string" || typeof item.transliteration !== "string" || typeof item.en.meaning !== "string") throw new Error("Invalid name entry.");
    return { number: item.number, name: item.name, transliteration: item.transliteration.trim(), meaning: item.en.meaning };
  });
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null; }
