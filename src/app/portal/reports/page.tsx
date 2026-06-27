"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Download, TrendingUp, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const SPRINT_DATA = [
  { sprint: "S10", completed: 22, planned: 24 }, { sprint: "S11", completed: 20, planned: 22 },
  { sprint: "S12", completed: 25, planned: 25 }, { sprint: "S13", completed: 19, planned: 20 },
  { sprint: "S14", completed: 18, planned: 25 },
];

const HEALTH_DATA = [
  { name: "On Track", value: 78, color: "#10B981" },
  { name: "At Risk", value: 14, color: "#F59E0B" },
  { name: "Delayed", value: 8, color: "#EF4444" },
];

const WEEKLY = [
  { week: "W23", tasks: 12 }, { week: "W24", tasks: 18 }, { week: "W25", tasks: 15 },
  { week: "W26", tasks: 22 }, { week: "W27", tasks: 19 },
];

const REPORTS = [
  { id: "R001", title: "Weekly Progress Report — Week 26", type: "Weekly", date: "Jun 27, 2026", summary: "14 tasks completed. Sprint 14 at 72%. Staging deploy successful.", health: "good" },
  { id: "R002", title: "Monthly Report — June 2026", type: "Monthly", date: "Jun 30, 2026", summary: "68% overall progress. 3 milestones hit. 1 scope change requested.", health: "good" },
  { id: "R003", title: "Security Audit Report — Q2", type: "Security", date: "Jun 20, 2026", summary: "OWASP Top 10 audit passed. No critical issues. 2 informational findings.", health: "good" },
  { id: "R004", title: "Performance Report — Jun 2026", type: "Performance", date: "Jun 25, 2026", summary: "Lighthouse: 94. API avg response: 180ms. Bundle size reduced by 23%.", health: "good" },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "reports">("overview");

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" /> Reports
          </h1>
          <p className="text-slate-400 text-sm mt-1">Project health, sprint velocity, and performance analytics.</p>
        </div>
        <button onClick={() => alert("Generating full PDF report...")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">
          <Download className="w-4 h-4" /> Download Report
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "reports"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
            {tab === "overview" ? "Analytics Overview" : "Report Library"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Sprint Velocity", value: "20.8 pts", icon: TrendingUp, color: "text-purple-400" },
              { label: "Tasks This Week", value: "19", icon: CheckCircle, color: "text-green-400" },
              { label: "On-Time Rate", value: "92%", icon: Calendar, color: "text-blue-400" },
              { label: "Open Risks", value: "1", icon: AlertCircle, color: "text-orange-400" },
            ].map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5">
                <kpi.icon className={`w-5 h-5 ${kpi.color} mb-3`} />
                <p className={`text-2xl font-bold font-mono ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-slate-500 mt-1">{kpi.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sprint velocity chart */}
            <div className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5">
              <h3 className="text-sm font-semibold text-white mb-4">Sprint Velocity (Last 5 Sprints)</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SPRINT_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="sprint" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff10", borderRadius: "8px" }} />
                    <Bar dataKey="planned" fill="#ffffff10" radius={[4, 4, 0, 0]} name="Planned" />
                    <Bar dataKey="completed" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Health pie */}
            <div className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5">
              <h3 className="text-sm font-semibold text-white mb-4">Project Health Distribution</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={HEALTH_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                      {HEALTH_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff10", borderRadius: "8px" }} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly activity */}
            <div className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 lg:col-span-2">
              <h3 className="text-sm font-semibold text-white mb-4">Weekly Task Completion</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WEEKLY} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="taskGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="week" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff10", borderRadius: "8px" }} />
                    <Area type="monotone" dataKey="tasks" stroke="#3B82F6" strokeWidth={2} fill="url(#taskGrad)" name="Tasks completed" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-3">
          {REPORTS.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] border border-purple-500/20 font-semibold">{r.type}</span>
                    <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] border border-green-500/20 font-semibold">Healthy</span>
                  </div>
                  <h3 className="text-white font-semibold">{r.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{r.summary}</p>
                  <p className="text-xs text-slate-600 mt-2">{r.date}</p>
                </div>
                <button onClick={() => alert(`Downloading ${r.title}...`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10 transition-colors shrink-0">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
