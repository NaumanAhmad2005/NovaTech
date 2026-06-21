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

  const handleLogout = async () => {
    document.cookie = 'demo_client_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#050816]/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 260 }}
        className={cn(
          "h-screen flex flex-col bg-transparent border-r border-white/5 z-50 shrink-0",
          "fixed md:sticky top-0 left-0",
          "transition-transform duration-300 md:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <span className="font-bold text-white tracking-wide font-mono text-sm whitespace-nowrap">
                  PORTAL
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
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group relative",
                    isActive
                      ? "bg-blue-600/10 text-blue-400"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-blue-500")} />
                  <AnimatePresence mode="wait">
                    {(!sidebarCollapsed || mobileMenuOpen) && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="whitespace-nowrap font-medium text-sm"
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isActive && !sidebarCollapsed && (
                    <motion.div
                      layoutId="activeTabPortal"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <div 
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors relative group"
            title="Sign Out"
          >
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
            <LogOut className={cn("w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors shrink-0", (sidebarCollapsed && !mobileMenuOpen) && "hidden")} />
          </div>
        </div>
      </motion.aside>
    </>
  );
}
