const SOURCE_URL = "https://api.aladhan.com/v1/asmaAlHusna";

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Names request failed.");
    const payload: unknown = await response.json();
    if (!isRecord(payload) || !Array.isArray(payload.data) || payload.data.length !== 99) throw new Error("Invalid names response.");
    return Response.json({ data: payload.data }, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
  } catch {
    return Response.json({ error: "The names could not be loaded right now." }, { status: 502 });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
