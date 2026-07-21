import Link from "next/link";

const links = [{ href: "/", label: "Home" }, { href: "/surahs", label: "Surahs" }, { href: "/revelation-journey", label: "Journey" }, { href: "/about", label: "About" }];

export function SiteHeader() {
  return <header className="border-b border-ink/10 bg-cream/95">
    <div className="shell flex h-18 items-center justify-between">
      <Link href="/" className="font-serif text-2xl font-semibold tracking-[.18em] text-green focus-ring">IQRA</Link>
      <nav aria-label="Primary navigation"><ul className="flex gap-1 sm:gap-4">{links.map((link) => <li key={link.href}><Link className="nav-link focus-ring" href={link.href}>{link.label}</Link></li>)}</ul></nav>
    </div>
  </header>;
}
