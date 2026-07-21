<div align="center">

# IQRA

## Where Every Journey Begins

> “Read in the name of your Lord who created.”<br>
> — Qur’an 96:1

IQRA is a calm and accessible Qur’an learning experience designed to help people read, listen to, understand, and reflect upon the Qur’an through authentic recitation, clearly attributed translations, and carefully reviewed learning material.

</div>

## Why IQRA?

IQRA (اقْرَأْ) means “Read” or “Recite.” It was the first word revealed by Allah to Prophet Muhammad ﷺ through Angel Jibril, marking the beginning of Qur’anic revelation. The platform takes inspiration from this invitation to knowledge, reflection, and faith.

## Features

- Browse all 114 Surahs
- Search by number, Arabic name, English name, or meaning
- Read Arabic Qur’anic text
- Read an attributed English translation
- View transliteration where verified
- Explore word-by-word Arabic, transliteration, and concise English meanings
- Listen to full-Surah recitation
- Listen to individual ayahs
- Explore a sourced traditional revelation journey for all 114 Surahs
- View clearly attributed content sources
- Use responsive mobile and desktop layouts
- Read tafsir separately from editorial reflection

## Screenshots

Screenshots will be added as the interface continues to mature. Planned paths:

- `docs/screenshots/home.png`
- `docs/screenshots/surah-reader.png`
- `docs/screenshots/surah-list.png`

No placeholder images are embedded in this README.

## Current Content Status

Qur’an reading and word-by-word learning content is available across all 114 Surah routes through validated, server-side data clients. Each Surah also includes a traditional revelation journey with clearly labelled chronology and documented source notes. Surah Al-Ikhlas is the richer reference study page, with sourced background, themes, tafsir summary, reflection prompts, and related Surahs.

Detailed tafsir, historical context, themes, and reflections for additional Surahs are being reviewed gradually. IQRA prioritizes accuracy and clear attribution over publishing unverified learning material.

## Technology

- [Next.js](https://nextjs.org/) with the App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/arzoochelsea/iqra.git
cd iqra
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and Surah search preview |
| `/surahs` | Searchable index of all 114 Surahs |
| `/surahs/[surahNumber]` | Qur’an reader and available study material |
| `/revelation-journey` | Searchable timeline of all 114 Surahs |
| `/methodology/revelation-chronology` | Sources, terminology, and chronology limitations |
| `/about` | Project purpose and content methodology |

## Sources and Content Methodology

- **Qur’anic Arabic and metadata:** [Al Quran Cloud](https://alquran.cloud/api), using the Uthmani edition for prepared content
- **English translation:** Saheeh International, delivered through Al Quran Cloud
- **Transliteration:** Al Quran Cloud English Transliteration edition
- **Word-by-word learning:** islamic.app, sourced from Quran.com API v4 data
- **Recitation:** Mishary Rashid Alafasy, streamed from the Islamic Network CDN
- **Traditional revelation order:** [Tanzil Revelation Order](https://tanzil.net/docs/Revelation_Order)
- **Tafsir reference for Al-Ikhlas:** Tafsir Ibn Kathir (Abridged), hosted by Quran.com

Arabic, translation, transliteration, tafsir, and editorial reflection are presented as distinct content layers. Provider responses are validated before display, and the application does not substitute content from a different Surah when data is unavailable.

## Content Integrity

Qur’anic Arabic is not generated, corrected, or normalized by the application. Translation and recitation rights remain with their respective rights-holders and are displayed with attribution. Tafsir summaries and historical material require careful source review; editorial reflection is not a substitute for qualified scholarly guidance.

## Contributing

Contributions that improve accessibility, reliability, or source transparency are welcome. Changes to Qur’anic text, translations, transliteration, historical claims, or tafsir should include a clear and reputable source.

Before submitting changes, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment

IQRA is deployed through Vercel’s GitHub integration.

The production workflow is:

```text
Local development → GitHub main branch → Vercel production deployment
```

Vercel uses the repository root with the Next.js framework preset, `npm install` as the install command, and `npm run build` as the production build command. The Next.js default output directory is used.

Pushes to `main` trigger production deployments. Branches and pull requests create preview deployments. A failed deployment does not replace the last successful production deployment. Normal releases are triggered by GitHub pushes rather than manual `vercel --prod` uploads.
