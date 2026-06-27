"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, ThumbsUp, ThumbsDown, Clock, CheckCircle, XCircle, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

type ApprovalStatus = "pending" | "approved" | "rejected";

interface Approval {
  id: string;
  title: string;
  category: "Design" | "Feature" | "Deployment" | "Invoice" | "Contract" | "Change Request";
  description: string;
  submitted_by: string;
  submitted_at: string;
  status: ApprovalStatus;
  urgent: boolean;
}

const APPROVALS: Approval[] = [
  { id: "a1", title: "UI Designs — Payment Flow v4", category: "Design", description: "Updated designs for the checkout experience. Includes new card input, 3DS verification screen, and success/failure states.", submitted_by: "Aisha UI", submitted_at: "2026-06-25", status: "pending", urgent: true },
  { id: "a2", title: "Deploy to Production — v1.4.7", category: "Deployment", description: "Hotfix release for payment webhook race condition. Staging tested and passing. Ready for production push.", submitted_by: "Marcus Dev", submitted_at: "2026-06-27", status: "pending", urgent: false },
  { id: "a3", title: "Feature Approval — AI Report Generator", category: "Feature", description: "New feature to auto-generate weekly project reports using GPT-4o. Adds ~$120/month to AI costs.", submitted_by: "Sarah Chen", submitted_at: "2026-06-20", status: "approved", urgent: false },
  { id: "a4", title: "Invoice #INV-004 — $22,500", category: "Invoice", description: "Sprint 13-14 development milestone payment per the signed contract schedule.", submitted_by: "NovaTech Finance", submitted_at: "2026-07-01", status: "pending", urgent: false },
  { id: "a5", title: "NDA Extension — 2 Years", category: "Contract", description: "NDA renewal for an additional 2-year period covering all project IP and source code confidentiality.", submitted_by: "Legal Team", submitted_at: "2026-06-15", status: "rejected", urgent: false },
];

const CATEGORY_COLORS: Record<string, string> = {
  Design:         "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Feature:        "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Deployment:     "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Invoice:        "bg-green-500/10 text-green-400 border-green-500/20",
  Contract:       "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Change Request": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(APPROVALS);
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = filter === "All" ? approvals : approvals.filter(a => a.status === filter.toLowerCase());
  const pending = approvals.filter(a => a.status === "pending").length;

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setLoadingId(id);
    setTimeout(() => {
      setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: action } : a));
      setLoadingId(null);
      alert(`${action === "approved" ? "✅ Approved!" : "❌ Rejected."} Your project team has been notified.`);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-orange-400" /> Approvals
          </h1>
          <p className="text-slate-400 text-sm mt-1">Designs, features, deployments, and documents awaiting your review.</p>
        </div>
        {pending > 0 && (
          <span className="px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs border border-orange-500/20 font-semibold">
            {pending} Pending Review
          </span>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
            {f} {f === "Pending" && pending > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-orange-500 text-white text-[9px]">{pending}</span>}
          </button>
        ))}
      </div>

      {/* Approvals list */}
      <div className="space-y-3">
        {filtered.map((a, i) => {
          const isExpanded = expandedId === a.id;
          const isLoading = loadingId === a.id;
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={`rounded-2xl bg-[#0a0f1e] border overflow-hidden transition-colors ${
                a.status === "pending" ? "border-orange-500/15 hover:border-orange-500/25" : "border-white/5 hover:border-white/10"
              }`}>

              <div className="flex items-center justify-between p-5 gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    a.status === "approved" ? "bg-green-500/10" : a.status === "rejected" ? "bg-red-500/10" : "bg-orange-500/10"
                  }`}>
                    {a.status === "approved" ? <CheckCircle className="w-5 h-5 text-green-400" /> :
                     a.status === "rejected" ? <XCircle className="w-5 h-5 text-red-400" /> :
                     <Clock className="w-5 h-5 text-orange-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${CATEGORY_COLORS[a.category]}`}>{a.category}</span>
                      {a.urgent && <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] border border-red-500/20 font-semibold">Urgent</span>}
                    </div>
                    <p className="text-white font-semibold">{a.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Submitted by {a.submitted_by} · {new Date(a.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {a.status === "pending" && (
                    <>
                      <button disabled={isLoading} onClick={() => handleAction(a.id, "approved")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs border border-green-500/20 transition-colors disabled:opacity-50">
                        <ThumbsUp className="w-3.5 h-3.5" /> {isLoading ? "…" : "Approve"}
                      </button>
                      <button disabled={isLoading} onClick={() => handleAction(a.id, "rejected")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/20 transition-colors disabled:opacity-50">
                        <ThumbsDown className="w-3.5 h-3.5" /> {isLoading ? "…" : "Reject"}
                      </button>
                    </>
                  )}
                  {a.status !== "pending" && (
                    <span className={`text-xs font-semibold flex items-center gap-1 ${a.status === "approved" ? "text-green-400" : "text-red-400"}`}>
                      {a.status === "approved" ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                  )}
                  <button onClick={() => setExpandedId(isExpanded ? null : a.id)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4">
                      <p className="text-sm text-slate-300 leading-relaxed">{a.description}</p>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Add Comment</p>
                        <textarea value={comments[a.id] || ""} onChange={e => setComments(p => ({ ...p, [a.id]: e.target.value }))}
                          rows={2} placeholder="Share your feedback or questions..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none" />
                        <div className="flex justify-end mt-2">
                          <button onClick={() => { alert("Comment submitted!"); setComments(p => ({ ...p, [a.id]: "" })); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs transition-colors">
                            <MessageSquare className="w-3.5 h-3.5" /> Comment
                          </button>
                        </div>
                      </div>
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
