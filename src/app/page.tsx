import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InstallIqra } from "@/components/pwa/install-iqra";

export const metadata: Metadata = {
  title: { absolute: "IQRA | Read. Reflect. Understand." },
  description: "Explore the Qur’an with meaning, context, and thoughtful study.",
};

export default function Home() {
  return (
    <div className="app-home">
      <div className="sacred-backdrop sacred-backdrop-mecca" aria-hidden="true">
        <Image src="/visuals/mecca-dawn.png" alt="" fill priority sizes="(max-width: 767px) 100vw, 56vw" />
      </div>
      <div className="sacred-backdrop sacred-backdrop-medina" aria-hidden="true">
        <Image src="/visuals/medina-evening.png" alt="" fill sizes="(max-width: 767px) 100vw, 48vw" />
      </div>
      <section className="app-home-hero" aria-labelledby="home-title">
        <p className="app-reflection">Begin with the word that began the revelation.</p>
        <div>
          <h1 id="home-title">Read. Reflect.<br />Understand.</h1>
          <p>Explore the Qur’an with meaning, context, and thoughtful study.</p>
        </div>
        <div className="app-home-actions">
          <Link href="/surahs/112" className="button-primary focus-ring">Begin Reading</Link>
          <InstallIqra />
        </div>
      </section>

      <section id="why-iqra" className="home-why-iqra" aria-labelledby="home-why-title">
        <p className="home-why-label">The first divine call</p>
        <h2 id="home-why-title">Allah began the revelation with one word: <strong>IQRA</strong></h2>
        <p>In the stillness of the Cave of Hira, the first command revealed to Prophet Muhammad ﷺ was not to fear, wait, or remain silent. It was <strong>IQRA—Read.</strong></p>
        <div className="home-verse-card">
          <span aria-hidden="true">“</span>
          <p>Read in the name of your Lord who created.</p>
          <small>Qur’an 96:1</small>
        </div>
        <p>Allah chose reading as the beginning: a call for every heart to seek knowledge, understand His creation, recognise the Creator, and move from darkness towards light.</p>
        <p className="home-hira-closing">That first call still reaches us: read with sincerity, learn with humility, and grow closer to Allah.</p>
        <small className="home-hira-source">Based on Qur’an 96:1–5 and Sahih al-Bukhari 3.</small>
      </section>
    </div>
  );
}
