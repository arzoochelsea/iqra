"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { SurahRevelationMetadata } from "@/types/quran";
import { RevelationExceptions } from "./revelation-exceptions";
import { RevelationSourceAttribution } from "./revelation-source-attribution";

const RevelationLocationScene = dynamic(() => import("./revelation-location-scene").then((module) => module.RevelationLocationScene), { loading: () => <div className="revelation-scene-placeholder" aria-hidden="true" /> });
type StageId = "makkah" | "hijrah" | "madinah";
const stageCopy: Record<StageId, { title: string; period: string; copy: string }> = {
  makkah: { title: "Makkah period", period: "Before the Hijrah", copy: "The Meccan period precedes the Hijrah. Revelations from this period often emphasize faith, accountability, the Hereafter, earlier prophets, and moral awakening. These are general patterns, not rules for every verse." },
  hijrah: { title: "The Hijrah", period: "622 CE", copy: "The Hijrah from Makkah to Madinah in 622 CE is the main boundary used in the traditional Meccan–Medinan classification." },
  madinah: { title: "Madinah period", period: "After the Hijrah", copy: "The Medinan period follows the Hijrah. Revelations from this period include guidance for a developing Muslim community, worship, family life, law, social responsibility, and relations with other communities. These are general patterns." },
};

export function RevelationDetailsDialog({ metadata, onClose }: { metadata: SurahRevelationMetadata; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const defaultStage: StageId = metadata.classification === "meccan" ? "makkah" : "madinah";
  const [stage, setStage] = useState<StageId>(defaultStage);
  const current = stageCopy[stage];
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);
  function closeDialog() { dialogRef.current?.close(); }
  return <dialog ref={dialogRef} className="revelation-dialog" aria-modal="true" aria-labelledby="revelation-dialog-title" onClose={onClose} onCancel={(event) => { event.preventDefault(); closeDialog(); }} onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}>
    <div className={`revelation-dialog-panel revelation-${stage}`}>
      <header className="revelation-dialog-header"><div><p className="eyebrow">Traditional chronology</p><h2 id="revelation-dialog-title">Revelation Journey</h2></div><button type="button" className="revelation-dialog-close focus-ring" onClick={closeDialog} aria-label="Close revelation context">Close <span aria-hidden="true">×</span></button></header>
      <div className="revelation-atmosphere"><RevelationLocationScene location={stage === "madinah" ? "madinah" : "makkah"} /><p>Atmospheric illustration inspired by the historical setting; not a literal reconstruction.</p></div>
      <div className="revelation-content">
        <p className="revelation-summary">{metadata.summary}</p>
        {metadata.exceptions.length > 0 && <p className="revelation-caveat">This Surah has a general classification, although the cited source associates particular material with another period or setting.</p>}
        <nav aria-label="Revelation periods"><ol className={`revelation-timeline surah-zone-${defaultStage}`}>
          <li className="meccan-point"><span className="timeline-date">Around 610 CE</span><button type="button" className="focus-ring" aria-current={stage === "makkah" ? "step" : undefined} onClick={() => setStage("makkah")}><i aria-hidden="true" /><strong>Beginning</strong><small>Makkah</small>{defaultStage === "makkah" && <em>Your Surah’s broad Meccan zone</em>}</button></li>
          <li className="meccan-point"><span className="timeline-date" aria-hidden="true"> </span><button type="button" className="focus-ring" onClick={() => setStage("makkah")}><i aria-hidden="true" /><strong>Early Meccan</strong><small>Phase not assigned</small></button></li>
          <li className="meccan-point"><span className="timeline-date" aria-hidden="true"> </span><button type="button" className="focus-ring" onClick={() => setStage("makkah")}><i aria-hidden="true" /><strong>Middle Meccan</strong><small>Phase not assigned</small></button></li>
          <li className="meccan-point"><span className="timeline-date" aria-hidden="true"> </span><button type="button" className="focus-ring" onClick={() => setStage("makkah")}><i aria-hidden="true" /><strong>Late Meccan</strong><small>Phase not assigned</small></button></li>
          <li><span className="timeline-date">622 CE</span><button type="button" className="focus-ring" aria-current={stage === "hijrah" ? "step" : undefined} onClick={() => setStage("hijrah")}><i aria-hidden="true" /><strong>Hijrah</strong><small>Major transition</small></button></li>
          <li className="medinan-point"><span className="timeline-date" aria-hidden="true"> </span><button type="button" className="focus-ring" aria-current={stage === "madinah" ? "step" : undefined} onClick={() => setStage("madinah")}><i aria-hidden="true" /><strong>Medinan Period</strong><small>Post-Hijrah</small>{defaultStage === "madinah" && <em>Your Surah’s broad zone</em>}</button></li>
          <li><span className="timeline-date">Around 632 CE</span><button type="button" className="focus-ring" onClick={() => setStage("madinah")}><i aria-hidden="true" /><strong>Completion</strong><small>Of revelation</small></button></li>
        </ol></nav>
        <div className="revelation-stage-copy" aria-live="polite"><p className="eyebrow">{current.period}</p><h3>{current.title}</h3><p>{current.copy}</p></div>
        <details className="revelation-details"><summary className="focus-ring">Learn about Meccan and Medinan <span aria-hidden="true">+</span></summary><p>“Meccan” generally refers to revelation before the Hijrah, while “Medinan” generally refers to revelation after the Hijrah. This classification does not necessarily mean that every verse was physically revealed within that city.</p></details>
        <RevelationExceptions exceptions={metadata.exceptions} />
        <p className="revelation-precision">No early, middle, or late Meccan phase is assigned here because the selected traditional source does not provide that classification.</p>
        <RevelationSourceAttribution metadata={metadata} />
      </div>
    </div>
  </dialog>;
}
