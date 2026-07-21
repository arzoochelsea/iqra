import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/audio-player";
import { AyahReader } from "@/components/ayah-reader";
import { ContentSection } from "@/components/section";
import { getPreparedSurah } from "@/data/prepared-surahs";
import { getSurahMetadata } from "@/data/surah-metadata";
import { SourceAttributionList } from "@/components/quran/source-attribution";
import { StandardSurahReader } from "@/components/quran/standard-surah-reader";
import { SurahHeader } from "@/components/quran/surah-header";

type Props = { params: Promise<{ surahNumber: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { surahNumber } = await params;
  const metadata = getSurahMetadata(Number(surahNumber));
  return metadata ? { title: metadata.nameEnglish, description: `${metadata.meaningEnglish} — Surah ${metadata.number} of the Qur’an.` } : { title: "Surah not found" };
}

export default async function SurahPage({ params }: Props) {
  const { surahNumber } = await params;
  const number = Number(surahNumber);
  if (!Number.isInteger(number) || number < 1 || number > 114) notFound();
  const metadata = getSurahMetadata(number);
  if (!metadata) notFound();
  const surah = getPreparedSurah(number);
  if (metadata.contentStatus !== "fully-prepared" || !surah) return <article><SurahHeader metadata={metadata} /><StandardSurahReader metadata={metadata} /></article>;

  return <article>
    <SurahHeader metadata={surah.metadata} eyebrow="The Sincerity of Faith" />
    <div className="shell narrow pb-20">
      <ContentSection title={`Listen to ${surah.metadata.nameEnglish}`} eyebrow="Full-Surah audio" tone="card"><AudioPlayer src={surah.audio.audioUrl} label={`Surah ${surah.metadata.nameEnglish}`} /><p className="mt-5 text-xs text-muted">Streamed from {surah.audio.sourceName} · Recitation by {surah.audio.reciterName}</p></ContentSection>
      <ContentSection title="About this Surah">{surah.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</ContentSection>
      <ContentSection title="Revelation context"><p>{surah.revelationContext}</p></ContentSection>
      <ContentSection title="Main themes"><ul>{surah.themes.map((theme) => <li key={theme}>{theme}</li>)}</ul></ContentSection>
      <ContentSection title="Ayah reader" eyebrow="Qur’an"><AyahReader ayahs={surah.ayahs} /><p className="mt-4 text-xs text-muted">Translation: Saheeh International · Transliteration: Al Quran Cloud English Transliteration</p></ContentSection>
      <ContentSection title="Trusted tafsir" eyebrow="Sourced commentary"><div className="tafsir-panel"><details open><summary className="focus-ring"><span>{surah.tafsir.title}</span><span aria-hidden="true">+</span></summary><div><p><strong>Verification status:</strong> {surah.tafsir.verificationStatus.replaceAll("-", " ")}</p><p>{surah.tafsir.summary}</p><p>{surah.tafsir.detailedExplanation}</p><a className="text-link focus-ring" href={surah.tafsir.sourceReference} target="_blank" rel="noreferrer">Read {surah.tafsir.sourceName} ↗</a></div></details></div></ContentSection>
      <ContentSection title="Reflection" eyebrow="Editorial reflection" tone="reflection"><p><strong>Practical takeaway:</strong> {surah.reflection.practicalTakeaway}</p><ol>{surah.reflection.reflectionQuestions.map((question) => <li key={question}>{question}</li>)}</ol><p className="reflection-disclaimer">{surah.reflection.disclaimer}</p></ContentSection>
      <ContentSection title="Sources"><SourceAttributionList sources={surah.sources} /></ContentSection>
      <ContentSection title="Related Surahs" eyebrow="Continue reading"><div className="related-grid">{surah.relatedSurahNumbers.map((relatedNumber) => { const related = getSurahMetadata(relatedNumber); return related ? <Link key={related.number} href={`/surahs/${related.number}`} className="related-card focus-ring"><span>Surah {related.number}</span><strong>{related.nameEnglish}</strong><small>{related.meaningEnglish}</small></Link> : null; })}</div></ContentSection>
    </div>
  </article>;
}
