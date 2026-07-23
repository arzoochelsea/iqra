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
          <Link href="/why-iqra" className="app-text-button focus-ring">Why IQRA? <span aria-hidden="true">→</span></Link>
          <InstallIqra />
        </div>
      </section>

      <section className="home-why-iqra" aria-labelledby="home-why-title">
        <p className="home-why-label">The first divine call</p>
        <h2 id="home-why-title">It began with one word: <strong>IQRA</strong></h2>
        <p>The first word Allah revealed was a call to read—to awaken the mind, seek knowledge, and draw nearer to the Creator.</p>
        <div className="home-verse-card">
          <span aria-hidden="true">“</span>
          <p>Read in the name of your Lord who created.</p>
          <small>Qur’an 96:1</small>
        </div>
        <p>That same call reaches us today: read with curiosity, learn with humility, and reflect with sincerity.</p>
        <Link href="/why-iqra" className="app-text-button focus-ring">Discover why IQRA matters <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  );
}
