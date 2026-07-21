"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { JourneyItemInput, LearningItemStatus, LearningList, QuranJourneyData } from "@/types/journey";
import { buildLearningItem, createJourneyId, itemIdentity, mergeJourneyData } from "@/lib/journey/model";
import { EMPTY_JOURNEY_DATA, quranJourneyStorage } from "@/lib/journey/storage";

type AddResult = "added" | "duplicate" | "list-not-found";
interface JourneyContextValue {
  data: QuranJourneyData;
  loading: boolean;
  storageError: string | null;
  message: string;
  createList(name: string, description?: string, initialItem?: JourneyItemInput): Promise<string>;
  renameList(listId: string, name: string, description?: string): Promise<void>;
  deleteList(listId: string): Promise<void>;
  addItem(listId: string, input: JourneyItemInput): Promise<AddResult>;
  removeItem(listId: string, itemId: string): Promise<void>;
  moveItem(listId: string, itemId: string, direction: -1 | 1): Promise<void>;
  setItemStatus(listId: string, itemId: string, status: LearningItemStatus): Promise<void>;
  replaceData(data: QuranJourneyData): Promise<void>;
  mergeData(data: QuranJourneyData): Promise<void>;
  announce(message: string): void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<QuranJourneyData>(EMPTY_JOURNEY_DATA);
  const [loading, setLoading] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => { quranJourneyStorage.load().then(setData).catch((error: unknown) => setStorageError(error instanceof Error ? error.message : "Browser storage is unavailable.")).finally(() => setLoading(false)); }, []);
  const commit = useCallback(async (next: QuranJourneyData) => { try { await quranJourneyStorage.save(next); setData(next); setStorageError(null); } catch (error) { const text = error instanceof Error ? error.message : "This change could not be saved."; setStorageError(text); throw error; } }, []);
  const createList = useCallback(async (name: string, description?: string, initialItem?: JourneyItemInput) => { const cleanName = name.trim(); if (!cleanName) throw new Error("Learning list name cannot be empty."); const now = new Date().toISOString(); const id = createJourneyId("list"); const list: LearningList = { id, name: cleanName, ...(description?.trim() ? { description: description.trim() } : {}), createdAt: now, updatedAt: now, items: initialItem ? [buildLearningItem(initialItem, 0)] : [] }; await commit({ ...data, lists: [...data.lists, list] }); setMessage(initialItem ? `Created “${cleanName}” and added the saved item.` : `Created “${cleanName}”.`); return id; }, [commit, data]);
  const renameList = useCallback(async (listId: string, name: string, description?: string) => { const cleanName = name.trim(); if (!cleanName) throw new Error("Learning list name cannot be empty."); const now = new Date().toISOString(); await commit({ ...data, lists: data.lists.map((list) => list.id === listId ? { ...list, name: cleanName, ...(description?.trim() ? { description: description.trim() } : { description: undefined }), updatedAt: now } : list) }); setMessage("Learning list updated."); }, [commit, data]);
  const deleteList = useCallback(async (listId: string) => { await commit({ ...data, lists: data.lists.filter((list) => list.id !== listId) }); setMessage("Learning list deleted."); }, [commit, data]);
  const addItem = useCallback(async (listId: string, input: JourneyItemInput): Promise<AddResult> => { const list = data.lists.find((candidate) => candidate.id === listId); if (!list) return "list-not-found"; if (list.items.some((item) => itemIdentity(item) === itemIdentity(input))) return "duplicate"; const now = new Date().toISOString(); const item = buildLearningItem(input, list.items.length); await commit({ ...data, lists: data.lists.map((candidate) => candidate.id === listId ? { ...candidate, items: [...candidate.items, item], updatedAt: now } : candidate) }); setMessage("Added to your learning list."); return "added"; }, [commit, data]);
  const removeItem = useCallback(async (listId: string, itemId: string) => { const now = new Date().toISOString(); await commit({ ...data, lists: data.lists.map((list) => list.id !== listId ? list : { ...list, updatedAt: now, items: list.items.filter((item) => item.id !== itemId).map((item, order) => ({ ...item, order })) }) }); setMessage("Saved item removed."); }, [commit, data]);
  const moveItem = useCallback(async (listId: string, itemId: string, direction: -1 | 1) => { const now = new Date().toISOString(); await commit({ ...data, lists: data.lists.map((list) => { if (list.id !== listId) return list; const items = list.items.toSorted((a, b) => a.order - b.order); const index = items.findIndex((item) => item.id === itemId); const target = index + direction; if (index < 0 || target < 0 || target >= items.length) return list; [items[index], items[target]] = [items[target], items[index]]; return { ...list, updatedAt: now, items: items.map((item, order) => ({ ...item, order, updatedAt: item.id === itemId ? now : item.updatedAt })) }; }) }); setMessage(direction < 0 ? "Item moved up." : "Item moved down."); }, [commit, data]);
  const setItemStatus = useCallback(async (listId: string, itemId: string, status: LearningItemStatus) => { const now = new Date().toISOString(); await commit({ ...data, lists: data.lists.map((list) => list.id !== listId ? list : { ...list, updatedAt: now, items: list.items.map((item) => item.id === itemId ? { ...item, status, updatedAt: now } : item) }) }); setMessage("Progress updated."); }, [commit, data]);
  const replaceData = useCallback(async (next: QuranJourneyData) => { await commit(next); setMessage("Journey replaced from backup."); }, [commit]);
  const mergeData = useCallback(async (incoming: QuranJourneyData) => { await commit(mergeJourneyData(data, incoming)); setMessage("Journey backup merged."); }, [commit, data]);
  const value = useMemo<JourneyContextValue>(() => ({ data, loading, storageError, message, createList, renameList, deleteList, addItem, removeItem, moveItem, setItemStatus, replaceData, mergeData, announce: setMessage }), [addItem, createList, data, deleteList, loading, mergeData, message, moveItem, removeItem, renameList, replaceData, setItemStatus, storageError]);
  return <JourneyContext.Provider value={value}>{children}<span className="sr-only" aria-live="polite">{message}</span></JourneyContext.Provider>;
}

export function useJourney() { const value = useContext(JourneyContext); if (!value) throw new Error("useJourney must be used within JourneyProvider."); return value; }
