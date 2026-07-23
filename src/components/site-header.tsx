"use client";

import { usePathname } from "next/navigation";
import { AppLogo } from "@/components/app-logo";
import { DesktopNavigation } from "@/components/app-navigation";
import { InstallIqra } from "@/components/pwa/install-iqra";

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return <header className="site-header">
    <div className="shell site-header-inner">
      <AppLogo compact />
      <div className="header-actions"><DesktopNavigation /><InstallIqra /></div>
    </div>
  </header>;
}
