"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users, Search, Filter, Plus, Mail, Phone, Building2,
  Clock, CheckCircle, XCircle, ArrowUpRight, Loader2,
  RefreshCw, MoreHorizontal, Tag, ChevronDown
} from "lucide-react";

type LeadStatus = "pending" | "reviewed" | "approved" | "rejected";
type LeadPriority = "low" | "medium" | "high";

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  description: string;
  status: LeadStatus;
  created_at: string;
  user_id: string | null;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  pending:  { label: "Pending",  color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  reviewed: { label: "Reviewed", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20"   },
  approved: { label: "Approved", color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20"  },
  rejected: { label: "Rejected", color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20"      },
};

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const DEMO_LEADS: Lead[] = [
  { id: "1", full_name: "James Wilson", email: "james@acmecorp.com", phone: "+1 555-0101", company: "Acme Corp", project_type: "Enterprise System", budget: "$50k–$100k", description: "Need a full ERP replacement for our manufacturing operations.", status: "pending", created_at: new Date(Date.now() - 1000*60*30).toISOString(), user_id: null },
  { id: "2", full_name: "Sophia Martinez", email: "sophia@globaltech.io", phone: "+1 555-0202", company: "GlobalTech", project_type: "AI Integration", budget: "$25k–$50k", description: "Looking to integrate AI chatbot and analytics into our SaaS platform.", status: "approved", created_at: new Date(Date.now() - 1000*60*60*24*3).toISOString(), user_id: "u2" },
  { id: "3", full_name: "Omar Hassan", email: "omar@startupxyz.com", phone: null, company: "StartupXYZ", project_type: "Mobile App", budget: "$10k–$25k", description: "Cross-platform mobile app for our food delivery startup.", status: "reviewed", created_at: new Date(Date.now() - 1000*60*60*24*7).toISOString(), user_id: null },
  { id: "4", full_name: "Priya Sharma", email: "priya@fintech.co", phone: "+1 555-0303", company: "FinTech Co", project_type: "Custom Software", budget: "$100k+", description: "Regulatory compliance platform for our financial services.", status: "pending", created_at: new Date(Date.now() - 1000*60*60*2).toISOString(), user_id: null },
];

export default function AdminCRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/requests?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.requests || []);
      } else {
        setLeads(DEMO_LEADS);
      }
    } catch {
      setLeads(DEMO_LEADS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionLoading(id + action);
    try {
      const res = await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, action }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: action === "approve" ? "approved" : "rejected" } : l));
      }
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = leads.filter(l => {
    const matchSearch = !search || [l.full_name, l.email, l.company, l.project_type].some(v => v?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: leads.length,
    pending: leads.filter(l => l.status === "pending").length,
    reviewed: leads.filter(l => l.status === "reviewed").length,
    approved: leads.filter(l => l.status === "approved").length,
    rejected: leads.filter(l => l.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight">CRM</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all leads, project requests, and client conversions.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchLeads} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["all", "pending", "approved", "rejected"] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`p-4 rounded-2xl border text-left transition-all ${filterStatus === s ? "border-blue-500/40 bg-blue-500/10" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}>
            <p className="text-2xl font-bold text-white font-mono">{counts[s]}</p>
            <p className="text-xs text-slate-500 capitalize mt-1">{s === "all" ? "Total Leads" : `${s} requests`}</p>
          </button>
        ))}
      </div>

      {/* Search & Filter bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, company..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "reviewed", "approved", "rejected"] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`hidden md:block px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filterStatus === s ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Leads table */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_140px_140px_120px] gap-4 px-6 py-3 border-b border-white/5 text-xs font-medium text-slate-500 uppercase tracking-wider">
          <span>Contact</span><span>Project</span><span>Budget</span><span>Status</span><span>Actions</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Users className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm">No leads found.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((lead, i) => {
              const st = STATUS_CONFIG[lead.status];
              return (
                <motion.div key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-[1fr_1fr_140px_140px_120px] gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors items-center">
                  {/* Contact */}
                  <div>
                    <p className="text-white text-sm font-medium">{lead.full_name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <a href={`mailto:${lead.email}`} className="text-xs text-blue-400 hover:underline flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</a>
                    </div>
                    {lead.company && <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Building2 className="w-3 h-3" />{lead.company}</p>}
                    <p className="text-[11px] text-slate-600 mt-1">{timeAgo(lead.created_at)}</p>
                  </div>
                  {/* Project */}
                  <div>
                    {lead.project_type && <span className="inline-block px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20 mb-1">{lead.project_type}</span>}
                    <p className="text-xs text-slate-500 line-clamp-2">{lead.description}</p>
                  </div>
                  {/* Budget */}
                  <div className="text-sm text-white font-medium">{lead.budget || "—"}</div>
                  {/* Status */}
                  <div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${st.bg} ${st.color}`}>{st.label}</span>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2">
                    {lead.status === "pending" && (
                      <>
                        <button onClick={() => handleAction(lead.id, "approve")} disabled={!!actionLoading}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs border border-green-500/20 disabled:opacity-50 transition-colors">
                          {actionLoading === lead.id + "approve" ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />} OK
                        </button>
                        <button onClick={() => handleAction(lead.id, "reject")} disabled={!!actionLoading}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/20 disabled:opacity-50 transition-colors">
                          {actionLoading === lead.id + "reject" ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />} No
                        </button>
                      </>
                    )}
                    {lead.status !== "pending" && (
                      <span className={`text-xs font-medium flex items-center gap-1 ${st.color}`}>
                        {lead.status === "approved" ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {st.label}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
