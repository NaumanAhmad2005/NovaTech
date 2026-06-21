"use client";

import { motion } from "framer-motion";
import { Activity, Server, Cpu, HardDrive, Database, Wifi, ShieldCheck, AlertCircle } from "lucide-react";

export default function InfrastructurePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" /> Infrastructure
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time metrics, server health, and database monitoring.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          All Systems Operational
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "CPU Usage", value: "24%", icon: Cpu, color: "text-blue-400" },
          { label: "Memory", value: "4.2 GB", icon: Server, color: "text-purple-400" },
          { label: "Storage", value: "45%", icon: HardDrive, color: "text-cyan-400" },
          { label: "Network", value: "1.2 GB/s", icon: Wifi, color: "text-emerald-400" },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <m.icon className={`w-5 h-5 ${m.color}`} />
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${m.color.replace('text', 'bg')}`} style={{ width: m.label === "CPU Usage" ? "24%" : m.label === "Storage" ? "45%" : "60%" }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{m.value}</p>
            <p className="text-xs text-slate-500 mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Health */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-[#0F172A] border border-white/5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-slate-400" /> Database Cluster
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-white">Primary Region (US-East)</p>
                  <p className="text-xs text-slate-400 mt-0.5">Connected • 12ms ping</p>
                </div>
              </div>
              <span className="text-xs font-mono text-white">12,450 req/s</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-white">Read Replica (EU-West)</p>
                  <p className="text-xs text-slate-400 mt-0.5">Syncing • 85ms ping</p>
                </div>
              </div>
              <span className="text-xs font-mono text-white">8,200 req/s</span>
            </div>
          </div>
        </motion.div>

        {/* Alerts / Logs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-[#0F172A] border border-white/5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-slate-400" /> System Alerts
          </h2>
          <div className="space-y-3">
            {[
              { type: "info", msg: "Auto-scaling event triggered: added 2 nodes", time: "10 mins ago" },
              { type: "warning", msg: "High memory usage detected on worker-3", time: "2 hours ago" },
              { type: "success", msg: "Database backup completed successfully", time: "5 hours ago" },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.type === "info" ? "bg-blue-400" : alert.type === "warning" ? "bg-orange-400" : "bg-green-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{alert.msg}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
