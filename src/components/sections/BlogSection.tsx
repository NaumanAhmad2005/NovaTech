"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const posts = [
  {
    category: "AI & LLMs",
    title: "Building Production-Ready RAG Systems: Architecture Lessons from the Field",
    excerpt: "After deploying 8 RAG pipelines in production across healthcare, finance, and legal sectors, here's what actually matters when retrieval-augmented generation meets enterprise constraints.",
    readTime: "12 min read",
    date: "Jun 15, 2026",
    emoji: "🧠",
    color: "#C084FC",
  },
  {
    category: "Cloud Architecture",
    title: "Zero-Downtime Kubernetes Migrations: Our Battle-Tested Playbook",
    excerpt: "Migrating a 50,000 req/min banking system to Kubernetes with zero downtime required 14 months of planning. Here's the technical blueprint, the war stories, and the lessons no blog post talks about.",
    readTime: "16 min read",
    date: "Jun 8, 2026",
    emoji: "☸️",
    color: "#38BDF8",
  },
  {
    category: "Security",
    title: "The Hidden Attack Vectors in Modern Web Apps That Most Engineers Miss",
    excerpt: "OWASP Top 10 is the tip of the iceberg. From prototype pollution to HTTP request smuggling, these are the vulnerabilities that regularly appear in our security audits of \"secure\" applications.",
    readTime: "20 min read",
    date: "May 30, 2026",
    emoji: "🔒",
    color: "#10B981",
  },
  {
    category: "Software Engineering",
    title: "Domain-Driven Design in Practice: How We Tamed a 2M-Line Codebase",
    excerpt: "A monolith grown over 12 years with 40 contributors and zero architecture documentation. This is the story of how we applied DDD to bring order to chaos — without a full rewrite.",
    readTime: "18 min read",
    date: "May 22, 2026",
    emoji: "🏗️",
    color: "#3B82F6",
  },
  {
    category: "Startups",
    title: "From $0 to $10M ARR: The Engineering Decisions That Actually Mattered",
    excerpt: "We've built the tech stack for 15 startups that reached Series A and beyond. The architecture choices at MVP stage that will either 10x or kill your growth.",
    readTime: "14 min read",
    date: "May 14, 2026",
    emoji: "📈",
    color: "#F59E0B",
  },
  {
    category: "Case Studies",
    title: "Rebuilding a National Logistics System: 18 Months, 50K Daily Shipments",
    excerpt: "A deep technical dive into the architecture, data model, and engineering challenges of building a platform that now handles 50,000 shipments daily across 6 countries.",
    readTime: "22 min read",
    date: "May 3, 2026",
    emoji: "🚛",
    color: "#818CF8",
  },
];

export default function BlogSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="insights" className="py-28 relative" style={{ background: "linear-gradient(180deg, #050816 0%, #0F172A 50%, #050816 100%)" }}>
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-xs text-purple-300 font-mono tracking-wider">ENGINEERING BLOG</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Technical <span className="gradient-text">Insights</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Deep technical writing from engineers who build production systems daily. No fluff, no tutorials — real engineering.
          </motion.p>
        </div>

        {/* Featured + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured (first post) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="lg:col-span-1 glass-card rounded-2xl p-7 border border-blue-500/10 hover:border-purple-500/30 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${posts[0].color}10 0%, transparent 70%)` }}
            />
            <span className="text-5xl block mb-4">{posts[0].emoji}</span>
            <span
              className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full mb-3 inline-block"
              style={{ color: posts[0].color, background: `${posts[0].color}15` }}
            >
              {posts[0].category}
            </span>
            <h3 className="text-white font-bold text-xl leading-tight mb-3 group-hover:text-cyan-300 transition-colors">
              {posts[0].title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{posts[0].excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>{posts[0].date}</span>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <span>{posts[0].readTime}</span>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5 border border-blue-500/10 hover:border-blue-500/25 transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{post.emoji}</span>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{ color: post.color, background: `${post.color}15` }}
                  >
                    {post.category}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-tight mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span>{post.date}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>{post.readTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-secondary px-8 py-3.5 text-sm">
            View All Articles →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
