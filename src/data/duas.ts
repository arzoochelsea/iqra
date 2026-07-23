export type DuaCategory = "Knowledge" | "Family" | "Forgiveness" | "Everyday";

export interface Dua {
  id: string;
  category: DuaCategory;
  title: string;
  arabic: string;
  translation: string;
  source: string;
  words: { arabic: string; meaning: string }[];
}

export const duas: Dua[] = [
  {
    id: "increase-knowledge",
    category: "Knowledge",
    title: "For beneficial knowledge",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    translation: "My Lord, increase me in knowledge.",
    source: "Qur’an 20:114",
    words: [
      { arabic: "رَبِّ", meaning: "My Lord" },
      { arabic: "زِدْنِي", meaning: "increase me" },
      { arabic: "عِلْمًا", meaning: "in knowledge" },
    ],
  },
  {
    id: "mercy-parents",
    category: "Family",
    title: "For one’s parents",
    arabic: "رَّبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا",
    translation: "My Lord, have mercy upon them as they raised me when I was small.",
    source: "Qur’an 17:24",
    words: [
      { arabic: "رَّبِّ", meaning: "My Lord" },
      { arabic: "ٱرْحَمْهُمَا", meaning: "have mercy on them both" },
      { arabic: "كَمَا", meaning: "as" },
      { arabic: "رَبَّيَانِى", meaning: "they raised me" },
      { arabic: "صَغِيرًا", meaning: "when small" },
    ],
  },
  {
    id: "forgiveness",
    category: "Forgiveness",
    title: "When seeking Allah’s forgiveness",
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ ٱلْخَاسِرِينَ",
    translation: "Our Lord, we have wronged ourselves. If You do not forgive us and have mercy upon us, we will surely be among the losers.",
    source: "Qur’an 7:23",
    words: [
      { arabic: "رَبَّنَا", meaning: "Our Lord" },
      { arabic: "ظَلَمْنَا", meaning: "we have wronged" },
      { arabic: "أَنفُسَنَا", meaning: "ourselves" },
      { arabic: "وَإِن", meaning: "and if" },
      { arabic: "لَّمْ", meaning: "not" },
      { arabic: "تَغْفِرْ", meaning: "You forgive" },
      { arabic: "لَنَا", meaning: "for us" },
      { arabic: "وَتَرْحَمْنَا", meaning: "and have mercy on us" },
      { arabic: "لَنَكُونَنَّ", meaning: "surely we will be" },
      { arabic: "مِنَ", meaning: "among" },
      { arabic: "ٱلْخَاسِرِينَ", meaning: "the losers" },
    ],
  },
  {
    id: "good-in-both-worlds",
    category: "Everyday",
    title: "For goodness in both worlds",
    arabic: "رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةً وَفِى ٱلْـَٔاخِرَةِ حَسَنَةً وَقِنَا عَذَابَ ٱلنَّارِ",
    translation: "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    source: "Qur’an 2:201",
    words: [
      { arabic: "رَبَّنَآ", meaning: "Our Lord" },
      { arabic: "ءَاتِنَا", meaning: "grant us" },
      { arabic: "فِى", meaning: "in" },
      { arabic: "ٱلدُّنْيَا", meaning: "this world" },
      { arabic: "حَسَنَةً", meaning: "good" },
      { arabic: "وَفِى", meaning: "and in" },
      { arabic: "ٱلْـَٔاخِرَةِ", meaning: "the Hereafter" },
      { arabic: "حَسَنَةً", meaning: "good" },
      { arabic: "وَقِنَا", meaning: "and protect us" },
      { arabic: "عَذَابَ", meaning: "from the punishment" },
      { arabic: "ٱلنَّارِ", meaning: "of the Fire" },
    ],
  },
];
