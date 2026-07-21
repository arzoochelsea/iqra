"use client";

import { useState } from "react";
import type { Ayah } from "@/types/quran";
import { AyahCard } from "./quran/ayah-card";

type Layer = "arabic" | "transliteration" | "translation";

export function AyahReader({ ayahs }: { ayahs: readonly Ayah[] }) {
  const [shown, setShown] = useState<Record<Layer, boolean>>({ arabic: true, transliteration: true, translation: true });
  const [active, setActive] = useState<number | null>(null);
  return <div>
    <fieldset className="mb-6 flex flex-wrap gap-2"><legend className="mb-2 w-full text-sm font-semibold text-muted">Display <span className="font-normal">(keep at least one visible)</span></legend>{(["arabic", "transliteration", "translation"] as Layer[]).map((layer) => {
      const isOnlyVisibleLayer = shown[layer] && Object.values(shown).filter(Boolean).length === 1;
      return <label key={layer} className="toggle"><input type="checkbox" checked={shown[layer]} disabled={isOnlyVisibleLayer} onChange={() => setShown((current) => ({ ...current, [layer]: !current[layer] }))} /><span>{layer[0].toUpperCase() + layer.slice(1)}</span></label>;
    })}</fieldset>
    <ol className="grid gap-4">{ayahs.map((ayah) => <AyahCard key={ayah.ayahNumberInSurah} ayah={ayah} shown={shown} active={active === ayah.ayahNumberInSurah} onPlay={() => setActive(ayah.ayahNumberInSurah)} />)}</ol>
  </div>;
}
