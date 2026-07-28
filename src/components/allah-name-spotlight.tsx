"use client";

import { useEffect, useState } from "react";
import { HomeIcon } from "@/components/home-icon";

interface SpotlightName { name: string; transliteration: string; meaning: string; }

export function AllahNameSpotlight() {
  const [name, setName] = useState<SpotlightName | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/names-of-allah", { cache: "no-store", signal: controller.signal });
        if (!response.ok) return;
        const names = parseNames(await response.json() as unknown);
        const day = Math.floor(Date.now() / 86_400_000);
        setName(names[day % names.length]);
      } catch { /* The complete section below retains its own retry state. */ }
    }
    void load();
    return () => controller.abort();
  }, []);

  return <article className="iqra-name-spotlight">
    <span className="iqra-info-icon"><HomeIcon name="lantern" /></span>
    <div><p>99 Names of Allah</p>{name ? <><h2 className="arabic" lang="ar" dir="rtl">{name.name}</h2><strong>{name.transliteration}</strong><small>{name.meaning}</small></> : <><h2>Beautiful Names</h2><small>Explore all 99 names below.</small></>}<a href="#allah-names" className="focus-ring">View all 99 →</a></div>
  </article>;
}

function parseNames(payload: unknown): SpotlightName[] {
  if (!isRecord(payload) || !Array.isArray(payload.data) || payload.data.length !== 99) throw new Error("Invalid names response.");
  return payload.data.map((item) => {
    if (!isRecord(item) || !isRecord(item.en) || typeof item.name !== "string" || typeof item.transliteration !== "string" || typeof item.en.meaning !== "string") throw new Error("Invalid name entry.");
    return { name: item.name, transliteration: item.transliteration.trim(), meaning: item.en.meaning };
  });
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null; }
