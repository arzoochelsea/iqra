export interface SurahTafsirSection {
  heading: string;
  content: string;
}

export interface SurahTafsirSource {
  title: string;
  author?: string;
  reference: string;
  url: string;
}

export interface SurahTafsirData {
  surahNumber: number;
  surahName: string;
  overview: string;
  historicalBackground: string;
  keyThemes: readonly string[];
  tafsirSummary: readonly SurahTafsirSection[];
  lessons: readonly string[];
  sources: readonly SurahTafsirSource[];
}
