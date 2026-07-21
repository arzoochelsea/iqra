import type { RevelationException } from "@/types/quran";

export function RevelationExceptions({ exceptions }: { exceptions: readonly RevelationException[] }) {
  if (exceptions.length === 0) return null;
  return <details className="revelation-details"><summary className="focus-ring">View documented exceptions <span aria-hidden="true">+</span></summary><div><p>This Surah’s primary classification is general; Tanzil records the following verse-level note{exceptions.length > 1 ? "s" : ""}:</p><ul>{exceptions.map((item) => <li key={`${item.ayahRange}-${item.context ?? "classification"}`}><strong>Ayah{item.ayahRange.includes("Entire") ? "" : "s"} {item.ayahRange}</strong>{item.classification ? ` — identified as ${item.classification === "meccan" ? "Meccan" : "Medinan"}` : ""}{item.location ? ` — ${item.location}` : ""}{item.context ? ` — ${item.context}` : ""}<small>Source: {item.sourceName}</small></li>)}</ul></div></details>;
}
