import type { RevelationClassification } from "@/types/quran";

export function RevelationCompactTimeline({ classification }: { classification: RevelationClassification }) {
  return <div className={`revelation-compact-timeline compact-${classification}`} role="img" aria-label={`Broad revelation timeline: ${classification === "meccan" ? "Makkah, before the Hijrah" : "Madinah, after the Hijrah"} is highlighted`}>
    <span className="compact-period is-makkah"><i aria-hidden="true" />Makkah</span>
    <span className="compact-line" aria-hidden="true" />
    <span className="compact-period is-hijrah"><i aria-hidden="true" />Hijrah</span>
    <span className="compact-line" aria-hidden="true" />
    <span className="compact-period is-madinah"><i aria-hidden="true" />Madinah</span>
  </div>;
}
