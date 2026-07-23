"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppIcon } from "@/components/app-icon";
import { AppLogo } from "@/components/app-logo";
import { InstallIqra } from "@/components/pwa/install-iqra";
import { useJourney } from "@/components/journey/journey-provider";
import { getJourneyItemHref, getListProgress, getNextJourneyItem } from "@/lib/journey/model";

export const INTRO_SEEN_KEY = "iqra-intro-seen-v1";

export function HomeExperience() {
  const [introSeen, setIntroSeen] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setIntroSeen(window.localStorage.getItem(INTRO_SEEN_KEY) === "true");
      } catch {
        setIntroSeen(false);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (introSeen === null) {
    return <div className="home-state-loading" role="status" aria-live="polite"><span /><span /><span className="sr-only">Loading IQRA…</span></div>;
  }

  if (!introSeen) {
    return <WelcomeExperience onBegin={() => {
      try { window.localStorage.setItem(INTRO_SEEN_KEY, "true"); } catch { /* Continue for this session when storage is unavailable. */ }
      setIntroSeen(true);
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }} />;
  }

  return <DailyHome />;
}

function WelcomeExperience({ onBegin }: { onBegin(): void }) {
  return <div className="app-home welcome-experience">
    <div className="sacred-backdrop sacred-backdrop-mecca" aria-hidden="true">
      <Image src="/visuals/mecca-dawn.png" alt="" fill priority sizes="(max-width: 767px) 100vw, 56vw" />
    </div>
    <div className="sacred-backdrop sacred-backdrop-medina" aria-hidden="true">
      <Image src="/visuals/medina-evening.png" alt="" fill sizes="(max-width: 767px) 100vw, 48vw" />
    </div>
    <section className="app-home-hero" aria-labelledby="home-title">
      <p className="app-reflection">Begin with the word that began the revelation.</p>
      <h1 id="home-title">Read. Reflect.<br />Understand.</h1>
      <div className="app-home-actions">
        <button type="button" className="button-primary focus-ring" onClick={onBegin}>Begin Reading</button>
        <InstallIqra />
      </div>
    </section>
    <section className="home-why-iqra" aria-labelledby="home-why-title">
      <p className="home-why-label">The first divine call</p>
      <h2 id="home-why-title">Allah began the revelation with one word: <strong>IQRA</strong></h2>
      <p>In the stillness of the Cave of Hira, the first command revealed to Prophet Muhammad ﷺ was not to fear, wait, or remain silent. It was <strong>IQRA—Read.</strong></p>
      <VerseCard highlighted />
      <p>Allah chose reading as the beginning: a call for every heart to seek knowledge, understand His creation, recognise the Creator, and move from darkness towards light.</p>
      <p className="home-hira-closing">That first call still reaches us: read with sincerity, learn with humility, and grow closer to Allah.</p>
      <small className="home-hira-source">Based on Qur’an 96:1–5 and Sahih al-Bukhari 3.</small>
    </section>
  </div>;
}

function DailyHome() {
  const router = useRouter();
  const journey = useJourney();
  const [query, setQuery] = useState("");
  const journeyState = useMemo(() => {
    const candidates = journey.data.lists
      .map((list) => ({ list, next: getNextJourneyItem(list), progress: getListProgress(list) }))
      .filter((entry) => entry.next)
      .toSorted((a, b) => b.list.updatedAt.localeCompare(a.list.updatedAt));
    return candidates[0] ?? null;
  }, [journey.data.lists]);
  const readingHref = journeyState?.next ? getJourneyItemHref(journeyState.next) : "/surahs";

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = query.trim();
    router.push(clean ? `/surahs?q=${encodeURIComponent(clean)}` : "/surahs");
  }

  return <div className="daily-home">
    <header className="daily-home-header">
      <AppLogo compact />
      <div><p>Assalamu Alaikum</p><h1>What will you read today?</h1></div>
      <InstallIqra />
    </header>

    <div className="daily-home-main">
      <section className="daily-primary" aria-labelledby="daily-reading-title">
        <div className="daily-primary-icon"><AppIcon name="continue" /></div>
        <div>
          <p className="eyebrow">{journeyState ? "Continue your journey" : "Begin gently"}</p>
          <h2 id="daily-reading-title">{journeyState?.next?.title ?? "Begin Reading"}</h2>
          {journeyState?.next && <p>{journeyState.next.type === "ayah" ? `Surah ${journeyState.next.surahNumber} · Ayah ${journeyState.next.ayahNumber}` : `Surah ${journeyState.next.surahNumber}`} · {journeyState.progress.percentage}% of “{journeyState.list.name}” complete</p>}
        </div>
        <Link href={readingHref} className="button-primary focus-ring">{journeyState ? "Continue Reading" : "Begin Reading"}</Link>
      </section>

      <form className="daily-search" role="search" onSubmit={search}>
        <AppIcon name="search" />
        <label className="sr-only" htmlFor="daily-surah-search">Search Surah, number, or meaning</label>
        <input id="daily-surah-search" value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search Surah, number, or meaning" className="focus-ring" />
        <button type="submit" className="focus-ring" aria-label="Search Surahs">Search</button>
      </form>

      <nav className="daily-quick-links" aria-label="Continue exploring">
        <Link href="/saved" className="focus-ring"><AppIcon name="bookmark" /><span><strong>My Qur’an Journey</strong><small>Your saved learning path</small></span><b aria-hidden="true">→</b></Link>
        <Link href="/revelation-journey" className="focus-ring"><AppIcon name="book" /><span><strong>Revelation Journey</strong><small>Explore the order of revelation</small></span><b aria-hidden="true">→</b></Link>
      </nav>

      <details className="daily-why">
        <summary className="focus-ring"><span><strong>Why IQRA?</strong><small>The first word of revelation</small></span><b aria-hidden="true">⌄</b></summary>
        <div>
          <p>IQRA means Read or Recite. It was the first word revealed by Allah to Prophet Muhammad ﷺ. The app is inspired by this invitation to seek knowledge, reflect, and draw closer to Allah.</p>
          <VerseCard />
          <Link href="/about" className="text-link focus-ring">See the story behind IQRA →</Link>
        </div>
      </details>
    </div>
  </div>;
}

function VerseCard({ highlighted = false }: { highlighted?: boolean }) {
  return <div className={`home-verse-card${highlighted ? " home-verse-highlight" : ""}`}>
    <span className="home-verse-mark" aria-hidden="true">“</span>
    <p className="home-verse-arabic arabic" lang="ar" dir="rtl">ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ</p>
    {highlighted && <div className="home-verse-rule" aria-hidden="true" />}
    <p className="home-verse-translation">“Read in the name of your Lord who created.”</p>
    <small>Qur’an 96:1</small>
  </div>;
}
