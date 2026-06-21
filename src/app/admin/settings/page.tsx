"use client";

import { motion } from "framer-motion";
import { Settings, Save, Key, Bell, Shield, Globe, Database, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-400" /> Platform Settings
          </h1>
          <p className="text-slate-400 text-sm mt-1">Configure global platform behavior and integrations.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation / Sections */}
        <div className="space-y-2">
          {[
            { id: "general", label: "General", icon: Globe, active: true },
            { id: "auth", label: "Authentication", icon: Key, active: false },
            { id: "notifications", label: "Notifications", icon: Bell, active: false },
            { id: "security", label: "Security", icon: Shield, active: false },
            { id: "database", label: "Database", icon: Database, active: false },
            { id: "profile", label: "Admin Profile", icon: User, active: false },
          ].map(item => (
            <button key={item.id} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-[#0F172A] border border-white/5 space-y-6">
            <h2 className="text-base font-semibold text-white">General Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Platform Name</label>
                <input type="text" defaultValue="NovaTech Enterprise"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Support Email</label>
                <input type="email" defaultValue="support@novatech.io"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Platform Timezone</label>
                <select className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                  <option>PST (Pacific Standard Time)</option>
                </select>
              </div>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">Maintenance Mode</h3>
              <p className="text-xs text-slate-400">Enable this to prevent new logins and show a maintenance screen to users.</p>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
                <span className="text-sm font-medium text-slate-300">Enable Maintenance Mode</span>
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
