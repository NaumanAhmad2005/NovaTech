"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Search, Plus, Mail, Phone, Building2, FolderKanban,
  Shield, ShieldOff, MoreHorizontal, ExternalLink, Calendar
} from "lucide-react";

type ClientRole = "active_client" | "normal_user";

interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  role: ClientRole;
  created_at: string;
  project_count: number;
}

const DEMO_CLIENTS: Client[] = [
  { id: "1", full_name: "Sophia Martinez", email: "sophia@globaltech.io", phone: "+1 555-0202", company: "GlobalTech", role: "active_client", created_at: "2026-01-10T00:00:00Z", project_count: 1 },
  { id: "2", full_name: "Priya Sharma", email: "priya@fintech.co", phone: "+1 555-0303", company: "FinTech Co", role: "active_client", created_at: "2026-04-28T00:00:00Z", project_count: 1 },
  { id: "3", full_name: "James Wilson", email: "james@acmecorp.com", phone: "+1 555-0101", company: "Acme Corp", role: "normal_user", created_at: "2026-06-18T00:00:00Z", project_count: 0 },
  { id: "4", full_name: "Omar Hassan", email: "omar@startupxyz.com", phone: null, company: "StartupXYZ", role: "normal_user", created_at: "2026-06-10T00:00:00Z", project_count: 0 },
];

const AVATAR_COLORS = ["from-blue-500 to-cyan-400", "from-purple-500 to-pink-400", "from-green-500 to-emerald-400", "from-orange-500 to-yellow-400"];

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function AdminClientsPage() {
  const [clients] = useState<Client[]>(DEMO_CLIENTS);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<ClientRole | "all">("all");

  const filtered = clients.filter(c => {
    const matchSearch = !search || [c.full_name, c.email, c.company].some(v => v?.toLowerCase().includes(search.toLowerCase()));
    const matchRole = filterRole === "all" || c.role === filterRole;
    return matchSearch && matchRole;
  });

  const activeCount = clients.filter(c => c.role === "active_client").length;
  const normalCount = clients.filter(c => c.role === "normal_user").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight">Clients</h1>
          <p className="text-slate-400 text-sm mt-1">Manage portal access, permissions, and client profiles.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Invite Client
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
          <p className="text-3xl font-bold text-white font-mono">{clients.length}</p>
          <p className="text-xs text-slate-500 mt-1">Total Users</p>
        </div>
        <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10 text-center">
          <p className="text-3xl font-bold text-green-400 font-mono">{activeCount}</p>
          <p className="text-xs text-slate-500 mt-1">Active Clients</p>
        </div>
        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-center">
          <p className="text-3xl font-bold text-blue-400 font-mono">{normalCount}</p>
          <p className="text-xs text-slate-500 mt-1">Registered Users</p>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
        </div>
        {(["all", "active_client", "normal_user"] as const).map(r => (
          <button key={r} onClick={() => setFilterRole(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterRole === r ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
            {r === "all" ? "All" : r === "active_client" ? "Active Clients" : "Users"}
          </button>
        ))}
      </div>

      {/* Clients grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <motion.div key={client.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl bg-[#0F172A] border border-white/5 hover:border-white/10 transition-colors group">
            {/* Avatar + name */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                  {getInitials(client.full_name)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{client.full_name}</p>
                  {client.company && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Building2 className="w-3 h-3" />{client.company}</p>
                  )}
                </div>
              </div>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                client.role === "active_client"
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-slate-500/10 text-slate-400 border-slate-500/20"
              }`}>
                {client.role === "active_client" ? <Shield className="w-2.5 h-2.5" /> : <ShieldOff className="w-2.5 h-2.5" />}
                {client.role === "active_client" ? "Client" : "User"}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-1.5 mb-4">
              <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-xs text-blue-400 hover:underline">
                <Mail className="w-3 h-3" />{client.email}
              </a>
              {client.phone && (
                <p className="flex items-center gap-2 text-xs text-slate-400"><Phone className="w-3 h-3" />{client.phone}</p>
              )}
              <p className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3 h-3" />Joined {new Date(client.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <FolderKanban className="w-3.5 h-3.5" />
                <span>{client.project_count} project{client.project_count !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
