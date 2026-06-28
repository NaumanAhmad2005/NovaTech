"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt, CheckCircle, Clock, AlertTriangle, Download,
  ArrowUpRight, DollarSign, TrendingUp, Calendar
} from "lucide-react";

const INVOICES = [
  { id: "INV-001", amount: 12500, status: "paid",    due_date: "2026-02-01", paid_date: "2026-01-30", description: "Sprint 1-3 Milestone — Kickoff & Discovery", created_at: "2026-01-15" },
  { id: "INV-002", amount: 18000, status: "paid",    due_date: "2026-04-01", paid_date: "2026-03-28", description: "Sprint 4-7 Milestone — Backend Architecture", created_at: "2026-03-15" },
  { id: "INV-003", amount: 35000, status: "paid",    due_date: "2026-05-15", paid_date: "2026-05-14", description: "Design & Architecture Phase Complete", created_at: "2026-05-01" },
  { id: "INV-004", amount: 22500, status: "pending", due_date: "2026-07-15", paid_date: null,          description: "Sprint 13-14 Milestone — Auth + Frontend", created_at: "2026-07-01" },
  { id: "INV-005", amount: 32000, status: "scheduled",due_date: "2026-09-01",paid_date: null,          description: "Final Delivery & Production Launch",        created_at: "2026-08-15" },
];

const STATUS_CFG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  paid:      { label: "Paid",      color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",  icon: CheckCircle   },
  pending:   { label: "Due Soon",  color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: Clock         },
  overdue:   { label: "Overdue",   color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",       icon: AlertTriangle },
  scheduled: { label: "Scheduled", color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20",  icon: Calendar      },
};

export default function InvoicesPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const total   = INVOICES.reduce((s, i) => s + i.amount, 0);
  const paid    = INVOICES.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const pending = INVOICES.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);
  const paidPct = Math.round((paid / total) * 100);

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`Invoice ${id} downloaded successfully.`);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-green-400" /> Invoices
          </h1>
          <p className="text-slate-400 text-sm mt-1">Your complete billing history and upcoming payment schedule.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Contract", value: `$${total.toLocaleString()}`, color: "text-white",        icon: DollarSign, bg: "bg-[#0a0f1e]"        },
          { label: "Total Paid",     value: `$${paid.toLocaleString()}`,  color: "text-green-400",    icon: CheckCircle, bg: "bg-green-500/5 border-green-500/10"  },
          { label: "Outstanding",    value: `$${pending.toLocaleString()}`, color: "text-orange-400", icon: Clock,      bg: "bg-orange-500/5 border-orange-500/10" },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`p-5 rounded-2xl border border-white/5 ${card.bg} flex items-center gap-4`}>
            <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-0.5">{card.label}</p>
              <p className={`text-2xl font-bold font-mono ${card.color}`}>{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-white">Payment Progress</p>
          <span className="text-green-400 font-mono font-bold">{paidPct}% paid</span>
        </div>
        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${paidPct}%` }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-slate-600">
          <span>${paid.toLocaleString()} paid</span>
          <span>${(total - paid).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Invoice list */}
      <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-400" /> Invoice History
          </h2>
          <span className="text-xs text-slate-500">{INVOICES.length} invoices total</span>
        </div>
        <div className="divide-y divide-white/5">
          {INVOICES.map((inv, i) => {
            const sc = STATUS_CFG[inv.status];
            return (
              <motion.div key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${sc.bg}`}>
                    <sc.icon className={`w-5 h-5 ${sc.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white font-bold font-mono text-sm">{inv.id}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] border font-semibold ${sc.bg} ${sc.color}`}>{sc.label}</span>
                    </div>
                    <p className="text-xs text-slate-400">{inv.description}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {inv.status === "paid" ? `Paid on ${new Date(inv.paid_date!).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : `Due ${new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <p className="text-white font-bold font-mono text-lg">${inv.amount.toLocaleString()}</p>
                  {inv.status === "paid" && (
                    <button onClick={() => handleDownload(inv.id)} disabled={downloading === inv.id}
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      {downloading === inv.id
                        ? <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        : <Download className="w-4 h-4" />}
                    </button>
                  )}
                  {inv.status === "pending" && (
                    <button onClick={() => alert("Redirecting to payment portal…")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors">
                      Pay Now <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {inv.status === "scheduled" && (
                    <span className="text-xs text-slate-500 italic">Not yet due</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-600 text-center">
        For billing questions, open a ticket in <span className="text-blue-400">Support</span> or message your Project Manager.
      </p>
    </div>
  );
}
