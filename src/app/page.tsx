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
      id="why-iqra"
      className="why-iqra"
      aria-labelledby="why-iqra-title"
      data-home-section="why-iqra"
    >
      <div className="why-iqra-panel">
        <header className="why-iqra-heading">
          <p className="eyebrow">The First Divine Call</p>
          <h2 id="why-iqra-title">
            <span>It Began With One Word:</span>
            <strong>IQRA</strong>
          </h2>
        </header>

        <div className="why-iqra-intro">
          <p>The first word Allah revealed was not “fear,” “wait,” or “remain silent.”</p>
          <p>It was:</p>
          <p><strong>IQRA — Read.</strong></p>
        </div>

        <blockquote className="why-iqra-verse">
          <span aria-hidden="true">“</span>
          <p>Read in the name of your Lord who created.</p>
          <cite>Qur’an 96:1</cite>
        </blockquote>

        <div className="why-iqra-story">
          <p>In the stillness of the Cave of Hira, Allah began the final revelation with a command to seek knowledge.</p>
          <p>IQRA is more than reading words. It is a call to awaken the mind, reflect on creation, recognise the Creator, and move from darkness towards understanding.</p>
        </div>

        <div className="why-iqra-closing">
          <h3>That same call reaches us today.</h3>
          <ul>
            <li>Read with curiosity.</li>
            <li>Learn with humility.</li>
            <li>Reflect with sincerity.</li>
            <li>Seek knowledge with purpose.</li>
          </ul>
        </div>

        <div className="why-iqra-cta">
          <p>Your journey begins with <strong>IQRA.</strong></p>
          <Link href="#find-a-surah" className="button-primary focus-ring">Begin Exploring</Link>
        </div>
      </div>
    </section>
    <section id="find-a-surah" className="shell section-pad">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Explore</p>
          <h2 className="section-title">Find a Surah</h2>
        </div>
        <Link href="/surahs" className="text-link focus-ring">View all 114</Link>
      </div>
      <SurahList preview />
    </section>
    <section className="border-y border-ink/10 bg-paper"><div className="shell section-pad"><p className="eyebrow">A simple companion</p><h2 className="section-title">How IQRA helps</h2><div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(([title, copy], index) => <article className="bg-cream p-6" key={title}><span className="text-xs font-bold text-gold">0{index + 1}</span><h3 className="mt-5 font-serif text-2xl text-green">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></article>)}</div></div></section>
  </>;
}
