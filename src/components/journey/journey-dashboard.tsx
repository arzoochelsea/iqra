"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { getJourneyItemHref, getListProgress, getNextJourneyItem } from "@/lib/journey/model";
import { parseJourneyImport, validateJourneyData } from "@/lib/journey/storage";
import type { LearningList, QuranJourneyData } from "@/types/journey";
import { useJourney } from "./journey-provider";

export function JourneyDashboard() {
  const journey = useJourney();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imported, setImported] = useState<QuranJourneyData | null>(null);
  const [importMessage, setImportMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  if (journey.loading) return <div className="journey-loading" aria-live="polite"><span className="skeleton-line skeleton-medium" /><span className="skeleton-line" /><span>Loading your Qur’an journey…</span></div>;
  return <div className="journey-dashboard">
    {journey.storageError && <div className="error-card" role="alert"><span aria-hidden="true">!</span><div><h3>Browser storage unavailable</h3><p>{journey.storageError}</p></div></div>}
    <section className="journey-new-list" aria-labelledby="create-list-title"><div><p className="eyebrow">Begin gently</p><h2 id="create-list-title">Create a Learning List</h2></div><form onSubmit={(event) => { event.preventDefault(); void journey.createList(name, description).then(() => { setName(""); setDescription(""); }).catch((error: unknown) => journey.announce(error instanceof Error ? error.message : "The list could not be created.")); }}><label className="field-label" htmlFor="list-name">List name</label><input id="list-name" className="input focus-ring" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} required placeholder="Surahs to Memorize" /><label className="field-label" htmlFor="list-description">Short description <span>(optional)</span></label><textarea id="list-description" className="input focus-ring" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={300} rows={2} /><button className="button-primary focus-ring" type="submit" disabled={!!journey.storageError}>Create learning list</button></form></section>
    {journey.data.lists.length === 0 ? <div className="journey-empty"><p className="arabic" lang="ar" dir="rtl">اقْرَأْ</p><h2>Build a personal path through the Qur’an.</h2><p>Save a Surah or ayah to begin.</p><Link className="button-secondary focus-ring" href="/surahs">Browse Surahs</Link></div> : <div className="journey-lists">{journey.data.lists.map((list) => <LearningListCard key={list.id} list={list} />)}</div>}
    <section className="journey-backup" aria-labelledby="journey-backup-title"><div><p className="eyebrow">Local backup</p><h2 id="journey-backup-title">Export or import your journey</h2><p>Your learning lists and progress are stored only in this browser. They are not uploaded to IQRA.</p><p>Clearing browser data, using private browsing, or changing devices may remove your saved progress.</p></div><div className="journey-backup-actions"><button type="button" className="button-secondary focus-ring" onClick={() => exportJourney(journey.data)}>Export journey</button><label className="button-secondary focus-ring" htmlFor="journey-import">Import journey</label><input ref={fileRef} id="journey-import" className="sr-only" type="file" accept="application/json,.json" onChange={async (event) => { const file = event.target.files?.[0]; setImported(null); if (!file) return; if (file.size > 1_000_000) { setImportMessage("The backup is too large to be an IQRA journey file."); return; } try { const data = parseJourneyImport(await file.text()); setImported(data); setImportMessage(`Validated ${data.lists.length} learning list${data.lists.length === 1 ? "" : "s"}. Choose merge or replace.`); } catch (error) { setImportMessage(error instanceof Error ? error.message : "The backup could not be imported."); } finally { if (fileRef.current) fileRef.current.value = ""; } }} /></div>{imported && <div className="journey-import-choice"><button className="button-primary focus-ring" type="button" onClick={() => void journey.mergeData(imported).then(() => { setImported(null); setImportMessage("Journey backup merged successfully."); })}>Merge with current journey</button><button className="button-secondary focus-ring" type="button" onClick={() => { if (window.confirm("Replace all current learning lists and progress with this backup?")) void journey.replaceData(imported).then(() => { setImported(null); setImportMessage("Journey replaced successfully."); }); }}>Replace current journey</button></div>}<p className="journey-feedback" aria-live="polite">{importMessage}</p></section>
  </div>;
}

