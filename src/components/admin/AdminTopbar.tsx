"use client";

import { Bell, Search, Command, Settings, Menu } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { useAdminStore } from "@/lib/adminStore";

export default function AdminTopbar() {
  const { theme, toggleTheme } = useTheme();
  const { setMobileMenuOpen } = useAdminStore();

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/5 bg-[#050816]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search / Command Palette Trigger */}
      <div className="flex-1 max-w-xl">
        <button className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-slate-400 text-sm group">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Search anything...</span>
          </div>
          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <kbd className="px-2 py-0.5 rounded-md bg-black/50 border border-white/10 font-mono text-xs flex items-center gap-1">
              <Command className="w-3 h-3" /> K
            </kbd>
          </div>
        </button>
      </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-4">
        {/* Environment Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-400">Production</span>
        </div>

        <div className="h-6 w-px bg-white/10 mx-2" />

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-[#050816]" />
        </button>

        {/* User Dropdown Placeholder */}
        <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
          <Settings className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
