"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Clock, CheckSquare, FolderOpen,
  Calendar, MessageSquare, Receipt, FileSignature, LifeBuoy, Book,
  Settings, LogOut, ChevronLeft, ChevronRight, Zap, Palette,
  Code2, Rocket, TestTube, ClipboardCheck, CreditCard, BarChart3,
  Bot, Bell, Users, FileText, ShieldCheck, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortalStore } from "@/lib/portalStore";

const navGroups = [
  {
    label: "Overview",
    items: [
      { name: "Command Center", href: "/portal", icon: LayoutDashboard },
      { name: "My Projects", href: "/portal/projects", icon: FolderKanban },
      { name: "Timeline", href: "/portal/timeline", icon: Clock },
      { name: "Tasks & Milestones", href: "/portal/tasks", icon: CheckSquare },
    ],
  },
  {
    label: "Build",
    items: [
      { name: "Design Center", href: "/portal/design", icon: Palette },
      { name: "Development", href: "/portal/development", icon: Code2 },
      { name: "Deployments", href: "/portal/deployments", icon: Rocket },
      { name: "Testing & QA", href: "/portal/testing", icon: TestTube },
    ],
  },
  {
    label: "Collaborate",
    items: [
      { name: "Messages", href: "/portal/messages", icon: MessageSquare },
      { name: "Meetings", href: "/portal/meetings", icon: Calendar },
      { name: "Approvals", href: "/portal/approvals", icon: ClipboardCheck },
      { name: "Change Requests", href: "/portal/changes", icon: RefreshCw },
      { name: "Team", href: "/portal/team", icon: Users },
    ],
  },
  {
    label: "Assets",
    items: [
      { name: "Files", href: "/portal/files", icon: FolderOpen },
      { name: "Documents", href: "/portal/documents", icon: FileText },
      { name: "Contracts", href: "/portal/contracts", icon: FileSignature },
    ],
  },
  {
    label: "Finance",
    items: [
      { name: "Invoices", href: "/portal/invoices", icon: Receipt },
      { name: "Payments", href: "/portal/payments", icon: CreditCard },
    ],
  },
  {
    label: "Reports & Help",
    items: [
      { name: "Reports", href: "/portal/reports", icon: BarChart3 },
      { name: "Support", href: "/portal/support", icon: LifeBuoy },
      { name: "Knowledge Base", href: "/portal/docs", icon: Book },
      { name: "AI Assistant", href: "/portal/ai", icon: Bot },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Notifications", href: "/portal/notifications", icon: Bell },
      { name: "Settings", href: "/portal/settings", icon: Settings },
    ],
  },
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

  const isActive = (href: string) =>
    href === "/portal" ? pathname === "/portal" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#050816]/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={cn(
          "h-screen flex flex-col bg-[#07091a] border-r border-white/5 z-50 shrink-0",
          "fixed md:sticky top-0 left-0",
          "transition-transform duration-300 md:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
          <AnimatePresence mode="wait">
            {(!sidebarCollapsed || mobileMenuOpen) && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white tracking-wider font-mono text-sm whitespace-nowrap">NovaTech</span>
              </motion.div>
            )}
            {sidebarCollapsed && !mobileMenuOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto">
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex w-7 h-7 rounded-lg items-center justify-center hover:bg-white/5 text-slate-500 hover:text-white transition-colors shrink-0"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav groups */}
        <div className="flex-1 overflow-y-auto py-4 px-2 scrollbar-hide space-y-1">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-2">
              <AnimatePresence mode="wait">
                {(!sidebarCollapsed || mobileMenuOpen) && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 select-none">
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <div
                      title={sidebarCollapsed && !mobileMenuOpen ? item.name : undefined}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group relative",
                        sidebarCollapsed && !mobileMenuOpen ? "justify-center" : "",
                        active
                          ? "bg-blue-600/10 text-blue-400 border border-blue-500/10"
                          : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]"
                      )}
                    >
                      {active && (
                        <motion.div layoutId="activeSidebarItem"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-blue-500 rounded-r-full" />
                      )}
                      <item.icon className={cn("w-[18px] h-[18px] shrink-0", active ? "text-blue-400" : "")} />
                      <AnimatePresence mode="wait">
                        {(!sidebarCollapsed || mobileMenuOpen) && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="whitespace-nowrap text-sm font-medium">
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* User footer */}
        <div className="p-3 border-t border-white/5">
          <div onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-red-500/5 cursor-pointer transition-colors group"
            title="Sign Out"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">NT</span>
            </div>
            <AnimatePresence mode="wait">
              {(!sidebarCollapsed || mobileMenuOpen) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">Client Portal</div>
                  <div className="text-xs text-slate-500 truncate">Sign out</div>
                </motion.div>
              )}
            </AnimatePresence>
            <LogOut className={cn("w-4 h-4 text-slate-600 group-hover:text-red-400 transition-colors shrink-0",
              (sidebarCollapsed && !mobileMenuOpen) && "hidden")} />
          </div>
        </div>
      </motion.aside>
    </>
  );
}
