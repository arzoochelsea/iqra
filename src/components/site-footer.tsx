import Link from "next/link";
import { AppLogo } from "@/components/app-logo";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/about#sources-and-methodology", label: "Sources" },
  { href: "/methodology/revelation-chronology", label: "Revelation methodology" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto">
      <div className="shell">
        <div className="footer-main">
          <div>
            <AppLogo compact />
            <p>Created and developed by Arzoo.</p>
          </div>
          <nav aria-label="Footer navigation">
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}><Link className="focus-ring" href={link.href}>{link.label}</Link></li>
              ))}
              <li><a className="focus-ring" href="https://github.com/arzoochelsea/iqra" target="_blank" rel="noreferrer">GitHub ↗</a></li>
            </ul>
          </nav>
        </div>
        <p className="footer-source-note">Qur’an text and commentary remain attributed to their sources.</p>
      </div>
    </footer>
  );
}
