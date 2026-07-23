import type { Metadata } from "next";
import { HomeExperience } from "@/components/home-experience";

export const metadata: Metadata = {
  title: { absolute: "IQRA | Read. Reflect. Understand." },
  description: "Explore the Qur’an with meaning, context, and thoughtful study.",
};

export default function Home() {
  return <HomeExperience />;
}
