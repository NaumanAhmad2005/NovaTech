# NovaTech — Enterprise SaaS Platform

> A full-scale, production-grade software development agency platform with a premium client-facing portal, an internal admin CRM, and a high-performance marketing website — all sharing a single Supabase backend.

---

## 🏛 Architecture

```
         Internet
             │
 ┌───────────┼───────────────┐
 │           │               │
Main Site  Client Portal   Admin CRM
             │               │
             └──── Supabase ──┘
                  (PostgreSQL + Auth + Storage + Realtime)
```

All three modules share one database. A user's role (`admin`, `active_client`, `normal_user`) is stored in Supabase and enforced via middleware RBAC on every protected route.

---

## 📦 Tech Stack

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| Framework    | **Next.js 16** (App Router, Server Components)  |
| Language     | **TypeScript** (strict mode)                    |
| Styling      | **TailwindCSS v4** + custom CSS design tokens   |
| Animations   | **Framer Motion**                               |
| Charts       | **Recharts**                                    |
| Database     | **Supabase** (PostgreSQL + Row-Level Security)  |
| Auth         | **Supabase Auth** (Email, Google, GitHub OAuth) |
| Icons        | **Lucide React**                                |
| Fonts        | Inter · Space Grotesk · JetBrains Mono          |

---

## 🧩 Platform Modules

### 1. Main Website (`/`)
The public-facing marketing site with 3D animations, lead generation, and project brief submission.

- Hero with animated background & canvas effects
- Services, Portfolio, Team, and Pricing sections
- **Project Brief Form** — logged-in users submit project requests that flow into the Admin CRM
- Auth guard: guests are prompted to log in before submitting a brief
- Internationalization-ready structure

### 2. Client Portal (`/portal`)
A comprehensive digital workspace for every NovaTech client. Mirrors the UX of Linear + Stripe + Figma.

#### Command Center (Dashboard)
- Live project progress ring with sprint status
- Interactive milestone roadmap (8 phases)
- AI brief drawer — Nova AI summary of the week
- KPI cards: progress, days to delivery, team count, budget used
- Pending actions, team online status, quick-action grid
- Recent activity feed

#### Project Management
| Page | Features |
|------|----------|
| **My Projects** | Progress rings, health badges, team avatars, sprint bars |
| **Timeline** | 8-phase visual roadmap with animated connectors |
| **Tasks & Milestones** | Two-tab view, status filters, priority badges, animated bars |

#### Build Visibility
| Page | Features |
|------|----------|
| **Design Center** | Version history, approve/reject, comment threads, Figma link |
| **Development** | Layer progress (Frontend/Backend/DB/AI), feature module bars |
| **Deployments** | Live env cards (Prod/Staging/Dev), build history with status |
| **Testing & QA** | Test suites, bug tracker, Lighthouse score, security audit |

#### Collaboration
| Page | Features |
|------|----------|
| **Messages** | Slack-like channels, emoji reactions, typing indicator |
| **Meetings** | Agenda view, meeting notes, action items, request modal |
| **Approvals** | Live approve/reject, categories, comment threads |
| **Change Requests** | Submit scope changes, cost/timeline impact display |
| **Team** | 8-member cards, availability, responsibilities, message/email |

#### Assets & Finance
| Page | Features |
|------|----------|
| **Files** | Grid/list toggle, search, NEW badges, preview + download |
| **Documents** | Search, category filters, bookmark, preview + download |
| **Contracts** | NDA/MSA/CR status, sign-now flow, expand details |
| **Invoices** | Payment progress bar, pay-now CTA, download receipts |
| **Payments** | Recharts area chart, transaction history |

#### Reports & Help
| Page | Features |
|------|----------|
| **Reports** | Sprint velocity, health pie, weekly chart, PDF library |
| **AI Assistant** | Full chat UI, typing indicator, smart mock responses |
| **Support** | Ticket threads, reply input, priority/category, SLA info |
| **Knowledge Base** | Search, 6 categories, bookmarks, featured articles |
| **Notifications** | Type icons, unread badges, urgent flags, mark-as-read |
| **Settings** | Profile, 2FA, notification toggles, privacy, language |

### 3. Admin CRM (`/admin`)
Internal command center for the NovaTech team.

- **Dashboard** — KPIs, request queue, revenue, active projects
- **Projects** — Full CRUD, project details, sprint management
- **Clients** — Client profiles, project assignment, contact details
- **Finance** — Invoice generation, payment tracking
- **CMS** — Live content editing synced to the main website
- **Deployments** — Trigger and monitor build pipelines
- **Messages** — Internal team messaging
- **Settings** — Platform configuration, team management
- **AI Tools** — Admin AI assistant for internal analysis

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Clone & install
```bash
git clone https://github.com/NaumanAhmad2005/NovaTech.git
cd NovaTech/novatech
npm install
```

### 2. Environment variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Demo access
- **Client Portal** — log in with any Supabase user that has `role: active_client`
- **Admin Panel** — log in with `role: admin`
- **Demo mode** — set cookie `demo_client_session=true` to bypass auth for UI previews

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (main)/          # Public website pages
│   ├── portal/          # Client portal (22 pages)
│   │   ├── page.tsx         # Command Center
│   │   ├── projects/
│   │   ├── timeline/
│   │   ├── tasks/
│   │   ├── design/
│   │   ├── development/
│   │   ├── deployments/
│   │   ├── testing/
│   │   ├── messages/
│   │   ├── meetings/
│   │   ├── approvals/
│   │   ├── changes/
│   │   ├── team/
│   │   ├── files/
│   │   ├── documents/
│   │   ├── contracts/
│   │   ├── invoices/
│   │   ├── payments/
│   │   ├── reports/
│   │   ├── ai/
│   │   ├── support/
│   │   ├── docs/
│   │   ├── notifications/
│   │   └── settings/
│   └── admin/           # Admin CRM
├── components/
│   ├── portal/          # Portal sidebar, topbar
│   └── admin/           # Admin sidebar, components
└── lib/
    ├── supabase/         # Supabase client/server
    ├── portalStore.ts    # Zustand portal state
    └── demoDb.ts         # Fallback demo data
```

---

## 🔒 Security

- Supabase Row-Level Security on all tables
- Middleware-based RBAC (admin / active_client / normal_user)
- 2FA support via Supabase Auth
- OWASP Top 10 audit — Q2 2026 passed
- All file URLs are pre-signed, short-lived

---

## 📊 Database Tables

| Table | Description |
|-------|-------------|
| `users` | Auth users + role assignment |
| `project_requests` | Inbound client briefs from main site |
| `projects` | Active projects with metadata |
| `sprints` | Sprint records linked to projects |
| `tasks` | Task items per sprint |
| `meetings` | Scheduled meetings per project |
| `files` | Project file records |
| `invoices` | Invoice records |
| `messages` | Channel messages per project |
| `notifications` | Per-user notification queue |

---

## 🗺 Roadmap

- [ ] Supabase Realtime — live notifications
- [ ] Google Calendar sync for meetings
- [ ] Stripe payment gateway integration
- [ ] OpenAI GPT-4o for Nova AI backend
- [ ] WhatsApp Business API notifications
- [ ] Mobile app (React Native)

---

Built with ❤️ by **NovaTech Technologies**
