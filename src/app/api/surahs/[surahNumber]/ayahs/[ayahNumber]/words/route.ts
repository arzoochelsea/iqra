import { getSurahMetadata } from "@/data/surah-metadata";
import { QuranDataError } from "@/lib/quran/errors";
import { fetchAyahWords } from "@/lib/quran/words";

type Context = { params: Promise<{ surahNumber: string; ayahNumber: string }> };

export async function GET(_request: Request, { params }: Context) {
  const values = await params;
  const surahNumber = Number(values.surahNumber);
  const ayahNumber = Number(values.ayahNumber);
  const metadata = getSurahMetadata(surahNumber);
  if (!metadata || !Number.isInteger(ayahNumber) || ayahNumber < 1 || ayahNumber > metadata.ayahCount) return Response.json({ error: "Invalid Surah or ayah number." }, { status: 400 });

  try {
    const words = await fetchAyahWords(surahNumber, ayahNumber, metadata.ayahCount);
    return Response.json({ surahNumber, ayahNumber, words }, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400" } });
  } catch (error) {
    const code = error instanceof QuranDataError ? error.code : "unexpected";
    console.error("Word data proxy failed", { surahNumber, ayahNumber, code, message: error instanceof Error ? error.message : "Unknown error" });
    return Response.json({ error: "Verified word-by-word meanings could not be loaded safely." }, { status: 503 });
  }
}
