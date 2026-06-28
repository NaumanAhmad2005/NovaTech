"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LifeBuoy, Plus, CheckCircle, AlertCircle, Clock,
  MessageSquare, X, Send, ChevronDown, ChevronUp, Search
} from "lucide-react";

type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";
type TicketCategory = "Technical" | "Billing" | "Design" | "General" | "Bug Report";

interface TicketReply {
  id: string; sender: string; initials: string;
  color: string; time: string; message: string; isAgent: boolean;
}

interface Ticket {
  id: string; subject: string; category: TicketCategory;
  status: TicketStatus; priority: TicketPriority;
  created_at: string; last_reply: string;
  replies: TicketReply[];
}

const TICKETS: Ticket[] = [
  {
    id: "TKT-001", subject: "Cannot download files from the portal", category: "Technical",
    status: "resolved", priority: "medium", created_at: "Jun 10, 2026", last_reply: "Jun 11, 2026",
    replies: [
      { id: "r1", sender: "Ahmed", initials: "AH", color: "from-slate-600 to-slate-700", time: "Jun 10, 10:15 AM", message: "I'm trying to download the architecture diagram but the button shows a loading spinner and nothing happens.", isAgent: false },
      { id: "r2", sender: "Support", initials: "NT", color: "from-blue-500 to-cyan-400", time: "Jun 10, 11:30 AM", message: "Hi Ahmed! We've identified the issue — it was a CORS policy blocking direct downloads. We've pushed a fix to production. Please try again and let us know if it works.", isAgent: true },
      { id: "r3", sender: "Ahmed", initials: "AH", color: "from-slate-600 to-slate-700", time: "Jun 11, 9:00 AM", message: "Working perfectly now! Thank you for the quick fix.", isAgent: false },
      { id: "r4", sender: "Support", initials: "NT", color: "from-blue-500 to-cyan-400", time: "Jun 11, 9:10 AM", message: "Great to hear! I'll mark this ticket as resolved. Don't hesitate to reach out if anything else comes up.", isAgent: true },
    ],
  },
  {
    id: "TKT-002", subject: "Invoice #INV-003 showing wrong amount", category: "Billing",
    status: "in_progress", priority: "high", created_at: "Jun 18, 2026", last_reply: "Jun 20, 2026",
    replies: [
      { id: "r1", sender: "Ahmed", initials: "AH", color: "from-slate-600 to-slate-700", time: "Jun 18, 2:30 PM", message: "Invoice INV-003 shows $18,000 but according to our contract it should be $17,500. Please review and reissue if needed.", isAgent: false },
      { id: "r2", sender: "Finance", initials: "NT", color: "from-green-500 to-emerald-400", time: "Jun 19, 10:00 AM", message: "Hi Ahmed, thank you for flagging this. We're reviewing the invoice against the signed contract now. We'll get back to you within 24 hours with the corrected invoice if there's an error.", isAgent: true },
    ],
  },
];

