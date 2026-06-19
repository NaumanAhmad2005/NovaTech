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

<br />

</div>

---

## ✨ Overview

**NovaTech** is a fully-featured, production-ready corporate website built to enterprise standards. Every section is handcrafted with premium animations, 3D visuals, glassmorphism, and cinematic scroll effects.

> **Design Philosophy:** Minimal. Professional. Dark. Elegant.  
> **Goal:** "This company builds enterprise-grade software."

---

## 🚀 Live Preview

```
http://localhost:3000
```

> Run `npm run dev` inside the `novatech/` directory to start.

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
| **UI Primitives** | Radix UI |

---

## 📂 Project Structure

```
novatech/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens, animations, glass effects
│   │   ├── layout.tsx           # Root layout with SEO metadata
│   │   └── page.tsx             # Main page — assembles all sections
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx   # Sticky glass navbar with dropdowns
│   │   │   └── Footer.tsx       # Full footer with CTA, newsletter, links
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
│   │   │   └── ContactSection.tsx       # Form + offices + trust signals
│   │   │
│   │   ├── three/
│   │   │   └── HeroGlobe.tsx    # Interactive Three.js globe
│   │   │
│   │   └── ui/
│   │       ├── CustomCursor.tsx    # Magnetic dual-ring cursor
│   │       ├── EasterEggs.tsx      # Konami code, terminal, console art
│   │       ├── LoadingScreen.tsx   # Animated loading with progress bar
│   │       ├── NoiseOverlay.tsx    # Film grain texture
│   │       ├── ScrollProgress.tsx  # Top progress bar
│   │       └── SmoothScroll.tsx    # Lenis wrapper
│   │
│   └── lib/
│       └── utils.ts             # cn() class merger utility
│
├── public/                      # Static assets
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
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
- 📡 Animated diagonal light beams in hero

### Animations & Interactions
- 🖱️ **Custom cursor** — dot + magnetic trailing ring
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
| 12 | Contact | Form + 4 office locations + trust signals |
| 13 | Footer | CTA banner + newsletter + links |

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
- ✅ Optimized font loading via Google Fonts
- ✅ Zero TypeScript errors

---

## ⚙️ Getting Started

### Prerequisites
- Node.js `>=18.0.0`
- npm `>=9.0.0`

### Installation

```bash
# Clone the repository
git clone https://github.com/NaumanAhmad2005/NovaTech.git
cd NovaTech/novatech

# Install dependencies
npm install

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

## 🗺️ Roadmap

- [ ] Client Portal — project tracking dashboard
- [ ] Admin Dashboard — internal project management
- [ ] Project Proposal Generator
- [ ] Developer Blog CMS integration
- [ ] API Documentation site
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
