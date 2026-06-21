"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Receipt, CheckCircle, Clock, AlertTriangle, Loader2, Download, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "overdue";
  due_date: string;
  created_at: string;
}

const DEMO_INVOICES: Invoice[] = [
  { id: "INV-001", amount: 12500, currency: "USD", status: "paid", due_date: "2026-02-01", created_at: "2026-01-15T00:00:00Z" },
  { id: "INV-002", amount: 18000, currency: "USD", status: "paid", due_date: "2026-04-01", created_at: "2026-03-15T00:00:00Z" },
  { id: "INV-003", amount: 22500, currency: "USD", status: "pending", due_date: "2026-08-01", created_at: "2026-07-01T00:00:00Z" },
];

function StatusBadge({ status }: { status: Invoice["status"] }) {
  const config = {
    paid: { color: "text-green-400 bg-green-500/10 border-green-500/20", icon: <CheckCircle className="w-3 h-3" />, label: "Paid" },
    pending: { color: "text-orange-400 bg-orange-500/10 border-orange-500/20", icon: <Clock className="w-3 h-3" />, label: "Pending" },
    overdue: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: <AlertTriangle className="w-3 h-3" />, label: "Overdue" },
  }[status];
  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.icon} {config.label}
    </span>
  );
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      if (document.cookie.includes("demo_client_session=true")) {
        setInvoices(DEMO_INVOICES);
        setLoading(false);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoading(false); return; }
      const { data: inv } = await supabase.from("invoices").select("*").eq("client_id", session.user.id).order("created_at", { ascending: false });
      setInvoices(inv || []);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Invoices</h1>
        <p className="text-slate-400 text-sm mt-1">Track your project billing and payment history.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Billed", value: `$${total.toLocaleString()}`, color: "text-white", bg: "bg-white/[0.02]" },
          { label: "Paid", value: `$${paid.toLocaleString()}`, color: "text-green-400", bg: "bg-green-500/5" },
          { label: "Pending", value: `$${pending.toLocaleString()}`, color: "text-orange-400", bg: "bg-orange-500/5" },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-2xl border border-white/5 ${card.bg}`}>
            <p className="text-slate-500 text-sm mb-1">{card.label}</p>
            <p className={`text-2xl font-bold font-mono ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Invoice list */}
      <div className="rounded-2xl bg-[#0F172A] border border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">Invoice History</h2>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>
        ) : invoices.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Receipt className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-400">No invoices yet</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {invoices.map((inv, i) => (
              <motion.div key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium font-mono">{inv.id}</p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Due {new Date(inv.due_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-white font-bold font-mono text-lg">${inv.amount.toLocaleString()}</p>
                  <StatusBadge status={inv.status} />
                  <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
