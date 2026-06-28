"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, Plus, CheckCircle, Clock, XCircle, AlertCircle,
  DollarSign, Calendar, ChevronDown, ChevronUp, X, FileText
} from "lucide-react";

type CRStatus = "pending" | "approved" | "rejected" | "in_review";

interface ChangeRequest {
  id: string; title: string; description: string;
  status: CRStatus; impact_cost: number; impact_days: number;
  submitted: string; category: string; reason: string;
}

const CHANGE_REQUESTS: ChangeRequest[] = [
  {
    id: "CR-001", title: "Add AI-Powered Report Generator",
    description: "Integrate GPT-4o to automatically generate weekly and monthly project health reports, saving ~4 hours/week of manual work.",
    status: "approved", impact_cost: 8000, impact_days: 5,
    submitted: "Jun 20, 2026", category: "Feature Addition",
    reason: "Client requested automated reporting capability to share with internal stakeholders.",
  },
  {
    id: "CR-002", title: "Mobile App Version (iOS & Android)",
    description: "Build native React Native companion app for the client portal with push notifications and offline support.",
    status: "in_review", impact_cost: 35000, impact_days: 45,
    submitted: "Jun 25, 2026", category: "Scope Expansion",
    reason: "Client's end-users are primarily mobile — a native app will significantly improve adoption.",
  },
  {
    id: "CR-003", title: "WhatsApp Business Integration",
    description: "Add WhatsApp notification channel for project updates, invoice alerts, and meeting reminders.",
    status: "pending", impact_cost: 3500, impact_days: 3,
    submitted: "Jun 27, 2026", category: "Integration",
    reason: "Client's team uses WhatsApp as primary communication tool.",
  },
  {
    id: "CR-004", title: "Dark/Light Theme Toggle",
    description: "Add system-wide theme toggle so end-users can switch between dark and light mode.",
    status: "rejected", impact_cost: 2000, impact_days: 2,
    submitted: "Jun 10, 2026", category: "UI Enhancement",
    reason: "Design team suggested this during sprint planning.",
  },
];

const STATUS_CFG: Record<CRStatus, { label: string; color: string; bg: string; icon: any }> = {
  pending:   { label: "Pending Review", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: Clock       },
  in_review: { label: "In Review",      color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",   icon: AlertCircle  },
  approved:  { label: "Approved",       color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",  icon: CheckCircle  },
  rejected:  { label: "Rejected",       color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",      icon: XCircle      },
};

export default function ChangeRequestsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Feature Addition", description: "", reason: "" });
  const [filter, setFilter] = useState<"all" | CRStatus>("all");

  const filtered = filter === "all" ? CHANGE_REQUESTS : CHANGE_REQUESTS.filter(cr => cr.status === filter);

  const handleSubmit = () => {
    if (!form.title || !form.description) return;
    setSubmitted(true);
    setShowNew(false);
    setForm({ title: "", category: "Feature Addition", description: "", reason: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-cyan-400" /> Change Requests
          </h1>
          <p className="text-slate-400 text-sm mt-1">Request and track scope changes, new features, and project modifications.</p>
        </div>
        <button onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      {/* Success banner */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
            <p className="text-green-300 text-sm">Change request submitted! Your project manager will review and respond within 2 business days.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["pending", "in_review", "approved", "rejected"] as CRStatus[]).map(s => {
          const count = CHANGE_REQUESTS.filter(cr => cr.status === s).length;
          const sc = STATUS_CFG[s];
          return (
            <button key={s} onClick={() => setFilter(filter === s ? "all" : s)}
              className={`p-4 rounded-2xl border text-center transition-all ${filter === s ? sc.bg + " ring-1 ring-" + sc.color.split("-")[1] + "-400/30" : sc.bg} hover:scale-105`}>
              <p className={`text-xl font-bold font-mono ${sc.color}`}>{count}</p>
              <p className={`text-xs font-medium mt-0.5 ${sc.color}`}>{sc.label}</p>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showNew && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowNew(false)} className="fixed inset-0 bg-[#050816]/70 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 px-4">
              <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold">New Change Request</h3>
                  <button onClick={() => setShowNew(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Title *</label>
                  <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Brief title of the requested change"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                    {["Feature Addition", "Scope Expansion", "Integration", "UI Enhancement", "Bug Fix", "Performance", "Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Description *</label>
                  <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
                    placeholder="Describe the change in detail — what, why, and expected outcome…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Business Reason</label>
                  <textarea value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} rows={2}
                    placeholder="Why is this change needed? What business value does it bring?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none" />
                </div>
                <p className="text-xs text-slate-500">ℹ️ Your project manager will assess the cost and timeline impact and respond within 2 business days.</p>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setShowNew(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
                  <button onClick={handleSubmit} disabled={!form.title || !form.description}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors disabled:opacity-40">
                    Submit Request
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Change request list */}
      <div className="space-y-3">
        {filtered.map((cr, i) => {
          const sc = STATUS_CFG[cr.status];
          const isExpanded = expanded === cr.id;
          return (
            <motion.div key={cr.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-all overflow-hidden">
              <button onClick={() => setExpanded(isExpanded ? null : cr.id)} className="w-full flex items-center justify-between p-5 text-left gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sc.bg}`}>
                    <sc.icon className={`w-5 h-5 ${sc.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono text-slate-500">{cr.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] border font-semibold ${sc.bg} ${sc.color}`}>{sc.label}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-500 text-[10px] border border-white/10">{cr.category}</span>
                    </div>
                    <p className="text-white font-semibold">{cr.title}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />+${cr.impact_cost.toLocaleString()} est. cost</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />+{cr.impact_days} days</span>
                      <span>Submitted {cr.submitted}</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-3">
                      <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Description</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{cr.description}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Business Reason</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{cr.reason}</p>
                      </div>
                      {cr.status === "rejected" && (
                        <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                          <p className="text-xs text-red-300">This request was not approved at this time. Contact your project manager for more details.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
