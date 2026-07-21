export type LearningItemStatus = "not-started" | "in-progress" | "completed";
export type LearningItemType = "surah" | "ayah";

export interface LearningItem {
  id: string;
  type: LearningItemType;
  surahNumber: number;
  ayahNumber?: number;
  title: string;
  arabicTitle?: string;
  order: number;
  status: LearningItemStatus;
  addedAt: string;
  updatedAt: string;
}

export interface LearningList {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  items: LearningItem[];
}

export interface QuranJourneyData {
  version: number;
  lists: LearningList[];
}

export interface JourneyRepository {
  load(): Promise<QuranJourneyData>;
  save(data: QuranJourneyData): Promise<void>;
}

export interface JourneyItemInput {
  type: LearningItemType;
  surahNumber: number;
  ayahNumber?: number;
  title: string;
  arabicTitle?: string;
}
