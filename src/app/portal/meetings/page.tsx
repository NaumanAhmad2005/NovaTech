"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Video, Clock, CheckCircle, Plus, X, User,
  FileText, ChevronRight, MapPin, Users, ExternalLink
} from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  attendees: string[];
  status: "upcoming" | "completed" | "cancelled";
  meet_link?: string;
  agenda?: string[];
  notes?: string;
  action_items?: string[];
}

const MEETINGS: Meeting[] = [
  {
    id: "1", title: "Sprint 14 Review & Demo",
    date: new Date(Date.now() + 86400000 * 2).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    time: "10:00 AM PKT", duration: "60 min", host: "Sarah Chen",
    attendees: ["Sarah Chen", "Marcus Dev", "Reza Frontend", "Ahmed (You)"],
    status: "upcoming", meet_link: "https://meet.google.com/abc-defg-hij",
    agenda: ["Sprint 14 progress review", "Live demo of authentication module", "Payment gateway status update", "Q&A and feedback"],
  },
  {
    id: "2", title: "Design Approval — Payment Flow",
    date: new Date(Date.now() + 86400000 * 7).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    time: "2:00 PM PKT", duration: "30 min", host: "Aisha UI",
    attendees: ["Aisha UI", "Reza Frontend", "Ahmed (You)"],
    status: "upcoming", meet_link: "https://meet.google.com/xyz-1234-abc",
    agenda: ["Walk through Payment Flow v4 designs", "Review 3DS verification screen", "Collect feedback and approval decision"],
  },
  {
    id: "3", title: "Architecture Review",
    date: "Jun 13, 2026", time: "11:00 AM PKT", duration: "90 min",
    host: "Marcus Dev", attendees: ["Marcus Dev", "Sarah Chen", "Omar DevOps", "Ahmed (You)"],
    status: "completed",
    notes: "Reviewed the database schema and API architecture. Agreed on PostgreSQL with Supabase for scalability. Redis queue approved for webhook handling.",
    action_items: ["Marcus to document schema decisions", "Omar to provision staging environment", "Ahmed to confirm payment gateway choice"],
  },
  {
    id: "4", title: "Project Kickoff Meeting",
    date: "Jan 20, 2026", time: "10:00 AM PKT", duration: "120 min",
    host: "Sarah Chen", attendees: ["Full team", "Ahmed (You)"],
    status: "completed",
    notes: "Introductions, project goals discussed, timeline agreed, communication channels set up. NDA confirmed signed by all parties.",
    action_items: ["Team to send access credentials", "Ahmed to review PRD document", "Sarah to send project schedule"],
  },
];

function formatCountdown(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
  if (diff <= 0) return null;
  if (diff === 1) return "Tomorrow";
  return `In ${diff} days`;
}

export default function MeetingsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showRequest, setShowRequest] = useState(false);
  const [form, setForm] = useState({ topic: "", date: "", time: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const upcoming = MEETINGS.filter(m => m.status === "upcoming");
  const past = MEETINGS.filter(m => m.status === "completed");

  const handleSubmit = () => {
    if (!form.topic || !form.date) return;
    setSubmitted(true);
    setShowRequest(false);
    setForm({ topic: "", date: "", time: "", notes: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-400" /> Meetings
          </h1>
          <p className="text-slate-400 text-sm mt-1">Scheduled calls, agendas, meeting notes, and action items.</p>
        </div>
        <button onClick={() => setShowRequest(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Request Meeting
        </button>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
            <p className="text-green-300 text-sm">Meeting request submitted! Your project manager will confirm within 24 hours.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request modal */}
      <AnimatePresence>
        {showRequest && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowRequest(false)}
              className="fixed inset-0 bg-[#050816]/70 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4">
              <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold">Request a Meeting</h3>
                  <button onClick={() => setShowRequest(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Meeting Topic *</label>
                  <input value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))}
                    placeholder="e.g. Sprint 15 Planning, Design Review..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Preferred Date *</label>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Preferred Time</label>
                    <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Additional Notes</label>
                  <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3}
                    placeholder="What would you like to discuss?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none" />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <button onClick={() => setShowRequest(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
                  <button onClick={handleSubmit} disabled={!form.topic || !form.date}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors disabled:opacity-40">
                    Submit Request
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Upcoming meetings */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Upcoming ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">No upcoming meetings. Use the button above to request one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="rounded-2xl bg-blue-500/5 border border-blue-500/15 overflow-hidden">
                <div className="flex items-start justify-between p-5 gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{m.title}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{m.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{m.time} · {m.duration}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />Host: {m.host}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Users className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-500">{m.attendees.length} attendees</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {m.meet_link && (
                      <a href={m.meet_link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors">
                        <Video className="w-3.5 h-3.5" /> Join
                      </a>
                    )}
                    <button onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                      {expanded === m.id ? "Hide" : "View Agenda"} <ChevronRight className={`w-3 h-3 transition-transform ${expanded === m.id ? "rotate-90" : ""}`} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === m.id && m.agenda && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-2 border-t border-blue-500/10">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" /> Agenda
                        </p>
                        <div className="space-y-1.5">
                          {m.agenda.map((item, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm text-slate-300">
                              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center shrink-0 font-bold">{j + 1}</span>
                              {item}
                            </div>
                          ))}
                        </div>
                        {m.meet_link && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" />
                            <a href={m.meet_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                              Google Meet <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Past meetings */}
      {past.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Past Meetings ({past.length})</h2>
          <div className="space-y-3">
            {past.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
                <div className="flex items-start justify-between p-5 gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-slate-300 font-semibold">{m.title}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{m.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{m.time} · {m.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-green-400 font-medium">Completed</span>
                    <button onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                      className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                      Notes <ChevronRight className={`w-3 h-3 transition-transform ${expanded === m.id ? "rotate-90" : ""}`} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === m.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4">
                        {m.notes && (
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Meeting Notes</p>
                            <p className="text-sm text-slate-300 leading-relaxed">{m.notes}</p>
                          </div>
                        )}
                        {m.action_items && (
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Action Items</p>
                            <div className="space-y-1.5">
                              {m.action_items.map((item, j) => (
                                <div key={j} className="flex items-center gap-2 text-sm text-slate-300">
                                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
