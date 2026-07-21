import { SURAH_METADATA } from "@/data/surah-metadata";
import type { JourneyRepository, LearningItem, LearningItemStatus, LearningList, QuranJourneyData } from "@/types/journey";

export const JOURNEY_STORAGE_KEY = "iqra-quran-journey-v1";
export const JOURNEY_DATA_VERSION = 1;
export const EMPTY_JOURNEY_DATA: QuranJourneyData = { version: JOURNEY_DATA_VERSION, lists: [] };

export class JourneyStorageError extends Error {}
export class JourneyValidationError extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function isNonEmptyString(value: unknown, max = 160): value is string { return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max; }
function isOptionalString(value: unknown, max = 300) { return value === undefined || (typeof value === "string" && value.length <= max); }
function isIsoDate(value: unknown): value is string { return typeof value === "string" && Number.isFinite(Date.parse(value)); }
function isStatus(value: unknown): value is LearningItemStatus { return value === "not-started" || value === "in-progress" || value === "completed"; }

function validateItem(value: unknown): LearningItem | null {
  if (!isRecord(value) || !isNonEmptyString(value.id, 100) || (value.type !== "surah" && value.type !== "ayah") || !Number.isInteger(value.surahNumber) || typeof value.surahNumber !== "number" || value.surahNumber < 1 || value.surahNumber > 114 || !isNonEmptyString(value.title) || !isOptionalString(value.arabicTitle, 160) || !Number.isInteger(value.order) || typeof value.order !== "number" || value.order < 0 || !isStatus(value.status) || !isIsoDate(value.addedAt) || !isIsoDate(value.updatedAt)) return null;
  const surah = SURAH_METADATA[value.surahNumber - 1];
  if (!surah || surah.number !== value.surahNumber) return null;
  if (value.type === "ayah" && (!Number.isInteger(value.ayahNumber) || typeof value.ayahNumber !== "number" || value.ayahNumber < 1 || value.ayahNumber > surah.ayahCount)) return null;
  if (value.type === "surah" && value.ayahNumber !== undefined) return null;
  return { id: value.id.trim(), type: value.type, surahNumber: value.surahNumber, ...(typeof value.ayahNumber === "number" ? { ayahNumber: value.ayahNumber } : {}), title: value.title.trim(), ...(typeof value.arabicTitle === "string" && value.arabicTitle.trim() ? { arabicTitle: value.arabicTitle.trim() } : {}), order: value.order, status: value.status, addedAt: value.addedAt, updatedAt: value.updatedAt };
}

function validateList(value: unknown, strict: boolean): { list: LearningList | null; issues: number } {
  if (!isRecord(value) || !isNonEmptyString(value.id, 100) || !isNonEmptyString(value.name, 100) || !isOptionalString(value.description) || !isIsoDate(value.createdAt) || !isIsoDate(value.updatedAt) || !Array.isArray(value.items)) return { list: null, issues: 1 };
  const ids = new Set<string>();
  const identities = new Set<string>();
  const items: LearningItem[] = [];
  let issues = 0;
  for (const rawItem of value.items) {
    const item = validateItem(rawItem);
    const identity = item ? `${item.type}:${item.surahNumber}:${item.ayahNumber ?? "all"}` : "";
    if (!item || ids.has(item.id) || identities.has(identity)) { issues += 1; continue; }
    ids.add(item.id); identities.add(identity); items.push(item);
  }
  items.sort((a, b) => a.order - b.order || a.addedAt.localeCompare(b.addedAt));
  const orderInvalid = items.some((item, index) => item.order !== index);
  const normalizedItems = items.map((item, order) => ({ ...item, order }));
  if (strict && (issues > 0 || orderInvalid)) return { list: null, issues: issues + 1 };
  return { list: { id: value.id.trim(), name: value.name.trim(), ...(typeof value.description === "string" && value.description.trim() ? { description: value.description.trim() } : {}), createdAt: value.createdAt, updatedAt: value.updatedAt, items: normalizedItems }, issues };
}

export function migrateJourneyData(value: unknown): unknown {
  if (!isRecord(value) || value.version !== JOURNEY_DATA_VERSION) throw new JourneyValidationError("This journey backup uses an unsupported data version.");
  return value;
}

export function validateJourneyData(value: unknown, strict = true): { data: QuranJourneyData; recoveredItems: number } {
  const migrated = migrateJourneyData(value);
  if (!isRecord(migrated) || !Array.isArray(migrated.lists)) throw new JourneyValidationError("Journey data has an invalid structure.");
  const ids = new Set<string>();
  const itemIds = new Set<string>();
  const lists: LearningList[] = [];
  let issues = 0;
  for (const rawList of migrated.lists) {
    const result = validateList(rawList, strict);
    if (!result.list || ids.has(result.list.id)) { issues += result.issues || 1; continue; }
    const uniqueItems = result.list.items.filter((item) => { if (itemIds.has(item.id)) { issues += 1; return false; } itemIds.add(item.id); return true; }).map((item, order) => ({ ...item, order }));
    ids.add(result.list.id); lists.push({ ...result.list, items: uniqueItems }); issues += result.issues;
  }
  if (strict && issues > 0) throw new JourneyValidationError("Journey data contains invalid or duplicate records.");
  return { data: { version: JOURNEY_DATA_VERSION, lists }, recoveredItems: issues };
}

export function parseJourneyImport(text: string): QuranJourneyData {
  let value: unknown;
  try { value = JSON.parse(text) as unknown; } catch { throw new JourneyValidationError("The selected file is not valid JSON."); }
  return validateJourneyData(value, true).data;
}

export class LocalJourneyRepository implements JourneyRepository {
  async load(): Promise<QuranJourneyData> {
    if (typeof window === "undefined") return EMPTY_JOURNEY_DATA;
    let text: string | null;
    try { text = window.localStorage.getItem(JOURNEY_STORAGE_KEY); } catch { throw new JourneyStorageError("Browser storage is unavailable. Your changes cannot be saved in this session."); }
    if (!text) return EMPTY_JOURNEY_DATA;
    let value: unknown;
    try { value = JSON.parse(text) as unknown; } catch { return EMPTY_JOURNEY_DATA; }
    try { return validateJourneyData(value, false).data; } catch { return EMPTY_JOURNEY_DATA; }
  }

  async save(data: QuranJourneyData): Promise<void> {
    if (typeof window === "undefined") throw new JourneyStorageError("Browser storage is unavailable.");
    const valid = validateJourneyData(data, true).data;
    try { window.localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(valid)); } catch { throw new JourneyStorageError("Browser storage is unavailable or full. Your latest change was not saved."); }
  }
}

export const quranJourneyStorage: JourneyRepository = new LocalJourneyRepository();
