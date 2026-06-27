"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Circle, CheckCircle2, Clock, Zap, AlertCircle, Filter, Plus } from "lucide-react";

type TaskStatus = "completed" | "in_progress" | "under_review" | "upcoming" | "blocked";

interface Task {
  id: string;
  title: string;
  category: string;
  status: TaskStatus;
  priority: "high" | "medium" | "low";
  assignee: string;
  eta: string;
  progress: number;
  description: string;
}

const TASKS: Task[] = [
  { id: "t1", title: "Stripe webhook handler — queue system", category: "Backend", status: "in_progress", priority: "high", assignee: "Marcus Dev", eta: "Jun 30", progress: 80, description: "Implement queue-based webhook processing to handle concurrent events without race conditions." },
  { id: "t2", title: "Payment Flow UI — v4 implementation", category: "Frontend", status: "upcoming", priority: "high", assignee: "Reza Frontend", eta: "Jul 5", progress: 0, description: "Implement approved UI designs v4 for the checkout experience including 3DS screens." },
  { id: "t3", title: "Authentication module — full tests", category: "QA", status: "completed", priority: "medium", assignee: "Leila QA", eta: "Jun 25", progress: 100, description: "Write and execute E2E tests for all auth flows including 2FA and OAuth." },
  { id: "t4", title: "CRM module — contact list view", category: "Frontend", status: "in_progress", priority: "medium", assignee: "Reza Frontend", eta: "Jul 8", progress: 45, description: "Build the contacts table with sorting, filtering, bulk actions, and infinite scroll." },
  { id: "t5", title: "Security audit — Q2 findings review", category: "Security", status: "under_review", priority: "low", assignee: "Ali Security", eta: "Jun 28", progress: 95, description: "Review all Q2 OWASP audit findings, document mitigations, and generate client report." },
  { id: "t6", title: "API Documentation — v1.2 update", category: "Docs", status: "completed", priority: "low", assignee: "Priya BA", eta: "Jun 20", progress: 100, description: "Update Swagger/OpenAPI docs to reflect all new endpoints added in Sprint 13-14." },
  { id: "t7", title: "Reporting engine — data pipeline", category: "Backend", status: "upcoming", priority: "medium", assignee: "Marcus Dev", eta: "Jul 20", progress: 0, description: "Build the data aggregation pipeline to power weekly/monthly project reports." },
  { id: "t8", title: "Production deployment v1.4.7 approval", category: "DevOps", status: "blocked", priority: "high", assignee: "Omar DevOps", eta: "Jun 28", progress: 100, description: "Awaiting client approval to push hotfix v1.4.7 from staging to production." },
];

const MILESTONES = [
  { id: "m1", name: "Project Kickoff", date: "Jan 20", done: true, description: "Initial meeting, contracts signed, onboarding complete." },
  { id: "m2", name: "UI/UX Design Complete", date: "Feb 15", done: true, description: "All wireframes, UI designs, and Figma prototypes approved." },
  { id: "m3", name: "Backend Architecture", date: "Mar 10", done: true, description: "Database schema, API design, and system architecture finalized." },
  { id: "m4", name: "Authentication Module", date: "Jun 25", done: true, description: "Full auth system with OAuth, 2FA, and session management." },
  { id: "m5", name: "Payment Gateway Integration", date: "Jul 15", done: false, current: true, description: "Stripe integration, webhooks, invoicing, and receipt generation." },
  { id: "m6", name: "CRM & Reporting Modules", date: "Aug 5", done: false, description: "Full CRM suite and automated reporting engine." },
  { id: "m7", name: "Final QA & Security Audit", date: "Aug 12", done: false, description: "Complete regression testing, performance testing, and security review." },
  { id: "m8", name: "Production Launch", date: "Aug 20", done: false, description: "Go-live, DNS switch, monitoring setup, and client handover." },
];

