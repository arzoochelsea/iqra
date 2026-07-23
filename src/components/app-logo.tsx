import Image from "next/image";
import Link from "next/link";

export function AppLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`app-logo focus-ring${compact ? " app-logo-compact" : ""}`} aria-label="IQRA home">
      <Image src="/icons/icon-192.png" width={compact ? 38 : 64} height={compact ? 38 : 64} alt="" priority />
      <span><strong>IQRA</strong>{!compact && <small>Where every journey begins</small>}</span>
    </Link>
  );
}
