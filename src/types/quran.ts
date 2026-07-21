export type RevelationType = "Meccan" | "Medinan";
export type ContentStatus = "metadata-only" | "text-ready" | "translation-ready" | "audio-ready" | "tafsir-reviewed" | "fully-prepared";
export type VerificationStatus = "unreviewed" | "source-checked" | "scholar-reviewed";

export interface SurahMetadata { number: number; nameArabic: string; nameEnglish: string; meaningEnglish: string; revelationType: RevelationType; ayahCount: number; contentStatus: ContentStatus; }
export interface Ayah { surahNumber: number; ayahNumber: number; ayahNumberInSurah: number; arabicText: string; transliteration: string | null; translation: string | null; audioUrl: string | null; translationSource: string | null; }
export interface SurahAudio { reciterName: string; audioUrl: string; sourceName: string; }
export interface TafsirContent { title: string; summary: string; detailedExplanation: string; sourceName: string; sourceReference: string; verificationStatus: VerificationStatus; }
export interface EditorialReflection { practicalTakeaway: string; reflectionQuestions: [string, string]; disclaimer: string; }
export type ContentType = "quran-text" | "translation" | "transliteration" | "audio" | "tafsir" | "editorial";
export interface SourceAttribution { contentType: ContentType; sourceName: string; sourceDescription: string; licenseOrUsageNote: string; externalReference: string; }
export interface PreparedSurah { metadata: SurahMetadata; ayahs: Ayah[]; audio: SurahAudio; tafsir: TafsirContent; reflection: EditorialReflection; sources: SourceAttribution[]; about: string[]; revelationContext: string; themes: string[]; relatedSurahNumbers: number[]; }
