import type { Metadata } from "next";
import Link from "next/link";
import { SurahList } from "@/components/surah-list";

export const metadata: Metadata = { title: "Surahs", description: "Browse and search all 114 Surahs of the Qur’an." };

export default async function SurahsPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const query = (await searchParams).q;
  return <div className="app-screen"><header className="app-screen-header"><Link href="/" className="screen-back focus-ring" aria-label="Back to home">←</Link><div><h1>Explore Surahs</h1><p>114 chapters of the Qur’an</p></div></header><SurahList showFilters initialSearch={typeof query === "string" ? query : ""} /></div>;
}