function LearningListCard({ list }: { list: LearningList }) {
  const journey = useJourney();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(list.name);
  const [description, setDescription] = useState(list.description ?? "");
  const progress = getListProgress(list);
  const next = getNextJourneyItem(list);
  return <section className="learning-list" aria-labelledby={`list-${list.id}`}><header><div><h2 id={`list-${list.id}`}>{list.name}</h2>{list.description && <p>{list.description}</p>}</div><div className="list-header-actions"><button type="button" className="quiet-action focus-ring" onClick={() => setEditing((value) => !value)} aria-expanded={editing}>Rename</button><button type="button" className="quiet-action danger-action focus-ring" onClick={() => { if (window.confirm(`Delete “${list.name}” and all of its saved items?`)) void journey.deleteList(list.id); }}>Delete</button></div></header>
    {editing && <form className="list-edit-form" onSubmit={(event) => { event.preventDefault(); void journey.renameList(list.id, name, description).then(() => setEditing(false)); }}><label className="field-label" htmlFor={`rename-${list.id}`}>List name</label><input id={`rename-${list.id}`} className="input focus-ring" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} required /><label className="field-label" htmlFor={`description-${list.id}`}>Description</label><textarea id={`description-${list.id}`} className="input focus-ring" rows={2} value={description} onChange={(event) => setDescription(event.target.value)} maxLength={300} /><div><button className="button-primary focus-ring" type="submit">Save changes</button><button className="button-secondary focus-ring" type="button" onClick={() => { setName(list.name); setDescription(list.description ?? ""); setEditing(false); }}>Cancel</button></div></form>}
    <div className="list-progress"><div><strong>{progress.completed} of {progress.total} completed</strong><span>{progress.percentage}%</span></div><div className="progress-track" role="progressbar" aria-label={`${list.name} completion`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress.percentage}><i style={{ width: `${progress.percentage}%` }} /></div>{next ? <Link href={getJourneyItemHref(next)} className="button-primary focus-ring">Continue journey</Link> : progress.total > 0 ? <p className="list-complete">This learning list is complete.</p> : <p className="list-complete">Add a Surah or ayah when you are ready.</p>}</div>
    {list.items.length > 0 && <ol className="saved-items">{list.items.toSorted((a, b) => a.order - b.order).map((item, index) => <li key={item.id}><div className="saved-item-main"><span className="number-badge">{index + 1}</span><div><Link className="text-link focus-ring" href={getJourneyItemHref(item)}>{item.title}</Link><small>{item.type === "ayah" ? `Ayah ${item.ayahNumber} · Surah ${item.surahNumber}` : `Complete Surah · ${item.surahNumber}`}</small></div></div><label><span className="sr-only">Status for {item.title}</span><select className="status-select focus-ring" value={item.status} onChange={(event) => void journey.setItemStatus(list.id, item.id, event.target.value as "not-started" | "in-progress" | "completed")}><option value="not-started">Not started</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></label><div className="saved-item-actions"><button type="button" className="quiet-action focus-ring" disabled={index === 0} onClick={() => void journey.moveItem(list.id, item.id, -1)}>Move up</button><button type="button" className="quiet-action focus-ring" disabled={index === list.items.length - 1} onClick={() => void journey.moveItem(list.id, item.id, 1)}>Move down</button><button type="button" className="quiet-action danger-action focus-ring" onClick={() => { if (window.confirm(`Remove “${item.title}” from this learning list?`)) void journey.removeItem(list.id, item.id); }}>Remove</button></div></li>)}</ol>}
  </section>;
}

function exportJourney(data: QuranJourneyData) {
  const valid = validateJourneyData(data, true).data;
  const blob = new Blob([JSON.stringify(valid, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = `iqra-journey-backup-${new Date().toISOString().slice(0, 10)}.json`; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
