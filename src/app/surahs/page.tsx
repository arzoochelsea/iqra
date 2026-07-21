import type { Metadata } from "next";
import { SurahList } from "@/components/surah-list";

export const metadata: Metadata = { title: "Surahs", description: "Browse and search all 114 Surahs of the Qur’an." };

export default function SurahsPage() {
  return <div className="shell section-pad"><header className="page-header"><p className="eyebrow">The Qur’an</p><h1 className="page-title">Explore the Surahs</h1><p>Search the complete index by number, Arabic name, English name, or meaning. Al-Ikhlas is the first fully prepared study page.</p></header><SurahList /></div>;
}
