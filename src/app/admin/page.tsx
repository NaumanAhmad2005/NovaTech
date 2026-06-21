"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Users, FolderKanban, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, FileText, CheckCircle,
  Clock, XCircle, AlertCircle, Loader2, RefreshCw
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000, projects: 24 },
  { name: "Feb", revenue: 3000, projects: 13 },
  { name: "Mar", revenue: 5000, projects: 38 },
  { name: "Apr", revenue: 4500, projects: 39 },
  { name: "May", revenue: 6000, projects: 48 },
  { name: "Jun", revenue: 7500, projects: 38 },
  { name: "Jul", revenue: 9000, projects: 43 },
];

const kpis = [
  { title: "Total Revenue", value: "$842,500", change: "+12.5%", trend: "up", icon: DollarSign, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Active Projects", value: "42", change: "+4", trend: "up", icon: FolderKanban, color: "text-purple-400", bg: "bg-purple-500/10" },
  { title: "Enterprise Clients", value: "128", change: "+12", trend: "up", icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { title: "System Health", value: "99.9%", change: "-0.1%", trend: "down", icon: Activity, color: "text-green-400", bg: "bg-green-500/10" },
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
  user_id: string | null;
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(true);

  const fetchRequests = useCallback(async () => {
    setLoadingRequests(true);
    try {
      const res = await fetch("/api/admin/requests");
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

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleAction = async (requestId: string, action: "approve" | "reject") => {
    setActionLoading(requestId + action);
    try {
      const res = await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === requestId
              ? { ...r, status: action === "approve" ? "approved" : "rejected" }
              : r
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const reviewedRequests = requests.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight">Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
            New Project
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group"
          >
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

      {/* ── Project Requests (Live from DB) ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">Project Requests</h2>
            {pendingRequests.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/20">
                {pendingRequests.length} pending
              </span>
            )}
          </div>
          <button
            onClick={fetchRequests}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loadingRequests ? "animate-spin" : ""}`} />
          </button>
        </div>

        {!supabaseReady ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Supabase is not configured yet.</p>
            <p className="text-slate-500 text-xs mt-1">Add your real keys to <code className="text-blue-400">.env.local</code> and run the SQL schema to see requests here.</p>
          </div>
        ) : loadingRequests ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No project requests yet.</p>
            <p className="text-slate-500 text-xs mt-1">Requests from the "Start Your Project" form will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {/* Pending first */}
            {[...pendingRequests, ...reviewedRequests].map((req) => (
              <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/[0.015] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-semibold text-white">{req.full_name}</span>
                    {req.company && <span className="text-xs text-slate-500">· {req.company}</span>}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      req.status === "pending"
                        ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                        : req.status === "approved"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {req.status}
                    </span>
                    <span className="text-xs text-slate-600 ml-auto">{timeAgo(req.created_at)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{req.email}</p>
                  <div className="flex gap-3 flex-wrap">
                    {req.project_type && (
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{req.project_type}</span>
                    )}
                    {req.budget && (
                      <span className="text-xs text-slate-400">Budget: {req.budget}</span>
                    )}
                  </div>
                  {req.description && (
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{req.description}</p>
                  )}
                </div>

                {req.status === "pending" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleAction(req.id, "approve")}
                      disabled={!!actionLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/20 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === req.id + "approve" ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "reject")}
                      disabled={!!actionLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/20 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === req.id + "reject" ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      Reject
                    </button>
                  </div>
                )}
                {req.status !== "pending" && (
                  <div className={`flex items-center gap-1.5 text-xs font-medium shrink-0 ${req.status === "approved" ? "text-green-400" : "text-red-400"}`}>
                    {req.status === "approved" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {req.status === "approved" ? "Approved" : "Rejected"}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Revenue Growth</h2>
            <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff10", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
          <div className="space-y-6">
            {requests.slice(0, 4).length > 0
              ? requests.slice(0, 4).map((req, i) => (
                  <div key={req.id} className="flex gap-4 relative">
                    {i !== Math.min(3, requests.length - 1) && (
                      <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-white/5" />
                    )}
                    <div className="relative z-10 w-8 h-8 rounded-full bg-[#050816] border border-white/10 flex items-center justify-center shrink-0 mt-1">
                      <Clock className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{req.full_name}</p>
                      <p className="text-sm text-blue-400 mt-0.5">{req.project_type || "Project Request"}</p>
                      <p className="text-xs text-slate-500 mt-1">{timeAgo(req.created_at)}</p>
                    </div>
                  </div>
                ))
              : [
                  { action: "New enterprise contract signed", entity: "Acme Corp", time: "2 hours ago", color: "text-blue-400", Icon: FileText },
                  { action: "Deployment successful", entity: "API Gateway v2.4", time: "5 hours ago", color: "text-green-400", Icon: CheckCircle },
                  { action: "Invoice paid", entity: "GlobalTech Solutions ($45k)", time: "2 days ago", color: "text-emerald-400", Icon: DollarSign },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#050816] border border-white/10 flex items-center justify-center shrink-0 mt-1">
                      <item.Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.action}</p>
                      <p className="text-sm text-blue-400 mt-0.5">{item.entity}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
