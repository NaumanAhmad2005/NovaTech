"use client";

import { motion } from "framer-motion";
import { Book, Search, FileText, FolderOpen, ChevronRight, Hash } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <Book className="w-6 h-6 text-blue-400" /> Knowledge Base
          </h1>
          <p className="text-slate-400 text-sm mt-1">Internal documentation, SOPs, and deployment guides.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input type="text" placeholder="Search documentation..."
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Categories</h2>
          <div className="space-y-2">
            {[
              { id: "getting-started", label: "Getting Started", icon: Flag, count: 4 },
              { id: "architecture", label: "Architecture", icon: Layout, count: 12 },
              { id: "deployment", label: "Deployment & CI/CD", icon: Cloud, count: 8 },
              { id: "api", label: "API Reference", icon: Code, count: 24 },
              { id: "security", label: "Security & Compliance", icon: Shield, count: 6 },
            ].map((cat, i) => (
              <button key={cat.id} onClick={() => alert(`Filtering by category: ${cat.label}`)} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 text-slate-300">
                  <FolderOpen className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium">{cat.label}</span>
                </div>
                <span className="text-xs text-slate-500">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Recent Articles</h2>
          <div className="space-y-3">
            {[
              { title: "Supabase Schema Migration Guide", cat: "Database", date: "2 days ago" },
              { title: "Deploying to Vercel with Custom Domains", cat: "Deployment", date: "1 week ago" },
              { title: "Authentication Flow Architecture", cat: "Architecture", date: "2 weeks ago" },
              { title: "Handling Stripe Webhooks Locally", cat: "API Reference", date: "3 weeks ago" },
            ].map((doc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                onClick={() => alert(`Opening document: ${doc.title}`)}
                className="p-4 rounded-xl bg-[#0F172A] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">{doc.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> {doc.cat}</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Flag, Layout, Cloud, Code, Shield } from "lucide-react";