const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bg: string; icon: any }> = {
  completed:    { label: "Completed",    color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",    icon: CheckCircle2  },
  in_progress:  { label: "In Progress",  color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",      icon: Zap           },
  under_review: { label: "Under Review", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20",  icon: Clock         },
  upcoming:     { label: "Upcoming",     color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20",    icon: Circle        },
  blocked:      { label: "Blocked",      color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",        icon: AlertCircle   },
};

const FILTER_TABS = ["All", "In Progress", "Under Review", "Upcoming", "Completed", "Blocked"];

export default function TasksPage() {
  const [tab, setTab] = useState<"tasks" | "milestones">("tasks");
  const [filter, setFilter] = useState("All");

  const filtered = TASKS.filter(t => {
    if (filter === "All") return true;
    return t.status === filter.toLowerCase().replace(" ", "_");
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-green-400" /> Tasks & Milestones
          </h1>
          <p className="text-slate-400 text-sm mt-1">Track your project's work items and key delivery milestones.</p>
        </div>
        <div className="flex gap-2">
          {(["tasks", "milestones"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TASKS VIEW */}
      {tab === "tasks" && (
        <>
          {/* Status summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(["completed", "in_progress", "under_review", "upcoming", "blocked"] as TaskStatus[]).map(s => {
              const count = TASKS.filter(t => t.status === s).length;
              const sc = STATUS_CONFIG[s];
              return (
                <div key={s} className={`p-4 rounded-2xl border ${sc.bg} text-center`}>
                  <p className={`text-xl font-bold font-mono ${sc.color}`}>{count}</p>
                  <p className={`text-xs font-medium mt-0.5 ${sc.color}`}>{sc.label}</p>
                </div>
              );
            })}
          </div>

          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            {FILTER_TABS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Task list */}
          <div className="space-y-3">
            {filtered.map((task, i) => {
              const sc = STATUS_CONFIG[task.status];
              return (
                <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.bg} ${sc.color}`}>
                          <sc.icon className="w-3 h-3" />{sc.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] border font-semibold ${
                          task.priority === "high" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          task.priority === "medium" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                          "bg-slate-500/10 text-slate-400 border-slate-500/20"
                        }`}>{task.priority}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-500 text-[10px] border border-white/10">{task.category}</span>
                      </div>
                      <p className="text-white font-semibold">{task.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{task.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-slate-500">Assignee</p>
                      <p className="text-sm text-white font-medium mt-0.5">{task.assignee}</p>
                      <p className="text-xs text-slate-600 mt-1">ETA: {task.eta}</p>
                    </div>
                  </div>

                  {task.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>Progress</span><span className="text-white font-mono">{task.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + i * 0.04 }}
                          className={`h-full rounded-full ${task.progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-blue-500 to-cyan-400"}`} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {/* MILESTONES VIEW */}
      {tab === "milestones" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Completed
            <span className="w-3 h-3 rounded-full bg-blue-400/40 border-2 border-blue-400 inline-block ml-3 animate-pulse" /> Current
            <span className="w-3 h-3 rounded-full bg-white/10 border border-white/20 inline-block ml-3" /> Upcoming
          </p>
          {MILESTONES.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors ${
                (m as any).current ? "bg-blue-500/5 border-blue-500/20" :
                m.done ? "bg-[#0a0f1e] border-white/5" :
                "bg-[#0a0f1e] border-white/5 opacity-60"
              }`}>
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                m.done ? "bg-blue-500/20 border-blue-500 text-blue-400" :
                (m as any).current ? "bg-blue-600/30 border-blue-400 text-blue-300 ring-4 ring-blue-500/20" :
                "bg-white/5 border-white/10 text-slate-600"
              }`}>
                {m.done ? <CheckCircle2 className="w-5 h-5" /> :
                 (m as any).current ? <Zap className="w-5 h-5" /> :
                 <Circle className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className={`font-semibold ${m.done || (m as any).current ? "text-white" : "text-slate-400"}`}>{m.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{m.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-mono text-slate-300">{m.date}</p>
                    <p className={`text-xs font-medium mt-0.5 ${m.done ? "text-green-400" : (m as any).current ? "text-blue-400" : "text-slate-600"}`}>
                      {m.done ? "✓ Completed" : (m as any).current ? "⚡ In Progress" : "Upcoming"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
