export type RevelationType = "Meccan" | "Medinan";
export type RevelationClassification = "meccan" | "medinan";
export type RevelationPhase = "early-meccan" | "middle-meccan" | "late-meccan" | "medinan" | "uncertain";
export type RevelationConfidence = "established" | "traditional" | "approximate" | "disputed";

export interface RevelationException {
  ayahRange: string;
  classification?: RevelationClassification;
  location?: string;
  context?: string;
  sourceName: string;
}

export interface SurahRevelationMetadata {
  surahNumber: number;
  classification: RevelationClassification;
  traditionalOrder: number;
  phase?: RevelationPhase;
  approximatePeriodLabel?: string;
  confidence: RevelationConfidence;
  exceptions: readonly RevelationException[];
  summary: string;
  sourceName: string;
  sourceUrl: string;
  sourceNote: string;
  lastReviewed: string;
}
export type ContentStatus = "metadata-only" | "text-ready" | "translation-ready" | "audio-ready" | "tafsir-reviewed" | "fully-prepared";
export type VerificationStatus = "unreviewed" | "source-checked" | "scholar-reviewed";

export interface SurahMetadata { number: number; nameArabic: string; nameEnglish: string; meaningEnglish: string; revelationType: RevelationType; ayahCount: number; contentStatus: ContentStatus; }
export interface QuranWord { position: number; arabic: string; transliteration?: string; meaningEnglish: string; root?: string; lemma?: string; grammar?: string; sourceName: string; }
export interface Ayah { surahNumber: number; ayahNumber: number; ayahNumberInSurah: number; arabicText: string; transliteration: string | null; translation: string | null; audioUrl: string | null; translationSource: string | null; words?: readonly QuranWord[]; }
export interface SurahAudio { reciterName: string; audioUrl: string; sourceName: string; }
export interface TafsirContent { title: string; summary: string; detailedExplanation: string; sourceName: string; sourceReference: string; verificationStatus: VerificationStatus; }
export interface EditorialReflection { practicalTakeaway: string; reflectionQuestions: [string, string]; disclaimer: string; }
export type ContentType = "quran-text" | "translation" | "transliteration" | "word-by-word" | "audio" | "tafsir" | "editorial";
export interface SourceAttribution { contentType: ContentType; sourceName: string; sourceDescription: string; licenseOrUsageNote: string; externalReference: string; }
export interface PreparedSurah { metadata: SurahMetadata; ayahs: Ayah[]; audio: SurahAudio; tafsir: TafsirContent; reflection: EditorialReflection; sources: SourceAttribution[]; about: string[]; revelationContext: string; themes: string[]; relatedSurahNumbers: number[]; }
