"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon, type AppIconName } from "@/components/app-icon";

const navigation: { href: string; label: string; icon: AppIconName; aliases?: string[] }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/surahs", label: "Surahs", icon: "book" },
  { href: "/search", label: "Search", icon: "search" },
  { href: "/saved", label: "Saved", icon: "bookmark", aliases: ["/my-journey"] },
  { href: "/about", label: "More", icon: "more", aliases: ["/why-iqra", "/privacy", "/methodology"] },
];

function isActive(pathname: string, href: string, aliases: string[] = []) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href) || aliases.some((alias) => pathname.startsWith(alias));
}

export function DesktopNavigation() {
  const pathname = usePathname();
  return (
    <nav className="desktop-navigation" aria-label="Primary navigation">
      <ul>
        {navigation.slice(0, 4).map((item) => <li key={item.href}>
          <Link href={item.href} className="nav-link focus-ring" aria-current={isActive(pathname, item.href, item.aliases) ? "page" : undefined}>{item.label}</Link>
        </li>)}
        <li><Link href="/why-iqra" className="nav-link focus-ring" aria-current={pathname === "/why-iqra" ? "page" : undefined}>Why IQRA?</Link></li>
      </ul>
    </nav>
  );
}

export function MobileBottomNavigation() {
  const pathname = usePathname();
  return (
    <nav className="mobile-bottom-navigation" aria-label="App navigation">
      <ul>
        {navigation.map((item) => {
          const active = isActive(pathname, item.href, item.aliases);
          return <li key={item.href}><Link href={item.href} className="focus-ring" aria-current={active ? "page" : undefined}><AppIcon name={item.icon} /><span>{item.label}</span></Link></li>;
        })}
      </ul>
    </nav>
  );
}
