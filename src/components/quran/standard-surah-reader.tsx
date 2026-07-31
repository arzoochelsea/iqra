import { AudioPlayer } from "@/components/audio-player";
import { AyahReader } from "@/components/ayah-reader";
import { ErrorCard } from "@/components/content-state";
import { ContentSection } from "@/components/section";
import { getSurahAudio } from "@/lib/quran/audio";
import { fetchRemoteSurah, QuranDataError } from "@/lib/quran/client";
import { QURAN_SOURCES } from "@/lib/quran/sources";
import type { SurahMetadata } from "@/types/quran";
import { SourceAttributionList } from "./source-attribution";
import { RevelationJourney } from "@/components/revelation/revelation-journey";
import { getRevelationMetadata } from "@/data/revelation-metadata";
import { SurahTafsirAccordion } from "./surah-tafsir-accordion";

const readerSources = [QURAN_SOURCES.arabic, QURAN_SOURCES.translation, QURAN_SOURCES.transliteration, QURAN_SOURCES.wordByWord, QURAN_SOURCES.audio];

export async function StandardSurahReader({ metadata }: { metadata: SurahMetadata }) {
  const revelation = getRevelationMetadata(metadata.number);
  let result: Awaited<ReturnType<typeof fetchRemoteSurah>> | null = null;
  let requestError: unknown;
  try {
    result = await fetchRemoteSurah(metadata.number);
  } catch (error) {
    requestError = error;
  }
  if (!result) {
    const message = requestError instanceof QuranDataError && requestError.code === "mismatch" ? "The provider response did not match this Surah, so no Qur’an content has been displayed." : "Qur’an text, translation, and ayah audio could not be loaded safely. Please try again when the provider is available.";
    return <>{revelation && <RevelationJourney metadata={revelation} />}<div className="shell narrow section-pad"><SurahTafsirAccordion key={metadata.number} surahNumber={metadata.number} /><ErrorCard title="Qur’an content unavailable" message={message} /><div className="mt-10"><SourceAttributionList sources={readerSources} /></div></div></>;
  }
  const audio = getSurahAudio(metadata.number);
  return <>{revelation && <RevelationJourney metadata={revelation} />}<div className="shell narrow pb-20">
    <ContentSection title={`Listen to ${metadata.nameEnglish}`} eyebrow="Full-Surah audio" tone="card"><AudioPlayer src={audio.audioUrl} label={`Surah ${metadata.nameEnglish}`} /><p className="mt-5 text-xs text-muted">Streamed from {audio.sourceName} · Recitation by {audio.reciterName}</p></ContentSection>
    <SurahTafsirAccordion key={metadata.number} surahNumber={metadata.number} />
    <ContentSection title="Ayah reader" eyebrow="Qur’an"><AyahReader ayahs={result} /><p className="mt-4 text-xs text-muted">Translation: Saheeh International · Transliteration: Al Quran Cloud English Transliteration</p></ContentSection>
    <ContentSection title="Sources"><SourceAttributionList sources={readerSources} /></ContentSection>
  </div></>;
}
