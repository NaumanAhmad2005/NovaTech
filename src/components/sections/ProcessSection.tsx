"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Understanding Your World",
    description: "We dive deep into your business, users, and competitive landscape. Workshops, stakeholder interviews, and technical assessments give us a complete picture.",
    details: [
      "Stakeholder workshops & requirements gathering",
      "Technical feasibility analysis",
      "Competitive landscape research",
      "Risk identification & mitigation planning",
      "Project scope definition & KPI alignment",
    ],
    duration: "1–2 weeks",
    color: "#38BDF8",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Planning",
    subtitle: "Blueprint for Success",
    description: "A detailed project roadmap with milestones, resource allocation, and delivery timelines. Nothing is built without a solid plan.",
    details: [
      "Agile sprint planning & backlog creation",
      "Team composition & role assignment",
      "Technology stack finalization",
      "Budget allocation & milestone definition",
      "Risk register & contingency planning",
    ],
    duration: "1–2 weeks",
    color: "#3B82F6",
    icon: "📋",
  },
  {
    number: "03",
    title: "Architecture",
    subtitle: "Engineering the Foundation",
    description: "System design that scales. We architect solutions that handle 10x your current load from day one.",
    details: [
      "System architecture & data modeling",
      "API contract design",
      "Database schema & query optimization",
      "Infrastructure-as-code setup",
      "Security threat modeling",
    ],
    duration: "1–3 weeks",
    color: "#818CF8",
    icon: "🏗️",
  },
  {
    number: "04",
    title: "Design",
    subtitle: "Crafting the Experience",
    description: "Every pixel is intentional. We create design systems that scale and interfaces that delight.",
    details: [
      "User journey & experience mapping",
      "Wireframing & interactive prototyping",
      "Design system & component library",
      "Accessibility (WCAG 2.1 AA) compliance",
      "User testing & design iteration",
    ],
    duration: "2–4 weeks",
    color: "#C084FC",
    icon: "🎨",
  },
  {
    number: "05",
    title: "Development",
    subtitle: "Building with Precision",
    description: "Clean, documented, test-driven code. Feature branches, daily standups, and demo-ready builds every sprint.",
    details: [
      "Test-driven development (TDD)",
      "Code review & pair programming",
      "Feature flag & A/B testing infrastructure",
      "Performance optimization & profiling",
      "Weekly client demos & feedback loops",
    ],
    duration: "4–16 weeks",
    color: "#10B981",
    icon: "⚙️",
  },
  {
    number: "06",
    title: "Testing",
    subtitle: "Quality Without Compromise",
    description: "Comprehensive QA including unit, integration, E2E, performance, and security testing before a single line reaches production.",
    details: [
      "Automated unit & integration testing",
      "End-to-end browser automation",
      "Load & stress testing",
      "Security penetration testing",
      "UAT with real users",
    ],
    duration: "2–4 weeks",
    color: "#F59E0B",
    icon: "🧪",
  },
  {
    number: "07",
    title: "Deployment",
    subtitle: "Going Live, Flawlessly",
    description: "Zero-downtime deployments with automated rollback, real-time monitoring, and 24/7 on-call during go-live.",
    details: [
      "CI/CD pipeline & blue-green deployment",
      "Database migration & data validation",
      "CDN & edge configuration",
      "Real-time monitoring & alerting setup",
      "Go-live support war room",
    ],
    duration: "1–2 weeks",
    color: "#3B82F6",
    icon: "🚀",
  },
  {
    number: "08",
    title: "Support",
    subtitle: "Partners for the Long Haul",
    description: "Ongoing maintenance, feature evolution, performance tuning, and dedicated support — we don't disappear after launch.",
    details: [
      "24/7 monitoring & incident response",
      "Monthly performance & security reports",
      "Feature roadmap planning",
      "SLA-backed uptime guarantees",
      "Dedicated account manager",
    ],
    duration: "Ongoing",
    color: "#38BDF8",
    icon: "🛡️",
  },
];

export default function ProcessSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="process" className="py-28 relative" style={{ background: "#050816" }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs text-green-300 font-mono tracking-wider">HOW WE WORK</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Our <span className="gradient-text">Development Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            A battle-tested process refined across 50+ enterprise projects. Transparent, collaborative, and relentlessly results-focused.
          </motion.p>
        </div>

        {/* Accordion Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-cyan-500/30 via-blue-500/20 to-transparent hidden md:block" />

          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <div
                  className={`glass-card rounded-2xl border overflow-hidden transition-all duration-400 cursor-pointer ${
                    expanded === i ? "border-opacity-50" : "border-blue-500/10 hover:border-blue-500/20"
                  }`}
                  style={expanded === i ? { borderColor: step.color } : {}}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 p-5">
                    {/* Number bubble */}
                    <div
                      className="relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-xl"
                      style={{
                        background: expanded === i ? `${step.color}20` : "rgba(255,255,255,0.03)",
                        border: `1px solid ${expanded === i ? step.color + "50" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      {step.icon}
                      {/* Connector dot */}
                      <div
                        className="absolute -left-[34px] w-3 h-3 rounded-full border-2 hidden md:flex items-center justify-center"
                        style={{
                          borderColor: expanded === i ? step.color : "rgba(255,255,255,0.1)",
                          background: expanded === i ? step.color : "#050816",
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-xs" style={{ color: step.color }}>STEP {step.number}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">{step.duration}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg mt-0.5">{step.title}</h3>
                      <p className="text-slate-500 text-sm">{step.subtitle}</p>
                    </div>

                    <motion.div
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 ml-[72px]">
                          <p className="text-slate-300 leading-relaxed mb-5">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                                className="flex items-center gap-3 text-sm text-slate-400"
                              >
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: step.color }} />
                                {detail}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
