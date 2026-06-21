"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save, RefreshCw, Eye, Layout, Type, Star, AlertCircle,
  CheckCircle, Loader2, ChevronDown, ChevronUp, Info
} from "lucide-react";
import { defaultContent } from "@/lib/cms";

// ── Types ──────────────────────────────────────────────────────────────────
type CMSContent = Record<string, Record<string, string>>;

// ── Section config (label + description for each editable field) ────────────
const sectionMeta: Record<string, { label: string; icon: any; fields: Record<string, { label: string; type: "text" | "textarea"; hint?: string }> }> = {
  hero: {
    label: "Hero Section",
    icon: Star,
    fields: {
      badge: { label: "Badge Text", type: "text", hint: "Small text shown in the pill above the headline" },
      headline_line1: { label: "Headline – Line 1", type: "text" },
      headline_line2: { label: "Headline – Line 2 (gradient)", type: "text" },
      headline_line3: { label: "Headline – Line 3", type: "text" },
      subtitle: { label: "Subtitle Paragraph", type: "textarea" },
      button_primary: { label: "Primary Button Label", type: "text" },
      button_secondary: { label: "Secondary Button Label", type: "text" },
      stat1_num: { label: "Stat 1 – Number", type: "text" },
      stat1_label: { label: "Stat 1 – Label", type: "text" },
      stat2_num: { label: "Stat 2 – Number", type: "text" },
      stat2_label: { label: "Stat 2 – Label", type: "text" },
      stat3_num: { label: "Stat 3 – Number", type: "text" },
      stat3_label: { label: "Stat 3 – Label", type: "text" },
    },
  },
  cta: {
    label: "Call To Action",
    icon: Layout,
    fields: {
      headline: { label: "CTA Headline", type: "text" },
      subtitle: { label: "CTA Subtitle", type: "textarea" },
      button_primary: { label: "Primary Button", type: "text" },
      button_secondary: { label: "Secondary Button", type: "text" },
    },
  },
  about: {
    label: "About Section",
    icon: Info,
    fields: {
      badge: { label: "Badge Text", type: "text" },
      headline: { label: "Headline", type: "text" },
      subtitle: { label: "Subtitle Paragraph", type: "textarea" },
      founded: { label: "Founded Year", type: "text" },
      team_size: { label: "Team Size", type: "text" },
      countries: { label: "Countries Served", type: "text" },
    },
  },
  footer: {
    label: "Footer",
    icon: Type,
    fields: {
      tagline: { label: "Footer Tagline", type: "text" },
      copyright: { label: "Copyright Line", type: "text" },
      email: { label: "Contact Email", type: "text" },
      phone: { label: "Contact Phone", type: "text" },
    },
  },
};

// ── Editable Field ─────────────────────────────────────────────────────────
function EditableField({
  sectionKey, fieldKey, meta, value, onChange, onSave, saving,
}: {
  sectionKey: string;
  fieldKey: string;
  meta: { label: string; type: "text" | "textarea"; hint?: string };
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const defaultVal = defaultContent[sectionKey]?.[fieldKey] || "";
  const isDirty = value !== defaultVal;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-slate-400">{meta.label}</label>
        {isDirty && (
          <span className="text-[10px] text-orange-400 font-medium">unsaved</span>
        )}
      </div>
      {meta.hint && <p className="text-[11px] text-slate-600 mb-1.5">{meta.hint}</p>}
      {meta.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all resize-none placeholder:text-slate-600"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
        />
      )}
    </div>
  );
}

