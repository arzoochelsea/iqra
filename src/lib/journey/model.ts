import type { JourneyItemInput, LearningItem, LearningList, QuranJourneyData } from "@/types/journey";
import { JOURNEY_DATA_VERSION, validateJourneyData } from "./storage";

export function createJourneyId(prefix: "list" | "item") {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${random}`;
}

export function itemIdentity(item: Pick<LearningItem, "type" | "surahNumber" | "ayahNumber">) { return `${item.type}:${item.surahNumber}:${item.ayahNumber ?? "all"}`; }
export function getListProgress(list: LearningList) { const completed = list.items.filter((item) => item.status === "completed").length; return { total: list.items.length, completed, percentage: list.items.length === 0 ? 0 : Math.round((completed / list.items.length) * 100) }; }
export function getNextJourneyItem(list: LearningList) { const ordered = list.items.toSorted((a, b) => a.order - b.order); return ordered.find((item) => item.status === "in-progress") ?? ordered.find((item) => item.status === "not-started") ?? null; }
export function getJourneyItemHref(item: Pick<LearningItem, "type" | "surahNumber" | "ayahNumber">) { return item.type === "ayah" ? `/surahs/${item.surahNumber}#ayah-${item.ayahNumber}` : `/surahs/${item.surahNumber}`; }

export function buildLearningItem(input: JourneyItemInput, order: number): LearningItem {
  const now = new Date().toISOString();
  return { id: createJourneyId("item"), ...input, order, status: "not-started", addedAt: now, updatedAt: now };
}

export function mergeJourneyData(current: QuranJourneyData, incoming: QuranJourneyData): QuranJourneyData {
  const lists = current.lists.map((list) => ({ ...list, items: [...list.items] }));
  const usedItemIds = new Set(lists.flatMap((list) => list.items.map((item) => item.id)));
  for (const imported of incoming.lists) {
    const existing = lists.find((list) => list.id === imported.id || list.name.toLocaleLowerCase() === imported.name.toLocaleLowerCase());
    if (!existing) { const items = imported.items.filter((item) => { if (usedItemIds.has(item.id)) return false; usedItemIds.add(item.id); return true; }).map((item, order) => ({ ...item, order })); lists.push({ ...imported, items }); continue; }
    const identities = new Set(existing.items.map(itemIdentity));
    const ids = new Set(existing.items.map((item) => item.id));
    for (const item of imported.items) {
      if (identities.has(itemIdentity(item)) || ids.has(item.id) || usedItemIds.has(item.id)) continue;
      existing.items.push({ ...item, order: existing.items.length });
      identities.add(itemIdentity(item)); ids.add(item.id); usedItemIds.add(item.id);
    }
    existing.updatedAt = new Date().toISOString();
  }
  return validateJourneyData({ version: JOURNEY_DATA_VERSION, lists }, true).data;
}
