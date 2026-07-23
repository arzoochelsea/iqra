import type { Metadata } from "next";
import Link from "next/link";
import { AppIcon, type AppIconName } from "@/components/app-icon";
import { AppLogo } from "@/components/app-logo";
import { InstallIqra } from "@/components/pwa/install-iqra";

export const metadata: Metadata = {
  title: { absolute: "IQRA | Read. Reflect. Understand." },
  description: "Explore the Qur’an with meaning, context, and thoughtful study.",
};

const actions: { href: string; title: string; copy: string; icon: AppIconName }[] = [
  { href: "/surahs/112", title: "Continue Reading", copy: "Return to Al-Ikhlas", icon: "continue" },
  { href: "/surahs", title: "Explore Surahs", copy: "Browse all 114 chapters", icon: "book" },
  { href: "/search", title: "Search the Qur’an", copy: "Find a Surah", icon: "search" },
  { href: "/saved", title: "Saved Ayahs", copy: "Open your learning lists", icon: "bookmark" },
];

export default function Home() {
  return (
    <div className="app-home">
      <section className="app-home-hero" aria-labelledby="home-title">
        <AppLogo />
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

      <section className="app-action-section" aria-labelledby="home-actions-title">
        <h2 id="home-actions-title">What would you like to do?</h2>
        <div className="app-action-grid">
          {actions.map((action) => <Link key={action.href} href={action.href} className="app-action-card focus-ring"><span className="app-action-icon"><AppIcon name={action.icon} /></span><span><strong>{action.title}</strong><small>{action.copy}</small></span><span className="app-action-arrow" aria-hidden="true">→</span></Link>)}
        </div>
      </section>
    </div>
  );
}
