"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2, Calendar, MessageSquare, FileText, Activity,
  AlertCircle, ArrowUpRight, ChevronRight, Rocket, Loader2,
  TrendingUp, Clock, Users, DollarSign, Sparkles, Zap,
  Shield, Bell, ClipboardCheck, BarChart3, RefreshCw, Circle
} from "lucide-react";

// ── Demo data ────────────────────────────────────────────────────────────────
const DEMO_PROJECT = {
  id: "demo",
  title: "GlobalTech Enterprise Platform",
  description: "Full-stack B2B SaaS with auth, payments, analytics and CRM modules.",
  status: "active",
  progress: 68,
  phase: "Phase 3 — Frontend Development",
  health: "on_track" as "on_track" | "at_risk" | "delayed",
  start_date: "2026-01-15",
  estimated_delivery: "2026-08-20",
  budget_used: 62,
  risk: "Low",
};

const DEMO_SPRINT = {
  goal: "Complete authentication module + integrate Stripe webhooks",
  progress: 72,
  completed: 18,
  remaining: 7,
  end_date: "2026-07-04",
  ai_summary: "Sprint 14 is progressing well. The auth system has been completed and deployed to staging. Stripe webhook handlers are 80% done. No blockers currently. On track for sprint close.",
};

const DEMO_MILESTONES = [
  { id: "1", name: "Project Kickoff", date: "Jan 20", done: true },
  { id: "2", name: "UI/UX Design", date: "Feb 15", done: true },
  { id: "3", name: "Backend Architecture", date: "Mar 10", done: true },
  { id: "4", name: "Authentication Module", date: "Jun 30", done: true },
  { id: "5", name: "Payment Gateway", date: "Jul 15", done: false, current: true },
  { id: "6", name: "Launch & Deployment", date: "Aug 20", done: false },
];

const DEMO_ACTIVITY = [
  { id: "1", type: "design", icon: "🎨", text: "New design uploaded — Payment Flow v3", time: "2h ago" },
  { id: "2", type: "deploy", icon: "🚀", text: "Deployed to staging — build 1.4.7", time: "5h ago" },
  { id: "3", type: "message", icon: "💬", text: "New message from your Project Manager", time: "Yesterday" },
  { id: "4", type: "task", icon: "✅", text: "Authentication module completed", time: "Yesterday" },
  { id: "5", type: "invoice", icon: "💳", text: "Invoice #INV-004 issued — $22,500", time: "2 days ago" },
];

const DEMO_TEAM = [
  { name: "Sarah Chen", role: "Project Manager", online: true, initials: "SC", color: "from-blue-500 to-cyan-400" },
  { name: "Marcus Dev", role: "Tech Lead", online: true, initials: "MD", color: "from-purple-500 to-pink-400" },
  { name: "Aisha UI", role: "UI Designer", online: false, initials: "AU", color: "from-orange-500 to-yellow-400" },
  { name: "Reza QA", role: "QA Engineer", online: true, initials: "RQ", color: "from-green-500 to-emerald-400" },
];

const DEMO_PENDING = [
  { type: "approval", label: "Design review — Payment Flow", urgent: true },
  { type: "invoice", label: "Invoice #INV-004 due Jul 15", urgent: false },
  { type: "meeting", label: "Sprint 14 Demo — Jul 4 at 10:00 AM", urgent: false },
];

// ── Health badge ─────────────────────────────────────────────────────────────
function HealthBadge({ health }: { health: string }) {
  const c = {
    on_track: "bg-green-500/10 text-green-400 border-green-500/20",
    at_risk:  "bg-orange-500/10 text-orange-400 border-orange-500/20",
    delayed:  "bg-red-500/10 text-red-400 border-red-500/20",
  }[health] ?? "bg-slate-500/10 text-slate-400 border-slate-500/20";
  const label = { on_track: "On Track", at_risk: "At Risk", delayed: "Delayed" }[health] ?? health;
  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${health === "on_track" ? "bg-green-400" : health === "at_risk" ? "bg-orange-400" : "bg-red-400"} animate-pulse`} />
      {label}
    </span>
  );
}

// ── Section wrapper ──────────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-[#0a0f1e] border border-white/5 ${className}`}>
      {children}
    </div>
  );
}

