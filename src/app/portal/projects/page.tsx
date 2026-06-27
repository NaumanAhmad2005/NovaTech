"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban, TrendingUp, Calendar, Users, Activity,
  ChevronRight, Zap, Circle, CheckCircle2, Clock,
  ArrowUpRight, BarChart3, Rocket, Shield
} from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    id: "1", title: "GlobalTech Enterprise Platform", client: "GlobalTech Inc.",
    status: "active", progress: 68, phase: "Phase 3 — Frontend Development",
    budget: "$120,000", health: "on_track",
    start_date: "2026-01-15", estimated_delivery: "2026-08-20",
    team: ["SC", "MD", "AU", "RQ"],
    description: "Full-stack B2B SaaS with auth, payments, analytics, and CRM modules.",
    sprints: 14, completed_sprints: 10,
    risk: "Low", priority: "High",
  },
];

const HEALTH_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  on_track: { color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", label: "On Track" },
  at_risk:  { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", label: "At Risk" },
  delayed:  { color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",   label: "Delayed"  },
};

const COLORS = ["from-blue-500 to-cyan-400", "from-purple-500 to-pink-400", "from-orange-500 to-yellow-400", "from-green-500 to-emerald-400"];

export default function ProjectsPage() {
  const [projects] = useState(PROJECTS);
  const circumference = 2 * Math.PI * 20;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-blue-400" /> My Projects
          </h1>
          <p className="text-slate-400 text-sm mt-1">Overview of all your active and past projects with NovaTech.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: "1", icon: FolderKanban, color: "text-blue-400" },
          { label: "Overall Completion", value: "68%", icon: TrendingUp, color: "text-green-400" },
          { label: "Current Sprint", value: "#14", icon: Zap, color: "text-purple-400" },
          { label: "Days to Delivery", value: "54", icon: Clock, color: "text-orange-400" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-colors">
            <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Project cards */}
      {projects.map((project, i) => {
        const hc = HEALTH_CONFIG[project.health] || HEALTH_CONFIG.on_track;
        return (
          <motion.div key={project.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-all overflow-hidden">

            {/* Header */}
            <div className="p-6 border-b border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${hc.bg} ${hc.color}`}>{hc.label}</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs border border-red-500/20">{project.priority} Priority</span>
                  </div>
                  <p className="text-slate-400 text-sm">{project.description}</p>
                </div>
                {/* Progress circle */}
                <div className="relative w-16 h-16 shrink-0">
                  <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <motion.circle cx="24" cy="24" r="20" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: circumference - (circumference * project.progress / 100) }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-white font-mono">{project.progress}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y divide-white/5">
              {[
                { label: "Current Phase", value: project.phase, icon: Zap },
                { label: "Budget", value: project.budget, icon: BarChart3 },
                { label: "Start Date", value: new Date(project.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), icon: Calendar },
                { label: "Estimated Delivery", value: new Date(project.estimated_delivery).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), icon: Rocket },
              ].map((detail) => (
                <div key={detail.label} className="p-4">
                  <detail.icon className="w-4 h-4 text-slate-600 mb-2" />
                  <p className="text-xs text-slate-500">{detail.label}</p>
                  <p className="text-sm font-medium text-white mt-0.5">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Progress bar + sprint info */}
            <div className="p-5 border-t border-white/5">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Sprint Progress ({project.completed_sprints}/{project.sprints} sprints complete)</span>
                <span className="text-white font-mono">{project.progress}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.team.map((t, j) => (
                    <div key={j} className={`w-8 h-8 rounded-full bg-gradient-to-br ${COLORS[j % COLORS.length]} border-2 border-[#0a0f1e] flex items-center justify-center text-[10px] font-bold text-white`}>
                      {t}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-[#0a0f1e] flex items-center justify-center text-[10px] text-slate-400">+4</div>
                </div>
                <div className="flex gap-2">
                  <Link href="/portal/timeline" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10 transition-colors">
                    <Activity className="w-3.5 h-3.5" /> Timeline
                  </Link>
                  <Link href="/portal/tasks" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white transition-colors">
                    View Tasks <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* No more projects callout */}
      <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-center">
        <p className="text-slate-400 text-sm">You have <strong className="text-white">1 active project</strong>. Your NovaTech Project Manager will add new projects here as they are created.</p>
      </div>
    </div>
  );
}
