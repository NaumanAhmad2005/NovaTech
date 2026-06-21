"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Video, Clock, CheckCircle, XCircle, Loader2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Meeting {
  id: string;
  title: string;
  scheduled_at: string;
  meet_link: string | null;
  status: "upcoming" | "completed" | "cancelled";
}

const DEMO_MEETINGS: Meeting[] = [
  { id: "1", title: "Sprint 14 Review & Demo", scheduled_at: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), meet_link: "https://meet.google.com/demo", status: "upcoming" },
  { id: "2", title: "Design Approval — Payment Flow", scheduled_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), meet_link: "https://meet.google.com/demo", status: "upcoming" },
  { id: "3", title: "Project Kickoff Meeting", scheduled_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), meet_link: null, status: "completed" },
  { id: "4", title: "Architecture Review", scheduled_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), meet_link: null, status: "completed" },
];

function formatMeetingTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffH = (d.getTime() - now.getTime()) / 3600000;
  if (diffH > 0 && diffH < 24) return `In ${Math.round(diffH)} hours`;
  if (diffH > 0 && diffH < 48) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatMeetingHour(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      if (document.cookie.includes("demo_client_session=true")) {
        setMeetings(DEMO_MEETINGS);
        setLoading(false);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoading(false); return; }
      const { data: projects } = await supabase.from("projects").select("id").eq("client_id", session.user.id).limit(1);
      if (projects && projects.length > 0) {
        const { data: m } = await supabase.from("meetings").select("*").eq("project_id", projects[0].id).order("scheduled_at", { ascending: true });
        setMeetings(m || []);
      }
      setLoading(false);
    };
    load();
  }, [supabase]);

  const upcoming = meetings.filter(m => m.status === "upcoming");
  const past = meetings.filter(m => m.status !== "upcoming");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Meetings</h1>
          <p className="text-slate-400 text-sm mt-1">Scheduled calls with your project team.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Request Meeting
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>
      ) : (
        <>
          {/* Upcoming */}
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Upcoming</h2>
            {upcoming.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">No upcoming meetings scheduled.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((m, i) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Video className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{m.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatMeetingTime(m.scheduled_at)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatMeetingHour(m.scheduled_at)}</span>
                        </div>
                      </div>
                    </div>
                    {m.meet_link && (
                      <a href={m.meet_link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
                        <Video className="w-4 h-4" /> Join
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Past */}
          {past.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Past Meetings</h2>
              <div className="space-y-3">
                {past.map((m, i) => (
                  <motion.div key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 opacity-70">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">{m.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(m.scheduled_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-400 font-medium">Completed</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
