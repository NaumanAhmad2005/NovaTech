"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Users, FolderKanban, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, FileText, CheckCircle,
  Clock, XCircle, AlertCircle, Loader2, RefreshCw, Globe, Zap,
  Cpu, Server, Shield
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

const data = [
  { name: "00:00", requests: 120, latency: 45 },
  { name: "04:00", requests: 200, latency: 50 },
  { name: "08:00", requests: 850, latency: 120 },
  { name: "12:00", requests: 1400, latency: 150 },
  { name: "16:00", requests: 1100, latency: 90 },
  { name: "20:00", requests: 600, latency: 60 },
  { name: "24:00", requests: 300, latency: 48 },
];

const kpis = [
  { title: "Live Revenue (MRR)", value: "$842,500", change: "+12.5%", trend: "up", icon: DollarSign, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Global Sessions", value: "4,289", change: "+420", trend: "up", icon: Globe, color: "text-purple-400", bg: "bg-purple-500/10" },
  { title: "API Latency", value: "42ms", change: "-5ms", trend: "down", icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { title: "System Health", value: "99.99%", change: "Stable", trend: "up", icon: Activity, color: "text-green-400", bg: "bg-green-500/10" },
];

interface ProjectRequest {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  description: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// Simulated real-time events stream
const RAW_EVENTS = [
  { msg: "New user signup from London, UK", icon: Users, color: "text-blue-400" },
  { msg: "Database auto-scaling triggered (US-East)", icon: Database, color: "text-orange-400" },
  { msg: "Payment intent successful ($12,500)", icon: DollarSign, color: "text-green-400" },
  { msg: "API Gateway rate limit reached (IP 192.168.x.x)", icon: Shield, color: "text-red-400" },
  { msg: "Deployment dep_1x9a completed successfully", icon: CheckCircle, color: "text-emerald-400" },
  { msg: "Client 'GlobalTech' opened Invoice INV-002", icon: FileText, color: "text-purple-400" },
];

function Database(props: any) {
  return <Server {...props} />;
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(true);
  
  const [events, setEvents] = useState<any[]>([]);

  // Real-time event ticker simulation
  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      const randomEvent = RAW_EVENTS[Math.floor(Math.random() * RAW_EVENTS.length)];
      setEvents(prev => {
        const next = [{ ...randomEvent, id: id++, time: new Date().toLocaleTimeString() }, ...prev];
        if (next.length > 8) next.pop();
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = useCallback(async () => {
    setLoadingRequests(true);
    try {
      const res = await fetch(`/api/admin/requests?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      } else {
        setSupabaseReady(false);
      }
    } catch {
      setSupabaseReady(false);
    } finally {
      setLoadingRequests(false);
    }
  }, []);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const handleAction = async (requestId: string, action: "approve" | "reject") => {
    setActionLoading(requestId + action);
    try {
      const res = await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      if (res.ok) {
        setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: action === "approve" ? "approved" : "rejected" } : r));
        fetchRequests(); // Refresh list to remove it from pending or update it properly
      }
    } finally {
      setActionLoading(null);
    }
  };

  const pendingRequests = requests.filter(r => r.status === "pending");

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" /> Operations Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">Live monitoring, incoming requests, and platform health.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            SYSTEM LIVE
          </div>
          <button 
            onClick={() => alert("Report generated successfully and sent to your email.")}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <kpi.icon className={`w-16 h-16 ${kpi.color}`} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {kpi.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1 font-mono">{kpi.value}</h3>
              <p className="text-sm text-slate-500 font-medium">{kpi.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col: Network Chart & Pending Requests */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Network Activity Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-[#0F172A] border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" /> Global Traffic (24h)
              </h2>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff10", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                  <Area type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} fill="url(#colorRequests)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pending CRM Requests */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" /> Action Required: New Leads
                </h2>
                {pendingRequests.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/20 animate-pulse">
                    {pendingRequests.length} pending
                  </span>
                )}
              </div>
              <button onClick={fetchRequests} className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <RefreshCw className={`w-4 h-4 ${loadingRequests ? "animate-spin" : ""}`} />
              </button>
            </div>

            {!supabaseReady ? (
              <div className="p-8 text-center bg-orange-500/5">
                <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Supabase is not configured yet.</p>
                <p className="text-slate-500 text-xs mt-1">Add your real keys to <code className="text-blue-400">.env.local</code> and run the SQL schema.</p>
              </div>
            ) : loadingRequests ? (
              <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>
            ) : pendingRequests.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-8 h-8 text-green-500/50 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Inbox Zero!</p>
                <p className="text-slate-500 text-xs mt-1">All project requests have been reviewed.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {pendingRequests.map(req => (
                  <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/[0.015] transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-white">{req.full_name}</span>
                        {req.company && <span className="text-xs text-slate-500">· {req.company}</span>}
                        <span className="text-xs text-slate-600 ml-auto">{timeAgo(req.created_at)}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-1">{req.email}</p>
                      <div className="flex gap-2 flex-wrap">
                        {req.project_type && <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{req.project_type}</span>}
                        {req.budget && <span className="text-xs text-green-400 font-mono">{req.budget}</span>}
                      </div>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{req.description}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleAction(req.id, "approve")} disabled={!!actionLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/20 transition-colors disabled:opacity-50">
                        {actionLoading === req.id + "approve" ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />} Approve
                      </button>
                      <button onClick={() => handleAction(req.id, "reject")} disabled={!!actionLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/20 transition-colors disabled:opacity-50">
                        {actionLoading === req.id + "reject" ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />} Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Col: Live Event Ticker & AI Insights */}
        <div className="space-y-6">
          
          {/* Live Event Ticker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-black/40 border border-white/5 h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4 relative z-20">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" /> Live Stream
              </h2>
            </div>
            
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence>
                {events.map((ev, i) => (
                  <motion.div key={ev.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-3"
                  >
                    <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center ${ev.color}`}>
                      <ev.icon className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 leading-relaxed">{ev.msg}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-1">{ev.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {events.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-slate-600">
                    <Activity className="w-6 h-6 animate-pulse" />
                    <span className="text-xs">Waiting for events...</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* System Health Mini */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#0F172A] to-blue-900/10 border border-white/5">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" /> Infrastructure Pulse
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Database Read/Write</span>
                  <span className="text-blue-400 font-mono">42%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[42%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">API Gateway Load</span>
                  <span className="text-green-400 font-mono">18%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full w-[18%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Edge Cache Hits</span>
                  <span className="text-purple-400 font-mono">94%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-[94%]" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
