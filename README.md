# FakeScope Security Hub

AI-powered scam, image manipulation & deepfake detector — built with **React + Tailwind v4**, designed with **Stitch**.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat&logo=tailwindcss) ![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript)

## Features

- 🔍 **Text Checker** — Paste suspicious messages/links → detects scams, phishing
- 🖼️ **Image Checker** — Drag & drop images → detects manipulation, metadata tampering
- 🎭 **Deepfake Detector** — Upload image/video → AI deepfake analysis
- 📊 **Result Card** — Animated danger score, severity ring, red flags, precautions, report button
- 🎨 **Cyber-Sentinel Design System** — Futuristic glassmorphism from Stitch

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Backend Integration

Open `src/hooks/useChecker.ts` and set:

```ts
const USE_MOCK = false; // connect to real backend
const BASE_URL = 'http://localhost:8000';
```

### API Endpoints

| Endpoint | Method | Body |
|---|---|---|
| `/check-text` | POST | `{ "text": string }` |
| `/check-image` | POST | `FormData { file: image }` |
| `/check-deepfake` | POST | `FormData { file: image/video }` |

### Response Schema

```json
{
  "danger_score": 87,
  "type": "scam",
  "scam_category": "kyc",
  "red_flags": ["flag1", "flag2"],
  "explanation": "...",
  "precautions": ["action1"],
  "block_recommended": true,
  "report_to": "cybercrime.gov.in"
}
```

## Tech Stack

- **React 19** + **TypeScript 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Vite 8**
- Design from **Stitch** (FakeScope Security Hub project)
