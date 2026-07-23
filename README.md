<div align="center">

# IQRA

### Where Every Journey Begins

<p dir="rtl" lang="ar">
  <strong>اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</strong>
</p>

> “Read in the name of your Lord who created.”  
> — Qur’an 96:1

A modern and carefully sourced Qur’an learning experience designed to help Everybody read, listen, understand, and reflect upon the Qur’an.

[![Download IQRA](https://img.shields.io/badge/Download-IQRA-176B55?style=for-the-badge&logo=github&logoColor=white)](https://github.com/arzoochelsea/iqra/archive/refs/heads/main.zip)
[![View Repository](https://img.shields.io/badge/View-Repository-1B1B1B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/arzoochelsea/iqra)
[![Star Repository](https://img.shields.io/github/stars/arzoochelsea/iqra?style=for-the-badge&logo=github&label=Star)](https://github.com/arzoochelsea/iqra/stargazers)

**No GitHub account is required to download IQRA.**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![Last Commit](https://img.shields.io/github/last-commit/arzoochelsea/iqra?style=flat-square)

</div>

---

## Why IQRA?

**IQRA (اقْرَأْ)** means “Read” or “Recite.”

It was the first word revealed by Allah to Prophet Muhammad ﷺ through Angel Jibril, marking the beginning of Qur’anic revelation.

IQRA is inspired by that invitation to seek knowledge, reflect deeply, and draw closer to Allah. The platform is designed to help Muslims engage with the Qur’an through respectful reading, authentic recitation, structured learning, and clearly attributed educational material.

> [!IMPORTANT]
> IQRA prioritizes accuracy, transparent sourcing, and respectful presentation over publishing unverified content quickly.

---

## Download IQRA

<div align="center">

### Download the complete project

[![Download ZIP](https://img.shields.io/badge/⬇_DOWNLOAD_IQRA-ZIP-176B55?style=for-the-badge)](https://github.com/arzoochelsea/iqra/archive/refs/heads/main.zip)

**No sign-in or GitHub account is required.**

</div>

You can also clone the repository:

```bash
git clone https://github.com/arzoochelsea/iqra.git
```

---

## Core Features

| Feature                    | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| 📖 **Read the Qur’an**     | Browse all 114 Surahs with Arabic Qur’anic text               |
| 🔍 **Search**              | Search by Surah number, Arabic name, English name, or meaning |
| 🎧 **Listen**              | Play full-Surah recitation or individual ayahs                |
| 🌍 **Translation**         | Read clearly attributed English translation                   |
| 🔤 **Word by Word**        | Explore Arabic words, transliteration, and concise meanings   |
| 🧭 **Revelation Journey**  | Explore a sourced traditional revelation chronology          |
| 📚 **Tafsir and Learning** | View tafsir separately from editorial reflection              |
| 🌱 **My Qur’an Journey**   | Create personal learning lists and track progress locally     |
| 💾 **Backup and Restore**  | Export and import validated journey backups                   |
| 📱 **Responsive PWA**      | Use IQRA on mobile and desktop and install it as an app       |
| 🔒 **Privacy First**       | Personal progress remains in the current browser              |
| ✅ **Source Transparency** | Review clearly attributed content and methodology             |

---

## At a Glance

| Surahs  | Ayahs     | Words      | Responsive | Installable |
| :-----: | :-------: | :--------: | :--------: | :---------: |
| **114** | **6,236** | **77,429+** | **Yes**   | **PWA**     |

---

## Current Content Status

Qur’an reading and word-by-word learning content is available across all 114 Surah routes through validated data clients.

Word meanings load only when an ayah’s compact control is opened, helping keep the reader responsive.

Each Surah also includes a traditional revelation journey with clearly labelled chronology and documented source notes.

Surah Al-Ikhlas currently serves as the richer reference study page, with sourced background, themes, tafsir summary, reflection prompts, and related Surahs.

Detailed tafsir, historical context, themes, and reflections for additional Surahs are being reviewed gradually.

---

## Screenshots

Screenshots will be added as the interface continues to mature.

Planned assets:

* `docs/screenshots/home.png`
* `docs/screenshots/surah-list.png`
* `docs/screenshots/surah-reader.png`
* `docs/screenshots/revelation-journey.png`
* `docs/screenshots/my-journey.png`
* `docs/screenshots/demo.gif`

> [!NOTE]
> No placeholder images should be embedded. Only genuine IQRA interface screenshots should be published.

---

## Installation

### Requirements

* Node.js 20 or newer
* npm

### Local development

```bash
git clone https://github.com/arzoochelsea/iqra.git
cd iqra
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production validation

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

---

## Main Routes

| Route                                | Purpose                                          |
| ------------------------------------ | ------------------------------------------------ |
| `/`                                  | Homepage and Surah search preview                |
| `/surahs`                            | Searchable index of all 114 Surahs               |
| `/surahs/[surahNumber]`              | Qur’an reader and available study material       |
| `/revelation-journey`                | Searchable timeline of all 114 Surahs            |
| `/methodology/revelation-chronology` | Sources, terminology, and chronology limitations |
| `/my-journey`                        | Learning Lists, progress, and journey backups    |
| `/privacy`                           | Local-storage privacy and backup limitations     |
| `/about`                             | Project purpose and content methodology          |

---

## Technology

IQRA is built with:

* Next.js using the App Router
* React
* TypeScript
* Tailwind CSS
* Progressive Web App capabilities
* Validated external Qur’anic data clients
* Local browser storage for personal journey data

---

## Sources and Content Methodology

* **Qur’anic Arabic and metadata:** Al Quran Cloud using the Uthmani edition
* **English translation:** Saheeh International through Al Quran Cloud
* **Transliteration:** Al Quran Cloud English Transliteration edition
* **Word-by-word learning:** islamic.app using Quran.com API v4 data
* **Recitation:** Mishary Rashid Alafasy through the Islamic Network CDN
* **Traditional revelation order:** Tanzil Revelation Order
* **Tafsir reference for Al-Ikhlas:** Tafsir Ibn Kathir, abridged edition hosted by Quran.com

Arabic, translation, transliteration, tafsir, and editorial reflection must remain clearly separated.

Provider responses must be validated before display.

The application must never substitute content from a different Surah when requested data is unavailable.

---

## Content Integrity

Qur’anic Arabic is not generated, corrected, rewritten, or normalized by the application.

Translation and recitation rights remain with their respective rights-holders and are displayed with attribution.

Tafsir summaries and historical material require careful source review.

Editorial reflection is clearly separated and is not a substitute for qualified scholarly guidance.

---

## Personal Journey and Privacy

My Qur’an Journey stores learning lists and progress only in the current browser under the versioned key:

```text
iqra-quran-journey-v1
```

It stores identifiers and list settings, not Qur’an text, audio, or complete API responses.

Clearing browser data, using private browsing, or moving to another device may remove local progress.

Validated JSON export and import provide a manual backup option.

No account or cloud synchronization is currently implemented.

---

## Roadmap

### Available now

* [x] Qur’an reader for all 114 Surahs
* [x] Surah search
* [x] Full-Surah and ayah audio
* [x] Translation and transliteration
* [x] Word-by-word learning
* [x] Revelation Journey
* [x] My Qur’an Journey
* [x] Local progress tracking
* [x] Backup export and import
* [x] Responsive design
* [x] PWA installation support

### Planned

* [ ] Expanded sourced tafsir coverage
* [ ] Memorization mode
* [ ] Daily ayah experience
* [ ] Multiple interface languages
* [ ] Improved offline access
* [ ] Carefully governed AI-assisted study features

---

## Contributing

Contributions that improve accessibility, reliability, performance, or source transparency are welcome.

Changes involving Qur’anic text, translations, transliteration, historical claims, or tafsir should include a clear and reputable source.

Before submitting changes, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

## Deployment

IQRA is deployed through Vercel’s GitHub integration.

```text
Local development → GitHub main branch → Vercel production deployment
```

Vercel uses:

* Repository root
* Next.js framework preset
* `npm install`
* `npm run build`

Pushes to `main` trigger production deployments.

Branches and pull requests create preview deployments.

---

## Creator

IQRA was created and developed by **Arzoo** with the aim of making Qur’an reading, listening, understanding, and structured learning more accessible.

---

<div align="center">

## اقْرَأْ

### Built with care for the Human being

If you find IQRA helpful, consider giving the repository a ⭐

[⬆ Back to top](#iqra)

</div>
