import { getSurahAudio, getAyahAudioUrl } from "@/lib/quran/audio";
import { QURAN_SOURCES } from "@/lib/quran/sources";
import { validatePreparedSurah } from "@/lib/quran/validation";
import { getSurahMetadata } from "@/data/surah-metadata";
import type { PreparedSurah } from "@/types/quran";

const metadata = getSurahMetadata(112);
if (!metadata) throw new Error("Verified metadata for Surah 112 is missing.");

const alIkhlas: PreparedSurah = {
  metadata,
  ayahs: [
    { surahNumber: 112, ayahNumber: 6222, ayahNumberInSurah: 1, arabicText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ هُوَ ٱللَّهُ أَحَدٌ", transliteration: "Qul huwal laahu ahad", translation: 'Say, “He is Allah, [who is] One,', audioUrl: getAyahAudioUrl(6222), translationSource: "Saheeh International" },
    { surahNumber: 112, ayahNumber: 6223, ayahNumberInSurah: 2, arabicText: "ٱللَّهُ ٱلصَّمَدُ", transliteration: "Allah hus-samad", translation: "Allah, the Eternal Refuge.", audioUrl: getAyahAudioUrl(6223), translationSource: "Saheeh International" },
    { surahNumber: 112, ayahNumber: 6224, ayahNumberInSurah: 3, arabicText: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "Lam yalid wa lam yoolad", translation: "He neither begets nor is born,", audioUrl: getAyahAudioUrl(6224), translationSource: "Saheeh International" },
    { surahNumber: 112, ayahNumber: 6225, ayahNumberInSurah: 4, arabicText: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", transliteration: "Wa lam yakul-lahu kufuwan ahad", translation: 'Nor is there to Him any equivalent.”', audioUrl: getAyahAudioUrl(6225), translationSource: "Saheeh International" },
  ],
  audio: getSurahAudio(112),
  tafsir: { title: "A concise reading", summary: "Summary based on the cited tafsir source. The Surah presents pure monotheism: Allah is uniquely One, all creation depends on Him, He is free of lineage, and nothing is comparable to Him.", detailedExplanation: "Ibn Kathir explains Al-Ahad as the One without peer and As-Samad as the perfect Master upon whom creation depends. The final two ayahs reject every idea of divine parentage, origin, likeness, or equal. This is an editorial summary for readability; follow the source to read the attributed tafsir itself.", sourceName: "Tafsir Ibn Kathir (Abridged), hosted by Quran.com", sourceReference: "https://quran.com/112:1/tafsirs/en-tafisr-ibn-kathir", verificationStatus: "source-checked" },
  reflection: { practicalTakeaway: "Notice where your sense of security rests today, and consciously return that reliance to Allah.", reflectionQuestions: ["What changes when you understand Allah as the One upon whom everything depends?", "Which assumptions about Allah does this Surah ask you to release?"], disclaimer: "Reflection prompts are provided for personal learning and are not a substitute for qualified scholarly guidance." },
  sources: Object.values(QURAN_SOURCES),
  about: ["Al-Ikhlas is a brief, foundational declaration of the oneness and absolute uniqueness of Allah. Its name means sincerity or purity of faith; the word itself does not appear in the Surah, but describes its undivided focus on tawhid.", "Its four ayahs state whom worshippers depend upon and remove every idea of ancestry, offspring, peer, or likeness from the understanding of Allah."],
  revelationContext: "The majority classification is Makkan. Reports connect the Surah with people asking the Prophet Muhammad ﷺ to describe or give the lineage of his Lord. Sources differ over the questioners and occasion, and some scholars classified it as Madinan; this page does not treat one detailed occasion as certain.",
  themes: ["Allah’s absolute oneness and uniqueness", "All creation’s dependence upon Allah", "Allah’s freedom from parentage and offspring", "The absence of any equal or comparison"],
  relatedSurahNumbers: [113, 114, 109],
};

export const AL_IKHLAS = validatePreparedSurah(alIkhlas);
