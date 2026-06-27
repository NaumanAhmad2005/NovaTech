"use client";

import { motion } from "framer-motion";
import { TestTube, Bug, CheckCircle, AlertTriangle, ShieldCheck, Zap, BarChart3 } from "lucide-react";

const BUGS = [
  { id: "BUG-042", title: "Stripe webhook not firing on card decline", severity: "high", status: "resolved", assignee: "Marcus Dev" },
  { id: "BUG-041", title: "Mobile nav dropdown overlapping content", severity: "medium", status: "resolved", assignee: "Reza Frontend" },
  { id: "BUG-040", title: "Email verification link expiring too soon", severity: "low", status: "resolved", assignee: "Marcus Dev" },
  { id: "BUG-043", title: "Pagination resets on filter change", severity: "medium", status: "open", assignee: "Reza Frontend" },
];

const TEST_SUITES = [
  { name: "Unit Tests",        total: 324, passed: 318, color: "blue"   },
  { name: "Integration Tests", total: 87,  passed: 85,  color: "purple" },
  { name: "E2E Tests",         total: 42,  passed: 39,  color: "cyan"   },
  { name: "Security Tests",    total: 28,  passed: 28,  color: "green"  },
];

const SEV_CONFIG: Record<string, { color: string; bg: string }> = {
  high:   { color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20"    },
  medium: { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  low:    { color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20"   },
};

export default function TestingPage() {
  const totalTests = TEST_SUITES.reduce((s, t) => s + t.total, 0);
  const totalPassed = TEST_SUITES.reduce((s, t) => s + t.passed, 0);
  const passRate = Math.round((totalPassed / totalTests) * 100);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <TestTube className="w-6 h-6 text-green-400" /> Testing & QA
        </h1>
        <p className="text-slate-400 text-sm mt-1">Quality assurance status, bug tracker, and security testing overview.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Tests Passing", value: `${passRate}%`, icon: CheckCircle, color: "text-green-400", sub: `${totalPassed}/${totalTests} tests` },
          { label: "Open Bugs", value: "1", icon: Bug, color: "text-orange-400", sub: "1 medium severity" },
          { label: "Resolved Bugs", value: "42", icon: ShieldCheck, color: "text-blue-400", sub: "This sprint" },
          { label: "Performance", value: "94", icon: Zap, color: "text-purple-400", sub: "Lighthouse score" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5">
            <kpi.icon className={`w-5 h-5 ${kpi.color} mb-3`} />
            <p className={`text-2xl font-bold font-mono ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{kpi.label}</p>
            <p className="text-xs text-slate-600 mt-1">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test suites */}
        <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-400" /> Test Suites
          </h2>
          {TEST_SUITES.map((suite, i) => {
            const pct = Math.round((suite.passed / suite.total) * 100);
            return (
              <motion.div key={suite.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.06 }}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white font-medium">{suite.name}</span>
                  <span className="text-slate-400 font-mono">{suite.passed}/{suite.total}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 + i * 0.1 }}
                    className={`h-full rounded-full ${pct === 100 ? "bg-green-500" : "bg-gradient-to-r from-blue-500 to-cyan-400"}`} />
                </div>
                <p className="text-[10px] text-slate-600 mt-1 text-right">{pct}% passing</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bug tracker */}
        <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Bug className="w-4 h-4 text-red-400" /> Bug Tracker
            </h2>
            <span className="text-xs text-green-400 font-medium">1 Open · 3 Resolved</span>
          </div>
          <div className="divide-y divide-white/5">
            {BUGS.map((bug, i) => {
              const sc = SEV_CONFIG[bug.severity];
              return (
                <motion.div key={bug.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bug.status === "resolved" ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"}`}>
                    {bug.status === "resolved" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs text-slate-500 font-mono">{bug.id}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${sc.bg} ${sc.color}`}>{bug.severity}</span>
                    </div>
                    <p className="text-sm text-white truncate">{bug.title}</p>
                    <p className="text-xs text-slate-500">Assignee: {bug.assignee}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security summary */}
      <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-green-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-semibold">Security Audit — Passed ✓</p>
          <p className="text-sm text-slate-400 mt-1">OWASP Top 10 scan completed June 20, 2026. No critical vulnerabilities found. SQL injection, XSS, and CSRF protections are all active. Next scheduled audit: August 2026.</p>
        </div>
      </div>
    </div>
  );
}
