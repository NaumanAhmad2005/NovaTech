"use client";

import { motion } from "framer-motion";
import { Cloud, GitCommit, CheckCircle2, XCircle, Clock, RotateCw, Globe, Server, Terminal } from "lucide-react";

const DEPLOYMENTS = [
  { id: "dep_1x9a", env: "production", status: "success", commit: "feat: update portal UI", branch: "main", author: "Sophia M.", time: "10 mins ago", duration: "1m 45s" },
  { id: "dep_2y8b", env: "staging", status: "success", commit: "fix: invoice calculation bug", branch: "staging", author: "James W.", time: "2 hours ago", duration: "1m 12s" },
  { id: "dep_3z7c", env: "production", status: "failed", commit: "chore: update dependencies", branch: "main", author: "Bot", time: "1 day ago", duration: "45s" },
];

export default function DeploymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <Cloud className="w-6 h-6 text-blue-400" /> Deployments
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage CI/CD pipelines, environments, and rollbacks.</p>
        </div>
        <button 
          onClick={() => alert("Triggering new deployment pipeline...")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          <RotateCw className="w-4 h-4" /> Trigger Deploy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Production Env */}
        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Healthy
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Production</h3>
              <p className="text-xs text-blue-400">app.novatech.io</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex justify-between"><span>Current Release</span><span className="text-white font-mono text-xs">v2.4.1 (dep_1x9a)</span></div>
            <div className="flex justify-between"><span>Last Updated</span><span className="text-white">10 mins ago</span></div>
          </div>
        </div>

        {/* Staging Env */}
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Healthy
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Server className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Staging</h3>
              <p className="text-xs text-purple-400">staging.novatech.io</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex justify-between"><span>Current Release</span><span className="text-white font-mono text-xs">v2.5.0-rc1 (dep_2y8b)</span></div>
            <div className="flex justify-between"><span>Last Updated</span><span className="text-white">2 hours ago</span></div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0F172A] border border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-semibold text-white">Recent Deployments</h2>
        </div>
        <div className="divide-y divide-white/5">
          {DEPLOYMENTS.map((dep, i) => (
            <motion.div key={dep.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                {dep.status === "success" ? (
                  <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0"><XCircle className="w-4 h-4" /></div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{dep.commit}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${dep.env === "production" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>{dep.env}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><GitCommit className="w-3 h-3" /> {dep.branch}</span>
                    <span>by {dep.author}</span>
                    <span>{dep.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">{dep.id}</span>
                <p className="text-xs text-slate-500 mt-1 flex items-center justify-end gap-1"><Clock className="w-3 h-3" /> {dep.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
