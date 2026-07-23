import type { Metadata } from "next";
import Link from "next/link";
import { ResetWelcome } from "@/components/reset-welcome";

export const metadata: Metadata = { title: "More", description: "More IQRA learning, settings, sources, and project information." };

const links = [
  { href: "/duas", title: "Qur’anic Duas", description: "Arabic, transliteration, translation, and word meanings" },
  { href: "/revelation-journey", title: "Revelation Journey", description: "Explore a sourced traditional chronology" },
  { href: "/about", title: "Why IQRA and About", description: "The purpose and story behind IQRA" },
  { href: "/about#sources-and-methodology", title: "Sources", description: "Review content methodology and attribution" },
  { href: "/privacy", title: "Privacy", description: "How your local learning data is handled" },
];

export default function MorePage() {
  return <div className="app-screen more-screen"><header className="app-screen-header"><Link href="/" className="screen-back focus-ring" aria-label="Back to home">←</Link><div><h1>More</h1><p>Learning, sources, and settings</p></div></header>
    <nav className="more-links" aria-label="More IQRA pages">{links.map((item) => <Link key={item.href} href={item.href} className="focus-ring"><span><strong>{item.title}</strong><small>{item.description}</small></span><b aria-hidden="true">→</b></Link>)}</nav>
    <section className="more-settings" aria-labelledby="more-settings-title"><p className="eyebrow">Settings</p><h2 id="more-settings-title">Welcome experience</h2><p>Replay the full first-visit introduction on your next return to the homepage.</p><ResetWelcome /></section>
  </div>;
}
