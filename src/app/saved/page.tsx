import type { Metadata } from "next";
import Link from "next/link";
import { JourneyDashboard } from "@/components/journey/journey-dashboard";

export const metadata: Metadata = {
  title: "Saved Ayahs",
  description: "Open saved Surahs, ayahs, and local IQRA learning lists.",
};

export default function SavedPage() {
  return <div className="app-screen app-saved-screen"><header className="app-screen-header"><Link href="/" className="screen-back focus-ring" aria-label="Back to home">←</Link><div><h1>Saved Ayahs</h1><p>Your learning journey, stored on this device</p></div></header><JourneyDashboard /></div>;
}
