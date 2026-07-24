import type { Metadata } from "next";
import Link from "next/link";
import { DuaLibrary } from "@/components/dua-library";

export const metadata: Metadata = {
  title: "Duas",
  description: "Learn sourced Qur’anic and Prophetic duas by category with Arabic, transliteration, translation, and word-by-word meaning.",
};

export default function DuasPage() {
  return (
    <div className="app-screen duas-screen">
      <header className="app-screen-header">
        <Link href="/" className="screen-back focus-ring" aria-label="Back to home">←</Link>
        <div><h1>Duas</h1><p>For every season of the heart</p></div>
      </header>
      <DuaLibrary />
    </div>
  );
}
