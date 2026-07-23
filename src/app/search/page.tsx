import type { Metadata } from "next";
import Link from "next/link";
import { SurahList } from "@/components/surah-list";

export const metadata: Metadata = {
  title: "Search the Qur’an",
  description: "Search the 114 Surahs of the Qur’an.",
};

export default function SearchPage() {
  return <div className="app-screen app-search-screen"><header className="app-screen-header"><Link href="/" className="screen-back focus-ring" aria-label="Back to home">←</Link><div><h1>Search the Qur’an</h1><p>Find the Surah you need</p></div></header><SurahList searchId="quran-search" /></div>;
}
