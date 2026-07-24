"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon, type AppIconName } from "@/components/app-icon";
import { AboutDropdown } from "@/components/about-dropdown";

const navigation: { href: string; label: string; icon: AppIconName; aliases?: string[] }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/surahs", label: "Surah", icon: "book", aliases: ["/search"] },
  { href: "/duas", label: "Dua", icon: "search" },
  { href: "/about", label: "About", icon: "more", aliases: ["/why-iqra"] },
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
        {navigation.slice(0, 3).map((item) => <li key={item.href}>
          <Link href={item.href} className="nav-link focus-ring" aria-current={isActive(pathname, item.href, item.aliases) ? "page" : undefined}>{item.label}</Link>
        </li>)}
        <li><AboutDropdown /></li>
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
