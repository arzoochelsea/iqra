"use client";

import Link from "next/link";
import { ProfileLink } from "@/components/profile-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/surahs", label: "Surah" },
  { href: "/duas", label: "Dua" },
  { href: "/about", label: "About" },
];

export function HomeHeader() {
  return <header className="iqra-home-header iqra-home-shell">
    <Link href="/" className="iqra-home-logo focus-ring" aria-label="IQRA home"><span aria-hidden="true">۞</span>IQRA</Link>
    <nav className="iqra-desktop-nav" aria-label="Primary navigation">
      {links.map((link) => <Link key={link.href} href={link.href} className="focus-ring" aria-current={link.href === "/" ? "page" : undefined}>{link.label}</Link>)}
    </nav>
    <div className="iqra-header-actions">
      <details className="iqra-mobile-menu">
        <summary className="focus-ring" aria-label="Open navigation menu"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} className="focus-ring" aria-current={link.href === "/" ? "page" : undefined}>{link.label}</Link>)}</nav>
      </details>
      <ProfileLink />
    </div>
  </header>;
}
