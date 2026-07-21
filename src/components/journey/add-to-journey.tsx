"use client";

import { useEffect, useRef, useState } from "react";
import type { JourneyItemInput } from "@/types/journey";
import { useJourney } from "./journey-provider";

export function AddToJourney({ item, variant = "surah" }: { item: JourneyItemInput; variant?: "surah" | "ayah" }) {
  const { data, loading, storageError, addItem, createList } = useJourney();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [selectedList, setSelectedList] = useState("");
  const [newName, setNewName] = useState("");
  const [feedback, setFeedback] = useState("");
  function close() { setOpen(false); requestAnimationFrame(() => triggerRef.current?.focus()); }
  return <>
    <button ref={triggerRef} type="button" className={variant === "ayah" ? "save-ayah focus-ring" : "journey-add-surah focus-ring"} disabled={loading || !!storageError} onClick={() => { setSelectedList(data.lists[0]?.id ?? ""); setFeedback(""); setOpen(true); }}>{variant === "ayah" ? "Save ayah" : "Add to My Journey"}</button>
    {open && <JourneySaveDialog title={item.title} lists={data.lists.map(({ id, name }) => ({ id, name }))} selectedList={selectedList} setSelectedList={setSelectedList} newName={newName} setNewName={setNewName} feedback={feedback} onClose={close} onAdd={async () => { if (!selectedList) { setFeedback("Choose a learning list or create a new one."); return; } const result = await addItem(selectedList, item); setFeedback(result === "duplicate" ? "Already in this learning list." : result === "added" ? "Added to your learning list." : "That learning list is no longer available."); }} onCreate={async () => { if (!newName.trim()) { setFeedback("Enter a name for the new learning list."); return; } try { await createList(newName, undefined, item); setFeedback(`Created “${newName.trim()}” and added this item.`); setNewName(""); } catch (error) { setFeedback(error instanceof Error ? error.message : "The learning list could not be created."); } }} />}
  </>;
}

function JourneySaveDialog({ title, lists, selectedList, setSelectedList, newName, setNewName, feedback, onClose, onAdd, onCreate }: { title: string; lists: { id: string; name: string }[]; selectedList: string; setSelectedList(value: string): void; newName: string; setNewName(value: string): void; feedback: string; onClose(): void; onAdd(): Promise<void>; onCreate(): Promise<void> }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = dialogRef.current; if (!dialog) return; dialog.showModal(); const overflow = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = overflow; }; }, []);
  return <dialog ref={dialogRef} className="journey-dialog" aria-modal="true" aria-labelledby="journey-save-title" onCancel={(event) => { event.preventDefault(); dialogRef.current?.close(); }} onClose={onClose}>
    <div className="journey-dialog-content"><header><div><p className="eyebrow">Learning List</p><h2 id="journey-save-title">Save to My Journey</h2><p>{title}</p></div><button type="button" className="dialog-close focus-ring" aria-label="Close save dialog" onClick={() => dialogRef.current?.close()}>Close ×</button></header>
      {lists.length > 0 ? <form onSubmit={(event) => { event.preventDefault(); void onAdd(); }}><label className="field-label" htmlFor="journey-list-select">Choose a learning list</label><select id="journey-list-select" className="input focus-ring" value={selectedList} onChange={(event) => setSelectedList(event.target.value)}>{lists.map((list) => <option key={list.id} value={list.id}>{list.name}</option>)}</select><button className="button-primary focus-ring" type="submit">Add item</button></form> : <p className="journey-empty-inline">Create your first learning list to save this item.</p>}
      <form className="journey-create-inline" onSubmit={(event) => { event.preventDefault(); void onCreate(); }}><label className="field-label" htmlFor="new-journey-list">Create a new learning list</label><div><input id="new-journey-list" className="input focus-ring" value={newName} onChange={(event) => setNewName(event.target.value)} maxLength={100} placeholder="Daily Reading" /><button className="button-secondary focus-ring" type="submit">Create and add</button></div></form>
      <p className="journey-feedback" aria-live="polite">{feedback}</p>
    </div>
  </dialog>;
}
