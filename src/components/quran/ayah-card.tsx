"use client";

import { AudioPlayer } from "@/components/audio-player";
import { ErrorCard } from "@/components/content-state";
import type { Ayah } from "@/types/quran";
import { WordByWord } from "./word-by-word";

export function AyahCard({ ayah, shown, active, onPlay }: { ayah: Ayah; shown: { arabic: boolean; transliteration: boolean; translation: boolean }; active: boolean; onPlay: () => void }) {
  return <li className={`ayah-card ${active ? "ayah-active" : ""}`}>
    <div className="flex items-center justify-between"><span className="number-badge" aria-label={`Ayah ${ayah.ayahNumberInSurah}`}>{ayah.ayahNumberInSurah}</span></div>
    {shown.arabic && <p dir="rtl" lang="ar" translate="no" className="arabic mt-6 text-right text-3xl leading-[2] sm:text-4xl">{ayah.arabicText}</p>}
    {shown.transliteration && (ayah.transliteration ? <p className="mt-4 italic text-muted"><span className="content-label">Transliteration</span>{ayah.transliteration}</p> : <ErrorCard title="Transliteration unavailable" message="A verified transliteration is not available for this ayah." />)}
    {shown.translation && (ayah.translation ? <div className="ayah-translation"><span className="content-label">Translation · {ayah.translationSource}</span><p translate="no">{ayah.translation}</p></div> : <ErrorCard title="Translation unavailable" message="A verified translation is not available for this ayah." />)}
    <WordByWord words={ayah.words} />
    <div className="ayah-audio">{ayah.audioUrl ? <AudioPlayer compact src={ayah.audioUrl} label={`ayah ${ayah.ayahNumberInSurah}`} onPlay={onPlay} /> : <ErrorCard title="Audio unavailable" message="Verified recitation is not available for this ayah." />}</div>
  </li>;
}
