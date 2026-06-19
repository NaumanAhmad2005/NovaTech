"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const techStack = {
  Frontend: {
    color: "#38BDF8",
    icon: "⚡",
    techs: ["React", "Next.js", "Vue", "Angular", "TypeScript", "Tailwind", "GraphQL"]
  },
  Backend: {
    color: "#818CF8",
    icon: "⚙️",
    techs: ["Node.js", "Python", "Go", ".NET", "Java", "Rust", "FastAPI"]
  },
  Database: {
    color: "#10B981",
    icon: "🗄️",
    techs: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Cassandra", "Elasticsearch"]
  },
  Cloud: {
    color: "#F59E0B",
    icon: "☁️",
    techs: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"]
  },
  AI: {
    color: "#C084FC",
    icon: "🧠",
    techs: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "HuggingFace", "Pinecone"]
  },
};

const marqueeItems = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "AWS", "Kubernetes",
  "PostgreSQL", "MongoDB", "Redis", "Docker", "TensorFlow", "OpenAI", "GraphQL", "Rust",
  "Angular", "Vue", "Azure", "GCP", "Terraform", "FastAPI", "PyTorch", "LangChain",
];

export default function TechStackSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");

  return (
    <section id="stack" className="py-28 relative overflow-hidden" style={{ background: "#050816" }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glowing orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(129,140,248,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-cyan-300 font-mono tracking-wider">TECHNOLOGY STACK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Built With <span className="gradient-text">World-Class</span> Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            We choose the right technology for every challenge — not the trendy one.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {Object.entries(techStack).map(([cat, { color, icon }]) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "text-white"
                  : "glass text-slate-400 hover:text-white border border-transparent hover:border-blue-500/20"
              }`}
              style={
                activeCategory === cat
                  ? { background: `linear-gradient(135deg, ${color}30, ${color}15)`, border: `1px solid ${color}50`, boxShadow: `0 0 20px ${color}20` }
                  : {}
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{icon}</span>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Pills */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {techStack[activeCategory as keyof typeof techStack].techs.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card px-5 py-3 rounded-xl text-sm font-medium text-white border transition-all hover:scale-105"
                style={{
                  borderColor: `${techStack[activeCategory as keyof typeof techStack].color}25`,
                  background: `${techStack[activeCategory as keyof typeof techStack].color}08`,
                }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Marquee */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #050816, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(-90deg, #050816, transparent)" }} />
          <div className="marquee-track flex gap-6 whitespace-nowrap" style={{ width: "max-content" }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/10 text-slate-400 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
