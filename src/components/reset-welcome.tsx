"use client";

import { useRouter } from "next/navigation";
import { INTRO_SEEN_KEY } from "@/components/home-experience";

export function ResetWelcome() {
  const router = useRouter();
  return <button type="button" className="button-secondary focus-ring" onClick={() => {
    try { window.localStorage.removeItem(INTRO_SEEN_KEY); } catch { /* The welcome screen can still be opened through this navigation. */ }
    router.push("/");
    router.refresh();
  }}>Show welcome experience again</button>;
}
