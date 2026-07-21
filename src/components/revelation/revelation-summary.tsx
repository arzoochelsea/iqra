import type { SurahRevelationMetadata } from "@/types/quran";
import { RevelationCompactTimeline } from "./revelation-compact-timeline";

export function RevelationSummary({ metadata, onExplore }: { metadata: SurahRevelationMetadata; onExplore: () => void }) {
  const classification = metadata.classification === "meccan" ? "Meccan" : "Medinan";
  return <div className="revelation-summary-card">
    <div className="revelation-summary-heading"><h2 id="revelation-journey-title">Revelation Journey</h2><div className="revelation-summary-meta"><span className={`revelation-badge badge-${metadata.classification}`}>{classification}</span><span>Revelation order {metadata.traditionalOrder}</span></div></div>
    <p className="revelation-summary-copy">{metadata.summary}</p>
    {metadata.exceptions.length > 0 && <p className="revelation-summary-warning">Includes documented chronology notes</p>}
    <RevelationCompactTimeline classification={metadata.classification} />
    <div className="revelation-summary-actions"><a className="revelation-compact-source focus-ring" href={metadata.sourceUrl} target="_blank" rel="noreferrer">Source: {metadata.sourceName} ↗</a><button className="revelation-explore focus-ring" type="button" onClick={onExplore}>Explore revelation context <span aria-hidden="true">→</span></button></div>
  </div>;
}
