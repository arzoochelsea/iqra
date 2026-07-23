import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  description: "IQRA is currently offline. Reconnect to continue exploring the Qur'an.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <section className="shell section-pad">
      <div className="offline-card">
        <p className="eyebrow">Connection unavailable</p>
        <h1 className="page-title">You&apos;re offline</h1>
        <p>Previously visited pages may still be available. Reconnect to load new Qur&apos;an content and audio.</p>
        <Link href="/" className="button-primary focus-ring">Try IQRA again</Link>
      </div>
    </section>
  );
}
