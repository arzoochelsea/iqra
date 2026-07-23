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
          <Link href="#why-iqra" className="app-text-button focus-ring">The story of Hira <span aria-hidden="true">↓</span></Link>
          <InstallIqra />
        </div>
      </section>

      <section id="why-iqra" className="home-why-iqra" aria-labelledby="home-why-title">
        <p className="home-why-label">The first divine call</p>
        <h2 id="home-why-title">It began with one word: <strong>IQRA</strong></h2>
        <p>Before revelation, Prophet Muhammad ﷺ was drawn to the quiet of the Cave of Hira. Above Makkah, away from its noise and idols, he spent nights in worship and reflection, seeking truth and turning his heart towards Allah.</p>
        <div className="home-verse-card">
          <span aria-hidden="true">“</span>
          <p>Read in the name of your Lord who created.</p>
          <small>Qur’an 96:1</small>
        </div>
        <p>There, Jibril came with the command “IQRA.” The Prophet ﷺ returned trembling, and Khadijah held him with faith and tenderness. She reminded him that Allah would never disgrace one who spoke truth, cared for family, helped those in need, welcomed guests, and stood beside people in hardship.</p>
        <p>Hira teaches us that closeness to Allah can begin in stillness: with a searching heart, an honest question, and the humility to receive guidance. IQRA is not only a command to read words—it is an invitation to recognise Allah, live what we learn, and let knowledge make us more merciful.</p>
        <p className="home-hira-closing">That call still reaches us today. Read with sincerity. Learn with humility. Return to Allah with hope.</p>
        <small className="home-hira-source">Based on Qur’an 96:1–5 and Sahih al-Bukhari 3.</small>
      </section>
    </div>
  );
}
