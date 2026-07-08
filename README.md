# 🏆 Tournament Copilot — FIFA World Cup 2026

An enterprise-grade, role-based, multilingual matchday copilot and stadium operations platform built for the **FIFA World Cup 2026**.

Featuring grounded AI conversational assistance, real-time sensory corridor wayfinding, live crowd telemetry, and DEFCON incident monitoring across three tailored operational tiers.

---

## ✨ Multi-Role Operational Ecosystem

### 1. 🎟️ Fan Mode (`/fan`)
* **Live Match Scoreboard:** Real-time round-of-16 match updates, countdown timers, and ticket seating context.
* **Pathfinder AI Wayfinding:** Interactive SVG stadium map with step-free sensory-safe routes, live tracking beacons, and crowd density avoidance.
* **Grounded Multilingual Copilot:** Instant answers powered by Retrieval-Augmented Generation (RAG) grounded strictly in official FIFA World Cup 2026 stadium policies. Supported in **English, Spanish, French, and Portuguese**.

### 2. 📋 Staff & Volunteer Operations (`/staff`)
* **Ground Operations Copilot:** Task checklists, incident reporting, and real-time concourse coordination for ground volunteers and stewards.
* **Crowd Flow Monitoring:** Automated congestion warnings and rerouting suggestions to keep concourses moving safely.

### 3. 🚨 DEFCON Command Center (`/command`)
* **Live Telemetry & Biometrics:** Full stadium telemetry streaming, biometric crowd heatmaps, and queue wait-time analytics.
* **Incident & Broadcast Response:** Emergency broadcast triggers, automated drone overrides, and DEFCON level monitoring locked into a dark-mode command aesthetic.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
* **UI & Styling:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
* **AI & RAG Engine:** [Vercel AI SDK](https://sdk.vercel.ai/) with custom in-memory semantic retrieval & live-feed context synthesis
* **Visualization:** Custom interactive SVG canvas (`WayfindingView`), volumetric lighting (`LightRays`), and atmospheric canvas shaders (`GhostCursor`)
* **Testing:** [Vitest](https://vitest.dev/) unit & integration test suite

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** 20+
* **npm**, **pnpm**, or **yarn**

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/kido449/Flow26.git
cd Flow26
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to enter the **Multi-Role Gateway**.

---

## 🧪 Testing

Run the automated test suite for congestion telemetry, translation dictionaries, and RAG retrieval services:

```bash
npm test
```

---

## 📁 Key Project Structure

```
Flow26/
├── app/
│   ├── fan/             # Fan Portal (Copilot, Pathfinder AI Wayfinding)
│   ├── staff/           # Staff Operations Portal
│   ├── command/         # DEFCON Telemetry & Crowd Heatmap Command Center
│   └── api/chat/        # RAG-grounded AI chat endpoint
├── components/
│   ├── assistant/       # RAG AI chat UI & source citation panels
│   ├── map/             # Interactive 2D stadium wayfinding canvas
│   ├── crowd/           # Real-time crowd heatmaps & congestion monitoring
│   └── ui/              # Design system primitives & volumetric visual effects
├── lib/
│   ├── rag/             # Grounded knowledge base, retrieval, and live feeds
│   ├── services/        # Navigation routing & multilingual translation engines
│   └── state/           # Global role, locale, and theme management
└── vitest.config.ts     # Vitest configuration
```

---

## 🌐 Localization

The platform natively supports instant switching across official FIFA tournament languages:
* **English** (`en`)
* **Español** (`es`)
* **Français** (`fr`)
* **Português** (`pt`)
