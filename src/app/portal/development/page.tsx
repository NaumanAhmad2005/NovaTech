"use client";

import { motion } from "framer-motion";
import { Code2, Server, Globe, Database, Cpu, CheckCircle, Clock, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MODULES = [
  { name: "Authentication System", progress: 100, status: "completed", owner: "Marcus Dev", desc: "JWT auth, OAuth (Google/GitHub), 2FA, session management." },
  { name: "User Dashboard", progress: 100, status: "completed", owner: "Reza Frontend", desc: "Analytics widgets, activity feeds, quick actions panel." },
  { name: "Payment Gateway", progress: 78, status: "in_progress", owner: "Marcus Dev", desc: "Stripe integration, webhook handlers, invoice generation." },
  { name: "CRM Module", progress: 45, status: "in_progress", owner: "Reza Frontend", desc: "Client management, pipeline, contact history, automation." },
  { name: "Reporting Engine", progress: 20, status: "planned", owner: "Data Team", desc: "Weekly/monthly PDF reports, custom dashboards, exports." },
  { name: "Admin Panel", progress: 60, status: "in_progress", owner: "Full Stack", desc: "Internal tool for NovaTech team to manage all clients." },
];

const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  completed:   { label: "Completed",   color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20"  },
  in_progress: { label: "In Progress", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20"    },
  planned:     { label: "Planned",     color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20"  },
};

const LAYERS = [
  { icon: Globe,    label: "Frontend",    tech: "Next.js 16 · TypeScript · TailwindCSS",  progress: 58 },
  { icon: Server,   label: "Backend",     tech: "Node.js · Express · REST + WebSockets",  progress: 75 },
  { icon: Database, label: "Database",    tech: "Supabase (PostgreSQL) · Row-Level Security", progress: 90 },
  { icon: Cpu,      label: "AI Services", tech: "OpenAI GPT-4o · Embeddings · RAG",        progress: 30 },
];

const RELEASES = [
  { version: "v1.4.7", date: "Jun 27", env: "Staging", summary: "Fixed payment webhook race condition. Improved error boundaries." },
  { version: "v1.4.6", date: "Jun 22", env: "Production", summary: "Auth module deployed. Session expiry bug fixed." },
  { version: "v1.4.0", date: "Jun 10", env: "Production", summary: "Dashboard redesign shipped. Performance improved by 40%." },
];

export default function DevelopmentPage() {
  const overall = Math.round(MODULES.reduce((s, m) => s + m.progress, 0) / MODULES.length);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-6 h-6 text-cyan-400" /> Development Center
        </h1>
        <p className="text-slate-400 text-sm mt-1">Real-time view of your project's technical progress.</p>
      </div>

      {/* Layer progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {LAYERS.map((layer, i) => (
          <motion.div key={layer.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <layer.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{layer.label}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{layer.tech}</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Progress</span><span className="text-white font-mono">{layer.progress}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${layer.progress}%` }} transition={{ duration: 1, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Feature modules */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" /> Feature Modules
              </h2>
              <span className="text-xs text-slate-500">Overall: <span className="text-white font-mono font-bold">{overall}%</span></span>
            </div>
            <div className="divide-y divide-white/5">
              {MODULES.map((mod, i) => {
                const sc = STATUS_CFG[mod.status];
                return (
                  <motion.div key={mod.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    className="p-5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="text-white font-medium text-sm">{mod.name}</p>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.bg} ${sc.color}`}>{sc.label}</span>
                        </div>
                        <p className="text-xs text-slate-500">{mod.desc}</p>
                        <p className="text-xs text-slate-600 mt-1">Owner: {mod.owner}</p>
                      </div>
                      <span className={`text-2xl font-bold font-mono shrink-0 ${mod.progress === 100 ? "text-green-400" : "text-white"}`}>
                        {mod.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${mod.progress}%` }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 + i * 0.07 }}
                        className={`h-full rounded-full ${mod.progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-blue-500 to-cyan-400"}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Release notes */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5">
              <h2 className="text-sm font-semibold text-white">Latest Releases</h2>
            </div>
            <div className="divide-y divide-white/5">
              {RELEASES.map((r, i) => (
                <div key={r.version} className="p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-mono text-sm font-bold">{r.version}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${r.env === "Production" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
                      {r.env}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{r.date}</p>
                  <p className="text-xs text-slate-400">{r.summary}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-white/5">
              <Link href="/portal/deployments" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                View all deployments <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Status card */}
          <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-white font-semibold text-sm">All Systems Operational</p>
            </div>
            <p className="text-xs text-slate-400">Staging and production environments are healthy. No incidents in the last 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
