import { getSurahMetadata } from "@/data/surah-metadata";
import { validateAyahs } from "./validation";
import type { Ayah } from "@/types/quran";
import { QuranDataError } from "./errors";

type RemoteAyah = { number?: unknown; numberInSurah?: unknown; text?: unknown; audio?: unknown };
type RemoteEdition = { number?: unknown; ayahs?: unknown; edition?: { identifier?: unknown } };
export function normalizeRemoteSurah(payload: unknown, expectedNumber: number) {
  if (!payload || typeof payload !== "object" || !("data" in payload) || !Array.isArray(payload.data)) throw new QuranDataError("Unexpected Qur’an response.", "invalid-response");
  const editions = payload.data as RemoteEdition[];
  if (editions.length !== 4 || editions.some((edition) => edition.number !== expectedNumber || !Array.isArray(edition.ayahs))) throw new QuranDataError("Provider response does not match the requested Surah.", "mismatch");
  const byId = (id: string) => editions.find((edition) => edition.edition?.identifier === id);
  const arabic = byId("quran-uthmani")?.ayahs as RemoteAyah[] | undefined;
  const translation = byId("en.sahih")?.ayahs as RemoteAyah[] | undefined;
  const transliteration = byId("en.transliteration")?.ayahs as RemoteAyah[] | undefined;
  const audio = byId("ar.alafasy")?.ayahs as RemoteAyah[] | undefined;
  const metadata = getSurahMetadata(expectedNumber);
  if (!metadata || !arabic || !translation || !transliteration || !audio || [translation, transliteration, audio].some((items) => items.length !== arabic.length)) throw new QuranDataError("Required Qur’an content fields are missing.", "invalid-response");
  const ayahs: Ayah[] = arabic.map((item, index) => {
    const translated = translation[index], transliterated = transliteration[index], recitation = audio[index];
    if (typeof item.number !== "number" || typeof item.numberInSurah !== "number" || typeof item.text !== "string") throw new QuranDataError("Invalid ayah identity or Arabic text.", "invalid-response");
    return { surahNumber: expectedNumber, ayahNumber: item.number, ayahNumberInSurah: item.numberInSurah, arabicText: item.text, translation: typeof translated.text === "string" ? translated.text : null, transliteration: typeof transliterated.text === "string" ? transliterated.text : null, audioUrl: typeof recitation.audio === "string" ? recitation.audio : null, translationSource: typeof translated.text === "string" ? "Saheeh International" : null };
  });
  return validateAyahs(ayahs, metadata);
}
