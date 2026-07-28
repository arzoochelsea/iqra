import type { SurahRevelationMetadata } from "@/types/quran";

export function RevelationSummary({ metadata, onExplore }: { metadata: SurahRevelationMetadata; onExplore: () => void }) {
  const place = metadata.classification === "meccan" ? "Makkah" : "Madinah";
  return <div className="revelation-summary-card">
    <div className="revelation-summary-meta">
      <span className={`revelation-badge badge-${metadata.classification}`}>Revealed in {place}</span>
      <span>Revelation order {metadata.traditionalOrder}</span>
    </div>
    <button className="revelation-explore focus-ring" type="button" onClick={onExplore}>Details <span aria-hidden="true">→</span></button>
  </div>;
}
