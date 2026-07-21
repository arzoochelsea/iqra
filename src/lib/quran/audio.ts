import type { SurahAudio } from "@/types/quran";

export const AUDIO_CONFIG = { reciterName: "Mishary Rashid Alafasy", providerName: "Islamic Network CDN", edition: "ar.alafasy", bitrate: 128 } as const;
export function getFullSurahAudioUrl(surahNumber: number) { return `https://cdn.islamic.network/quran/audio-surah/${AUDIO_CONFIG.bitrate}/${AUDIO_CONFIG.edition}/${surahNumber}.mp3`; }
export function getAyahAudioUrl(globalAyahNumber: number) { return `https://cdn.islamic.network/quran/audio/${AUDIO_CONFIG.bitrate}/${AUDIO_CONFIG.edition}/${globalAyahNumber}.mp3`; }
export function getSurahAudio(surahNumber: number): SurahAudio { return { reciterName: AUDIO_CONFIG.reciterName, sourceName: AUDIO_CONFIG.providerName, audioUrl: getFullSurahAudioUrl(surahNumber) }; }
