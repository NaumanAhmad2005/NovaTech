"use client";

import { useState } from "react";
import { Bell, Search, Command, Settings, Menu, Sparkles, X } from "lucide-react";
import { usePortalStore } from "@/lib/portalStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SEARCH_RESULTS = [
  { type: "Page", label: "Command Center", href: "/portal" },
  { type: "Page", label: "AI Assistant", href: "/portal/ai" },
  { type: "Page", label: "Design Center", href: "/portal/design" },
  { type: "Page", label: "Approvals", href: "/portal/approvals" },
  { type: "Page", label: "Reports", href: "/portal/reports" },
  { type: "Page", label: "Payments", href: "/portal/payments" },
  { type: "Page", label: "Timeline", href: "/portal/timeline" },
  { type: "Page", label: "Team", href: "/portal/team" },
];

export default function PortalTopbar() {
  const { setMobileMenuOpen } = usePortalStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = SEARCH_RESULTS.filter(r =>
    searchQuery.length > 0 && r.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Global search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
              className="fixed inset-0 bg-[#050816]/80 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.97 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4">
              <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                  <Search className="w-4 h-4 text-slate-500 shrink-0" />
                  <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search pages, files, invoices, reports…"
                    className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-600 focus:outline-none" />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-slate-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {searchQuery.length === 0 ? (
                  <div className="px-4 py-3">
                    <p className="text-xs text-slate-600 mb-2">Quick navigation</p>
                    <div className="grid grid-cols-2 gap-1">
                      {SEARCH_RESULTS.slice(0, 6).map(r => (
                        <Link key={r.href} href={r.href} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm text-slate-400 hover:text-white">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-600 border border-white/10">{r.type}</span>
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : filtered.length > 0 ? (
                  <div className="py-2">
                    {filtered.map(r => (
                      <Link key={r.href} href={r.href} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">{r.type}</span>
                        <span className="text-sm text-slate-200">{r.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-slate-500">No results for "{searchQuery}"</p>
                  </div>
                )}
                <div className="px-4 py-2 border-t border-white/5 flex items-center gap-3 text-[10px] text-slate-600">
                  <span><kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 font-mono">↵</kbd> to navigate</span>
                  <span><kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 font-mono">Esc</kbd> to close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className="h-14 px-4 md:px-5 flex items-center justify-between border-b border-white/5 bg-[#07091a]/90 backdrop-blur-md sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-3 flex-1">
          <button onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          {/* Search trigger */}
          <button onClick={() => setSearchOpen(true)}
            className="hidden md:flex flex-1 max-w-xs items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-slate-500 hover:text-slate-300 text-sm group">
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span className="text-sm">Search…</span>
            </span>
            <kbd className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-slate-600">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-2 ml-3">
          {/* Nova AI pill */}
          <Link href="/portal/ai"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 hover:from-blue-600/30 hover:to-purple-600/30 transition-all group">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300" />
            <span className="text-xs font-medium text-blue-400 group-hover:text-blue-300">Nova AI</span>
          </Link>

          <div className="h-5 w-px bg-white/10 mx-1 hidden md:block" />

          {/* Notifications */}
          <Link href="/portal/notifications"
            className="relative w-9 h-9 rounded-xl hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border-2 border-[#07091a]" />
          </Link>

          {/* Settings */}
          <Link href="/portal/settings"
            className="w-9 h-9 rounded-xl hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </header>
    </>
  );
}
