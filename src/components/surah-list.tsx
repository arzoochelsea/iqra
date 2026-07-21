"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SURAH_METADATA } from "@/data/surah-metadata";

export function SurahList({ preview = false }: { preview?: boolean }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    const items = needle ? SURAH_METADATA.filter((surah) => [String(surah.number), surah.nameArabic, surah.nameEnglish, surah.meaningEnglish].some((value) => value.toLocaleLowerCase().includes(needle))) : SURAH_METADATA;
    return preview ? items.slice(0, 6) : items;
  }, [preview, query]);

  return <div>
    <label className="sr-only" htmlFor={preview ? "home-surah-search" : "surah-search"}>Search by Surah number, Arabic name, English name, or meaning</label>
    <input id={preview ? "home-surah-search" : "surah-search"} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, meaning, or number…" className="input focus-ring" />
    <p className="mt-4 text-sm text-muted" aria-live="polite">{query ? `${filtered.length}${preview ? "+" : ""} matching Surahs` : preview ? "A preview of the Qur’an index" : "114 Surahs"}</p><ul className="mt-4 grid gap-3">{filtered.map((surah) => <li key={surah.number}>
      <Link href={`/surahs/${surah.number}`} className="surah-row focus-ring">
        <span className="number-badge">{surah.number}</span><span className="min-w-0"><strong className="block text-ink">{surah.nameEnglish}</strong><span className="text-sm text-muted">{surah.meaningEnglish}</span></span>
        <span className="ml-auto hidden text-sm text-muted sm:block">{surah.revelationType === "Meccan" ? "Makkan" : "Madinan"} · {surah.ayahCount} ayahs</span><span dir="rtl" lang="ar" className="arabic ml-3 text-xl text-green">{surah.nameArabic.replace(/^سُورَةُ\s*/, "")}</span>
      </Link>
    </li>)}</ul>{filtered.length === 0 && <p className="status">No Surahs match that search.</p>}
  </div>;
}
