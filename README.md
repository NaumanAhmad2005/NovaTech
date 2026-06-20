<div align="center">

<br />

```
███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ ████████╗███████╗ ██████╗██╗  ██╗
████╗  ██║██╔═══██╗██║   ██║██╔══██╗╚══██╔══╝██╔════╝██╔════╝██║  ██║
██╔██╗ ██║██║   ██║██║   ██║███████║   ██║   █████╗  ██║     ███████║
██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║   ██║   ██╔══╝  ██║     ██╔══██║
██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║   ██║   ███████╗╚██████╗██║  ██║
╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝
```

### **Engineering Tomorrow**

*A premium enterprise software company website — comparable in quality to Vercel, Stripe, and Linear.*

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

<br />

</div>

---

## ✨ Overview

**NovaTech** is a fully-featured, production-ready corporate website built to enterprise standards. Every section is handcrafted with premium animations, 3D visuals, glassmorphism, and cinematic scroll effects. The site includes real backend integrations: WhatsApp lead notifications and a Supabase-backed newsletter subscriber database.

> **Design Philosophy:** Minimal. Professional. Dark. Elegant.  
> **Goal:** "This company builds enterprise-grade software."

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/NaumanAhmad2005/NovaTech.git
cd NovaTech/novatech

# Install dependencies
npm install

# Copy environment variables and fill in your keys (see Environment Setup below)
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint check
npx tsc --noEmit  # TypeScript type check
```

---

## 🔧 Environment Setup

Create a `.env.local` file in the `novatech/` directory with the following keys:

```env
# ── WhatsApp Notifications (CallMeBot — Free) ──────────────────────────────
# Setup: Send "I allow callmebot to send me messages" to +34 644 597 91 on WhatsApp.
# They reply with your personal API key.
WHATSAPP_PHONE=923026468105
WHATSAPP_APIKEY=your_callmebot_apikey_here

# ── Supabase (Newsletter Subscriber Database) ───────────────────────────────
# Create a free project at https://supabase.com
# Get these from: Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

> ⚠️ **Never commit `.env.local` to Git** — it is already listed in `.gitignore`.

### Supabase Table Setup

Run this SQL once in the Supabase SQL Editor:

```sql
create table newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamptz default now()
);
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#050816` |
| Secondary BG | `#0F172A` |
| Card BG | `#111827` |
| Primary (Blue) | `#3B82F6` |
| Accent (Cyan) | `#38BDF8` |
| Success | `#10B981` |
| Text | `#FFFFFF` |
| Muted Text | `#94A3B8` |

