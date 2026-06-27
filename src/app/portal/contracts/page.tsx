"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileSignature, Download, Eye, CheckCircle, Clock, RefreshCw, Shield, AlertCircle } from "lucide-react";

const CONTRACTS = [
  {
    id: "c1", title: "Non-Disclosure Agreement (NDA)",
    type: "NDA", status: "signed",
    signed_date: "Jan 12, 2026", expiry: "Jan 12, 2028",
    parties: ["NovaTech Technologies Inc.", "GlobalTech Inc."],
    description: "Mutual NDA covering all project IP, source code, business strategies, and client data shared during the engagement.",
    renewal_due: false,
  },
  {
    id: "c2", title: "Master Service Agreement (MSA)",
    type: "Service Agreement", status: "signed",
    signed_date: "Jan 15, 2026", expiry: "Dec 31, 2026",
    parties: ["NovaTech Technologies Inc.", "GlobalTech Inc."],
    description: "Primary contract governing the GlobalTech Enterprise Platform development project, including scope, milestones, payment terms, and IP ownership.",
    renewal_due: false,
  },
  {
    id: "c3", title: "Maintenance & Support Agreement",
    type: "Maintenance Agreement", status: "pending",
    signed_date: null, expiry: null,
    parties: ["NovaTech Technologies Inc.", "GlobalTech Inc."],
    description: "12-month post-launch maintenance and support contract covering bug fixes, performance monitoring, security patches, and monthly health reports.",
    renewal_due: false,
  },
  {
    id: "c4", title: "Change Request #001 — AI Report Generator",
    type: "Change Request", status: "signed",
    signed_date: "Jun 22, 2026", expiry: null,
    parties: ["NovaTech Technologies Inc.", "GlobalTech Inc."],
    description: "Scope addition for AI-powered weekly report generation feature. Additional cost: $8,000. Timeline impact: +5 days.",
    renewal_due: false,
  },
];

const STATUS_CFG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  signed:  { label: "Signed",      color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",  icon: CheckCircle  },
  pending: { label: "Pending",     color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: Clock        },
  expired: { label: "Expired",     color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",       icon: AlertCircle  },
  renewal: { label: "Due Renewal", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", icon: RefreshCw    },
};

const TYPE_COLORS: Record<string, string> = {
  "NDA":                "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Service Agreement":  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Maintenance Agreement": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Change Request":     "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function ContractsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileSignature className="w-6 h-6 text-orange-400" /> Contracts & Agreements
        </h1>
        <p className="text-slate-400 text-sm mt-1">All signed documents, NDAs, service agreements, and change requests.</p>
      </div>

      {/* Security notice */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
        <Shield className="w-5 h-5 text-blue-400 shrink-0" />
        <p className="text-sm text-slate-300">All contracts are encrypted and stored securely. Digital signatures are legally binding under applicable law.</p>
      </div>

      {/* Contract cards */}
      <div className="space-y-4">
        {CONTRACTS.map((contract, i) => {
          const sc = STATUS_CFG[contract.status];
          const isExpanded = expanded === contract.id;
          return (
            <motion.div key={contract.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-all overflow-hidden">

              {/* Header row */}
              <div className="flex items-start justify-between p-5 gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${sc.bg}`}>
                    <sc.icon className={`w-6 h-6 ${sc.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${TYPE_COLORS[contract.type] || "bg-white/5 text-slate-400 border-white/10"}`}>
                        {contract.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.bg} ${sc.color}`}>
                        {sc.label}
                      </span>
                    </div>
                    <h3 className="text-white font-bold">{contract.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 flex-wrap">
                      {contract.signed_date && <span>Signed: {contract.signed_date}</span>}
                      {contract.expiry && <span>Expires: {contract.expiry}</span>}
                      {!contract.signed_date && <span className="text-orange-400">Awaiting signature</span>}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {contract.status === "pending" ? (
                    <button onClick={() => alert("Opening digital signature portal...")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors">
                      <FileSignature className="w-3.5 h-3.5" /> Sign Now
                    </button>
                  ) : (
                    <>
                      <button onClick={() => alert(`Previewing ${contract.title}...`)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/10">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => alert(`Downloading ${contract.title}...`)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/10">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <button onClick={() => setExpanded(isExpanded ? null : contract.id)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/10 text-xs font-mono">
                    {isExpanded ? "−" : "+"}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5 pt-2 border-t border-white/5">
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{contract.description}</p>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Parties</p>
                    <div className="flex gap-2 flex-wrap">
                      {contract.parties.map(p => (
                        <span key={p} className="px-3 py-1.5 rounded-xl bg-white/5 text-white text-xs border border-white/10">{p}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
