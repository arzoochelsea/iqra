"use client";

import { useEffect, useRef, useState } from "react";
import { ErrorCard } from "./content-state";

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function AudioPlayer({ src, label, compact = false, onPlay }: { src: string; label: string; compact?: boolean; onPlay?: () => void }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused" | "error">("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = ref.current;
    const pauseWhenAnotherStarts = (event: Event) => {
      const playingAudio = (event as CustomEvent<HTMLAudioElement>).detail;
      if (audio && playingAudio !== audio) audio.pause();
    };
    window.addEventListener("iqra:audio-play", pauseWhenAnotherStarts);
    return () => {
      window.removeEventListener("iqra:audio-play", pauseWhenAnotherStarts);
      audio?.pause();
    };
  }, []);

  function announcePlayback(audio: HTMLAudioElement) {
    window.dispatchEvent(new CustomEvent<HTMLAudioElement>("iqra:audio-play", { detail: audio }));
    onPlay?.();
  }
  async function toggle() {
    const audio = ref.current; if (!audio) return;
    if (!audio.paused) { audio.pause(); return; }
    setState("loading");
    try { await audio.play(); } catch { setState("error"); }
  }
  async function restart() {
    const audio = ref.current;
    if (!audio) return;
    audio.currentTime = 0;
    setState("loading");
    try { await audio.play(); } catch { setState("error"); }
  }

  function seek(value: number) {
    if (!ref.current) return;
    ref.current.currentTime = value;
    setCurrentTime(value);
  }

  function changeSpeed(value: number) {
    setSpeed(value);
    if (ref.current) ref.current.playbackRate = value;
  }

  return <div className={compact ? "flex flex-wrap items-center gap-2" : "audio-panel"}>
    <audio ref={ref} src={src} preload="metadata" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onDurationChange={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onEnded={() => { setState("paused"); setCurrentTime(0); }} onPlaying={(event) => { setState("playing"); announcePlayback(event.currentTarget); }} onPause={() => setState("paused")} onWaiting={() => setState("loading")} onError={() => setState("error")} aria-label={label} />
    <button type="button" onClick={toggle} className={compact ? "icon-button focus-ring" : "button-primary focus-ring"} aria-label={`${state === "playing" ? "Pause" : "Play"} ${label}`}>{state === "loading" ? "Loading…" : state === "playing" ? "Pause" : compact ? "Play ayah" : "Play Surah"}</button>
    {!compact && <><button type="button" onClick={restart} className="button-secondary focus-ring">Restart</button><span className="audio-reciter">Mishary Rashid Alafasy</span><div className="audio-timeline"><span>{formatTime(currentTime)}</span><label className="sr-only" htmlFor="surah-audio-progress">Audio progress</label><input id="surah-audio-progress" className="audio-range focus-ring" type="range" min={0} max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} disabled={!duration} /><span>{formatTime(duration)}</span></div><label className="speed-control">Speed<select value={speed} onChange={(event) => changeSpeed(Number(event.target.value))} className="focus-ring" aria-label="Playback speed"><option value={0.75}>0.75×</option><option value={1}>1×</option><option value={1.25}>1.25×</option><option value={1.5}>1.5×</option><option value={2}>2×</option></select></label></>}
    {state === "error" && <div className="w-full"><ErrorCard title="Audio unavailable" message="The recitation could not be loaded. Check your connection and try again." /></div>}
  </div>;
}