// ── Section Panel ──────────────────────────────────────────────────────────
function SectionPanel({
  sectionKey, content, onSaveSection, globalSaving,
}: {
  sectionKey: string;
  content: Record<string, string>;
  onSaveSection: (sectionKey: string, data: Record<string, string>) => Promise<void>;
  globalSaving: boolean;
}) {
  const meta = sectionMeta[sectionKey];
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<Record<string, string>>(content);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setLocal(content); }, [content]);

  const hasChanges = JSON.stringify(local) !== JSON.stringify(content);

  const handleSave = async () => {
    setSaving(true);
    await onSaveSection(sectionKey, local);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Icon = meta.icon;

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{meta.label}</p>
            <p className="text-xs text-slate-500">{Object.keys(meta.fields).length} fields</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs border border-orange-500/20">
              Modified
            </span>
          )}
          {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </div>
      </button>

      {/* Fields */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(meta.fields).map(([fieldKey, fieldMeta]) => (
                  <div key={fieldKey} className={fieldMeta.type === "textarea" ? "md:col-span-2" : ""}>
                    <EditableField
                      sectionKey={sectionKey}
                      fieldKey={fieldKey}
                      meta={fieldMeta}
                      value={local[fieldKey] ?? defaultContent[sectionKey]?.[fieldKey] ?? ""}
                      onChange={(v) => setLocal((prev) => ({ ...prev, [fieldKey]: v }))}
                      onSave={handleSave}
                      saving={saving}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button
                  onClick={() => setLocal(content)}
                  className="text-xs text-slate-500 hover:text-white transition-colors"
                  disabled={!hasChanges}
                >
                  Reset changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm font-medium transition-all"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : saved ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main CMS Page ──────────────────────────────────────────────────────────
export default function AdminCMSPage() {
  const [content, setContent] = useState<CMSContent>({});
  const [loading, setLoading] = useState(true);
  const [supabaseReady, setSupabaseReady] = useState(true);
  const [globalSaving, setGlobalSaving] = useState(false);
  const [globalSaved, setGlobalSaved] = useState(false);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms");
      if (res.ok) {
        const data = await res.json();
        // Build nested structure
        const nested: CMSContent = { ...defaultContent };
        for (const row of data.content || []) {
          if (!nested[row.section]) nested[row.section] = {};
          nested[row.section][row.key] = row.value;
        }
        setContent(nested);
      } else {
        setSupabaseReady(false);
        setContent(defaultContent);
      }
    } catch {
      setSupabaseReady(false);
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const handleSaveSection = async (sectionKey: string, data: Record<string, string>) => {
    for (const [key, value] of Object.entries(data)) {
      await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sectionKey, key, value }),
      });
    }
    setContent((prev) => ({ ...prev, [sectionKey]: data }));
  };

  const handleSaveAll = async () => {
    setGlobalSaving(true);
    for (const [sectionKey, fields] of Object.entries(content)) {
      if (sectionMeta[sectionKey]) {
        await handleSaveSection(sectionKey, fields);
      }
    }
    setGlobalSaving(false);
    setGlobalSaved(true);
    setTimeout(() => setGlobalSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight">Website CMS</h1>
          <p className="text-slate-400 text-sm mt-1">Edit your live website content. Changes save to the database and update instantly.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview Site
          </a>
          <button
            onClick={fetchContent}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleSaveAll}
            disabled={globalSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-50"
          >
            {globalSaving ? <Loader2 className="w-4 h-4 animate-spin" /> :
             globalSaved ? <CheckCircle className="w-4 h-4" /> :
             <Save className="w-4 h-4" />}
            {globalSaved ? "All Saved!" : "Publish All"}
          </button>
        </div>
      </div>

      {/* Supabase warning */}
      {!supabaseReady && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
          <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-orange-300">Supabase not configured</p>
            <p className="text-xs text-orange-400/70 mt-0.5">
              You can edit content below, but it won't save to a database until you configure your real Supabase keys in <code>.env.local</code>.
              Run the CMS SQL schema to create the <code>site_content</code> table.
            </p>
          </div>
        </div>
      )}

      {/* SQL reminder */}
      <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
        <p className="text-xs text-blue-400 font-mono">
          📋 Remember to run the <span className="text-white">site_content</span> table SQL in your Supabase SQL Editor before saving. See the Build Plan for the full schema.
        </p>
      </div>

      {/* Section Panels */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {Object.keys(sectionMeta).map((sectionKey) => (
            <motion.div
              key={sectionKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SectionPanel
                sectionKey={sectionKey}
                content={content[sectionKey] || defaultContent[sectionKey] || {}}
                onSaveSection={handleSaveSection}
                globalSaving={globalSaving}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
