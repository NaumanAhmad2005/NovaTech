"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen, Download, FileText, Image, Archive, File,
  Eye, Upload, Search, Grid, List, Clock
} from "lucide-react";

const DEMO_FILES = [
  { id: "1", name: "Payment_Flow_v4.fig",         type: "design",  size: "12.4 MB", category: "Design",    uploaded_by: "Aisha UI",    date: "Jun 27, 2026", tag: "new" },
  { id: "2", name: "API_Documentation_v1.2.pdf",  type: "pdf",     size: "2.1 MB",  category: "Docs",      uploaded_by: "Marcus Dev",  date: "Jun 20, 2026", tag: "" },
  { id: "3", name: "Architecture_Diagram_v2.png", type: "image",   size: "3.8 MB",  category: "Technical", uploaded_by: "Marcus Dev",  date: "Jun 15, 2026", tag: "" },
  { id: "4", name: "Sprint_14_Report.pdf",        type: "pdf",     size: "0.9 MB",  category: "Reports",   uploaded_by: "Sarah Chen",  date: "Jun 27, 2026", tag: "new" },
  { id: "5", name: "NovaTech_UI_Designs_v3.fig",  type: "design",  size: "28.5 MB", category: "Design",    uploaded_by: "Aisha UI",    date: "Jun 10, 2026", tag: "" },
  { id: "6", name: "Source_Code_v1.4.7.zip",      type: "archive", size: "45.2 MB", category: "Delivery",  uploaded_by: "Marcus Dev",  date: "Jun 27, 2026", tag: "new" },
  { id: "7", name: "Project_Contract_Signed.pdf", type: "pdf",     size: "0.5 MB",  category: "Contracts", uploaded_by: "Sarah Chen",  date: "Jan 15, 2026", tag: "" },
  { id: "8", name: "Sprint_13_Report.pdf",        type: "pdf",     size: "0.8 MB",  category: "Reports",   uploaded_by: "Sarah Chen",  date: "Jun 13, 2026", tag: "" },
  { id: "9", name: "Database_Schema_v2.pdf",      type: "pdf",     size: "1.2 MB",  category: "Technical", uploaded_by: "Marcus Dev",  date: "Mar 10, 2026", tag: "" },
];

const CATEGORIES = ["All", "Design", "Docs", "Technical", "Reports", "Contracts", "Delivery"];

const TYPE_CONFIG: Record<string, { icon: any; color: string; bg: string }> = {
  pdf:     { icon: FileText, color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20"    },
  image:   { icon: Image,    color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  archive: { icon: Archive,  color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  design:  { icon: Eye,      color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/20"  },
  doc:     { icon: File,     color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20"  },
};

export default function FilesPage() {
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = DEMO_FILES.filter(f => {
    const matchCat    = filter === "All" || f.category === filter;
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const newFiles = DEMO_FILES.filter(f => f.tag === "new").length;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-yellow-400" /> Files & Deliverables
          </h1>
          <p className="text-slate-400 text-sm mt-1">All project assets, designs, reports, and source files shared by your team.</p>
        </div>
        <div className="flex items-center gap-2">
          {newFiles > 0 && (
            <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20 font-medium">
              {newFiles} new files
            </span>
          )}
          <button onClick={() => alert("Upload functionality coming soon — your PM can also upload on your behalf.")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
            <Upload className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      {/* Search + view toggle */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files…"
            className="w-full pl-10 pr-4 py-2.5 bg-[#0a0f1e] border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
        </div>
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          <button onClick={() => setViewMode("grid")} className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode("list")} className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === cat ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* File count */}
      <p className="text-xs text-slate-600">{filtered.length} file{filtered.length !== 1 ? "s" : ""}</p>

      {/* Grid view */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((file, i) => {
            const tc = TYPE_CONFIG[file.type] || TYPE_CONFIG.doc;
            return (
              <motion.div key={file.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="group p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-all relative overflow-hidden">
                {file.tag === "new" && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-500 text-white text-[9px] font-bold">NEW</span>
                )}
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${tc.bg}`}>
                  <tc.icon className={`w-5 h-5 ${tc.color}`} />
                </div>
                <p className="text-white text-sm font-medium truncate mb-1" title={file.name}>{file.name}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{file.category}</span>
                  <span>{file.size}</span>
                </div>
                <p className="text-xs text-slate-600 flex items-center gap-1 mb-4">
                  <Clock className="w-3 h-3" />{file.date} · {file.uploaded_by}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => alert(`Previewing ${file.name}…`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <button onClick={() => alert(`Downloading ${file.name}…`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs border border-blue-500/20 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {viewMode === "list" && (
        <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
          <div className="divide-y divide-white/5">
            {filtered.map((file, i) => {
              const tc = TYPE_CONFIG[file.type] || TYPE_CONFIG.doc;
              return (
                <motion.div key={file.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${tc.bg}`}>
                      <tc.icon className={`w-4 h-4 ${tc.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm font-medium truncate">{file.name}</p>
                        {file.tag === "new" && <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[9px] font-bold shrink-0">NEW</span>}
                      </div>
                      <p className="text-xs text-slate-500">{file.category} · {file.size} · {file.uploaded_by}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-600 hidden md:block">{file.date}</span>
                    <button onClick={() => alert(`Downloading ${file.name}…`)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-16 rounded-2xl bg-[#0a0f1e] border border-white/5 text-center">
          <FolderOpen className="w-10 h-10 text-slate-600 mb-3" />
          <p className="text-slate-400 font-medium">No files found</p>
          <p className="text-slate-600 text-sm mt-1">Try a different filter or search term.</p>
        </div>
      )}
    </div>
  );
}
