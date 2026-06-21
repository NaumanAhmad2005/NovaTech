"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2, Calendar, MessageSquare,
  FileText, Activity, AlertCircle, ArrowUpRight, Play, CheckCircle, ChevronRight,
  Rocket, Loader2
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  phase: string;
  start_date: string | null;
  estimated_delivery: string | null;
}

interface Milestone {
  id: string;
  title: string;
  due_date: string | null;
  completed: boolean;
}

export default function PortalDashboard() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [userName, setUserName] = useState("Client");
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Demo mode
        if (document.cookie.includes("demo_client_session=true")) {
          setUserName("Demo User");
          setProject({
            id: "demo",
            title: "GlobalTech Enterprise App",
            description: "Full-stack enterprise application",
            status: "active",
            progress: 68,
            phase: "Phase 3: Development",
            start_date: "2026-01-15",
            estimated_delivery: "2026-07-28",
          });
          setMilestones([
            { id: "1", title: "Project Kickoff", due_date: "2026-01-20", completed: true },
            { id: "2", title: "UI/UX Design", due_date: "2026-02-15", completed: true },
            { id: "3", title: "Backend Architecture", due_date: "2026-03-10", completed: true },
            { id: "4", title: "Payment Gateway", due_date: "2026-07-01", completed: false },
            { id: "5", title: "Launch & Deployment", due_date: "2026-07-28", completed: false },
          ]);
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) { setLoading(false); return; }

        setUserName(session.user.user_metadata?.full_name?.split(" ")[0] || "Client");

        // Fetch project
        const { data: projects } = await supabase
          .from("projects")
          .select("*")
          .eq("client_id", session.user.id)
          .eq("status", "active")
          .limit(1);

        if (projects && projects.length > 0) {
          const p = projects[0];
          setProject(p);

          // Fetch milestones
          const { data: ms } = await supabase
            .from("milestones")
            .select("*")
            .eq("project_id", p.id)
            .order("due_date", { ascending: true });
          setMilestones(ms || []);
        }
      } catch (err) {
        console.error("Portal load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [supabase]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  // ── No project yet ─────────────────────────────────────────────────────────
  if (!project) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center max-w-2xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="p-8 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl relative overflow-hidden w-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
            <Rocket className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to NovaTech, {userName}!</h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            You haven't started any project yet. Your dedicated portal will be activated once your project request is approved by our team.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-500/50"
          >
            Start Your Project <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── Milestones helpers ─────────────────────────────────────────────────────
  const completedCount = milestones.filter((m) => m.completed).length;
  const nextMilestone = milestones.find((m) => !m.completed);
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (circumference * (project.progress / 100));

  return (
    <div className="space-y-8 pb-10">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Good day, {userName}.</h1>
          <p className="text-slate-400 mt-2 text-lg">
            Your project is at <span className="text-blue-400 font-semibold">{project.progress}%</span> completion.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors text-white">
            Schedule Meeting
          </button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Ring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-3xl bg-[#0F172A] border border-white/5 overflow-hidden relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="p-8 relative z-10 flex flex-col md:flex-row items-center gap-10 h-full">
            {/* Ring */}
            <div className="relative w-64 h-64 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="45" fill="none"
                  stroke="url(#blue-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white font-mono tracking-tighter">
                  {project.progress}<span className="text-2xl text-slate-400">%</span>
                </span>
                <span className="text-xs text-blue-400 uppercase tracking-widest mt-1 font-semibold">Active</span>
              </div>
            </div>

            {/* Project info */}
            <div className="flex-1 space-y-6 w-full">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{project.title}</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 font-medium">{project.phase}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-medium">Next Milestone</p>
                  <p className="text-sm font-semibold text-white">{nextMilestone?.title || "All done!"}</p>
                  {nextMilestone?.due_date && (
                    <p className="text-xs text-blue-400 mt-1">
                      Due {new Date(nextMilestone.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-medium">Est. Delivery</p>
                  <p className="text-sm font-semibold text-white">
                    {project.estimated_delivery
                      ? new Date(project.estimated_delivery).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                      : "TBD"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">On Schedule</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Milestones</span>
                  <span className="text-white font-mono">{completedCount} / {milestones.length} completed</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: milestones.length > 0 ? `${(completedCount / milestones.length) * 100}%` : "0%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Milestones List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-b from-[#111827] to-[#0F172A] border border-white/5 p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Milestones
            </h3>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
              {milestones.length} total
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
            {milestones.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No milestones yet.</p>
            ) : (
              milestones.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    m.completed
                      ? "bg-green-500/5 border-green-500/10"
                      : "bg-blue-500/5 border-blue-500/10"
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    {m.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    ) : (
                      <Play className="w-4 h-4 text-blue-400 shrink-0" />
                    )}
                    <span className={m.completed ? "text-slate-400 line-through" : "text-white font-medium"}>
                      {m.title}
                    </span>
                  </div>
                  {m.due_date && (
                    <span className="text-xs text-slate-500 shrink-0">
                      {new Date(m.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-3xl bg-[#111827] border border-white/5 group hover:border-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-white font-semibold mb-1">Schedule Meeting</h3>
          <p className="text-slate-400 text-sm">Book a call with your project manager.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-3xl bg-[#111827] border border-white/5 group hover:border-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-white font-semibold mb-1">Send Message</h3>
          <p className="text-slate-400 text-sm">Direct line to your development team.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-6 rounded-3xl bg-[#111827] border border-white/5 group hover:border-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-white font-semibold mb-1">View Files</h3>
          <p className="text-slate-400 text-sm">Designs, contracts, and deliverables.</p>
        </motion.div>
      </div>
    </div>
  );
}
