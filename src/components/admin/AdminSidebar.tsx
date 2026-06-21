"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Users, Briefcase, FileText,
  CreditCard, Settings, Shield, Bot, Cloud, ChevronLeft,
  ChevronRight, LifeBuoy, MessageSquare, Activity, LogOut, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/adminStore";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "CRM", href: "/admin/crm", icon: Briefcase },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Finance", href: "/admin/finance", icon: CreditCard },
  { name: "AI Center", href: "/admin/ai", icon: Bot },
  { name: "Deployments", href: "/admin/deployments", icon: Cloud },
  { name: "Infrastructure", href: "/admin/infrastructure", icon: Activity },
  { name: "Knowledge Base", href: "/admin/docs", icon: FileText },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Support", href: "/admin/support", icon: LifeBuoy },
  { name: "Security", href: "/admin/security", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, mobileMenuOpen, setMobileMenuOpen } = useAdminStore();

  const handleLogout = () => {
    document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile Overlay */}
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
          "h-screen flex flex-col bg-[#050816] border-r border-white/5 z-50 shrink-0",
          "fixed md:sticky top-0 left-0",
          "transition-transform duration-300 md:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
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
                  NOVATECH
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

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group relative",
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
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap"
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {isActive && !sidebarCollapsed && (
                    <motion.div
                      layoutId="activeTabAdmin"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <div 
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors relative group"
            title="Sign Out"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shrink-0">
              <div className="w-full h-full rounded-full bg-[#050816] flex items-center justify-center border border-transparent">
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-cyan-300">NA</span>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {(!sidebarCollapsed || mobileMenuOpen) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-hidden"
                >
                  <div className="text-sm font-medium text-white truncate">Nauman</div>
                  <div className="text-xs text-slate-500 truncate">Super Admin</div>
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
