import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutDropdown } from "@/components/about-dropdown";
import { ProfileLink } from "@/components/profile-link";
import { PrayerDateCards } from "@/components/prayer-date-cards";

export const metadata: Metadata = {
  title: { absolute: "IQRA | Read. Reflect. Understand." },
  description: "Reconnect with the Qur’an, one ayah at a time.",
};

export default function Home() {
  return <div className="focused-home">
    <header className="focused-home-header">
      <Link href="/" className="focused-wordmark focus-ring" aria-label="IQRA home">IQRA</Link>
      <nav aria-label="Primary navigation">
        <Link href="/" className="focus-ring" aria-current="page">Home</Link>
        <Link href="/surahs" className="focus-ring">Surah</Link>
        <Link href="/duas" className="focus-ring">Dua</Link>
        <AboutDropdown />
      </nav>
      <ProfileLink />
    </header>

    <div className="focused-home-body">
      <section className="focused-hero-copy" aria-labelledby="focused-home-title">
        <p className="eyebrow">Peace be upon you</p>
        <h1 id="focused-home-title">Assalamu Alaikum</h1>
        <p className="focused-iqra-message">Allah chose the word <strong>IQRA</strong> to begin the revelation — so begin your journey by reading too.</p>
        <p className="focused-support">Read in the name of your Lord and reconnect with the Qur’an, one ayah at a time.</p>

        <PrayerDateCards />
      </section>

      <figure className="focused-hero-visual">
        <Image src="/visuals/mecca-dawn.png" alt="The Kaaba in Makkah in peaceful morning light" fill priority sizes="(max-width: 767px) 100vw, 48vw" />
        <figcaption><span aria-hidden="true">✦</span> Begin with remembrance</figcaption>
      </figure>
    </div>

    <section className="ayah-of-day" aria-labelledby="ayah-of-day-title">
      <div className="ayah-book-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48"><path d="M5 11c8-2 14 1 19 6v23c-5-5-11-8-19-6zM43 11c-8-2-14 1-19 6v23c5-5 11-8 19-6z" /><path d="M24 17v23" /></svg>
      </div>
      <div className="ayah-day-copy">
        <p>AYAH OF THE DAY</p>
        <h2 id="ayah-of-day-title" className="arabic" lang="ar" dir="rtl">إِنَّ مَعَ الْعُسْرِ يُسْرًا</h2>
        <blockquote>“Indeed, with hardship comes ease.”</blockquote>
        <cite>Surah Ash-Sharh (94:6)</cite>
      </div>
    </section>
  </div>;
}
