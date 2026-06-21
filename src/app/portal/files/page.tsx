"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Image, File, Archive, Loader2, FolderOpen, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface FileRecord {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  created_at: string;
}

const DEMO_FILES: FileRecord[] = [
  { id: "1", file_name: "NovaTech_UI_Designs_v3.figma", file_url: "#", file_type: "design", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
  { id: "2", file_name: "API_Documentation_v1.2.pdf", file_url: "#", file_type: "pdf", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
  { id: "3", file_name: "Project_Contract_Signed.pdf", file_url: "#", file_type: "pdf", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString() },
  { id: "4", file_name: "Sprint_14_Report.docx", file_url: "#", file_type: "doc", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: "5", file_name: "Architecture_Diagram.png", file_url: "#", file_type: "image", created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
  { id: "6", file_name: "Source_Code_v1.4.2.zip", file_url: "#", file_type: "archive", created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() },
];

function getIcon(type: string) {
  if (type === "image") return <Image className="w-5 h-5 text-purple-400" />;
  if (type === "pdf") return <FileText className="w-5 h-5 text-red-400" />;
  if (type === "archive") return <Archive className="w-5 h-5 text-yellow-400" />;
  if (type === "design") return <Eye className="w-5 h-5 text-pink-400" />;
  return <File className="w-5 h-5 text-blue-400" />;
}

function getBg(type: string) {
  if (type === "image") return "bg-purple-500/10 border-purple-500/20";
  if (type === "pdf") return "bg-red-500/10 border-red-500/20";
  if (type === "archive") return "bg-yellow-500/10 border-yellow-500/20";
  if (type === "design") return "bg-pink-500/10 border-pink-500/20";
  return "bg-blue-500/10 border-blue-500/20";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      if (document.cookie.includes("demo_client_session=true")) {
        setFiles(DEMO_FILES);
        setLoading(false);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoading(false); return; }
      const { data: projects } = await supabase.from("projects").select("id").eq("client_id", session.user.id).limit(1);
      if (projects && projects.length > 0) {
        const { data: f } = await supabase.from("files").select("*").eq("project_id", projects[0].id).order("created_at", { ascending: false });
        setFiles(f || []);
      }
      setLoading(false);
    };
    load();
  }, [supabase]);

  const types = ["all", ...Array.from(new Set(files.map(f => f.file_type)))];
  const filtered = filter === "all" ? files : files.filter(f => f.file_type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Files & Deliverables</h1>
        <p className="text-slate-400 text-sm mt-1">All project assets, designs, reports, and source files.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === t
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FolderOpen className="w-12 h-12 text-slate-600 mb-4" />
          <p className="text-slate-400 font-medium">No files yet</p>
          <p className="text-slate-600 text-sm mt-1">Your team will upload project files and deliverables here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group p-5 rounded-2xl bg-[#111827] border border-white/5 hover:border-white/10 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${getBg(file.file_type)}`}>
                {getIcon(file.file_type)}
              </div>
              <p className="text-white text-sm font-medium truncate mb-1">{file.file_name}</p>
              <p className="text-slate-500 text-xs mb-4">{formatDate(file.created_at)}</p>
              <a
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
