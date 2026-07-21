import type { Metadata } from "next";
import Link from "next/link";
import { GlobalRevelationTimeline } from "@/components/revelation/global-revelation-timeline";
import { REVELATION_METADATA } from "@/data/revelation-metadata";
import { SURAH_METADATA } from "@/data/surah-metadata";

export const metadata: Metadata = { title: "Revelation Journey", description: "Explore all 114 Surahs through a carefully sourced traditional revelation timeline." };

export default function RevelationJourneyPage() {
  const revelationBySurah = new Map(REVELATION_METADATA.map((item) => [item.surahNumber, item]));
  const items = SURAH_METADATA.flatMap((surah) => { const revelation = revelationBySurah.get(surah.number); return revelation ? [{ surah, revelation }] : []; });
  return <div className="shell section-pad"><header className="page-header"><p className="eyebrow">From Makkah to Madinah</p><h1 className="page-title">Revelation Journey</h1><p>Explore the Qur’an in Mushaf order or in Tanzil’s traditional revelation sequence. The latter concerns when a Surah’s opening ayahs were revealed; it is not an exact calendar and does not imply the whole Surah arrived at once.</p><Link className="text-link focus-ring" href="/methodology/revelation-chronology">How this chronology works →</Link></header><GlobalRevelationTimeline items={items} /><aside className="global-source-note"><p>Traditional classification and revelation order: <a className="text-link focus-ring" href="https://tanzil.net/docs/Revelation_Order" target="_blank" rel="noreferrer">Tanzil Revelation Order ↗</a>.</p><p>Chronological placement differs across classification systems. Documented exceptions shown here reproduce notes from the selected source and should not be read as universal scholarly consensus.</p></aside></div>;
}
