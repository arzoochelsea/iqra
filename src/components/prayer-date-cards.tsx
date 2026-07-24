"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

interface PrayerDay {
  timings: Record<PrayerName, string>;
  hijriDay: string;
  hijriMonth: string;
  hijriYear: string;
  timeZone: string;
}

const prayerOrder: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export function PrayerDateCards() {
  const [day, setDay] = useState<PrayerDay | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [status, setStatus] = useState<"loading" | "ready" | "permission" | "error">("loading");

  const refresh = useCallback(() => {
    setStatus((current) => current === "ready" ? current : "loading");
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const timestamp = Math.floor(Date.now() / 1000);
        const response = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=3`, { cache: "no-store" });
        if (!response.ok) throw new Error("Prayer time request failed.");
        const payload: unknown = await response.json();
        const parsed = parsePrayerDay(payload);
        setDay(parsed);
        setNow(new Date());
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }, () => setStatus("permission"), { enableHighAccuracy: false, timeout: 12_000, maximumAge: 300_000 });
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(refresh);
    const clock = window.setInterval(() => setNow(new Date()), 1_000);
    const refetch = window.setInterval(refresh, 15 * 60 * 1_000);
    const onVisibility = () => { if (document.visibilityState === "visible") refresh(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(clock);
      window.clearInterval(refetch);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refresh]);

  const nextPrayer = useMemo(() => day ? getNextPrayer(day, now) : null, [day, now]);
  const gregorianDate = useMemo(() => new Intl.DateTimeFormat("en-GB", {
    timeZone: day?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(now), [day?.timeZone, now]);

  return <div className="focused-info-cards">
    <article className="focused-info-card prayer-card">
      <CardIcon type="prayer" />
      <div>
        <p>NEXT PRAYER</p>
        {status === "ready" && nextPrayer ? <>
          <h2>{nextPrayer.name}</h2>
          <strong>{nextPrayer.time}</strong>
          <small><span aria-hidden="true">◷</span> in {formatCountdown(nextPrayer.seconds)}</small>
        </> : status === "loading" ? <><h2>Updating…</h2><small>Finding prayer times for your location</small></> : <>
          <h2>Location needed</h2>
          <small>{status === "permission" ? "Allow location access for accurate local prayer times." : "Prayer times could not be refreshed."}</small>
          <button type="button" className="prayer-retry focus-ring" onClick={refresh}>Try again</button>
        </>}
      </div>
    </article>
    <article className="focused-info-card date-card">
      <CardIcon type="date" />
      <div>
        <p>ISLAMIC DATE</p>
        {day ? <><h2>{day.hijriDay} {day.hijriMonth}</h2><strong>{day.hijriYear} AH</strong></> : <><h2>Updating…</h2><strong>Hijri date</strong></>}
        <small>{gregorianDate}{day && <><br />{day.timeZone.replaceAll("_", " ")}</>}</small>
      </div>
    </article>
  </div>;
}

function CardIcon({ type }: { type: "prayer" | "date" }) {
  return <div className="focused-card-icon" aria-hidden="true">{type === "prayer"
    ? <svg viewBox="0 0 24 24"><path d="M4 20h16M6 20v-7h12v7M9 13V9h6v4M12 9V4m-2 2 2-2 2 2" /></svg>
    : <svg viewBox="0 0 24 24"><path d="M5 6h14v14H5zM8 3v5M16 3v5M5 10h14" /><path d="M9 14h2v2H9zM14 14h1v2h-1z" /></svg>}
  </div>;
}

function parsePrayerDay(payload: unknown): PrayerDay {
  if (!isRecord(payload) || !isRecord(payload.data)) throw new Error("Invalid prayer response.");
  const data = payload.data;
  if (!isRecord(data.timings) || !isRecord(data.date) || !isRecord(data.meta)) throw new Error("Invalid prayer response.");
  const timingData = data.timings;
  const meta = data.meta;
  const date = data.date;
  if (!isRecord(date.hijri)) throw new Error("Invalid prayer response.");
  const hijri = date.hijri;
  if (!isRecord(hijri.month)) throw new Error("Invalid prayer response.");
  const hijriMonth = hijri.month;
  const timings = Object.fromEntries(prayerOrder.map((name) => {
    const value = timingData[name];
    if (typeof value !== "string" || !/^\d{1,2}:\d{2}/.test(value)) throw new Error("Invalid prayer time.");
    return [name, value.match(/^\d{1,2}:\d{2}/)?.[0] ?? value];
  })) as Record<PrayerName, string>;
  if (typeof hijri.day !== "string" || typeof hijri.year !== "string" || typeof hijriMonth.en !== "string" || typeof meta.timezone !== "string") throw new Error("Invalid prayer date.");
  return { timings, hijriDay: hijri.day, hijriMonth: hijriMonth.en, hijriYear: hijri.year, timeZone: meta.timezone };
}

function getNextPrayer(day: PrayerDay, now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: day.timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const currentSeconds = value("hour") * 3600 + value("minute") * 60 + value("second");
  for (const name of prayerOrder) {
    const [hour, minute] = day.timings[name].split(":").map(Number);
    const prayerSeconds = hour * 3600 + minute * 60;
    if (prayerSeconds > currentSeconds) return { name, time: day.timings[name], seconds: prayerSeconds - currentSeconds };
  }
  const [fajrHour, fajrMinute] = day.timings.Fajr.split(":").map(Number);
  return { name: "Fajr" as const, time: day.timings.Fajr, seconds: 86_400 - currentSeconds + fajrHour * 3600 + fajrMinute * 60 };
}

function formatCountdown(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remaining = seconds % 60;
  return [hours, minutes, remaining].map((value) => String(value).padStart(2, "0")).join(":");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
