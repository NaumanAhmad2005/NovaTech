"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, Zap, Circle, Lock, Calendar } from "lucide-react";

const PHASES = [
  {
    id: 1, name: "Discovery & Planning", status: "completed",
    start: "Jan 15", end: "Jan 30",
    items: ["Stakeholder interviews", "Requirements gathering", "Project scope definition", "Technology stack selection", "Contract & NDA signed"],
  },
  {
    id: 2, name: "UI/UX Design", status: "completed",
    start: "Feb 1", end: "Feb 28",
    items: ["User flow mapping", "Wireframe creation", "High-fidelity UI designs", "Design system setup", "Client approval received"],
  },
  {
    id: 3, name: "Backend Architecture", status: "completed",
    start: "Mar 1", end: "Mar 20",
    items: ["Database schema design", "API architecture planning", "DevOps pipeline setup", "Server infrastructure provisioned"],
  },
  {
    id: 4, name: "Authentication Module", status: "completed",
    start: "Mar 21", end: "Jun 25",
    items: ["User registration & login", "Google & GitHub OAuth", "Two-factor authentication", "Session management", "Security audit passed"],
  },
  {
    id: 5, name: "Payment Gateway Integration", status: "in_progress",
    start: "Jun 26", end: "Jul 15",
    items: ["Stripe webhook handlers ✓", "Invoice generation (in progress)", "Payment UI implementation (upcoming)", "Receipt & email system (upcoming)"],
  },
  {
    id: 6, name: "CRM & Reporting Modules", status: "upcoming",
    start: "Jul 16", end: "Aug 5",
    items: ["Contact management system", "Pipeline views", "Automated reporting engine", "Data export functionality"],
  },
  {
    id: 7, name: "Final QA & Security Audit", status: "upcoming",
    start: "Aug 6", end: "Aug 12",
    items: ["Full regression testing", "Performance benchmarking", "OWASP security audit", "Client UAT sign-off"],
  },
  {
    id: 8, name: "Production Launch", status: "upcoming",
    start: "Aug 13", end: "Aug 20",
    items: ["DNS migration", "Production deployment", "Monitoring & alerting setup", "Client handover & documentation"],
  },
];

const STATUS_CFG: Record<string, { label: string; color: string; bg: string; ring: string }> = {
  completed:   { label: "Completed",   color: "text-green-400",  bg: "bg-green-500/10 border-green-500/30", ring: "" },
  in_progress: { label: "In Progress", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/30",  ring: "ring-4 ring-blue-500/20" },
  upcoming:    { label: "Upcoming",    color: "text-slate-500",  bg: "bg-white/[0.03] border-white/10",     ring: "" },
};

export default function TimelinePage() {
  const completed = PHASES.filter(p => p.status === "completed").length;
  const total = PHASES.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-400" /> Project Timeline
        </h1>
        <p className="text-slate-400 text-sm mt-1">Interactive roadmap from Discovery to Production Launch.</p>
      </div>

      {/* Overall progress bar */}
      <div className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-semibold">Overall Project Progress</p>
          <span className="text-blue-400 font-mono font-bold text-lg">{pct}%</span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-3">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Jan 15, 2026</span>
          <span>{completed} of {total} phases complete</span>
          <span>Aug 20, 2026</span>
        </div>
      </div>

      {/* Timeline phases */}
      <div className="relative">
        {/* Vertical connector */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500/40 to-white/5 hidden md:block" />

        <div className="space-y-4">
          {PHASES.map((phase, i) => {
            const sc = STATUS_CFG[phase.status];
            return (
              <motion.div key={phase.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex gap-4 md:gap-6">

                {/* Phase icon */}
                <div className={`relative flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${sc.bg} ${sc.ring}`}>
                  {phase.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> :
                   phase.status === "in_progress" ? <Zap className="w-5 h-5 text-blue-400 animate-pulse" /> :
                   <Lock className="w-4 h-4 text-slate-600" />}
                </div>

                {/* Phase card */}
                <div className={`flex-1 p-5 rounded-2xl border mb-2 ${
                  phase.status === "in_progress"
                    ? "bg-blue-500/5 border-blue-500/20"
                    : phase.status === "completed"
                    ? "bg-[#0a0f1e] border-white/5"
                    : "bg-[#0a0f1e] border-white/5 opacity-70"
                }`}>
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-600 font-mono">Phase {phase.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.bg} ${sc.color}`}>{sc.label}</span>
                      </div>
                      <h3 className={`text-base font-bold ${phase.status === "upcoming" ? "text-slate-400" : "text-white"}`}>{phase.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                        <Calendar className="w-3 h-3" /> {phase.start} → {phase.end}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {phase.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          phase.status === "completed" ? "bg-green-400" :
                          phase.status === "in_progress" ? (item.includes("✓") ? "bg-green-400" : item.includes("in progress") ? "bg-blue-400" : "bg-slate-600") :
                          "bg-slate-700"
                        }`} />
                        {item.replace(" ✓", "").replace(" (in progress)", "").replace(" (upcoming)", "")}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 flex-wrap text-xs text-slate-500">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400" />Completed</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />In Progress</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-600" />Upcoming</span>
      </div>
    </div>
  );
}
