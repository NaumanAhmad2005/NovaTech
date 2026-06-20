"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Clock, CheckSquare, FolderOpen,
  Calendar, MessageSquare, Receipt, FileSignature, LifeBuoy, Book,
  Settings, LogOut, ChevronLeft, ChevronRight, Zap, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortalStore } from "@/lib/portalStore";

const navigation = [
  { name: "Command Center", href: "/portal", icon: LayoutDashboard },
  { name: "My Projects", href: "/portal/projects", icon: FolderKanban },
  { name: "Timeline", href: "/portal/timeline", icon: Clock },
  { name: "Tasks & Milestones", href: "/portal/tasks", icon: CheckSquare },
  { name: "Files", href: "/portal/files", icon: FolderOpen },
  { name: "Meetings", href: "/portal/meetings", icon: Calendar },
  { name: "Messages", href: "/portal/messages", icon: MessageSquare },
  { name: "Invoices", href: "/portal/invoices", icon: Receipt },
  { name: "Contracts", href: "/portal/contracts", icon: FileSignature },
  { name: "Support", href: "/portal/support", icon: LifeBuoy },
  { name: "Knowledge Base", href: "/portal/docs", icon: Book },
  { name: "Settings", href: "/portal/settings", icon: Settings },
];

export default function PortalSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, mobileMenuOpen, setMobileMenuOpen } = usePortalStore();

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#02040a]/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarCollapsed ? 80 : 260,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "h-screen flex flex-col bg-[#050816]/95 backdrop-blur-md border-r border-white/5 z-50 shrink-0",
          "fixed md:sticky top-0 left-0",
          "transition-transform duration-300 md:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <span className="font-bold text-white tracking-wide font-mono text-sm whitespace-nowrap">
                  CLIENT PORTAL
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex w-8 h-8 rounded-lg items-center justify-center hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== '/portal';
            return (
              <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group relative",
                    isActive
                      ? "bg-blue-500/10 text-blue-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-blue-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive && "text-blue-400")} />
                  <AnimatePresence mode="wait">
                    {(!sidebarCollapsed || mobileMenuOpen) && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {sidebarCollapsed && !mobileMenuOpen && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl border border-white/10">
                      {item.name}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors relative group">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
              <span className="text-sm font-bold text-white">AH</span>
            </div>
            <AnimatePresence mode="wait">
              {(!sidebarCollapsed || mobileMenuOpen) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-hidden"
                >
                  <div className="text-sm font-medium text-white truncate">Ahmed Client</div>
                  <div className="text-xs text-slate-500 truncate">GlobalTech Inc.</div>
                </motion.div>
              )}
            </AnimatePresence>
            <LogOut className={cn("w-4 h-4 text-slate-500 hover:text-red-400 transition-colors shrink-0", (sidebarCollapsed && !mobileMenuOpen) && "hidden")} />
          </div>
        </div>
      </motion.aside>
    </>
  );
}
