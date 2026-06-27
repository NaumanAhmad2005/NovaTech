"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard, Plus, Download, CheckCircle, Clock, AlertTriangle,
  TrendingUp, DollarSign, ArrowUpRight, MoreHorizontal, Send, Receipt
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

type InvoiceStatus = "paid" | "pending" | "overdue";

interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  status: InvoiceStatus;
  due_date: string;
  issued_date: string;
}

const revenueData = [
  { month: "Jan", revenue: 12500 }, { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 24000 }, { month: "Apr", revenue: 19500 },
  { month: "May", revenue: 32000 }, { month: "Jun", revenue: 28500 },
  { month: "Jul", revenue: 45000 },
];

const DEMO_INVOICES: Invoice[] = [
  { id: "INV-001", client: "Sophia Martinez", project: "GlobalTech Enterprise App", amount: 12500, status: "paid", due_date: "2026-02-01", issued_date: "2026-01-15" },
  { id: "INV-002", client: "Sophia Martinez", project: "GlobalTech Enterprise App", amount: 18000, status: "paid", due_date: "2026-04-01", issued_date: "2026-03-15" },
  { id: "INV-003", client: "Priya Sharma", project: "FinTech Compliance Platform", amount: 35000, status: "paid", due_date: "2026-05-01", issued_date: "2026-04-15" },
  { id: "INV-004", client: "Sophia Martinez", project: "GlobalTech Enterprise App", amount: 22500, status: "pending", due_date: "2026-08-01", issued_date: "2026-07-01" },
  { id: "INV-005", client: "James Wilson", project: "Acme Corp ERP Migration", amount: 15000, status: "overdue", due_date: "2026-06-01", issued_date: "2026-05-01" },
];

const STATUS_CONFIG: Record<InvoiceStatus, { color: string; bg: string; icon: any }> = {
  paid:    { color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",   icon: CheckCircle    },
  pending: { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: Clock          },
  overdue: { color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",       icon: AlertTriangle  },
};

export default function AdminFinancePage() {
  const [invoices] = useState<Invoice[]>(DEMO_INVOICES);
  const [filterStatus, setFilterStatus] = useState<InvoiceStatus | "all">("all");

  const totalRevenue = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  const filtered = filterStatus === "all" ? invoices : invoices.filter(i => i.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight">Finance</h1>
          <p className="text-slate-400 text-sm mt-1">Revenue overview, invoices, and payment tracking.</p>
        </div>
        <button 
          onClick={() => alert("Redirecting to Invoice Generator...")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Generate Invoice
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Revenue", value: totalRevenue, color: "text-white", icon: DollarSign, bg: "bg-blue-500/10", iconColor: "text-blue-400", change: "+18%" },
          { label: "Pending", value: pending, color: "text-orange-400", icon: Clock, bg: "bg-orange-500/10", iconColor: "text-orange-400", change: `${invoices.filter(i => i.status === "pending").length} invoices` },
          { label: "Overdue", value: overdue, color: "text-red-400", icon: AlertTriangle, bg: "bg-red-500/10", iconColor: "text-red-400", change: `${invoices.filter(i => i.status === "overdue").length} invoices` },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <span className="text-xs text-green-400 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />{card.change}</span>
            </div>
            <p className={`text-2xl font-bold font-mono ${card.color}`}>${card.value.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Revenue Trend</h2>
          <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
            <TrendingUp className="w-4 h-4" /> +23% this quarter
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="finGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="month" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff10", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#finGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Invoice table */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-base font-semibold text-white">Invoices</h2>
          <div className="flex gap-2">
            {(["all", "paid", "pending", "overdue"] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${filterStatus === s ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {filtered.map((inv, i) => {
            const sc = STATUS_CONFIG[inv.status];
            const StatusIcon = sc.icon;
            return (
              <motion.div key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Receipt className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-mono">{inv.id}</span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${sc.bg} ${sc.color}`}>
                      <StatusIcon className="w-2.5 h-2.5" /> {inv.status}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium mt-0.5">{inv.client}</p>
                  <p className="text-xs text-slate-500">{inv.project}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold font-mono">${inv.amount.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Due {new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert(`Invoice ${inv.id} sent to ${inv.client} via email.`)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Send">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => alert(`Downloading PDF for invoice ${inv.id}...`)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Download">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
