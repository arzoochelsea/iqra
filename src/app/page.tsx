import Link from "next/link";
import type { Metadata } from "next";
import { SurahList } from "@/components/surah-list";

export const metadata: Metadata = {
  title: { absolute: "IQRA | Where Every Journey Begins" },
  description: "Read, listen to, understand, and reflect on the Qur’an through a calm and accessible learning experience.",
};

const benefits = [
  ["Listen", "Stream clear recitation from one trusted reciter."],
  ["Read", "See Arabic, transliteration, and translation together."],
  ["Understand", "Learn context and themes with clear attribution."],
  ["Reflect", "Pause with practical prompts for thoughtful study."],
];

export default function Home() {
  return <>
    <section className="hero"><div className="shell hero-grid"><div><p className="eyebrow">Where Every Journey Begins</p><h1 className="display-title">IQRA</h1><blockquote className="verse"><p>“Read in the name of your Lord who created.”</p><cite>— Qur’an 96:1</cite></blockquote><p className="max-w-2xl text-lg leading-8 text-muted">Listen, understand, and learn the Qur’an through authentic recitation, clear transliteration, trusted translation, and meaningful tafsir.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/surahs" className="button-primary focus-ring">Explore Surahs</Link><Link href="/surahs/112" className="button-secondary focus-ring">Start with Al-Ikhlas</Link></div></div><div className="hero-mark" aria-hidden="true"><span>اقْرَأْ</span><small>Begin with reading</small></div></div></section>
    <section
      className="why-iqra"
      aria-labelledby="why-iqra-title"
      data-home-section="why-iqra"
    >
      <div className="shell why-iqra-grid">
        <div className="why-iqra-name" aria-label="IQRA, written in Arabic and English">
          <span dir="rtl" lang="ar" className="arabic">اقْرَأْ</span>
          <span>IQRA</span>
        </div>
        <div>
          <p className="eyebrow">The meaning behind the name</p>
          <h2 id="why-iqra-title" className="section-title">Why IQRA?</h2>
          <div className="why-iqra-copy">
            <p>“IQRA” (اقرأ) was the first word revealed by Allah to Prophet Muhammad ﷺ.</p>
            <blockquote>
              <p>“Read in the name of your Lord who created.”</p>
              <cite>— Qur’an 96:1</cite>
            </blockquote>
            <p>IQRA means “Read” or “Recite.” It symbolizes the beginning of the Qur’anic revelation and the pursuit of knowledge with attentiveness, humility, and purpose.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="shell section-pad"><div className="section-heading"><div><p className="eyebrow">Explore</p><h2 className="section-title">Find a Surah</h2></div><Link href="/surahs" className="text-link focus-ring">View all 114</Link></div><SurahList preview /></section>
    <section className="border-y border-ink/10 bg-paper"><div className="shell section-pad"><p className="eyebrow">A simple companion</p><h2 className="section-title">How IQRA helps</h2><div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(([title, copy], index) => <article className="bg-cream p-6" key={title}><span className="text-xs font-bold text-gold">0{index + 1}</span><h3 className="mt-5 font-serif text-2xl text-green">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></article>)}</div></div></section>
  </>;
}
