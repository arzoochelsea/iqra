"use client";

import { useCallback, useEffect, useState } from "react";
import { HomeIcon } from "@/components/home-icon";

interface SpotlightName { number: number; name: string; transliteration: string; meaning: string; }

export function AllahNameSpotlight() {
  const [names, setNames] = useState<SpotlightName[]>([]);
  const [name, setName] = useState<SpotlightName | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [expanded, setExpanded] = useState(false);

  const loadNames = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/names-of-allah", { cache: "no-store" });
      if (!response.ok) throw new Error("Names request failed.");
      const loadedNames = parseNames(await response.json() as unknown);
      setNames(loadedNames);
      const day = Math.floor(Date.now() / 86_400_000);
      setName(loadedNames[day % loadedNames.length]);
      setStatus("ready");
    } catch { setStatus("error"); }
  }, []);

  useEffect(() => { const frame = window.requestAnimationFrame(loadNames); return () => window.cancelAnimationFrame(frame); }, [loadNames]);

  return <><article className={`iqra-name-spotlight${expanded ? " is-expanded" : ""}`}>
    <span className="iqra-info-icon"><HomeIcon name="lantern" /></span>
    <div className="iqra-name-summary"><p>99 Names of Allah</p>{name ? <><h2 className="arabic" lang="ar" dir="rtl">{name.name}</h2><strong>{name.transliteration}</strong><small>{name.meaning}</small></> : <><h2>Beautiful Names</h2><small>{status === "error" ? "The names could not be loaded." : "Loading today’s name…"}</small></>}<button type="button" className="iqra-name-expand focus-ring" aria-expanded={expanded} aria-controls="allah-names-column" onClick={() => setExpanded((current) => !current)}>{expanded ? "Close names" : "View all 99 →"}</button></div>
  </article>
    {expanded && <div id="allah-names-column" className="iqra-name-column-panel">
      <header><p>Al-Asma al-Husna</p><h3>The 99 Names of Allah</h3></header>
      {status === "loading" && <div className="iqra-name-column-status" role="status">Loading the beautiful names…</div>}
      {status === "error" && <div className="iqra-name-column-status" role="alert"><span>The names could not be loaded.</span><button type="button" onClick={loadNames}>Try again</button></div>}
      {status === "ready" && <ol>{names.map((item) => <li key={item.number}><span>{String(item.number).padStart(2, "0")}</span><strong className="arabic" lang="ar" dir="rtl">{item.name}</strong><b>{item.transliteration}</b><small>{item.meaning}</small></li>)}</ol>}
      <a href="https://api.aladhan.com/v1/asmaAlHusna" target="_blank" rel="noreferrer">Source: AlAdhan ↗</a>
    </div>}
  </>;
}

function parseNames(payload: unknown): SpotlightName[] {
  if (!isRecord(payload) || !Array.isArray(payload.data) || payload.data.length !== 99) throw new Error("Invalid names response.");
  return payload.data.map((item) => {
    if (!isRecord(item) || !isRecord(item.en) || typeof item.number !== "number" || typeof item.name !== "string" || typeof item.transliteration !== "string" || typeof item.en.meaning !== "string") throw new Error("Invalid name entry.");
    return { number: item.number, name: item.name, transliteration: item.transliteration.trim(), meaning: item.en.meaning };
  });
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null; }
