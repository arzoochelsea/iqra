import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Source_Serif_4, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JourneyProvider } from "@/components/journey/journey-provider";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"] });
const arabic = Noto_Naskh_Arabic({ variable: "--font-arabic", subsets: ["arabic"] });

export const metadata: Metadata = { title: { default: "IQRA — Where Every Journey Begins", template: "%s · IQRA" }, description: "Read, listen to, and understand the Qur’an through clearly attributed sources." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable} ${arabic.variable}`}><body><JourneyProvider><a href="#main-content" className="skip-link">Skip to content</a><SiteHeader /><main id="main-content" className="flex-1">{children}</main><SiteFooter /></JourneyProvider></body></html>;
}
