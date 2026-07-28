import type { Metadata } from "next";
import Link from "next/link";
import { HomeHeader } from "@/components/home-header";
import { HomeIcon, type HomeIconName } from "@/components/home-icon";
import { PrayerDateCards } from "@/components/prayer-date-cards";

export const metadata: Metadata = {
  title: { absolute: "IQRA | Begin with Allah’s Word" },
  description: "Read, listen to, and reflect on the Qur’an with calm, purposeful tools.",
};

const companions: { title: string; description: string; href: string; icon: HomeIconName }[] = [
  { title: "Surah", description: "Read, listen and understand the words of Allah.", href: "/surahs", icon: "book" },
  { title: "Dua", description: "Authentic duas for every moment of your life.", href: "/duas", icon: "dua" },
  { title: "Qur’an Tracker", description: "Track your reading, set goals and stay consistent.", href: "/my-journey", icon: "calendar" },
  { title: "Daily Ayah", description: "A verse to reflect on and carry with you.", href: "/surahs/94#ayah-6", icon: "lantern" },
];

export default function Home() {
  return <div className="iqra-home">
    <div className="iqra-hero">
      <div className="iqra-hero-scene" role="img" aria-label="A grand mosque illuminated beneath a crescent moon at night" />
      <HomeHeader />
      <div className="iqra-home-shell iqra-hero-content">
        <section className="iqra-hero-copy" aria-labelledby="iqra-home-title">
          <p className="iqra-command arabic" lang="ar" dir="rtl">ٱقْرَأْ</p>
          <h1 id="iqra-home-title">Begin with Allah’s Word.<br />Live with <span>His Guidance.</span></h1>
          <div className="iqra-ornament" aria-hidden="true"><i /><span>✦</span><i /></div>
          <p className="iqra-hero-support">The Qur’an is more than words — it is a light for your heart and a guide for your life.</p>
          <Link href="/surahs" className="iqra-primary-cta focus-ring"><HomeIcon name="book" />Read the Qur’an</Link>
        </section>
        <PrayerDateCards />
      </div>
    </div>

    <section className="iqra-companion iqra-home-shell" aria-labelledby="companion-title">
      <header>
        <p>Daily practice</p>
        <h2 id="companion-title">Your Daily Companion</h2>
        <span>Essential tools to strengthen your connection with Allah.</span>
      </header>
      <div className="iqra-companion-grid">
        {companions.map((item) => <Link key={item.title} href={item.href} className="iqra-companion-card focus-ring">
          <span className="iqra-companion-icon"><HomeIcon name={item.icon} /></span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <b aria-hidden="true">→</b>
        </Link>)}
      </div>
    </section>

    <figure className="iqra-bottom-quote iqra-home-shell">
      <span aria-hidden="true">“</span>
      <blockquote>This is the Book about which there is no doubt, a guidance for those conscious of Allah.</blockquote>
      <figcaption>— Surah Al-Baqarah (2:2)</figcaption>
    </figure>
  </div>;
}
