"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, User, Lock, Bell, Globe, Shield, Eye, EyeOff,
  Save, CheckCircle, Smartphone, Trash2
} from "lucide-react";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security & 2FA", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "language", label: "Language & Region", icon: Globe },
];

export default function PortalSettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifs, setNotifs] = useState({
    project_updates: true, meeting_reminders: true, invoice_alerts: true,
    design_uploads: true, deployment_status: false, weekly_report: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-400" /> Settings
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage your profile, security, and notification preferences.</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            saved ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}>
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Nav */}
        <div className="space-y-1">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === s.id ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}>
              <s.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="p-6 rounded-2xl bg-[#0a0f1e] border border-white/5 space-y-6">

              {activeSection === "profile" && (
                <>
                  <h2 className="text-base font-semibold text-white">Profile Information</h2>
                  {/* Avatar */}
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">NT</div>
                    <div>
                      <button onClick={() => alert("Opening file picker...")} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm border border-white/10 transition-colors">Upload Photo</button>
                      <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name", placeholder: "Ahmed Hassan", type: "text" },
                      { label: "Email Address", placeholder: "ahmed@globaltech.io", type: "email" },
                      { label: "Company Name", placeholder: "GlobalTech Inc.", type: "text" },
                      { label: "Job Title", placeholder: "CEO", type: "text" },
                      { label: "Phone Number", placeholder: "+92 300 0000000", type: "tel" },
                      { label: "Timezone", placeholder: "Asia/Karachi (PKT)", type: "text" },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 placeholder:text-slate-600" />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === "security" && (
                <>
                  <h2 className="text-base font-semibold text-white">Security & 2FA</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Current Password</label>
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 pr-12" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">New Password</label>
                      <input type="password" placeholder="Min 8 characters" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
                    </div>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <button onClick={() => alert("Setting up 2FA...")} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                  <hr className="border-white/5" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-3">Active Sessions</p>
                    {[
                      { device: "Chrome — MacBook Pro", location: "Karachi, PK", time: "Current session" },
                      { device: "Safari — iPhone 15", location: "Karachi, PK", time: "2 days ago" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 mb-2">
                        <div>
                          <p className="text-white text-sm font-medium">{s.device}</p>
                          <p className="text-xs text-slate-500">{s.location} · {s.time}</p>
                        </div>
                        {i !== 0 && <button onClick={() => alert("Session revoked.")} className="text-xs text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>}
                        {i === 0 && <span className="text-xs text-green-400 font-medium">Active</span>}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === "notifications" && (
                <>
                  <h2 className="text-base font-semibold text-white">Notification Preferences</h2>
                  <div className="space-y-4">
                    {Object.entries(notifs).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                        <div>
                          <p className="text-white text-sm font-medium capitalize">{key.replace(/_/g, " ")}</p>
                          <p className="text-xs text-slate-500">Receive notifications for this event</p>
                        </div>
                        <label className="relative cursor-pointer">
                          <input type="checkbox" checked={val} onChange={e => setNotifs(p => ({ ...p, [key]: e.target.checked }))} className="sr-only peer" />
                          <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === "privacy" && (
                <>
                  <h2 className="text-base font-semibold text-white">Privacy Controls</h2>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-400">Control how your data is used and stored on the NovaTech platform.</p>
                    {[
                      { label: "Share usage analytics", desc: "Help us improve your experience" },
                      { label: "Email marketing", desc: "Receive tips, updates, and offers" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                        <div><p className="text-white text-sm font-medium">{item.label}</p><p className="text-xs text-slate-500">{item.desc}</p></div>
                        <label className="relative cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                        </label>
                      </div>
                    ))}
                    <button onClick={() => alert("Generating your data export...")} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Download my personal data →</button>
                  </div>
                </>
              )}

              {activeSection === "language" && (
                <>
                  <h2 className="text-base font-semibold text-white">Language & Region</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Display Language</label>
                      <select className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                        <option>English (US)</option><option>Arabic (عربي)</option><option>French (Français)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Timezone</label>
                      <select className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                        <option>Asia/Karachi (PKT UTC+5)</option><option>UTC</option><option>America/New_York (EST)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Date Format</label>
                      <select className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                        <option>MMM DD, YYYY (Jun 27, 2026)</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
