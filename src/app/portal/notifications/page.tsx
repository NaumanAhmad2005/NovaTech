"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, Calendar, Upload, Rocket, ClipboardCheck, MessageSquare, BarChart3, DollarSign, Filter } from "lucide-react";

type NotifType = "update" | "meeting" | "upload" | "deploy" | "approval" | "message" | "report" | "invoice";

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  urgent?: boolean;
}

const ICON_MAP: Record<NotifType, { icon: any; color: string; bg: string }> = {
  update:   { icon: CheckCircle,   color: "text-green-400",  bg: "bg-green-500/10"  },
  meeting:  { icon: Calendar,      color: "text-blue-400",   bg: "bg-blue-500/10"   },
  upload:   { icon: Upload,        color: "text-pink-400",   bg: "bg-pink-500/10"   },
  deploy:   { icon: Rocket,        color: "text-orange-400", bg: "bg-orange-500/10" },
  approval: { icon: ClipboardCheck,color: "text-yellow-400", bg: "bg-yellow-500/10" },
  message:  { icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-500/10" },
  report:   { icon: BarChart3,     color: "text-cyan-400",   bg: "bg-cyan-500/10"   },
  invoice:  { icon: DollarSign,    color: "text-emerald-400",bg: "bg-emerald-500/10"},
};

const NOTIFICATIONS: Notif[] = [
  { id: "1", type: "approval", title: "Approval Required", desc: "Payment Flow UI Designs v4 need your review before Friday.", time: "2h ago", read: false, urgent: true },
  { id: "2", type: "deploy",   title: "Deployment Successful", desc: "Build v1.4.7 deployed to staging. All tests passing.", time: "5h ago", read: false },
  { id: "3", type: "message",  title: "New Message", desc: "Sarah Chen: Can you review the designs today?", time: "6h ago", read: false },
  { id: "4", type: "meeting",  title: "Meeting Tomorrow", desc: "Sprint 14 Demo & Review — Jul 4 at 10:00 AM PKT", time: "Yesterday", read: true },
  { id: "5", type: "upload",   title: "New File Uploaded", desc: "Architecture_Diagram_v2.png has been added to your files.", time: "Yesterday", read: true },
  { id: "6", type: "invoice",  title: "Invoice Issued", desc: "Invoice #INV-004 for $22,500 is due July 15, 2026.", time: "2 days ago", read: true },
  { id: "7", type: "update",   title: "Milestone Completed", desc: "Authentication Module milestone has been marked complete.", time: "Jun 25", read: true },
  { id: "8", type: "report",   title: "Weekly Report Ready", desc: "Your Week 26 project report is available to download.", time: "Jun 27", read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unread = notifications.filter(n => !n.read).length;
  const filtered = filter === "unread" ? notifications.filter(n => !n.read) : notifications;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-400" /> Notifications
          </h1>
          <p className="text-slate-400 text-sm mt-1">All project updates, alerts, and reminders in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          {unread > 0 && (
            <button onClick={markAllRead} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              Mark all as read
            </button>
          )}
          {unread > 0 && <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">{unread} new</span>}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "unread"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
            {f === "all" ? "All Notifications" : `Unread (${unread})`}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
        <div className="divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Bell className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-slate-400 font-medium">All caught up!</p>
              <p className="text-slate-600 text-sm mt-1">No unread notifications.</p>
            </div>
          ) : (
            filtered.map((notif, i) => {
              const cfg = ICON_MAP[notif.type];
              return (
                <motion.div key={notif.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  onClick={() => markRead(notif.id)}
                  className={`flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer ${!notif.read ? "bg-blue-500/[0.03]" : ""}`}>
                  <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-semibold ${!notif.read ? "text-white" : "text-slate-300"}`}>{notif.title}</p>
                      {notif.urgent && <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 font-bold">Urgent</span>}
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{notif.desc}</p>
                    <p className="text-xs text-slate-600 mt-1">{notif.time}</p>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
