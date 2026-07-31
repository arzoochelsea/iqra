import type { SurahTafsirData } from "@/types/surah-tafsir";

const SURAH_TAFSIR: Readonly<Record<number, SurahTafsirData>> = {
  112: {
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    overview: "Al-Ikhlas is a concise declaration of Allah’s absolute oneness and uniqueness. It affirms that all creation depends upon Him while He is independent of all creation.",
    historicalBackground: "Al-Ikhlas is traditionally classified as a Meccan Surah. Reports discussed in classical tafsir connect its message with questions about the nature or lineage of God; the Surah answers by stating what may be affirmed about Allah without likening Him to creation.",
    keyThemes: ["Tawhid", "Allah’s self-sufficiency", "Rejection of divine lineage", "Allah’s incomparability"],
    tafsirSummary: [
      {
        heading: "Allah is One",
        content: "The opening describes Allah as uniquely One: without peer, partner, division, or equal.",
      },
      {
        heading: "The Eternal Refuge",
        content: "As-Samad conveys the perfect Lord upon whom creation depends, while He remains free of every need.",
      },
      {
        heading: "Beyond lineage and likeness",
        content: "The final ayahs reject parentage, origin, and every comparison between Allah and created beings.",
      },
    ],
    lessons: [
      "Direct worship, reliance, and ultimate hope to Allah alone.",
      "Avoid imagining Allah through the limitations or relationships of created beings.",
      "Return to this concise Surah to renew an understanding of pure monotheism.",
    ],
    sources: [
      {
        title: "Tafsir Ibn Kathir (Abridged)",
        author: "Ismail ibn Kathir",
        reference: "Commentary on Surah Al-Ikhlas, 112:1–4; hosted by Quran.com",
        url: "https://quran.com/112:1/tafsirs/en-tafisr-ibn-kathir",
      },
      {
        title: "Tanzil Revelation Order",
        reference: "Traditional classification and revelation-order metadata",
        url: "https://tanzil.net/docs/Revelation_Order",
      },
    ],
  },
};

export function getSurahTafsir(surahNumber: number) {
  return SURAH_TAFSIR[surahNumber] ?? null;
}
