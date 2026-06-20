"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, Users, FolderKanban, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, FileText, CheckCircle
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

const activities = [
  { id: 1, action: "New enterprise contract signed", entity: "Acme Corp", time: "2 hours ago", icon: FileText, color: "text-blue-400" },
  { id: 2, action: "Deployment successful", entity: "API Gateway v2.4", time: "5 hours ago", icon: CheckCircle, color: "text-green-400" },
  { id: 3, action: "New team member onboarded", entity: "Sarah Jenkins (Lead UX)", time: "1 day ago", icon: Users, color: "text-purple-400" },
  { id: 4, action: "Invoice paid", entity: "GlobalTech Solutions ($45k)", time: "2 days ago", icon: DollarSign, color: "text-emerald-400" },
];

export default function AdminDashboard() {
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
                <div className={`flex items-center gap-1 text-sm font-medium ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1 font-mono">{kpi.value}</h3>
              <p className="text-sm text-slate-500 font-medium">{kpi.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

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
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
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
            {activities.map((item, i) => (
              <div key={item.id} className="flex gap-4 relative">
                {i !== activities.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-white/5" />
                )}
                <div className="relative z-10 w-8 h-8 rounded-full bg-[#050816] border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
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
