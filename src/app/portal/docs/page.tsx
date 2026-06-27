"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Search, ChevronRight, Bookmark, Play, FileText, Code2, Zap, Shield, HelpCircle } from "lucide-react";

const CATEGORIES = [
  {
    id: "getting-started", name: "Getting Started", icon: Zap, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20",
    articles: [
      { title: "Welcome to your Client Workspace", readTime: "2 min" },
      { title: "How to navigate the portal", readTime: "3 min" },
      { title: "Setting up your notification preferences", readTime: "2 min" },
    ],
  },
  {
    id: "project-tracking", name: "Project Tracking", icon: FileText, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20",
    articles: [
      { title: "Understanding the Timeline", readTime: "4 min" },
      { title: "How sprints and milestones work", readTime: "5 min" },
      { title: "Reading your project health indicators", readTime: "3 min" },
      { title: "How to view and filter tasks", readTime: "3 min" },
    ],
  },
  {
    id: "design-approvals", name: "Design & Approvals", icon: Book, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20",
    articles: [
      { title: "How to review and approve designs", readTime: "4 min" },
      { title: "Requesting design changes", readTime: "3 min" },
      { title: "Understanding version history", readTime: "2 min" },
    ],
  },
  {
    id: "billing", name: "Billing & Payments", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20",
    articles: [
      { title: "Understanding your invoice schedule", readTime: "3 min" },
      { title: "How to download receipts", readTime: "1 min" },
      { title: "Payment methods accepted", readTime: "2 min" },
    ],
  },
  {
    id: "security", name: "Security & Privacy", icon: Shield, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20",
    articles: [
      { title: "How your data is protected", readTime: "4 min" },
      { title: "Setting up two-factor authentication", readTime: "3 min" },
      { title: "Managing active sessions", readTime: "2 min" },
    ],
  },
  {
    id: "faq", name: "FAQs", icon: HelpCircle, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20",
    articles: [
      { title: "How do I contact my project manager?", readTime: "1 min" },
      { title: "What does 'At Risk' project status mean?", readTime: "2 min" },
      { title: "Can I add team members to the portal?", readTime: "2 min" },
      { title: "How is my project's progress calculated?", readTime: "3 min" },
      { title: "What happens after my project launches?", readTime: "4 min" },
    ],
  },
];

const FEATURED = [
  "How to review and approve designs",
  "Understanding the Timeline",
  "How sprints and milestones work",
  "How your data is protected",
];

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState<string[]>(["How to review and approve designs"]);

  const toggleBookmark = (title: string) => {
    setBookmarked(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  const allArticles = CATEGORIES.flatMap(c => c.articles.map(a => ({ ...a, category: c.name })));
  const searchResults = search.length > 1 ? allArticles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Book className="w-6 h-6 text-purple-400" /> Knowledge Base
        </h1>
        <p className="text-slate-400 text-sm mt-1">Guides, FAQs, and tutorials to help you get the most from your portal.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search articles, guides, FAQs…"
          className="w-full pl-11 pr-4 py-3 bg-[#0a0f1e] border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
      </div>

      {/* Search results */}
      {search.length > 1 && (
        <div className="rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5">
            <p className="text-xs text-slate-500">{searchResults.length} results for "{search}"</p>
          </div>
          {searchResults.length > 0 ? (
            <div className="divide-y divide-white/5">
              {searchResults.map((a, i) => (
                <button key={i} onClick={() => alert(`Opening article: ${a.title}`)}
                  className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors text-left">
                  <div>
                    <p className="text-white text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{a.category} · {a.readTime} read</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              ))}
            </div>
          ) : (
            <div className="px-5 py-8 text-center">
              <p className="text-slate-500 text-sm">No articles found for "{search}"</p>
            </div>
          )}
        </div>
      )}

      {/* Featured articles */}
      {search.length === 0 && (
        <>
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FEATURED.map((title, i) => (
                <motion.button key={title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  onClick={() => alert(`Opening article: ${title}`)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-all text-left group">
                  <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">{title}</p>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* All categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cat.bg}`}>
                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                    <p className="text-xs text-slate-500">{cat.articles.length} articles</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {cat.articles.slice(0, 3).map((article) => (
                    <div key={article.title} className="flex items-center justify-between group/art py-1.5 cursor-pointer" onClick={() => alert(`Opening: ${article.title}`)}>
                      <p className="text-sm text-slate-400 group-hover/art:text-white transition-colors flex-1 truncate pr-2">{article.title}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-600">{article.readTime}</span>
                        <button onClick={e => { e.stopPropagation(); toggleBookmark(article.title); }}
                          className={`transition-colors ${bookmarked.includes(article.title) ? "text-blue-400" : "text-slate-700 hover:text-slate-400"}`}>
                          <Bookmark className="w-3.5 h-3.5" fill={bookmarked.includes(article.title) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {cat.articles.length > 3 && (
                    <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 pt-1">
                      +{cat.articles.length - 3} more articles <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
