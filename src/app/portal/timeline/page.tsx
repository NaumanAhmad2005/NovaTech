"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Loader2, Activity, Flag } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Milestone {
  id: string;
  title: string;
  due_date: string | null;
  completed: boolean;
  completed_at: string | null;
}

const DEMO_MILESTONES: Milestone[] = [
  { id: "1", title: "Project Kickoff & Requirements Gathering", due_date: "2026-01-20", completed: true, completed_at: "2026-01-20T00:00:00Z" },
  { id: "2", title: "UI/UX Design System & Wireframes", due_date: "2026-02-15", completed: true, completed_at: "2026-02-14T00:00:00Z" },
  { id: "3", title: "Backend Architecture & Database Design", due_date: "2026-03-10", completed: true, completed_at: "2026-03-09T00:00:00Z" },
  { id: "4", title: "Authentication & User Management Module", due_date: "2026-04-01", completed: true, completed_at: "2026-04-01T00:00:00Z" },
  { id: "5", title: "Core Business Logic & API Development", due_date: "2026-05-15", completed: true, completed_at: "2026-05-14T00:00:00Z" },
  { id: "6", title: "Payment Gateway Integration (Stripe)", due_date: "2026-07-01", completed: false, completed_at: null },
  { id: "7", title: "Testing, QA & Performance Optimization", due_date: "2026-07-15", completed: false, completed_at: null },
  { id: "8", title: "Production Deployment & Launch", due_date: "2026-07-28", completed: false, completed_at: null },
];

export default function TimelinePage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectTitle, setProjectTitle] = useState("Your Project");
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      if (document.cookie.includes("demo_client_session=true")) {
        setMilestones(DEMO_MILESTONES);
        setProjectTitle("GlobalTech Enterprise App");
        setLoading(false);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoading(false); return; }
      const { data: projects } = await supabase.from("projects").select("id, title").eq("client_id", session.user.id).limit(1);
      if (projects && projects.length > 0) {
        setProjectTitle(projects[0].title);
        const { data: ms } = await supabase.from("milestones").select("*").eq("project_id", projects[0].id).order("due_date", { ascending: true });
        setMilestones(ms || []);
      }
      setLoading(false);
    };
    load();
  }, [supabase]);

  const completedCount = milestones.filter(m => m.completed).length;
  const progress = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Project Timeline</h1>
        <p className="text-slate-400 text-sm mt-1">{projectTitle} — milestone tracker</p>
      </div>

      {/* Progress bar */}
      <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-slate-300">Overall Progress</span>
          <span className="text-sm font-bold text-white font-mono">{completedCount}/{milestones.length} milestones</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">{progress}% complete</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/5" />

          <div className="space-y-4 relative">
            {milestones.map((m, i) => {
              const isNext = !m.completed && milestones.findIndex(x => !x.completed) === i;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-5"
                >
                  {/* Icon */}
                  <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    m.completed
                      ? "bg-green-500/10 border-green-500/40"
                      : isNext
                      ? "bg-blue-500/10 border-blue-500/40 animate-pulse"
                      : "bg-white/5 border-white/10"
                  }`}>
                    {m.completed
                      ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                      : isNext
                      ? <Activity className="w-4 h-4 text-blue-400" />
                      : <Circle className="w-4 h-4 text-slate-600" />
                    }
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-4 rounded-2xl border transition-colors ${
                    m.completed
                      ? "bg-green-500/5 border-green-500/10"
                      : isNext
                      ? "bg-blue-500/5 border-blue-500/15"
                      : "bg-white/[0.02] border-white/5 opacity-60"
                  }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`font-medium text-sm ${m.completed ? "text-slate-300" : isNext ? "text-white" : "text-slate-500"}`}>
                          {m.title}
                        </p>
                        {m.completed && m.completed_at && (
                          <p className="text-xs text-green-500 mt-1">
                            ✓ Completed {new Date(m.completed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        )}
                        {!m.completed && m.due_date && (
                          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Due {new Date(m.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        )}
                      </div>
                      {isNext && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/20 shrink-0">
                          <Flag className="w-3 h-3" /> CURRENT
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
