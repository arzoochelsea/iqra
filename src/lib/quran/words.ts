import "server-only";
import type { QuranWord } from "@/types/quran";
import { QuranDataError } from "./errors";
import { validateQuranWords } from "./validation";

const WORDS_API = "https://api.islamic.app/v1/words";
const WORDS_SOURCE = "islamic.app Word-by-word Quran";
type RemoteWord = { position?: unknown; text_uthmani?: unknown; translation?: unknown; transliteration?: unknown };
type RemoteAyah = { code?: unknown; data?: { surah_number?: unknown; ayah_number?: unknown; verse_key?: unknown; word_count?: unknown; words?: unknown } };

function normalizeWords(rawWords: unknown, surahNumber: number, ayahNumber: number, expectedCount: unknown) {
  if (!Array.isArray(rawWords) || expectedCount !== rawWords.length) throw new QuranDataError("Invalid word-by-word word count.", "mismatch");
  const words = (rawWords as RemoteWord[]).map((word): QuranWord => {
    if (typeof word.position !== "number" || typeof word.text_uthmani !== "string" || typeof word.translation !== "string") throw new QuranDataError("Required word-by-word fields are missing.", "invalid-response");
    return { position: word.position, arabic: word.text_uthmani, meaningEnglish: word.translation, transliteration: typeof word.transliteration === "string" && word.transliteration.trim() ? word.transliteration : undefined, sourceName: WORDS_SOURCE };
  });
  return validateQuranWords(words, surahNumber, ayahNumber);
}

export async function fetchAyahWords(surahNumber: number, ayahNumber: number, ayahCount: number) {
  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114 || !Number.isInteger(ayahNumber) || ayahNumber < 1 || ayahNumber > ayahCount) throw new QuranDataError("Invalid ayah identity for word-by-word data.", "mismatch");
  try {
    const response = await fetch(`${WORDS_API}/${surahNumber}/${ayahNumber}`, { signal: AbortSignal.timeout(8_000), next: { revalidate: 604_800 } });
    if (!response.ok) throw new QuranDataError(`Word-by-word provider returned ${response.status}.`, "network");
    const payload = await response.json() as RemoteAyah;
    const data = payload?.data;
    if (payload?.code !== 200 || !data || data.surah_number !== surahNumber || data.ayah_number !== ayahNumber || data.verse_key !== `${surahNumber}:${ayahNumber}`) throw new QuranDataError("Word-by-word response does not match the requested ayah.", "mismatch");
    return normalizeWords(data.words, surahNumber, ayahNumber, data.word_count);
  } catch (error) {
    if (error instanceof QuranDataError) throw error;
    throw new QuranDataError("Word-by-word content could not be retrieved safely.", "network");
  }
}
