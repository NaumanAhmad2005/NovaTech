"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Download, Eye, Hash, ChevronRight } from "lucide-react";

const DOCUMENTS = [
  { id: "1", title: "Project Requirements Document (PRD)", category: "Requirements", updated: "Jan 20, 2026", size: "2.4 MB", type: "pdf" },
  { id: "2", title: "Scope of Work — GlobalTech Enterprise Platform", category: "Contracts", updated: "Jan 15, 2026", size: "1.1 MB", type: "pdf" },
  { id: "3", title: "Technical Architecture Document", category: "Technical", updated: "Mar 10, 2026", size: "3.8 MB", type: "pdf" },
  { id: "4", title: "API Documentation v1.2", category: "Technical", updated: "Jun 20, 2026", size: "5.2 MB", type: "pdf" },
  { id: "5", title: "Sprint 14 Meeting Notes", category: "Meeting Notes", updated: "Jun 25, 2026", size: "0.3 MB", type: "doc" },
  { id: "6", title: "User Manual — Client Portal", category: "User Guides", updated: "Jun 10, 2026", size: "1.8 MB", type: "pdf" },
  { id: "7", title: "NDA — GlobalTech & NovaTech", category: "Contracts", updated: "Jan 12, 2026", size: "0.8 MB", type: "pdf" },
  { id: "8", title: "Q2 Architecture Review Notes", category: "Meeting Notes", updated: "Jun 15, 2026", size: "0.5 MB", type: "doc" },
];

const CATEGORIES = ["All", "Requirements", "Technical", "Meeting Notes", "Contracts", "User Guides"];

const TYPE_COLORS: Record<string, string> = {
  pdf: "bg-red-500/10 text-red-400 border-red-500/20",
  doc: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = DOCUMENTS.filter(d => {
    const matchCat = activeCategory === "All" || d.category === activeCategory;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-400" /> Documents
        </h1>
        <p className="text-slate-400 text-sm mt-1">Requirements, meeting notes, technical documentation, and contracts.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..."
          className="w-full pl-11 pr-4 py-3 bg-[#0a0f1e] border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Documents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((doc, i) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors leading-snug">{doc.title}</h3>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-slate-500"><Hash className="w-3 h-3" />{doc.category}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border uppercase ${TYPE_COLORS[doc.type]}`}>{doc.type}</span>
                  <span className="text-xs text-slate-600">{doc.size}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">Updated {doc.updated}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
              <button onClick={() => alert(`Opening preview of "${doc.title}"...`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10 transition-colors">
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button onClick={() => alert(`Downloading "${doc.title}"...`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs border border-blue-500/20 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-16 text-center">
          <FileText className="w-10 h-10 text-slate-600 mb-3" />
          <p className="text-slate-400 font-medium">No documents found</p>
          <p className="text-slate-600 text-sm mt-1">Try a different search term or category.</p>
        </div>
      )}
    </div>
  );
}
