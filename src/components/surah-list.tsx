"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/app-icon";
import { SURAH_METADATA } from "@/data/surah-metadata";

type SurahFilter = "all" | "meccan" | "medinan" | "short";

export function SurahList({
  searchId = "surah-search",
  showFilters = false,
}: {
  searchId?: string;
  showFilters?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SurahFilter>("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return SURAH_METADATA.filter((surah) => {
      const matchesQuery = !needle || [String(surah.number), surah.nameArabic, surah.nameEnglish, surah.meaningEnglish].some((value) => value.toLocaleLowerCase().includes(needle));
      const matchesFilter =
        filter === "all" ||
        (filter === "meccan" && surah.revelationType === "Meccan") ||
        (filter === "medinan" && surah.revelationType === "Medinan") ||
        (filter === "short" && surah.ayahCount <= 10);
      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  const filters: { value: SurahFilter; label: string }[] = [{ value: "all", label: "All" }, { value: "meccan", label: "Meccan" }, { value: "medinan", label: "Medinan" }, { value: "short", label: "Short" }];

  return <div className="surah-explorer">
    <div className="surah-search-field">
      <AppIcon name="search" />
      <label className="sr-only" htmlFor={searchId}>Search Surahs</label>
      <input id={searchId} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Surahs" className="input focus-ring" />
    </div>
    {showFilters && <div className="surah-filter-chips" aria-label="Filter Surahs">{filters.map((item) => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)} className="focus-ring">{item.label}</button>)}</div>}
    <p className="surah-result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "Surah" : "Surahs"}</p>
    <ul className="surah-results">{filtered.map((surah) => <li key={surah.number}>
      <Link href={`/surahs/${surah.number}`} className="surah-row focus-ring">
        <span className="number-badge">{surah.number}</span><span className="min-w-0"><strong className="block text-ink">{surah.nameEnglish}</strong><span className="text-sm text-muted">{surah.meaningEnglish}</span></span>
        <span className="ml-auto hidden text-sm text-muted sm:block">{surah.revelationType === "Meccan" ? "Makkan" : "Madinan"} · {surah.ayahCount} ayahs</span><span dir="rtl" lang="ar" className="arabic ml-3 text-xl text-green">{surah.nameArabic.replace(/^سُورَةُ\s*/, "")}</span>
      </Link>
    </li>)}</ul>{filtered.length === 0 && <p className="status">No Surahs match that search.</p>}
  </div>;
}
