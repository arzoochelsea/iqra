import { AL_IKHLAS } from "./112";
import type { PreparedSurah } from "@/types/quran";

const preparedSurahs = new Map<number, PreparedSurah>([[AL_IKHLAS.metadata.number, AL_IKHLAS]]);
export function getPreparedSurah(number: number) { return preparedSurahs.get(number); }
