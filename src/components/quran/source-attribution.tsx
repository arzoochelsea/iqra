import type { SourceAttribution } from "@/types/quran";

const labels: Record<SourceAttribution["contentType"], string> = { "quran-text": "Qur’an text", translation: "Translation", transliteration: "Full-ayah transliteration", "word-by-word": "Word-by-word learning", audio: "Audio and reciter", tafsir: "Tafsir source", editorial: "Editorial notice" };
export function SourceAttributionList({ sources }: { sources: SourceAttribution[] }) {
  return <ul className="source-list">{sources.map((source) => <li key={source.contentType}><span className="content-label">{labels[source.contentType]}</span><a className="text-link focus-ring" href={source.externalReference} target={source.externalReference.startsWith("http") ? "_blank" : undefined} rel={source.externalReference.startsWith("http") ? "noreferrer" : undefined}>{source.sourceName}{source.externalReference.startsWith("http") ? " ↗" : ""}</a><p>{source.sourceDescription}</p><p className="source-usage">{source.licenseOrUsageNote}</p></li>)}</ul>;
}
