"use client";

import { useRef, useState } from "react";
import type { SurahRevelationMetadata } from "@/types/quran";
import { RevelationDetailsDialog } from "./revelation-details-dialog";
import { RevelationSummary } from "./revelation-summary";

export function RevelationJourney({ metadata }: { metadata: SurahRevelationMetadata }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  function closeDetails() {
    setDetailsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.querySelector<HTMLButtonElement>("button")?.focus());
  }
  return <section className="revelation-journey" aria-label="Revelation details">
    <div className="shell" ref={triggerRef}><RevelationSummary metadata={metadata} onExplore={() => setDetailsOpen(true)} /></div>
    {detailsOpen && <RevelationDetailsDialog metadata={metadata} onClose={closeDetails} />}
  </section>;
}
