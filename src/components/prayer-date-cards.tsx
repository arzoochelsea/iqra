"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { HomeIcon } from "@/components/home-icon";

type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
interface PrayerDay { timings: Record<PrayerName, string>; hijriDay: string; hijriMonth: string; hijriYear: string; timeZone: string; }
interface Coordinates { latitude: number; longitude: number; }

const prayerOrder: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export function PrayerDateCards() {
  const [day, setDay] = useState<PrayerDay | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "permission" | "error">("loading");

  const refresh = useCallback(() => {
    setStatus((current) => current === "ready" ? current : "loading");
    if (!navigator.geolocation) { setStatus("error"); return; }
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const timestamp = Math.floor(Date.now() / 1000);
        const response = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=3`, { cache: "no-store" });
        if (!response.ok) throw new Error("Prayer time request failed.");
        setDay(parsePrayerDay(await response.json() as unknown));
        setCoordinates({ latitude: coords.latitude, longitude: coords.longitude });
        setNow(new Date());
        setStatus("ready");
      } catch { setStatus("error"); }
    }, () => setStatus("permission"), { enableHighAccuracy: false, timeout: 12_000, maximumAge: 300_000 });
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => { setNow(new Date()); refresh(); });
    const clock = window.setInterval(() => setNow(new Date()), 1_000);
    const refetch = window.setInterval(refresh, 15 * 60 * 1_000);
    const onVisibility = () => { if (document.visibilityState === "visible") refresh(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { window.cancelAnimationFrame(frame); window.clearInterval(clock); window.clearInterval(refetch); document.removeEventListener("visibilitychange", onVisibility); };
  }, [refresh]);

  const nextPrayer = useMemo(() => day && now ? getNextPrayer(day, now) : null, [day, now]);
  const gregorianDate = useMemo(() => now ? new Intl.DateTimeFormat("en-GB", { timeZone: day?.timeZone, day: "numeric", month: "long", year: "numeric", weekday: "long" }).format(now) : "Current date", [day?.timeZone, now]);
  const qibla = coordinates ? Math.round(getQiblaBearing(coordinates)) : null;
  const fallback = status === "permission" ? "Allow location access to show local information." : status === "error" ? "Local information is currently unavailable." : "Finding your local information…";

  return <section className="iqra-info-strip" aria-label="Today’s Islamic information">
    <article><InfoIcon name="calendar" /><div><p>Islamic Date</p>{day ? <><h2>{day.hijriDay} {day.hijriMonth} {day.hijriYear} AH</h2><small>{gregorianDate}</small></> : <><h2>Location needed</h2><small>{fallback}</small></>}</div></article>
    <article><InfoIcon name="clock" /><div><p>Next Prayer</p>{nextPrayer && day ? <><h2>{nextPrayer.name}</h2><strong>{nextPrayer.time}</strong><small>{formatLocation(day.timeZone)} · in {formatCountdown(nextPrayer.seconds)}</small></> : <><h2>{status === "loading" ? "Locating…" : "Location needed"}</h2><small>{fallback}</small>{status !== "loading" && <button type="button" className="iqra-info-retry focus-ring" onClick={refresh}>Try again</button>}</>}</div></article>
    <article><InfoIcon name="qibla" /><div><p>Qibla Direction</p>{qibla !== null ? <><h2>{qibla}°</h2><small>Clockwise from true north</small></> : <><h2>Location needed</h2><small>{fallback}</small></>}</div></article>
    <article className="iqra-inspiration"><InfoIcon name="dua" /><div><p>Daily Inspiration</p><h2 className="arabic" lang="ar" dir="rtl">إِنَّ مَعَ الْعُسْرِ يُسْرًا</h2><blockquote>Indeed, with hardship comes ease.</blockquote><cite>Surah Ash-Sharh (94:6)</cite></div></article>
  </section>;
}

function InfoIcon({ name }: { name: "calendar" | "clock" | "qibla" | "dua" }) { return <span className="iqra-info-icon"><HomeIcon name={name} /></span>; }
function formatLocation(timeZone: string) { const parts = timeZone.split("/"); return parts.reverse().map((part) => part.replaceAll("_", " ")).join(", "); }
function getQiblaBearing({ latitude, longitude }: Coordinates) { const toRadians = (value: number) => value * Math.PI / 180; const lat = toRadians(latitude); const delta = toRadians(39.8262 - longitude); const y = Math.sin(delta); const x = Math.cos(lat) * Math.tan(toRadians(21.4225)) - Math.sin(lat) * Math.cos(delta); return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360; }
function parsePrayerDay(payload: unknown): PrayerDay {
  if (!isRecord(payload) || !isRecord(payload.data)) throw new Error("Invalid prayer response.");
  const data = payload.data;
  if (!isRecord(data.timings) || !isRecord(data.date) || !isRecord(data.meta)) throw new Error("Invalid prayer response.");
  const timingData = data.timings;
  const dateData = data.date;
  const metaData = data.meta;
  if (!isRecord(dateData.hijri)) throw new Error("Invalid prayer response.");
  const hijri = dateData.hijri;
  if (!isRecord(hijri.month)) throw new Error("Invalid prayer response.");
  const hijriMonth = hijri.month;
  const timings = Object.fromEntries(prayerOrder.map((name) => {
    const value = timingData[name];
    if (typeof value !== "string" || !/^\d{1,2}:\d{2}/.test(value)) throw new Error("Invalid prayer time.");
    return [name, value.match(/^\d{1,2}:\d{2}/)?.[0] ?? value];
  })) as Record<PrayerName, string>;
  if (typeof hijri.day !== "string" || typeof hijri.year !== "string" || typeof hijriMonth.en !== "string" || typeof metaData.timezone !== "string") throw new Error("Invalid prayer date.");
  return { timings, hijriDay: hijri.day, hijriMonth: hijriMonth.en, hijriYear: hijri.year, timeZone: metaData.timezone };
}
function getNextPrayer(day: PrayerDay, now: Date) { const parts = new Intl.DateTimeFormat("en-GB", { timeZone: day.timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(now); const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value ?? 0); const current = value("hour") * 3600 + value("minute") * 60 + value("second"); for (const name of prayerOrder) { const [hour, minute] = day.timings[name].split(":").map(Number); const prayer = hour * 3600 + minute * 60; if (prayer > current) return { name, time: day.timings[name], seconds: prayer - current }; } const [hour, minute] = day.timings.Fajr.split(":").map(Number); return { name: "Fajr" as const, time: day.timings.Fajr, seconds: 86_400 - current + hour * 3600 + minute * 60 }; }
function formatCountdown(seconds: number) { const hours = Math.floor(seconds / 3600); const minutes = Math.floor((seconds % 3600) / 60); return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`; }
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null; }
