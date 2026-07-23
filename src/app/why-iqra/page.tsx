import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why IQRA?",
  description: "The first divine call and the meaning behind IQRA.",
};

export default function WhyIqraPage() {
  return (
    <section className="why-iqra why-iqra-screen" aria-labelledby="why-iqra-title">
      <div className="why-iqra-panel">
        <header className="why-iqra-heading">
          <p className="eyebrow">The First Divine Call</p>
          <h1 id="why-iqra-title"><span>It Began With One Word:</span><strong>IQRA</strong></h1>
        </header>
        <blockquote className="why-iqra-verse">
          <span aria-hidden="true">“</span>
          <p>Read in the name of your Lord who created.</p>
          <cite>Qur’an 96:1</cite>
        </blockquote>
        <div className="why-iqra-story">
          <p>In the stillness of the Cave of Hira, Allah began the final revelation with a command to seek knowledge.</p>
          <p>IQRA is more than reading words. It is a call to awaken the mind, reflect on creation, recognise the Creator, and move from darkness towards understanding.</p>
        </div>
        <div className="why-iqra-cta">
          <p>Your journey begins with <strong>IQRA.</strong></p>
          <Link href="/surahs/112" className="button-primary focus-ring">Begin the Journey</Link>
        </div>
      </div>
    </section>
  );
}