// ── Main dashboard ───────────────────────────────────────────────────────────
export default function PortalDashboard() {
  const [loading, setLoading] = useState(true);
  const [project]   = useState(DEMO_PROJECT);
  const [sprint]    = useState(DEMO_SPRINT);
  const [milestones] = useState(DEMO_MILESTONES);
  const [activity]  = useState(DEMO_ACTIVITY);
  const [team]      = useState(DEMO_TEAM);
  const [pending]   = useState(DEMO_PENDING);
  const [aiOpen, setAiOpen] = useState(false);
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
    setTimeout(() => setLoading(false), 600);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          <p className="text-slate-400 text-sm">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  const daysLeft = Math.ceil((new Date(project.estimated_delivery).getTime() - Date.now()) / 86400000);
  const circumference = 2 * Math.PI * 34;

  return (
    <div className="space-y-6 pb-8">

      {/* ── Greeting ── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-slate-500 text-sm mb-1">{greeting} 👋</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">Here's everything about your project — right now.</p>
        </div>
        <div className="flex items-center gap-3">
          <HealthBadge health={project.health} />
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium transition-all shadow-lg shadow-blue-900/30"
          >
            <Sparkles className="w-4 h-4" />
            Ask Nova AI
          </button>
        </div>
      </motion.div>

      {/* ── AI Assistant Drawer ── */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="p-5 border-blue-500/20 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Nova AI — Project Brief</p>
                  <p className="text-slate-400 text-xs">Auto-generated · Updated daily</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-blue-500/40 pl-4">
                This week, the <strong className="text-white">authentication system</strong> and <strong className="text-white">user dashboard</strong> were completed and deployed to staging. The <strong className="text-white">payment gateway integration</strong> is currently in progress and remains on schedule. Your next required action is to <strong className="text-blue-400">review and approve the updated UI mockups</strong> before Friday. No critical project risks have been identified. You are <strong className="text-green-400">68% complete</strong> with <strong className="text-white">{daysLeft} days</strong> until estimated delivery.
              </p>
              <div className="flex gap-3 mt-4 flex-wrap">
                {["What was completed this week?", "Any approvals waiting?", "Explain the latest deployment"].map(q => (
                  <button key={q} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10 transition-colors">
                    {q}
                  </button>
                ))}
                <Link href="/portal/ai" className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-xs text-blue-400 border border-blue-500/20 transition-colors flex items-center gap-1">
                  Open AI Assistant <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Overall Progress", value: `${project.progress}%`, icon: TrendingUp, color: "text-blue-400", sub: "Sprint 14 active" },
          { label: "Days to Delivery", value: daysLeft, icon: Clock, color: "text-orange-400", sub: project.estimated_delivery },
          { label: "Team Members", value: "8", icon: Users, color: "text-purple-400", sub: "4 online now" },
          { label: "Budget Used", value: `${project.budget_used}%`, icon: DollarSign, color: "text-green-400", sub: "Within estimate" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="p-5 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold font-mono ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{kpi.label}</p>
              <p className="text-xs text-slate-600 mt-1">{kpi.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Progress + Milestones ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Project Health Card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Active Project</p>
                  <h2 className="text-lg font-bold text-white">{project.title}</h2>
                  <p className="text-sm text-slate-400 mt-0.5">{project.phase}</p>
                </div>
                <div className="relative w-20 h-20 shrink-0">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <motion.circle cx="40" cy="40" r="34" fill="none" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: circumference - (circumference * project.progress / 100) }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xl font-bold text-white font-mono">{project.progress}%</span>
                    <span className="text-[10px] text-slate-500">done</span>
                  </div>
                </div>
              </div>

              {/* Milestone roadmap */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Roadmap</p>
                <div className="relative">
                  <div className="flex items-center gap-0">
                    {milestones.map((m, i) => (
                      <div key={m.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-1">
                          <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                              m.done ? "bg-blue-500/20 border-blue-500 text-blue-400" :
                              (m as any).current ? "bg-blue-600/30 border-blue-400 text-blue-300 ring-4 ring-blue-500/20 animate-pulse" :
                              "bg-white/5 border-white/10 text-slate-600"
                            }`}
                          >
                            {m.done ? <CheckCircle2 className="w-4 h-4" /> :
                              (m as any).current ? <Zap className="w-4 h-4" /> :
                              <Circle className="w-3 h-3" />}
                          </motion.div>
                          <p className={`text-[9px] text-center leading-tight max-w-[60px] hidden md:block ${m.done ? "text-blue-400" : (m as any).current ? "text-white font-semibold" : "text-slate-600"}`}>
                            {m.name}
                          </p>
                          <p className="text-[9px] text-slate-700 hidden md:block">{m.date}</p>
                        </div>
                        {i < milestones.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 ${m.done ? "bg-blue-500/40" : "bg-white/5"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sprint Overview */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Current Sprint</p>
                  <h3 className="text-base font-bold text-white">{sprint.goal}</h3>
                </div>
                <Link href="/portal/tasks" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                  Full view <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Progress</span><span className="text-white font-mono">{sprint.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${sprint.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>
                <div className="flex gap-4 text-center shrink-0">
                  <div>
                    <p className="text-xl font-bold text-green-400 font-mono">{sprint.completed}</p>
                    <p className="text-[10px] text-slate-500">Done</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-orange-400 font-mono">{sprint.remaining}</p>
                    <p className="text-[10px] text-slate-500">Left</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">{sprint.ai_summary}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Sprint ends {new Date(sprint.end_date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              </p>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-400" /> Recent Activity
                </h3>
                <Link href="/portal" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all</Link>
              </div>
              <div className="divide-y divide-white/5">
                {activity.map((a, i) => (
                  <motion.div key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                    <span className="text-xl shrink-0">{a.icon}</span>
                    <p className="flex-1 text-sm text-slate-300">{a.text}</p>
                    <span className="text-xs text-slate-600 shrink-0">{a.time}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-6">

          {/* Pending Actions */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-400" /> Pending Actions
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {pending.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${p.urgent ? "bg-red-400 animate-pulse" : "bg-blue-400"}`} />
                    <p className="text-sm text-slate-300 flex-1">{p.label}</p>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-white/5">
                <Link href="/portal/approvals" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  View all approvals <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Team Status */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" /> Your Team
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {team.map((member, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors">
                    <div className="relative">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                        {member.initials}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0a0f1e] ${member.online ? "bg-green-400" : "bg-slate-600"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{member.name}</p>
                      <p className="text-xs text-slate-500 truncate">{member.role}</p>
                    </div>
                    <button
                      onClick={() => alert(`Opening message to ${member.name}...`)}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-blue-500/10 flex items-center justify-center text-slate-500 hover:text-blue-400 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-white/5">
                <Link href="/portal/team" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  View full team <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "View Files", href: "/portal/files", icon: FileText, color: "text-blue-400" },
                  { label: "Invoices", href: "/portal/invoices", icon: DollarSign, color: "text-green-400" },
                  { label: "Reports", href: "/portal/reports", icon: BarChart3, color: "text-purple-400" },
                  { label: "Ask AI", href: "/portal/ai", icon: Sparkles, color: "text-cyan-400" },
                  { label: "Approvals", href: "/portal/approvals", icon: ClipboardCheck, color: "text-orange-400" },
                  { label: "Support", href: "/portal/support", icon: Shield, color: "text-pink-400" },
                ].map(item => (
                  <Link key={item.label} href={item.href}
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all group">
                    <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                    <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">{item.label}</span>
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
