import type { Metadata } from "next";
import Link from "next/link";
import { HomeHeader } from "@/components/home-header";
import { HomeIcon } from "@/components/home-icon";
import { PrayerDateCards } from "@/components/prayer-date-cards";

export const metadata: Metadata = {
  title: { absolute: "IQRA | Begin with Allah’s Word" },
  description: "Read, listen to, and reflect on the Qur’an with calm, purposeful tools.",
};

export default function Home() {
  return <div className="iqra-home">
    <div className="iqra-hero">
      <HomeHeader />
      <div className="iqra-home-shell iqra-hero-content">
        <section className="iqra-hero-copy" aria-labelledby="iqra-home-title">
          <p className="iqra-command arabic" lang="ar" dir="rtl">ٱقْرَأْ</p>
          <h1 id="iqra-home-title">Begin with Allah’s Word.<br />Live with <span>His Guidance.</span></h1>
          <div className="iqra-ornament" aria-hidden="true"><i /><span>✦</span><i /></div>
          <p className="iqra-hero-support">The Qur’an is more than words — it is a light for your heart and a guide for your life.</p>
          <Link href="/surahs" className="iqra-primary-cta focus-ring"><HomeIcon name="book" />Read the Qur’an</Link>
        </section>
        <div className="iqra-hero-scene" role="img" aria-label="The Grand Mosque in Makkah in warm morning light" />
        <PrayerDateCards />
      </div>
    </div>

    <figure className="iqra-bottom-quote iqra-home-shell">
      <span aria-hidden="true">“</span>
      <blockquote>This is the Book about which there is no doubt, a guidance for those conscious of Allah.</blockquote>
      <figcaption>— Surah Al-Baqarah (2:2)</figcaption>
    </figure>
  </div>;
}
