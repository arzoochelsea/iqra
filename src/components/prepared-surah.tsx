import Link from "next/link";
import { getSurahMetadata } from "@/data/surah-metadata";

export function PreparedSurah({ number }: { number: number }) {
  const surah = getSurahMetadata(number);
  if (!surah) return null;

  return <div className="shell narrow section-pad"><div className="prepared-state">
    <p className="eyebrow">Surah {surah.number} · {surah.revelationType === "Meccan" ? "Makkan" : "Madinan"} · {surah.ayahCount} ayahs</p><p dir="rtl" lang="ar" className="arabic mt-5 text-4xl leading-relaxed text-green">{surah.nameArabic.replace(/^سُورَةُ\s*/, "")}</p><p className="mt-3 font-serif text-3xl text-green">{surah.nameEnglish}</p><p className="mt-2 text-muted">{surah.meaningEnglish}</p>
    <p className="eyebrow mt-10">Coming Soon</p><h1 className="mt-3 font-serif text-4xl text-green">This Surah is being carefully prepared</h1>
    <p>This Surah is currently being prepared using authenticated Qur’anic text, trusted translations, reliable recitation, and clearly attributed scholarly sources.</p>
    <p>Our goal is to ensure every Surah page meets the same standard of authenticity and clarity.</p>
    <Link href="/surahs" className="button-primary mt-8 focus-ring">← Return to Surahs</Link>
  </div></div>;
}
