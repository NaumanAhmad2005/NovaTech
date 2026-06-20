"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, Clock, Calendar, MessageSquare, 
  FileText, Activity, AlertCircle, ArrowUpRight, Play, CheckCircle, ChevronRight
} from "lucide-react";

export default function PortalDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Greeting & Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Good Afternoon, Ahmed.</h1>
          <p className="text-slate-400 mt-2 text-lg">Your project is progressing well. Current completion is at <span className="text-blue-400 font-semibold">68%</span>.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors text-white">
            Schedule Meeting
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-500/50 text-white text-sm font-medium transition-all">
            Review Approvals (2)
          </button>
        </div>
      </motion.div>

      {/* Main Grid: Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* BIG WIDGET: The Live Project Ring (Takes 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-3xl bg-[#0F172A] border border-white/5 overflow-hidden relative"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="p-8 relative z-10 flex flex-col md:flex-row items-center gap-10 h-full">
            
            {/* The Ring */}
            <div className="relative w-64 h-64 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                {/* Progress Ring */}
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" 
                  stroke="url(#blue-gradient)" 
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * 0.68) }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white font-mono tracking-tighter">68<span className="text-2xl text-slate-400">%</span></span>
                <span className="text-xs text-blue-400 uppercase tracking-widest mt-1 font-semibold">Active</span>
              </div>
            </div>

            {/* Project Status Info */}
            <div className="flex-1 space-y-6 w-full">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">GlobalTech Enterprise App</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 font-medium">Phase 3: Development</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-medium">Next Milestone</p>
                  <p className="text-sm font-semibold text-white">Payment Gateway</p>
                  <p className="text-xs text-blue-400 mt-1">Due in 4 days</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-medium">Est. Delivery</p>
                  <p className="text-sm font-semibold text-white">July 28, 2026</p>
                  <p className="text-xs text-slate-400 mt-1">On Schedule</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">JD</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">MK</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-800 flex items-center justify-center text-xs font-medium text-slate-300">+3</div>
                </div>
                <div className="text-sm text-slate-400">
                  <span className="text-white font-medium">John Doe</span> (PM) & 4 others active
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* SIDE WIDGET: Current Sprint */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-b from-[#111827] to-[#0F172A] border border-white/5 p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Sprint 14
            </h3>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
              In Progress
            </span>
          </div>

          <p className="text-sm text-slate-300 mb-6">Implementing Stripe payment flows and checkout UI components.</p>

          <div className="space-y-4 mb-8">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Sprint Progress</span>
                <span className="text-white font-mono">18 / 24 Tasks</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                <span className="text-slate-300 group-hover:text-white transition-colors line-clamp-1">Stripe Webhooks</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400">MK</div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 cursor-pointer">
              <div className="flex items-center gap-3 text-sm">
                <Play className="w-4 h-4 text-blue-400" />
                <span className="text-blue-100 font-medium line-clamp-1">Checkout UI Setup</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] text-purple-400">JD</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Next Meeting */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-3xl bg-[#111827] border border-white/5 group hover:border-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-white font-semibold mb-1">Weekly Sync</h3>
          <p className="text-slate-400 text-sm mb-4">Tomorrow, 10:00 AM EST</p>
          <div className="flex items-center gap-2 text-sm text-purple-400 font-medium">
            Join Google Meet <ArrowUpRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Action Items */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-3xl bg-[#111827] border border-white/5 group hover:border-orange-500/30 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)]">2</span>
          </div>
          <h3 className="text-white font-semibold mb-1">Pending Approvals</h3>
          <p className="text-slate-400 text-sm">Review required for new designs.</p>
        </motion.div>

        {/* Latest Delivery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-3xl bg-[#111827] border border-white/5 group hover:border-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-white font-semibold mb-1">Staging Deployed</h3>
          <p className="text-slate-400 text-sm mb-4">v1.4.2 is ready for testing.</p>
          <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
            View Live <ArrowUpRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* AI Summary Widget */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="p-6 rounded-3xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 group cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
          <div className="relative z-10">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" /> AI Summary
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              "The engineering team resolved 14 bugs and completed the Auth module this week. We are currently 2 days ahead of schedule for the upcoming Payment Gateway milestone."
            </p>
          </div>
        </motion.div>

      </div>

      {/* Activity Timeline List (Placeholder) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { title: "Design assets uploaded", time: "2 hours ago", icon: FileText, color: "text-blue-400" },
            { title: "Message from John Doe (PM)", time: "5 hours ago", icon: MessageSquare, color: "text-purple-400" },
            { title: "Sprint 13 Review Meeting Notes", time: "Yesterday", icon: Calendar, color: "text-emerald-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[#111827]/50 border border-white/5 hover:bg-[#111827] transition-colors cursor-pointer">
              <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{item.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
