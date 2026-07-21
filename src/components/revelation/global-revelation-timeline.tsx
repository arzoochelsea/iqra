"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SurahMetadata, SurahRevelationMetadata } from "@/types/quran";

type TimelineItem = { surah: SurahMetadata; revelation: SurahRevelationMetadata };
type Filter = "all" | "meccan" | "medinan";
type Order = "traditional" | "mushaf";

export function GlobalRevelationTimeline({ items }: { items: readonly TimelineItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [order, setOrder] = useState<Order>("traditional");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(24);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter(({ surah, revelation }) => (filter === "all" || revelation.classification === filter) && (!normalized || `${surah.number} ${surah.nameEnglish} ${surah.nameArabic} ${surah.meaningEnglish}`.toLowerCase().includes(normalized))).toSorted((a, b) => order === "traditional" ? a.revelation.traditionalOrder - b.revelation.traditionalOrder : a.surah.number - b.surah.number);
  }, [filter, items, order, query]);
  const visible = results.slice(0, limit);
  return <div>
    <div className="global-timeline-controls" aria-label="Timeline controls">
      <label><span>Search Surah</span><input className="input focus-ring" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(24); }} placeholder="Name, meaning, or number" /></label>
      <fieldset><legend>Classification</legend>{(["all","meccan","medinan"] as const).map((value) => <button key={value} type="button" className="word-control focus-ring" aria-pressed={filter === value} onClick={() => { setFilter(value); setLimit(24); }}>{value === "all" ? "All" : value === "meccan" ? "Meccan" : "Medinan"}</button>)}</fieldset>
      <fieldset><legend>Sequence</legend><button type="button" className="word-control focus-ring" aria-pressed={order === "mushaf"} onClick={() => setOrder("mushaf")}>Mushaf order</button><button type="button" className="word-control focus-ring" aria-pressed={order === "traditional"} onClick={() => setOrder("traditional")}>Traditional revelation order</button></fieldset>
    </div>
    <p className="timeline-result-count" aria-live="polite">Showing {visible.length} of {results.length} Surahs</p>
    <ol className={`global-timeline-list order-${order}`}>
      {visible.map(({ surah, revelation }) => <li key={surah.number} className={revelation.classification === "medinan" ? "is-medinan" : "is-meccan"}>
        {order === "traditional" && revelation.traditionalOrder === 87 && <div className="hijrah-boundary"><strong>Hijrah boundary</strong><span>Traditional Medinan sequence begins</span></div>}
        <div className="timeline-list-marker" aria-hidden="true" />
        <Link href={`/surahs/${surah.number}`} className="timeline-surah-link focus-ring"><span>{order === "traditional" ? `Traditional position ${revelation.traditionalOrder}` : `Surah ${surah.number}`}</span><strong>{surah.nameEnglish}</strong><small>{surah.meaningEnglish} · {revelation.classification === "meccan" ? "Meccan · pre-Hijrah" : "Medinan · post-Hijrah"}</small></Link>
        {revelation.exceptions.length > 0 && <details className="timeline-exception"><summary className="focus-ring">{revelation.exceptions.length} documented note{revelation.exceptions.length > 1 ? "s" : ""}</summary><ul>{revelation.exceptions.map((item) => <li key={`${item.ayahRange}-${item.context ?? "note"}`}>Ayah{item.ayahRange === "Entire Surah" ? "" : "s"} {item.ayahRange}{item.context ? ` — ${item.context}` : item.classification ? ` — ${item.classification}` : ""}</li>)}</ul></details>}
      </li>)}
    </ol>
    {visible.length < results.length && <button type="button" className="button-secondary focus-ring timeline-more" onClick={() => setLimit((value) => value + 24)}>Show more Surahs</button>}
    {results.length === 0 && <p className="timeline-empty">No Surahs match this search and filter.</p>}
  </div>;
}
