import Link from "next/link";
import type { SurahRevelationMetadata } from "@/types/quran";

export function RevelationSourceAttribution({ metadata }: { metadata: SurahRevelationMetadata }) {
  return <footer className="revelation-source"><p>Revelation chronology is based on the cited classification system. Some Surahs contain verses associated with different periods, and chronological arrangements may vary between sources.</p><dl><div><dt>Classification and order</dt><dd><a className="text-link focus-ring" href={metadata.sourceUrl} target="_blank" rel="noreferrer">{metadata.sourceName} ↗</a></dd></div><div><dt>Historical-period source</dt><dd>General dates only; no academic phase assigned</dd></div><div><dt>Last data review</dt><dd>{metadata.lastReviewed}</dd></div></dl><Link className="text-link focus-ring" href="/methodology/revelation-chronology">Read the chronology methodology →</Link></footer>;
}