const STATUS_CFG: Record<TicketStatus, { label: string; color: string; bg: string; icon: any }> = {
  open:        { label: "Open",        color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",   icon: Clock        },
  in_progress: { label: "In Progress", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: Clock      },
  resolved:    { label: "Resolved",    color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",  icon: CheckCircle  },
  closed:      { label: "Closed",      color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20",  icon: CheckCircle  },
};

const PRIORITY_CFG: Record<TicketPriority, { color: string; dot: string }> = {
  low:    { color: "text-slate-400",  dot: "bg-slate-400"  },
  medium: { color: "text-yellow-400", dot: "bg-yellow-400" },
  high:   { color: "text-orange-400", dot: "bg-orange-400" },
  urgent: { color: "text-red-400",    dot: "bg-red-400 animate-pulse" },
};

const CATEGORIES: TicketCategory[] = ["Technical", "Billing", "Design", "General", "Bug Report"];

const QUICK_ANSWERS = [
  { q: "How do I approve a design?", a: "Go to Design Center → find the design → click 'Approve' or 'Request Changes'." },
  { q: "When is my next invoice?", a: "Check the Payments tab for your full payment schedule and upcoming due dates." },
  { q: "How do I join a meeting?", a: "In the Meetings tab, click the 'Join' button on any upcoming meeting card." },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState(TICKETS);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [showNew, setShowNew] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ subject: "", category: "General" as TicketCategory, priority: "medium" as TicketPriority, message: "" });
  const [filter, setFilter] = useState<"all" | TicketStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = tickets.filter(t => {
    const matchFilter = filter === "all" || t.status === filter;
    const matchSearch = !search || t.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleSubmit = () => {
    if (!form.subject || !form.message) return;
    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: form.subject, category: form.category,
      status: "open", priority: form.priority,
      created_at: "Just now", last_reply: "Just now",
      replies: [{ id: "r1", sender: "Ahmed", initials: "AH", color: "from-slate-600 to-slate-700", time: "Just now", message: form.message, isAgent: false }],
    };
    setTickets(prev => [newTicket, ...prev]);
    setSubmitted(true);
    setShowNew(false);
    setForm({ subject: "", category: "General", priority: "medium", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const sendReply = (ticketId: string) => {
    const msg = replyText[ticketId]?.trim();
    if (!msg) return;
    const reply: TicketReply = {
      id: Date.now().toString(), sender: "Ahmed", initials: "AH",
      color: "from-slate-600 to-slate-700",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      message: msg, isAgent: false,
    };
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, replies: [...t.replies, reply], last_reply: "Just now" } : t));
    setReplyText(prev => ({ ...prev, [ticketId]: "" }));
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-blue-400" /> Support
          </h1>
          <p className="text-slate-400 text-sm mt-1">Submit tickets, track issues, and get help from your project team.</p>
        </div>
        <button onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      {/* Success banner */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
            <p className="text-green-300 text-sm">Ticket submitted! Our team will respond within 24 hours.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New ticket modal */}
      <AnimatePresence>
        {showNew && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowNew(false)}
              className="fixed inset-0 bg-[#050816]/70 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 px-4">
              <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold">Submit a Support Ticket</h3>
                  <button onClick={() => setShowNew(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Subject *</label>
                  <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    placeholder="Brief description of your issue"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Category</label>
                    <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as TicketCategory }))}
                      className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Priority</label>
                    <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value as TicketPriority }))}
                      className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={4}
                    placeholder="Describe your issue in detail — steps to reproduce, screenshots, expected behaviour..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none" />
                </div>

                {/* Quick answers */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-slate-500 font-semibold mb-2">Quick Answers</p>
                  <div className="space-y-1.5">
                    {QUICK_ANSWERS.map(qa => (
                      <div key={qa.q}>
                        <p className="text-xs text-blue-400 font-medium">{qa.q}</p>
                        <p className="text-xs text-slate-500">{qa.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <button onClick={() => setShowNew(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
                  <button onClick={handleSubmit} disabled={!form.subject || !form.message}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors disabled:opacity-40">
                    Submit Ticket
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search & filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets…"
            className="w-full pl-10 pr-4 py-2.5 bg-[#0a0f1e] border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
        </div>
        {(["all", "open", "in_progress", "resolved"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
            {f === "all" ? "All" : f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Ticket list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 rounded-2xl bg-[#0a0f1e] border border-white/5">
            <LifeBuoy className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-400 font-medium">No tickets found</p>
            <p className="text-slate-600 text-sm mt-1">Try a different filter or create a new ticket.</p>
          </div>
        ) : (
          filtered.map((ticket, i) => {
            const sc = STATUS_CFG[ticket.status];
            const pc = PRIORITY_CFG[ticket.priority];
            const isExpanded = expanded === ticket.id;
            return (
              <motion.div key={ticket.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-all overflow-hidden">

                <button onClick={() => setExpanded(isExpanded ? null : ticket.id)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${pc.dot}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] border font-semibold ${sc.bg} ${sc.color}`}>{sc.label}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-500 text-[10px] border border-white/10">{ticket.category}</span>
                      </div>
                      <p className="text-white font-semibold truncate">{ticket.subject}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Last reply: {ticket.last_reply} · {ticket.replies.length} messages</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="border-t border-white/5">
                        {/* Thread */}
                        <div className="px-5 py-4 space-y-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                          {ticket.replies.map(r => (
                            <div key={r.id} className={`flex gap-3 ${r.isAgent ? "" : "flex-row-reverse"}`}>
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                                {r.initials}
                              </div>
                              <div className={`max-w-[75%] flex flex-col gap-1 ${r.isAgent ? "items-start" : "items-end"}`}>
                                <div className={`flex items-center gap-2 ${r.isAgent ? "" : "flex-row-reverse"}`}>
                                  <span className="text-xs font-semibold text-white">{r.sender}</span>
                                  <span className="text-[10px] text-slate-600">{r.time}</span>
                                  {r.isAgent && <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500/20 text-blue-400 font-bold">TEAM</span>}
                                </div>
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${r.isAgent ? "bg-blue-500/10 text-slate-200 rounded-tl-sm border border-blue-500/10" : "bg-white/5 text-slate-200 rounded-tr-sm border border-white/5"}`}>
                                  {r.message}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Reply input */}
                        {ticket.status !== "resolved" && ticket.status !== "closed" && (
                          <div className="px-5 pb-4 flex gap-3">
                            <input value={replyText[ticket.id] || ""} onChange={e => setReplyText(p => ({ ...p, [ticket.id]: e.target.value }))}
                              onKeyDown={e => e.key === "Enter" && sendReply(ticket.id)}
                              placeholder="Type a reply…"
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
                            <button onClick={() => sendReply(ticket.id)} disabled={!replyText[ticket.id]?.trim()}
                              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors disabled:opacity-40">
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* SLA notice */}
      <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
        <p className="text-xs text-slate-300">
          <strong className="text-white">Response Times:</strong> Urgent — 2h · High — 8h · Medium — 24h · Low — 48h. Support is available Mon–Fri 9AM–6PM PKT.
        </p>
      </div>
    </div>
  );
}
