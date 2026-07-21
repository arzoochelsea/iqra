import type { SurahMetadata } from "@/types/quran";
import { AddToJourney } from "@/components/journey/add-to-journey";

export function SurahHeader({ metadata, eyebrow }: { metadata: SurahMetadata; eyebrow?: string }) {
  return <header className="surah-hero"><div className="shell text-center">
    <p className="eyebrow">{eyebrow ?? `Surah ${metadata.number}`}</p>
    <h1 dir="rtl" lang="ar" className="arabic surah-arabic-title">{metadata.nameArabic.replace(/^سُورَةُ\s*/, "")}</h1>
    <p className="surah-english-title">{metadata.nameEnglish}</p>
    <p className="mt-2 text-muted">{metadata.meaningEnglish}</p>
    <div className="surah-divider" aria-hidden="true" />
    <dl className="surah-metadata">
      <div><dt className="sr-only">Surah number</dt><dd>Surah {metadata.number}</dd></div>
      <div><dt className="sr-only">Revelation place</dt><dd>{metadata.revelationType === "Meccan" ? "Makkan" : "Madinan"}</dd></div>
      <div><dt className="sr-only">Ayah count</dt><dd>{metadata.ayahCount} ayahs</dd></div>
    </dl>
    <div className="surah-journey-action"><AddToJourney item={{ type: "surah", surahNumber: metadata.number, title: `Surah ${metadata.nameEnglish}`, arabicTitle: metadata.nameArabic }} /></div>
  </div></header>;
}
