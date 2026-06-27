"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette, CheckCircle, Clock, MessageSquare, Download, Eye,
  ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Maximize2, X,
  Layers, GitBranch
} from "lucide-react";

const DESIGNS = [
  {
    id: "1", name: "Authentication Flow — v4", version: "v4.0", status: "pending_approval",
    uploaded: "2026-06-25", designer: "Aisha UI",
    description: "Complete redesign of login, signup, and password reset flows with biometric option.",
    thumbnail: null, category: "UI Design",
  },
  {
    id: "2", name: "Dashboard — Payment Center", version: "v2.1", status: "approved",
    uploaded: "2026-06-18", designer: "Aisha UI",
    description: "Payment center redesign with invoice history, one-click pay, and receipt download.",
    thumbnail: null, category: "UI Design",
  },
  {
    id: "3", name: "Mobile Navigation — v1", version: "v1.0", status: "changes_requested",
    uploaded: "2026-06-10", designer: "Aisha UI",
    description: "Bottom navigation bar for mobile users with gesture support.",
    thumbnail: null, category: "Wireframe",
  },
  {
    id: "4", name: "CRM Data Tables", version: "v3.2", status: "approved",
    uploaded: "2026-06-01", designer: "Aisha UI",
    description: "Enterprise-grade data tables with sorting, filtering, and bulk actions.",
    thumbnail: null, category: "UI Design",
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending_approval: { label: "Pending Approval", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  approved: { label: "Approved", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  changes_requested: { label: "Changes Requested", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  in_review: { label: "In Review", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
};

const CATEGORIES = ["All", "UI Design", "Wireframe", "Prototype", "Design Assets"];

export default function DesignCenterPage() {
  const [designs] = useState(DESIGNS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, string>>({});

  const filtered = activeCategory === "All" ? designs : designs.filter(d => d.category === activeCategory);

  const handleApprove = (id: string) => alert(`Design "${designs.find(d=>d.id===id)?.name}" approved! Your PM will be notified.`);
  const handleReject  = (id: string) => alert(`Change request sent for "${designs.find(d=>d.id===id)?.name}". Leave a comment below.`);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Palette className="w-6 h-6 text-pink-400" /> Design Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">Review, approve, and comment on all design deliverables.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs border border-orange-500/20 font-medium">
            1 Pending Approval
          </span>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === cat ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Version history hint */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
        <GitBranch className="w-4 h-4 text-blue-400 shrink-0" />
        <p className="text-xs text-blue-300">All designs are versioned. Click any card to view version history and leave comments.</p>
      </div>

      {/* Design cards */}
      <div className="space-y-4">
        {filtered.map((design, i) => {
          const sc = STATUS_CONFIG[design.status];
          const isExpanded = expandedId === design.id;
          return (
            <motion.div key={design.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`rounded-2xl bg-[#0a0f1e] border transition-all overflow-hidden ${
                design.status === "pending_approval" ? "border-orange-500/20" : "border-white/5 hover:border-white/10"
              }`}>

              {/* Card header */}
              <div className="flex items-center justify-between p-5">
                <div className="flex items-start gap-4">
                  {/* Preview placeholder */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-semibold">{design.name}</h3>
                      <span className="text-xs text-slate-600 font-mono">{design.version}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.bg} ${sc.color}`}>{sc.label}</span>
                    </div>
                    <p className="text-sm text-slate-400">{design.description}</p>
                    <p className="text-xs text-slate-600 mt-1">By {design.designer} · {new Date(design.uploaded).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-4">
                  {design.status === "pending_approval" && (
                    <>
                      <button onClick={() => handleApprove(design.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs border border-green-500/20 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => handleReject(design.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/20 transition-colors">
                        <ThumbsDown className="w-3.5 h-3.5" /> Request Changes
                      </button>
                    </>
                  )}
                  <button onClick={() => alert("Opening Figma preview...")} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => setExpandedId(isExpanded ? null : design.id)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded view */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4">
                      {/* Version history */}
                      <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Version History</p>
                        <div className="flex gap-2">
                          {[design.version, "v3.1", "v2.0", "v1.0"].map((v) => (
                            <button key={v} className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${v === design.version ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Comment box */}
                      <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Leave a Comment</p>
                        <textarea
                          value={comments[design.id] || ""}
                          onChange={e => setComments(prev => ({ ...prev, [design.id]: e.target.value }))}
                          rows={3} placeholder="Share your feedback on this design..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
                        />
                        <div className="flex justify-end mt-2">
                          <button onClick={() => { alert("Comment submitted!"); setComments(prev => ({ ...prev, [design.id]: "" })); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors">
                            <MessageSquare className="w-3.5 h-3.5" /> Submit Comment
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
