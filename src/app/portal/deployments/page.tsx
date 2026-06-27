"use client";

import { motion } from "framer-motion";
import { Rocket, CheckCircle2, XCircle, Clock, Globe, Server, GitBranch, RotateCw } from "lucide-react";

const ENVIRONMENTS = [
  { name: "Production", url: "app.globaltech.io", status: "healthy", version: "v1.4.6", updated: "Jun 22" },
  { name: "Staging",    url: "staging.globaltech.io", status: "healthy", version: "v1.4.7", updated: "Jun 27" },
  { name: "Development", url: "dev.globaltech.io", status: "deploying", version: "v1.4.8-beta", updated: "Now" },
];

const DEPLOYMENTS = [
  { id: "dep_a1", version: "v1.4.7", env: "staging", status: "success", commit: "fix: payment webhook race condition", branch: "hotfix/webhooks", author: "Marcus Dev", time: "2h ago", duration: "1m 42s" },
  { id: "dep_a2", version: "v1.4.6", env: "production", status: "success", commit: "feat: auth module + session management", branch: "main", author: "Marcus Dev", time: "Jun 22", duration: "2m 05s" },
  { id: "dep_a3", version: "v1.4.5", env: "staging", status: "failed", commit: "chore: upgrade dependencies", branch: "deps-update", author: "Bot", time: "Jun 20", duration: "45s" },
  { id: "dep_a4", version: "v1.4.0", env: "production", status: "success", commit: "feat: dashboard redesign + performance improvements", branch: "main", author: "Full Team", time: "Jun 10", duration: "3m 12s" },
];

export default function DeploymentsPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Rocket className="w-6 h-6 text-orange-400" /> Deployments
          </h1>
          <p className="text-slate-400 text-sm mt-1">Live environment status, build history, and release notes for your project.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">All Systems Operational</span>
        </div>
      </div>

      {/* Environments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ENVIRONMENTS.map((env, i) => (
          <motion.div key={env.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`p-5 rounded-2xl border relative overflow-hidden ${
              env.name === "Production" ? "bg-blue-500/5 border-blue-500/20" : "bg-[#0a0f1e] border-white/5"
            }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${env.name === "Production" ? "bg-blue-500/10 border border-blue-500/20" : "bg-white/5 border border-white/10"}`}>
                  {env.name === "Production" ? <Globe className="w-5 h-5 text-blue-400" /> : <Server className="w-5 h-5 text-slate-400" />}
                </div>
                <div>
                  <p className="text-white font-semibold">{env.name}</p>
                  <p className="text-xs text-slate-500">{env.url}</p>
                </div>
              </div>
              <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold border ${
                env.status === "healthy" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                env.status === "deploying" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                "bg-red-500/10 text-red-400 border-red-500/20"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${env.status === "healthy" ? "bg-green-400" : env.status === "deploying" ? "bg-orange-400 animate-pulse" : "bg-red-400"}`} />
                {env.status === "healthy" ? "Healthy" : env.status === "deploying" ? "Deploying…" : "Down"}
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between"><span>Current version</span><span className="text-white font-mono">{env.version}</span></div>
              <div className="flex justify-between"><span>Last updated</span><span className="text-white">{env.updated}</span></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deployment history */}
      <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-slate-400" /> Deployment History
          </h2>
        </div>
        <div className="divide-y divide-white/5">
          {DEPLOYMENTS.map((dep, i) => (
            <motion.div key={dep.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${dep.status === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                  {dep.status === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-mono text-sm font-bold">{dep.version}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${dep.env === "production" ? "bg-blue-500/20 text-blue-400" : dep.env === "staging" ? "bg-purple-500/20 text-purple-400" : "bg-slate-500/20 text-slate-400"}`}>
                      {dep.env}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mt-0.5">{dep.commit}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span><GitBranch className="w-3 h-3 inline mr-1" />{dep.branch}</span>
                    <span>{dep.author}</span>
                    <span>{dep.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-slate-500 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" /> {dep.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Downtime notice */}
      <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
        <p className="text-xs text-blue-300"><strong className="text-white">📢 Scheduled Maintenance:</strong> Production will undergo routine updates on July 10, 2026 between 2–4 AM UTC. Expected downtime: under 15 minutes.</p>
      </div>
    </div>
  );
}
