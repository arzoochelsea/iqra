import type { Metadata } from "next";
import Link from "next/link";
import { DuaLibrary } from "@/components/dua-library";

export const metadata: Metadata = {
  title: "Qur’anic Duas",
  description: "Search Qur’anic duas by category with translation and word-by-word meaning.",
};

export default function DuasPage() {
  return (
    <div className="app-screen duas-screen">
      <header className="app-screen-header">
        <Link href="/" className="screen-back focus-ring" aria-label="Back to home">←</Link>
        <div><h1>Qur’anic Duas</h1><p>Call upon Allah with understanding</p></div>
      </header>
      <DuaLibrary />
    </div>
  );
}
