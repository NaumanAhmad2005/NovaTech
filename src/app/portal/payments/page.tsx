"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle, Clock, Download, ArrowUpRight, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PAYMENTS = [
  { id: "TXN-001", amount: 12500, date: "2026-02-01", method: "Wire Transfer", status: "completed", desc: "Sprint 1-3 Milestone" },
  { id: "TXN-002", amount: 18000, date: "2026-04-01", method: "Wire Transfer", status: "completed", desc: "Sprint 4-7 Milestone" },
  { id: "TXN-003", amount: 35000, date: "2026-05-15", method: "Bank Transfer", status: "completed", desc: "Design & Architecture Phase" },
  { id: "TXN-004", amount: 22500, date: "2026-07-15", method: "Wire Transfer", status: "upcoming", desc: "Sprint 13-14 Milestone" },
  { id: "TXN-005", amount: 32000, date: "2026-09-01", method: "TBD", status: "scheduled", desc: "Final Delivery & Launch" },
];

const CHART_DATA = [
  { month: "Feb", paid: 12500 }, { month: "Apr", paid: 18000 },
  { month: "May", paid: 35000 }, { month: "Jul", paid: 0 }, { month: "Sep", paid: 0 },
];

export default function PaymentsPage() {
  const totalPaid = PAYMENTS.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);
  const totalPending = PAYMENTS.filter(p => p.status !== "completed").reduce((s, p) => s + p.amount, 0);
  const totalProject = PAYMENTS.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-green-400" /> Payment Timeline
        </h1>
        <p className="text-slate-400 text-sm mt-1">Full transaction history, upcoming payments, and receipt downloads.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Paid", value: `$${totalPaid.toLocaleString()}`, color: "text-green-400", icon: CheckCircle },
          { label: "Outstanding", value: `$${totalPending.toLocaleString()}`, color: "text-orange-400", icon: Clock },
          { label: "Project Total", value: `$${totalProject.toLocaleString()}`, color: "text-white", icon: DollarSign },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl bg-[#0a0f1e] border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-[#0a0f1e] border border-white/5">
        <h2 className="text-sm font-semibold text-white mb-4">Payment History</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="month" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff10", borderRadius: "8px" }} itemStyle={{ color: "#10B981" }} />
              <Area type="monotone" dataKey="paid" stroke="#10B981" strokeWidth={2} fill="url(#payGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Transaction list */}
      <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">All Transactions</h2>
        </div>
        <div className="divide-y divide-white/5">
          {PAYMENTS.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  p.status === "completed" ? "bg-green-500/10" : p.status === "upcoming" ? "bg-orange-500/10" : "bg-slate-500/10"
                }`}>
                  {p.status === "completed" ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Clock className={`w-5 h-5 ${p.status === "upcoming" ? "text-orange-400" : "text-slate-400"}`} />}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{p.desc}</p>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                    <span className="font-mono">{p.id}</span>
                    <span>·</span>
                    <span>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span>·</span>
                    <span>{p.method}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-white font-bold font-mono">${p.amount.toLocaleString()}</p>
                  <span className={`text-xs font-medium ${p.status === "completed" ? "text-green-400" : p.status === "upcoming" ? "text-orange-400" : "text-slate-400"}`}>
                    {p.status === "completed" ? "Paid" : p.status === "upcoming" ? "Due Soon" : "Scheduled"}
                  </span>
                </div>
                {p.status === "completed" && (
                  <button onClick={() => alert(`Downloading receipt for ${p.id}...`)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/10">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                )}
                {p.status === "upcoming" && (
                  <button onClick={() => alert("Redirecting to payment portal...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs transition-colors">
                    Pay Now <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
