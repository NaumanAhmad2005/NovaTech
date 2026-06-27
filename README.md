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

*A fully integrated Enterprise Platform featuring a high-performance marketing website, a comprehensive Client Portal, and a powerful Admin CRM/CMS.*

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js)

<br />

</div>

---

## ✨ Overview

**NovaTech** has evolved from a standalone corporate website into a **full-scale Enterprise SaaS Platform**. The platform is split into three seamlessly synchronized modules:

1. **The Main Website**: A stunning, 3D-accelerated public landing page showcasing services, portfolios, tech stacks, and AI capabilities. 
2. **The Client Portal**: A secure dashboard where authenticated clients can track their project timelines, download deliverables, pay invoices, request meetings, and open support tickets.
3. **The Admin CRM / CMS**: A comprehensive command center for NovaTech administrators to manage project requests, invite clients, oversee deployments, monitor infrastructure, chat with clients in real-time, and edit website content live.

> **Design Philosophy:** Minimal. Professional. Dark. Elegant.  
> **Goal:** "Provide an end-to-end digital experience from first impression to final project delivery."

---

## 🚀 The Three Pillars

### 1. The Marketing Website (`/`)
- 13 highly-polished sections (Hero, Tech Stack, AI, Process, Testimonials, Pricing, Blog, etc.)
- Interactive 3D Hero Globe and Neural Network animations.
- Buttery-smooth scroll with Lenis and scroll-triggered animations via Framer Motion.
- Secure, rate-limited Contact and Newsletter forms.

### 2. The Client Portal (`/portal`)
- **Authentication Gateway**: Secured via Supabase Auth.
- **Timeline tracking**: Clients can see live updates of their active project phase.
- **Deliverables & Invoices**: Dedicated tabs for securely downloading files and tracking billing.
- **Support & Meetings**: Open encrypted chat threads with the NovaTech team and schedule sync calls.

### 3. The Admin Center (`/admin`)
- **Live CRM**: Receive project requests from the main website. Approving a request automatically converts the user into an active client and provisions a new project dashboard for them.
- **Website CMS**: Edit the content (text, stats, labels) of the main website live. Changes are saved to Supabase and immediately reflected on the public site without redeploying.
- **Infrastructure & AI**: Monitor system metrics, review CI/CD deployment logs, and interact with a mock AI Sandbox for generating architecture suggestions.
- **Finance & Clients**: Oversee company revenue, overdue invoices, and invite new users manually to the platform.

---

## 🔧 Environment Setup

Create a `.env.local` file in the `novatech/` directory with the following keys:

```env
# ── WhatsApp Notifications (Optional) ───────────────────────────────────
WHATSAPP_PHONE=your_number
WHATSAPP_APIKEY=your_callmebot_apikey_here

# ── Supabase Setup (Required for Portal, Admin CRM, and CMS) ────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Supabase Table Setup (Key Schemas)
To fully utilize the CRM and Client Portal, ensure your Supabase database has the following tables:
- `client_profiles`: Stores `user_id`, `role` (normal_user, active_client, admin).
- `projects`: Tracks project status, phase, budget, and links to `client_profiles`.
- `site_content`: Key/value store powering the Admin CMS.

*(Note: The system contains a fallback `demoDb.ts` JSON-based database structure so the UI remains interactive even if Supabase is temporarily down).*

---

## 🧱 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Authentication & DB** | Supabase (PostgreSQL) |
| **Styling** | TailwindCSS v4 + Custom CSS |
| **Animation** | Framer Motion + Lenis (Smooth Scroll) |
| **3D Graphics** | Three.js + React Three Fiber + Drei |
| **Data Viz** | Recharts |
| **Icons** | Lucide React |

---

## 🔒 Security & Performance
- **Role-Based Access Control (RBAC)**: Middleware strictly prevents `normal_user` accounts from accessing `/portal` and completely locks down `/admin` to non-admin accounts.
- **XSS Prevention**: All user inputs stripped of HTML tags, JS protocols, and event handlers before processing.
- **Rate Limiting**: Integrated protections on public-facing forms.
- **Performance**: Heavy 3D components are chunked and lazy-loaded via `next/dynamic` with SSR disabled to maintain lightning-fast initial page loads.

---

## 🌟 What's New in v2?
- ✅ **Fully interactive Admin Panel** completed with mock alerts and live API synchronization.
- ✅ **Touchpad scrolling bug globally resolved** — navigation through complex nested layouts is now perfectly smooth.
- ✅ **Project Request Workflow** fully implemented: An unauthenticated user filling the contact form is seamlessly prompted to create an account, after which their project brief is saved and synced directly to the Admin CRM for approval.
- ✅ **Real-time CMS System** built-in.

---

## 📄 License

This project is proprietary software owned by **NovaTech Technologies Inc.**  
All rights reserved © 2026.

---

<div align="center">

**Built with ❤️ by the NovaTech Engineering Team**

*Engineering Tomorrow — Today.*

</div>
