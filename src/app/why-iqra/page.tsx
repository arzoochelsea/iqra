import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why IQRA?",
  description: "Why the first word of revelation gives IQRA its purpose.",
};

export default function WhyIqraPage() {
  return <article className="why-iqra why-iqra-screen">
    <div className="why-iqra-panel">
      <header className="why-iqra-heading">
        <p className="eyebrow">The first divine call</p>
        <h1><span>It began with one word:</span><strong>IQRA</strong></h1>
      </header>

      <div className="why-iqra-intro">
        <p>The first word Allah revealed was not “fear,” “wait,” or “remain silent.”</p>
        <p>It was</p>
        <p>IQRA — Read.</p>
      </div>

      <blockquote className="why-iqra-verse">
        <span aria-hidden="true">“</span>
        <p className="arabic" lang="ar" dir="rtl">ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ</p>
        <p>“Read in the name of your Lord who created.”</p>
        <cite>Qur’an 96:1</cite>
      </blockquote>

      <div className="why-iqra-story">
        <p>In the stillness of the Cave of Hira, Allah began the final revelation with a command to seek knowledge.</p>
        <p>IQRA is more than reading words. It is a call to awaken the mind, reflect on creation, recognise the Creator, and move from darkness towards understanding.</p>
      </div>

      <section className="why-iqra-closing" aria-labelledby="why-iqra-closing-title">
        <h2 id="why-iqra-closing-title">That same call reaches us today.</h2>
        <ul>
          <li>Read with curiosity.</li>
          <li>Learn with humility.</li>
          <li>Reflect with sincerity.</li>
          <li>Seek knowledge that strengthens faith and benefits humanity.</li>
        </ul>
      </section>

      <div className="why-iqra-cta">
        <p>Your journey begins with <strong>IQRA.</strong></p>
        <Link href="/surahs" className="button-primary focus-ring">Begin Exploring</Link>
      </div>
    </div>
  </article>;
}
