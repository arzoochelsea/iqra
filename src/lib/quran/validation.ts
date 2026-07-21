import type { Ayah, PreparedSurah, QuranWord, SurahMetadata } from "@/types/quran";

export function validateSurahMetadata(items: readonly SurahMetadata[]) {
  if (items.length !== 114) throw new Error(`Expected 114 Surahs; received ${items.length}.`);
  const numbers = new Set(items.map((item) => item.number));
  if (numbers.size !== 114 || items.some((item, index) => item.number !== index + 1)) throw new Error("Surah numbers must be unique and sequential from 1 to 114.");
  for (const item of items) if (!item.nameArabic.trim() || !item.nameEnglish.trim() || !item.meaningEnglish.trim() || item.ayahCount <= 0) throw new Error(`Invalid metadata for Surah ${item.number}.`);
  return items;
}
export function validateAyahs(ayahs: readonly Ayah[], metadata: SurahMetadata) {
  if (ayahs.length !== metadata.ayahCount) throw new Error(`Surah ${metadata.number} expected ${metadata.ayahCount} ayahs; received ${ayahs.length}.`);
  const numbers = new Set<number>();
  for (const ayah of ayahs) {
    if (ayah.surahNumber !== metadata.number || ayah.ayahNumberInSurah < 1 || ayah.ayahNumberInSurah > metadata.ayahCount || !ayah.arabicText.trim() || numbers.has(ayah.ayahNumberInSurah)) throw new Error(`Invalid ayah data in Surah ${metadata.number}.`);
    if (ayah.translation && !ayah.translationSource) throw new Error(`Published translation for ${metadata.number}:${ayah.ayahNumberInSurah} lacks attribution.`);
    numbers.add(ayah.ayahNumberInSurah);
  }
  return ayahs;
}
export function validatePreparedSurah(surah: PreparedSurah) { validateAyahs(surah.ayahs, surah.metadata); if (surah.metadata.contentStatus !== "fully-prepared") throw new Error("Prepared Surah must have fully-prepared status."); return surah; }
export function validateQuranWords(words: readonly QuranWord[], surahNumber: number, ayahNumber: number) {
  if (words.length === 0) throw new Error(`No word data returned for ${surahNumber}:${ayahNumber}.`);
  const positions = new Set<number>();
  words.forEach((word, index) => {
    if (!Number.isInteger(word.position) || word.position !== index + 1 || positions.has(word.position)) throw new Error(`Invalid word position in ${surahNumber}:${ayahNumber}.`);
    if (!word.arabic.trim() || !word.meaningEnglish.trim() || !word.sourceName.trim()) throw new Error(`Incomplete word data in ${surahNumber}:${ayahNumber}.`);
    positions.add(word.position);
  });
  return words;
}
