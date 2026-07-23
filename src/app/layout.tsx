import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Source_Serif_4, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JourneyProvider } from "@/components/journey/journey-provider";
import { ServiceWorkerRegistration } from "@/components/pwa/service-worker-registration";
import { MobileBottomNavigation } from "@/components/app-navigation";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"] });
const arabic = Noto_Naskh_Arabic({ variable: "--font-arabic", subsets: ["arabic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://iqra-reading.arzoo989609.chatgpt.site"),
  title: { default: "IQRA — Where Every Journey Begins", template: "%s · IQRA" },
  description: "Read, listen to, and understand the Qur’an through clearly attributed sources.",
  applicationName: "IQRA",
  manifest: "/manifest.json",
  keywords: ["Qur’an", "Quran", "Islam", "recitation", "tafsir", "Qur’an study"],
  authors: [{ name: "IQRA" }],
  creator: "IQRA",
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/iqra-icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/iqra-icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/branding/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "IQRA" },
  openGraph: {
    type: "website",
    siteName: "IQRA",
    title: "IQRA — Where Every Journey Begins",
    description: "Read, listen to, and understand the Qur’an through clearly attributed sources.",
    images: [{ url: "/branding/iqra-logo.png", width: 1254, height: 1254, alt: "IQRA — Read, Reflect, Understand" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IQRA — Where Every Journey Begins",
    description: "Read, listen to, and understand the Qur’an through clearly attributed sources.",
    images: ["/branding/iqra-logo.png"],
  },
};

export const viewport = {
  themeColor: "#153f35",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable} ${arabic.variable}`}><body><JourneyProvider><ServiceWorkerRegistration /><a href="#main-content" className="skip-link">Skip to content</a><SiteHeader /><main id="main-content" className="flex-1">{children}</main><SiteFooter /><MobileBottomNavigation /></JourneyProvider></body></html>;
}
