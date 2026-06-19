"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, Calendar, Users, TrendingUp } from "lucide-react";

const projects = [
  {
    title: "MedCore Hospital Management System",
    category: "Healthcare",
    description: "A comprehensive hospital management platform serving 12 hospitals across 3 countries. Real-time patient tracking, automated billing, EMR integration, and AI-powered diagnostic assistance.",
    problem: "Manual processes causing 40% administrative overhead and frequent data errors across departments.",
    solution: "Unified cloud platform with real-time sync, AI triage, and automated workflow orchestration.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "TensorFlow", "Redis"],
    timeline: "8 months",
    team: "14 engineers",
    metrics: ["60% reduction in admin time", "99.98% uptime", "2.3M+ patient records"],
    color: "#10B981",
    tag: "HEALTHCARE",
    image: "🏥",
  },
  {
    title: "LogiTrack National Logistics Platform",
    category: "Logistics",
    description: "End-to-end logistics platform handling 50,000+ daily shipments. Real-time GPS tracking, AI route optimization, and automated customs documentation.",
    problem: "Fragmented tracking systems leading to 22% delivery failures and zero visibility for customers.",
    solution: "Centralized platform with ML-powered route optimization reducing delivery times by 35%.",
    technologies: ["Next.js", "Go", "MongoDB", "Google Cloud", "Kubernetes", "MQTT"],
    timeline: "11 months",
    team: "18 engineers",
    metrics: ["35% faster deliveries", "50K daily shipments", "$2.1M annual savings"],
    color: "#F59E0B",
    tag: "LOGISTICS",
    image: "🚚",
  },
  {
    title: "NexaBank Digital Banking Dashboard",
    category: "Finance",
    description: "Next-generation banking dashboard with real-time fraud detection, portfolio analytics, and AI-driven financial insights. Serving 200K+ active users.",
    problem: "Legacy banking interface causing 68% user drop-off and $4M monthly fraud losses.",
    solution: "Modern SPA with ML fraud detection achieving 99.2% accuracy and zero-latency alerts.",
    technologies: ["React", "Python", "PostgreSQL", "Azure", "PyTorch", "Kafka"],
    timeline: "14 months",
    team: "22 engineers",
    metrics: ["200K+ users", "99.2% fraud accuracy", "68% retention increase"],
    color: "#3B82F6",
    tag: "FINTECH",
    image: "🏦",
  },
  {
    title: "EduNova University ERP",
    category: "Education",
    description: "Complete university management ecosystem covering admissions, academics, finance, and alumni management. Deployed across 5 universities with 80,000 students.",
    problem: "Siloed systems across 23 departments causing data inconsistency and 3-day report generation times.",
    solution: "Unified ERP with role-based access, automated reporting, and real-time analytics dashboards.",
    technologies: ["Angular", ".NET", "SQL Server", "Azure", "Power BI", "Docker"],
    timeline: "18 months",
    team: "16 engineers",
    metrics: ["80K students", "23 departments", "Reports in <5 minutes"],
    color: "#818CF8",
    tag: "EDUCATION",
    image: "🎓",
  },
  {
    title: "AgriSmart Precision Agriculture Platform",
    category: "Agriculture",
    description: "IoT-powered smart farming platform with drone imagery analysis, soil health monitoring, yield prediction, and automated irrigation control.",
    problem: "Farmers losing 30% of crops due to inefficient irrigation and late disease detection.",
    solution: "Computer vision + IoT platform delivering real-time crop health alerts and automated responses.",
    technologies: ["Vue.js", "Python", "TimescaleDB", "AWS IoT", "PyTorch", "MQTT"],
    timeline: "9 months",
    team: "10 engineers",
    metrics: ["30% yield improvement", "45% water savings", "500+ farms"],
    color: "#10B981",
    tag: "AGRITECH",
    image: "🌾",
  },
  {
    title: "SupportAI Enterprise Customer Platform",
    category: "AI/Automation",
    description: "AI-powered customer support ecosystem with contextual chatbots, sentiment analysis, automatic ticket routing, and agent assist features.",
    problem: "Support team drowning in 10K daily tickets with 4-hour average resolution time.",
    solution: "LLM-powered triage resolving 73% of tickets autonomously, cutting resolution to 18 minutes.",
    technologies: ["React", "FastAPI", "MongoDB", "OpenAI", "LangChain", "Pinecone"],
    timeline: "6 months",
    team: "8 engineers",
    metrics: ["73% auto-resolution", "18min avg response", "10K daily tickets"],
    color: "#C084FC",
    tag: "AI AUTOMATION",
    image: "🤖",
  },
];

function ProjectCard({ project, index, isActive, onClick }: {
  project: typeof projects[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onClick={onClick}
      className={`group glass-card rounded-2xl p-6 cursor-pointer transition-all duration-400 border ${
        isActive
          ? "border-opacity-60 scale-[1.02]"
          : "border-blue-500/10 hover:border-blue-500/30"
      }`}
      style={isActive ? { borderColor: project.color, boxShadow: `0 0 40px ${project.color}20` } : {}}
    >
      {/* Tag */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-mono font-semibold px-3 py-1 rounded-full"
          style={{ color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}30` }}
        >
          {project.tag}
        </span>
        <span className="text-4xl">{project.image}</span>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-cyan-300 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
        {project.description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.technologies.slice(0, 4).map(tech => (
          <span key={tech} className="text-xs px-2 py-0.5 rounded-md glass text-slate-400 border border-white/5">
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="text-xs px-2 py-0.5 rounded-md text-slate-500">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
        {project.metrics.slice(0, 3).map((metric, i) => (
          <div key={i} className="text-center">
            <div className="text-xs font-semibold" style={{ color: project.color }}>{metric.split(" ")[0]}</div>
            <div className="text-xs text-slate-500 leading-tight mt-0.5">{metric.split(" ").slice(1).join(" ")}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [activeProject, setActiveProject] = useState(0);

  const project = projects[activeProject];

  return (
    <section id="portfolio" className="py-28 relative" style={{ background: "linear-gradient(180deg, #050816 0%, #0F172A 60%, #050816 100%)" }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-xs text-blue-300 font-mono tracking-wider">CASE STUDIES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Our <span className="gradient-text">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Real problems. Real solutions. Measurable results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              isActive={activeProject === i}
              onClick={() => setActiveProject(i)}
            />
          ))}
        </div>

        {/* Expanded Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 lg:p-10 border"
            style={{ borderColor: `${project.color}25` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl">{project.image}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                      {project.title}
                    </h3>
                    <span className="text-sm font-mono" style={{ color: project.color }}>{project.category}</span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-mono text-slate-500 tracking-widest mb-2">THE PROBLEM</h4>
                    <p className="text-slate-300 leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-500 tracking-widest mb-2">OUR SOLUTION</h4>
                    <p className="text-slate-300 leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>{project.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>{project.team}</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                <h4 className="text-xs font-mono text-slate-500 tracking-widest mb-4">TECHNOLOGIES USED</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="text-xs font-mono text-slate-500 tracking-widest mb-4">KEY RESULTS</h4>
                <div className="space-y-3">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${project.color}40, transparent)` }} />
                      <span className="text-sm text-slate-300 font-medium">{metric}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`, border: `1px solid ${project.color}40` }}
                  whileHover={{ boxShadow: `0 0 20px ${project.color}30` }}
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <TrendingUp className="w-4 h-4" />
                  Start Similar Project
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
