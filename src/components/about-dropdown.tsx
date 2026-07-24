import Link from "next/link";

const aboutLinks = [
  { href: "/about", label: "About IQRA" },
  { href: "/why-iqra", label: "Why IQRA" },
  { href: "/about#our-mission", label: "Our Mission" },
  { href: "/about#contact", label: "Contact Us" },
];

export function AboutDropdown() {
  return <details className="about-dropdown">
    <summary className="focus-ring">About <span aria-hidden="true">⌄</span></summary>
    <div>{aboutLinks.map((item) => <Link key={item.href} href={item.href} className="focus-ring">{item.label}<span aria-hidden="true">→</span></Link>)}</div>
  </details>;
}
