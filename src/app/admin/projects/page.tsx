"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban, Plus, Search, MoreHorizontal, Users,
  Calendar, Activity, CheckCircle2, Circle, PlayCircle, PauseCircle,
  X, Save
} from "lucide-react";

type ProjectStatus = "active" | "completed" | "paused" | "cancelled";

interface Project {
  id: string;
  title: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  phase: string;
  team: string[];
  start_date: string;
  estimated_delivery: string;
  budget: string;
}

const DEMO_PROJECTS: Project[] = [
  { id: "1", title: "GlobalTech Enterprise App", client: "Sophia Martinez", status: "active", progress: 68, phase: "Phase 3: Development", team: ["AM", "SR", "JK"], start_date: "2026-01-15", estimated_delivery: "2026-07-28", budget: "$85,000" },
  { id: "2", title: "FinTech Compliance Platform", client: "Priya Sharma", status: "active", progress: 22, phase: "Phase 1: Discovery", team: ["TS", "AM"], start_date: "2026-05-01", estimated_delivery: "2026-11-30", budget: "$120,000" },
  { id: "3", title: "Acme Corp ERP Migration", client: "James Wilson", status: "paused", progress: 45, phase: "Phase 2: Design", team: ["JK", "SR", "PL", "TS"], start_date: "2025-11-01", estimated_delivery: "2026-08-30", budget: "$75,000" },
  { id: "4", title: "FoodDelivery Mobile App", client: "Omar Hassan", status: "completed", progress: 100, phase: "Delivered", team: ["AM", "PL"], start_date: "2025-08-01", estimated_delivery: "2025-12-15", budget: "$32,000" },
];

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; icon: any }> = {
  active:    { label: "Active",    color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",  icon: PlayCircle    },
  completed: { label: "Completed", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",   icon: CheckCircle2  },
  paused:    { label: "Paused",    color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: PauseCircle   },
  cancelled: { label: "Cancelled", color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",      icon: Circle        },
};

const COLORS = ["bg-blue-500", "bg-purple-500", "bg-cyan-500", "bg-pink-500", "bg-emerald-500"];

export default function AdminProjectsPage() {
  const [projects] = useState<Project[]>(DEMO_PROJECTS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    const matchSearch = !search || [p.title, p.client].some(v => v.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all active and completed client projects.</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["all", "active", "paused", "completed"] as const).map(s => {
          const count = s === "all" ? projects.length : projects.filter(p => p.status === s).length;
          return (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`p-4 rounded-2xl border text-left transition-all ${filterStatus === s ? "border-blue-500/40 bg-blue-500/10" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}>
              <p className="text-2xl font-bold text-white font-mono">{count}</p>
              <p className="text-xs text-slate-500 capitalize mt-1">{s === "all" ? "All projects" : `${s}`}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search projects or clients..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((project, i) => {
          const sc = STATUS_CONFIG[project.status];
          const StatusIcon = sc.icon;
          const circumference = 2 * Math.PI * 20;
          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-[#0F172A] border border-white/5 hover:border-white/10 transition-colors group">
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5"><Users className="w-3 h-3" />{project.client}</p>
                </div>
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ml-3 ${sc.bg} ${sc.color}`}>
                  <StatusIcon className="w-3 h-3" /> {sc.label}
                </span>
              </div>

              {/* Progress ring + info */}
              <div className="flex items-center gap-5 mb-5">
                <div className="relative w-14 h-14 shrink-0">
                  <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <motion.circle cx="24" cy="24" r="20" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: circumference - (circumference * project.progress / 100) }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 + i * 0.08 }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white font-mono">{project.progress}%</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div>
                    <p className="text-xs text-slate-500">Current Phase</p>
                    <p className="text-sm text-white font-medium">{project.phase}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Budget</p>
                    <p className="text-sm text-green-400 font-medium font-mono">{project.budget}</p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Started {new Date(project.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                <span className="flex items-center gap-1"><Activity className="w-3 h-3" />Due {new Date(project.estimated_delivery).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>

              {/* Team avatars */}
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.team.map((initials, j) => (
                    <div key={j} className={`w-7 h-7 rounded-full ${COLORS[j % COLORS.length]} border-2 border-[#0F172A] flex items-center justify-center text-[10px] font-bold text-white`}>
                      {initials}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full bg-white/5 border-2 border-[#0F172A] flex items-center justify-center">
                    <MoreHorizontal className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailsModal(project)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  View Details →
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-white/10 rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowNewModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-6">Create New Project</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Project Title</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. Acme ERP System" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Client Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Duration</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. 6 Months" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Total Sprints</label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="12" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Price / Budget</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="$50,000" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowNewModal(false)} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">Cancel</button>
              <button onClick={() => setShowNewModal(false)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
                <Save className="w-4 h-4" /> Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-white/10 rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowDetailsModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-2">{showDetailsModal.title}</h2>
            <p className="text-sm text-slate-400 flex items-center gap-2 mb-6"><Users className="w-4 h-4" /> {showDetailsModal.client}</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-slate-400">Status</span>
                <span className={`text-sm font-medium capitalize ${STATUS_CONFIG[showDetailsModal.status].color}`}>{showDetailsModal.status}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-slate-400">Current Phase</span>
                <span className="text-sm font-medium text-white">{showDetailsModal.phase}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-slate-400">Progress</span>
                <span className="text-sm font-medium text-white">{showDetailsModal.progress}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-slate-400">Budget</span>
                <span className="text-sm font-mono text-green-400">{showDetailsModal.budget}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Start Date</span>
                  <span className="text-sm font-medium text-white">{new Date(showDetailsModal.start_date).toLocaleDateString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Est. Delivery</span>
                  <span className="text-sm font-medium text-white">{new Date(showDetailsModal.estimated_delivery).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
              <button onClick={() => setShowDetailsModal(null)} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
