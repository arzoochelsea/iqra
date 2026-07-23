"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/app-icon";
import { duas, type DuaCategory } from "@/data/duas";

const categories: ("All" | DuaCategory)[] = ["All", "Knowledge", "Family", "Forgiveness", "Everyday"];

export function DuaLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return duas.filter((dua) => (category === "All" || dua.category === category) && (!needle || `${dua.title} ${dua.translation} ${dua.source} ${dua.category}`.toLocaleLowerCase().includes(needle)));
  }, [category, query]);

  return (
    <div className="dua-library">
      <label className="surah-search-field" htmlFor="dua-search">
        <AppIcon name="search" />
        <input id="dua-search" className="input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Duas" />
      </label>
      <div className="surah-filter-chips" aria-label="Dua categories">
        {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <p className="dua-count">{filtered.length} {filtered.length === 1 ? "dua" : "duas"}</p>
      <div className="dua-list">
        {filtered.map((dua) => (
          <article className="dua-card" key={dua.id}>
            <header><span>{dua.category}</span><h2>{dua.title}</h2></header>
            <p className="dua-arabic arabic" lang="ar" dir="rtl">{dua.arabic}</p>
            <p className="dua-translation">{dua.translation}</p>
            <p className="dua-source">{dua.source}</p>
            <details>
              <summary className="focus-ring">Word-by-word meaning</summary>
              <div className="dua-words">{dua.words.map((word, index) => <div key={`${dua.id}-${index}`}><strong className="arabic" lang="ar" dir="rtl">{word.arabic}</strong><span>{word.meaning}</span></div>)}</div>
            </details>
          </article>
        ))}
      </div>
    </div>
  );
}
