"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/app-icon";
import { duas, type DuaCategory } from "@/data/duas";

const categoryCards: { name: DuaCategory; icon: string; tone: string; subtitle: string }[] = [
  { name: "Daily", icon: "☀️", tone: "mint", subtitle: "Morning, food & home" },
  { name: "Fear & Anxiety", icon: "🤲", tone: "sky", subtitle: "Worry, grief & courage" },
  { name: "Marriage & Family", icon: "♡", tone: "rose", subtitle: "Spouses, parents & children" },
  { name: "Protection", icon: "✦", tone: "gold", subtitle: "Refuge & steadfast faith" },
  { name: "Travel", icon: "✈", tone: "peach", subtitle: "Journeys and safe return" },
  { name: "Gratitude", icon: "☾", tone: "lilac", subtitle: "Joy, blessings & thanks" },
  { name: "Guidance", icon: "⌁", tone: "sage", subtitle: "Mercy and the right path" },
  { name: "Forgiveness", icon: "♡", tone: "sand", subtitle: "Repentance and mercy" },
  { name: "Healing", icon: "✚", tone: "aqua", subtitle: "Illness and hardship" },
  { name: "Provision", icon: "◇", tone: "sun", subtitle: "Rizq and goodness" },
  { name: "Knowledge", icon: "📖", tone: "blue", subtitle: "Learning and understanding" },
  { name: "Sleep", icon: "☾", tone: "lilac", subtitle: "Rest and night remembrance" },
  { name: "Mosque", icon: "♢", tone: "mint", subtitle: "Entering and worship" },
  { name: "Weather", icon: "☂", tone: "sky", subtitle: "Rain and changing skies" },
];

export function DuaLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | DuaCategory>("All");
  const [view, setView] = useState<"categories" | "collection">("categories");
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return duas.filter((dua) => (category === "All" || dua.category === category) && (!needle || `${dua.title} ${dua.arabic} ${dua.transliteration} ${dua.translation} ${dua.source} ${dua.category}`.toLocaleLowerCase().includes(needle)));
  }, [category, query]);

  return (
    <div className="dua-library">
      <div className="dua-visual">
        <Image src="/visuals/dua-categories-banner.png" alt="Prayer, Qur’an, travel, and family symbols" fill priority sizes="(max-width: 767px) 100vw, 768px" />
        <div><p className="eyebrow">Duas for every moment</p><h2>Call upon Allah</h2><p>Learn authentic supplications with meaning.</p></div>
      </div>

      <div className="dua-view-tabs" aria-label="Dua library view">
        <button type="button" className="focus-ring" aria-pressed={view === "categories"} onClick={() => setView("categories")}>Categories</button>
        <button type="button" className="focus-ring" aria-pressed={view === "collection"} onClick={() => { setCategory("All"); setView("collection"); }}>All Duas</button>
      </div>

      {view === "categories" ? <div className="dua-category-grid">
        {categoryCards.map((item) => <button key={item.name} type="button" className={`dua-category-card dua-tone-${item.tone} focus-ring`} onClick={() => { setCategory(item.name); setQuery(""); setView("collection"); }}>
          <span className="dua-category-icon" aria-hidden="true">{item.icon}</span>
          <span><strong>{item.name}</strong><small>{item.subtitle}</small></span>
          <b>{duas.filter((dua) => dua.category === item.name).length}</b>
        </button>)}
      </div> : <>
        <div className="dua-collection-heading">
          <button type="button" className="dua-category-back focus-ring" onClick={() => setView("categories")} aria-label="Back to dua categories">←</button>
          <div><p className="eyebrow">{category === "All" ? "Complete collection" : "Dua category"}</p><h2>{category === "All" ? "All Duas" : category}</h2></div>
        </div>
        <label className="surah-search-field" htmlFor="dua-search">
          <AppIcon name="search" />
          <input id="dua-search" className="input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Arabic, translation, or moment" />
        </label>
        <p className="dua-count">{filtered.length} verified {filtered.length === 1 ? "dua" : "duas"}</p>
        <div className="dua-list">
          {filtered.map((dua) => (
            <article className="dua-card" key={dua.id}>
              <header><span>{dua.category}</span><h2>{dua.title}</h2></header>
              <p className="dua-arabic arabic" lang="ar" dir="rtl">{dua.arabic}</p>
              <div className="dua-language-block"><span>Transliteration</span><p className="dua-transliteration">{dua.transliteration}</p></div>
              <div className="dua-language-block"><span>Translation</span><p className="dua-translation">{dua.translation}</p></div>
              <p className="dua-source">Source: {dua.sourceUrl ? <a href={dua.sourceUrl} target="_blank" rel="noreferrer">{dua.source} ↗</a> : dua.source}</p>
              <details>
                <summary className="focus-ring">Word-by-word meaning</summary>
                <div className="dua-words">{dua.words.map((word, index) => <div key={`${dua.id}-${index}`}><strong className="arabic" lang="ar" dir="rtl">{word.arabic}</strong><span>{word.meaning}</span></div>)}</div>
              </details>
            </article>
          ))}
        </div>
      </>}
    </div>
  );
}