**Fonts:**
- Headings → [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- Body → [Inter](https://fonts.google.com/specimen/Inter)
- Code / Numbers → [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## 🧱 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | TailwindCSS v4 + Custom CSS |
| **Animation** | Framer Motion |
| **3D Graphics** | Three.js + React Three Fiber + Drei |
| **Smooth Scroll** | Lenis |
| **Icons** | Lucide React |
| **Database** | Supabase (PostgreSQL) |
| **Notifications** | CallMeBot WhatsApp API |

---

## 📂 Project Structure

```
novatech/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts     # WhatsApp notification + server validation
│   │   │   └── newsletter/route.ts  # Supabase email storage
│   │   ├── globals.css              # Design tokens, glass effects, security CSS
│   │   ├── layout.tsx               # Root layout with SEO metadata
│   │   └── page.tsx                 # Main page — assembles all sections
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx       # Sticky glass navbar with solid dropdowns
│   │   │   └── Footer.tsx           # Full footer with CTA, newsletter, links
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx          # Globe, code snippets, parallax hero
│   │   │   ├── ServicesSection.tsx      # 12 animated service cards
│   │   │   ├── TechStackSection.tsx     # Tab switcher + infinite marquee
│   │   │   ├── AISection.tsx            # Neural network 3D + AI features
│   │   │   ├── IndustriesSection.tsx    # 10 industry verticals
│   │   │   ├── PortfolioSection.tsx     # 6 case studies + detail panel
│   │   │   ├── ProcessSection.tsx       # 8-step accordion timeline
│   │   │   ├── StatsSection.tsx         # Animated counters + achievements
│   │   │   ├── TestimonialsSection.tsx  # Client carousel
│   │   │   ├── PricingSection.tsx       # 3-tier engagement models
│   │   │   ├── BlogSection.tsx          # Engineering blog grid
│   │   │   └── ContactSection.tsx       # Validated form + contact info
│   │   │
│   │   ├── three/
│   │   │   └── HeroGlobe.tsx        # Interactive Three.js globe
│   │   │
│   │   └── ui/
│   │       ├── EasterEggs.tsx       # Konami code, terminal, console art
│   │       ├── LoadingScreen.tsx    # Animated loading with progress bar
│   │       ├── NoiseOverlay.tsx     # Film grain texture
│   │       ├── ScrollProgress.tsx   # Top progress bar
│   │       └── SmoothScroll.tsx     # Lenis wrapper
│   │
│   └── lib/
│       ├── utils.ts                 # cn() class merger utility
│       └── validators.ts            # Shared input validators & XSS sanitizers
│
├── public/                          # Static assets
├── .env.local                       # Secret keys (NOT committed to Git)
├── .gitignore
├── next.config.ts                   # Security headers + build config
├── package.json
└── tsconfig.json
```

---

## 🌟 Features

### Visual & Design
- ⚫ Premium dark theme with `#050816` deep space background
- 🪟 Glassmorphism cards with `backdrop-filter: blur`
- 💡 Neon blue/cyan glow effects on hover
- 🌈 Gradient text headings (Space Grotesk)
- 🔲 Subtle grid & dot pattern overlays
- 🧭 Solid, highly-readable navigation dropdowns (`glass-dropdown` class)

### Animations & Interactions
- 🎬 **Loading screen** — rotating hexagonal logo + progress bar
- 📏 **Scroll progress bar** at top of viewport
- 🌊 **Lenis smooth scroll** — buttery fluid scrolling
- ✨ **Framer Motion** — scroll-triggered stagger animations on every section
- 🃏 **Card hover** — lift + scale + border glow + radial gradient
- 🎠 **Infinite marquee** — tech stack scrolling banner

### 3D & Three.js
- 🌐 **Hero Globe** — wireframe sphere with lat/lon dots, glow rings, mouse-reactive rotation
- ⭐ **Star field** — deep space particle background in hero
- 🧠 **Neural network** — animated node graph in AI section
- ✨ **Particle cloud** — slowly rotating particles

### Backend Integrations
- 📲 **WhatsApp Alerts** — Contact form submissions are instantly delivered to your WhatsApp DM via [CallMeBot API](https://www.callmebot.com/) (free, no account required)
- 🗄️ **Newsletter Database** — Subscriber emails are stored in a [Supabase](https://supabase.com) PostgreSQL table with duplicate prevention (`upsert`)
- 🔁 **API Routes** — Two dedicated Next.js API routes handle all backend logic server-side

### 🔒 Security
- 🛡️ **XSS Prevention** — all user inputs stripped of HTML tags, JS protocols, and event handlers before processing
- 🚦 **Rate Limiting** — contact form: 3 requests per IP per 10 min; newsletter: 5 per IP per hour
- ✅ **Server-side Validation** — all fields re-validated on the server regardless of frontend state
- 🔐 **HTTP Security Headers** — `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection`
- 📋 **Whitelist Validation** — dropdown values (service, budget) validated against an allowed-values list

### Form Validation (Contact Page)
| Field | Rule |
|-------|------|
| Full Name | Letters, spaces, hyphens, apostrophes — 2 to 60 characters |
| Email | Valid RFC-5322 format — max 254 characters |
| Phone | Digits, `+`, `-`, spaces, parentheses — 7 to 15 digits (ITU E.164) — optional |
| Company | Letters, digits, common symbols — max 100 characters — optional |
| Message | Min 10 characters, max 5000 characters with live counter |
| Dropdowns | Whitelist-checked against allowed values on both client and server |

### Sections (13 total)
| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Globe + code snippets + parallax |
| 2 | Services | 12 cards: Custom Software, AI, Cloud, Security, etc. |
| 3 | Tech Stack | 5 categories, 35+ technologies, marquee |
| 4 | AI Capabilities | 8 AI features + production stats |
| 5 | Industries | 10 verticals with project counts |
| 6 | Portfolio | 6 real-world case studies with expandable panels |
| 7 | Process | 8-step accordion development methodology |
| 8 | Stats | Animated counters: 50+ projects, 99% satisfaction, etc. |
| 9 | Testimonials | Sliding carousel with 5 enterprise clients |
| 10 | Pricing | Starter / Professional / Enterprise tiers |
| 11 | Blog | 6 deep-dive technical articles |
| 12 | Contact | Validated form + direct contact info + trust signals |
| 13 | Footer | CTA banner + live newsletter signup + links |

### 🥚 Easter Eggs
| Trigger | Effect |
|---------|--------|
| `↑↑↓↓←→←→BA` (Konami Code) | Matrix katakana rain effect |
| Type **"hello"** anywhere | Interactive terminal opens |
| Open browser DevTools | ASCII art NovaTech banner + job listing |

### SEO & Performance
- ✅ Full Open Graph & Twitter Card metadata
- ✅ Semantic HTML5 throughout
- ✅ `next/dynamic` for Three.js chunks (code splitting)
- ✅ Lazy-loaded 3D canvases with SSR disabled
- ✅ Static page prerendering (`○` routes)
- ✅ Firefox & Chrome cross-browser compatible (SVG filter freeze fixed)
- ✅ Zero TypeScript errors on production build

---

## 🗺️ Roadmap

- [ ] Client Portal — project tracking dashboard
- [ ] Admin Dashboard — internal project management
- [ ] Email delivery via Resend/Sendgrid for newsletter subscribers
- [ ] Project Proposal Generator
- [ ] Developer Blog CMS integration
- [ ] Dark/Light mode toggle
- [ ] i18n (Arabic, French support)
- [ ] Careers page with application form
- [ ] Real-time GitHub contribution graph

---

## 📄 License

This project is proprietary software owned by **NovaTech Technologies Inc.**  
All rights reserved © 2026.

---

<div align="center">

**Built with ❤️ by the NovaTech Engineering Team**

*Engineering Tomorrow — Today.*

</div>
