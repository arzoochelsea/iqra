import "server-only";
import { normalizeRemoteSurah } from "./normalize";
import { QuranDataError } from "./errors";
export { QuranDataError } from "./errors";

const API_BASE = "https://api.alquran.cloud/v1";
export async function fetchRemoteSurah(surahNumber: number) {
  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) throw new QuranDataError("Surah number must be between 1 and 114.", "mismatch");
  try {
    const response = await fetch(`${API_BASE}/surah/${surahNumber}/editions/quran-uthmani,en.sahih,en.transliteration,ar.alafasy`, { signal: AbortSignal.timeout(8_000), next: { revalidate: 86_400 } });
    if (!response.ok) throw new QuranDataError(`Qur’an provider returned ${response.status}.`, "network");
    return normalizeRemoteSurah(await response.json(), surahNumber);
  } catch (error) {
    if (error instanceof QuranDataError) throw error;
    throw new QuranDataError("Qur’an content could not be retrieved safely.", "network");
  }
}
