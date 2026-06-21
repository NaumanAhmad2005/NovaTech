"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LifeBuoy, Plus, Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

type TicketStatus = "open" | "in_progress" | "resolved";

interface Ticket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: "low" | "medium" | "high";
  created_at: string;
  last_reply: string;
}

const DEMO_TICKETS: Ticket[] = [
  { id: "TKT-001", subject: "Cannot download files from the portal", status: "resolved", priority: "medium", created_at: "2026-06-10T00:00:00Z", last_reply: "2026-06-11T00:00:00Z" },
  { id: "TKT-002", subject: "Invoice #INV-003 showing wrong amount", status: "in_progress", priority: "high", created_at: "2026-06-18T00:00:00Z", last_reply: "2026-06-20T00:00:00Z" },
];

function StatusBadge({ status }: { status: TicketStatus }) {
  const c = {
    open: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    in_progress: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    resolved: "bg-green-500/10 text-green-400 border-green-500/20",
  }[status];
  const l = { open: "Open", in_progress: "In Progress", resolved: "Resolved" }[status];
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${c}`}>{l}</span>;
}
function PriorityDot({ priority }: { priority: Ticket["priority"] }) {
  const c = { low: "bg-slate-400", medium: "bg-yellow-400", high: "bg-red-400" }[priority];
  return <span className={`w-2 h-2 rounded-full ${c} shrink-0`} title={`${priority} priority`} />;
}

export default function SupportPage() {
  const [tickets] = useState<Ticket[]>(DEMO_TICKETS);
  const [showNew, setShowNew] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) return;
    setSubmitted(true);
    setShowNew(false);
    setSubject(""); setMessage("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Support</h1>
          <p className="text-slate-400 text-sm mt-1">Get help from your project team.</p>
        </div>
        <button onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      {submitted && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <p className="text-green-300 text-sm">Your ticket has been submitted. We'll respond within 24 hours.</p>
        </motion.div>
      )}

      {showNew && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-[#0F172A] border border-white/10 space-y-4">
          <h3 className="text-white font-semibold">New Support Ticket</h3>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)}
              placeholder="Brief description of your issue"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 placeholder:text-slate-600" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
              placeholder="Describe the issue in detail..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 placeholder:text-slate-600 resize-none" />
          </div>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowNew(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
            <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">Submit Ticket</button>
          </div>
        </motion.div>
      )}

      <div className="rounded-2xl bg-[#0F172A] border border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">Your Tickets</h2>
        </div>
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <LifeBuoy className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm">No support tickets yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {tickets.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <PriorityDot priority={t.priority} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono">{t.id}</span>
                    </div>
                    <p className="text-white text-sm font-medium mt-0.5">{t.subject}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Last updated {new Date(t.last_reply).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={t.status} />
                  <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
