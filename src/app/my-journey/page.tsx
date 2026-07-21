import type { Metadata } from "next";
import { JourneyDashboard } from "@/components/journey/journey-dashboard";

export const metadata: Metadata = { title: "My Qur’an Journey", description: "Create local learning lists and keep gentle progress through saved Surahs and ayahs." };

export default function MyJourneyPage() {
  return <div className="shell section-pad"><header className="page-header"><p className="eyebrow">Personal learning</p><h1 className="page-title">My Qur’an Journey</h1><p>Build calm, purposeful Learning Lists for reading, memorisation, study, and revision—without an account.</p></header><JourneyDashboard /></div>;
}
