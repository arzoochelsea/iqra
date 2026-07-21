"use client";

import { useState } from "react";
import type { Ayah } from "@/types/quran";
import { AyahCard } from "./quran/ayah-card";

type Layer = "arabic" | "transliteration" | "translation";

export function AyahReader({ ayahs }: { ayahs: readonly Ayah[] }) {
  const [shown, setShown] = useState<Record<Layer, boolean>>({ arabic: true, transliteration: true, translation: true });
  const [showWordMeanings, setShowWordMeanings] = useState(true);
  const [active, setActive] = useState<number | null>(null);
  return <div>
    <fieldset className="mb-6 flex flex-wrap gap-2"><legend className="mb-2 w-full text-sm font-semibold text-muted">Display <span className="font-normal">(keep at least one visible)</span></legend>{(["arabic", "transliteration", "translation"] as Layer[]).map((layer) => {
      const isOnlyVisibleLayer = shown[layer] && Object.values(shown).filter(Boolean).length === 1;
      return <label key={layer} className="toggle"><input type="checkbox" checked={shown[layer]} disabled={isOnlyVisibleLayer} onChange={() => setShown((current) => ({ ...current, [layer]: !current[layer] }))} /><span>{layer[0].toUpperCase() + layer.slice(1)}</span></label>;
    })}</fieldset>
    <div className="word-global-controls" aria-label="Word meaning display control"><span>Word meanings</span><button type="button" className="word-control focus-ring" aria-pressed={showWordMeanings} onClick={() => setShowWordMeanings((value) => !value)}>{showWordMeanings ? "Hide word meanings" : "Show word meanings"}</button><small>This control changes opened word panels; it does not expand every ayah.</small></div>
    <ol className="grid gap-4">{ayahs.map((ayah) => <AyahCard key={ayah.ayahNumberInSurah} ayah={ayah} shown={shown} showWordMeanings={showWordMeanings} active={active === ayah.ayahNumberInSurah} onPlay={() => setActive(ayah.ayahNumberInSurah)} />)}</ol>
  </div>;
}
