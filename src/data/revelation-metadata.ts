import { SURAH_METADATA } from "@/data/surah-metadata";
import type { RevelationException, SurahRevelationMetadata } from "@/types/quran";

export const REVELATION_SOURCE_URL = "https://tanzil.net/docs/Revelation_Order";
export const REVELATION_REVIEW_DATE = "21 July 2026";

// Tanzil's traditional order. The position concerns the opening ayahs of a Surah,
// not a claim that the complete Surah was revealed together at that point.
const traditionalOrder = [
  96,68,73,74,1,111,81,87,92,89,93,94,103,100,108,102,107,109,105,113,114,112,
  53,80,97,91,85,95,106,101,75,104,77,50,90,86,54,38,7,72,36,25,35,19,20,56,
  26,27,28,17,10,11,12,15,6,37,31,34,39,40,41,42,43,44,45,46,51,88,18,16,
  71,14,21,23,32,52,67,69,70,78,79,82,84,30,29,83,2,8,3,33,60,4,99,57,47,
  13,55,76,65,98,59,24,22,63,58,49,66,64,61,62,48,5,9,110,
] as const;

type ExceptionSeed = Omit<RevelationException, "sourceName">;
const exceptionSeeds: Readonly<Record<number, readonly ExceptionSeed[]>> = {
  2:[{ayahRange:"281",location:"Mina",context:"Associated with the Farewell Pilgrimage."}],
  5:[{ayahRange:"3",location:"Arafat",context:"Associated with the Farewell Pilgrimage."}],
  6:[{ayahRange:"20, 23, 91, 93, 114, 151–153",classification:"medinan"}],
  7:[{ayahRange:"163–170",classification:"medinan"}], 8:[{ayahRange:"30–36",classification:"meccan",location:"Makkah"}],
  9:[{ayahRange:"128–129",classification:"meccan",location:"Makkah"}], 10:[{ayahRange:"40, 94–96",classification:"medinan"}],
  11:[{ayahRange:"12, 17, 114",classification:"medinan"}], 12:[{ayahRange:"1–3, 7",classification:"medinan"}],
  14:[{ayahRange:"28–29",classification:"medinan"}], 15:[{ayahRange:"87",classification:"medinan"}],
  16:[{ayahRange:"126–128",classification:"medinan"}], 17:[{ayahRange:"26, 32–33, 57, 73–80",classification:"medinan"}],
  18:[{ayahRange:"28, 83–101",classification:"medinan"}], 19:[{ayahRange:"58, 71",classification:"medinan"}],
  20:[{ayahRange:"130–131",classification:"medinan"}], 22:[{ayahRange:"52–55",location:"Between Makkah and Madinah"}],
  25:[{ayahRange:"68–70",classification:"medinan"}], 26:[{ayahRange:"197, 224–227",classification:"medinan"}],
  28:[{ayahRange:"52–55",classification:"medinan"},{ayahRange:"85",location:"Juhfa",context:"Associated with the time of the Hijrah."}],
  29:[{ayahRange:"1–11",classification:"medinan"}], 30:[{ayahRange:"17",classification:"medinan"}],
  31:[{ayahRange:"27–29",classification:"medinan"}], 32:[{ayahRange:"16–20",classification:"medinan"}],
  36:[{ayahRange:"45",classification:"medinan"}], 40:[{ayahRange:"56–57",classification:"medinan"}],
  42:[{ayahRange:"23–25, 27",classification:"medinan"}], 43:[{ayahRange:"54",classification:"medinan"}],
  45:[{ayahRange:"14",classification:"medinan"}], 46:[{ayahRange:"10, 15, 35",classification:"medinan"}],
  47:[{ayahRange:"13",context:"Associated with the Hijrah."}], 48:[{ayahRange:"Entire Surah",context:"Associated with the return from Hudaybiyyah."}],
  50:[{ayahRange:"38",classification:"medinan"}], 53:[{ayahRange:"32",classification:"medinan"}],
  54:[{ayahRange:"44–46",classification:"medinan"}], 56:[{ayahRange:"81–82",classification:"medinan"}],
  68:[{ayahRange:"17–33, 48–50",classification:"medinan"}], 73:[{ayahRange:"10–11, 20",classification:"medinan"}],
  77:[{ayahRange:"48",classification:"medinan"}], 107:[{ayahRange:"4–7",classification:"medinan"}],
  110:[{ayahRange:"Entire Surah",location:"Mina",context:"Associated with the Farewell Pilgrimage; traditionally classified as Medinan."}],
};

const orderBySurah = new Map<number, number>(traditionalOrder.map((surah, index) => [surah, index + 1]));

export const REVELATION_METADATA: readonly SurahRevelationMetadata[] = SURAH_METADATA.map((surah) => {
  const classification = surah.revelationType === "Meccan" ? "meccan" : "medinan";
  const traditionalPosition = orderBySurah.get(surah.number);
  if (!traditionalPosition) throw new Error(`Missing revelation order for Surah ${surah.number}`);
  const exceptions = (exceptionSeeds[surah.number] ?? []).map((item) => ({ ...item, sourceName: "Tanzil Revelation Order" }));
  const city = classification === "meccan" ? "Meccan" : "Medinan";
  return {
    surahNumber: surah.number,
    classification,
    traditionalOrder: traditionalPosition,
    phase: classification === "medinan" ? "medinan" : undefined,
    confidence: "traditional",
    exceptions,
    summary: `Surah ${surah.nameEnglish} is traditionally classified as ${city} and belongs to the period ${classification === "meccan" ? "before" : "after"} the Hijrah.`,
    sourceName: "Tanzil Revelation Order",
    sourceUrl: REVELATION_SOURCE_URL,
    sourceNote: "Tanzil’s traditional sequence is based on the revelation of a Surah’s opening ayahs, not the completion of the whole Surah. Other chronology systems may differ.",
    lastReviewed: REVELATION_REVIEW_DATE,
  };
});

export function getRevelationMetadata(surahNumber: number) {
  return REVELATION_METADATA.find((item) => item.surahNumber === surahNumber);
}
