import Image from "next/image";
import Link from "next/link";

export function AppLogo({ compact = false }: { compact?: boolean }) {
  if (!compact) {
    return (
      <Link href="/" className="app-logo app-logo-full focus-ring" aria-label="IQRA home">
        <Image
          src="/branding/iqra-logo.png"
          width={1254}
          height={1254}
          alt="IQRA — Read, Reflect, Understand"
          priority
          sizes="(max-width: 767px) 168px, 210px"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="app-logo app-logo-compact focus-ring" aria-label="IQRA home">
      <Image src="/icons/iqra-icon-192.png" width={42} height={42} alt="IQRA — Read, Reflect, Understand" priority />
      <span><strong>IQRA</strong></span>
    </Link>
  );
}
