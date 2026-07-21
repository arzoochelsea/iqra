import "server-only";
import type { Ayah, QuranWord } from "@/types/quran";
import { QuranDataError } from "./errors";
import { validateQuranWords } from "./validation";

const WORDS_API = "https://api.islamic.app/v1/words";
const WORDS_SOURCE = "islamic.app Word-by-word Quran";
const PAGE_SIZE = 50;

type RemoteWord = { position?: unknown; text_uthmani?: unknown; translation?: unknown; transliteration?: unknown };
type RemoteWordAyah = { ayah_number?: unknown; verse_key?: unknown; word_count?: unknown; words?: unknown };
type RemotePage = { code?: unknown; data?: { surah_number?: unknown; pagination?: { current_page?: unknown; total_pages?: unknown; total_ayahs?: unknown }; ayahs?: unknown } };

function normalizePage(payload: unknown, surahNumber: number, expectedPage: number, expectedAyahCount: number) {
  const page = payload as RemotePage;
  const data = page?.data;
  if (page?.code !== 200 || !data || data.surah_number !== surahNumber || !data.pagination || data.pagination.current_page !== expectedPage || data.pagination.total_ayahs !== expectedAyahCount || !Array.isArray(data.ayahs)) throw new QuranDataError("Word-by-word response does not match the requested Surah.", "mismatch");
  const normalized = new Map<number, readonly QuranWord[]>();
  for (const rawAyah of data.ayahs as RemoteWordAyah[]) {
    if (typeof rawAyah.ayah_number !== "number" || rawAyah.ayah_number < 1 || rawAyah.ayah_number > expectedAyahCount || rawAyah.verse_key !== `${surahNumber}:${rawAyah.ayah_number}` || !Array.isArray(rawAyah.words) || rawAyah.word_count !== rawAyah.words.length || normalized.has(rawAyah.ayah_number)) throw new QuranDataError("Invalid word-by-word ayah identity.", "mismatch");
    const words = (rawAyah.words as RemoteWord[]).map((word): QuranWord => {
      if (typeof word.position !== "number" || typeof word.text_uthmani !== "string" || typeof word.translation !== "string") throw new QuranDataError("Required word-by-word fields are missing.", "invalid-response");
      return { position: word.position, arabic: word.text_uthmani, meaningEnglish: word.translation, transliteration: typeof word.transliteration === "string" && word.transliteration.trim() ? word.transliteration : undefined, sourceName: WORDS_SOURCE };
    });
    normalized.set(rawAyah.ayah_number, validateQuranWords(words, surahNumber, rawAyah.ayah_number));
  }
  return { words: normalized, totalPages: data.pagination.total_pages };
}

export async function fetchSurahWords(surahNumber: number, ayahCount: number) {
  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114 || !Number.isInteger(ayahCount) || ayahCount < 1) throw new QuranDataError("Invalid Surah identity for word-by-word data.", "mismatch");
  const allWords = new Map<number, readonly QuranWord[]>();
  let page = 1, totalPages = 1;
  do {
    try {
      const response = await fetch(`${WORDS_API}/${surahNumber}?page=${page}&per_page=${PAGE_SIZE}`, { signal: AbortSignal.timeout(8_000), next: { revalidate: 604_800 } });
      if (!response.ok) throw new QuranDataError(`Word-by-word provider returned ${response.status}.`, "network");
      const normalized = normalizePage(await response.json(), surahNumber, page, ayahCount);
      if (typeof normalized.totalPages !== "number" || normalized.totalPages < 1 || normalized.totalPages > Math.ceil(ayahCount / PAGE_SIZE)) throw new QuranDataError("Invalid word-by-word pagination.", "invalid-response");
      totalPages = normalized.totalPages;
      normalized.words.forEach((words, ayah) => { if (allWords.has(ayah)) throw new QuranDataError("Duplicate word-by-word ayah.", "invalid-response"); allWords.set(ayah, words); });
      page += 1;
    } catch (error) {
      if (error instanceof QuranDataError) throw error;
      throw new QuranDataError("Word-by-word content could not be retrieved safely.", "network");
    }
  } while (page <= totalPages);
  if (allWords.size !== ayahCount || Array.from({ length: ayahCount }, (_, index) => index + 1).some((ayah) => !allWords.has(ayah))) throw new QuranDataError("Word-by-word data is incomplete for this Surah.", "invalid-response");
  return allWords;
}

export function attachWordsToAyahs(ayahs: readonly Ayah[], wordsByAyah: ReadonlyMap<number, readonly QuranWord[]>) {
  return ayahs.map((ayah): Ayah => ({ ...ayah, words: wordsByAyah.get(ayah.ayahNumberInSurah) }));
}
