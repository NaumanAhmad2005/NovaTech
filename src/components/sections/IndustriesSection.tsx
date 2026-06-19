"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const industries = [
  { icon: "🏥", name: "Healthcare", desc: "EMR systems, telemedicine, patient analytics, medical IoT", projects: 8, color: "#10B981" },
  { icon: "🏦", name: "Finance & Banking", desc: "Trading platforms, fraud detection, digital banking, compliance", projects: 10, color: "#3B82F6" },
  { icon: "🎓", name: "Education", desc: "LMS, university ERPs, EdTech platforms, virtual classrooms", projects: 7, color: "#818CF8" },
  { icon: "🏛️", name: "Government", desc: "e-Governance, citizen portals, document automation, smart city", projects: 5, color: "#38BDF8" },
  { icon: "🏭", name: "Manufacturing", desc: "ERP, supply chain, predictive maintenance, quality control", projects: 6, color: "#F59E0B" },
  { icon: "🛒", name: "Retail & E-commerce", desc: "Omnichannel platforms, inventory AI, personalization engines", projects: 9, color: "#EC4899" },
  { icon: "🚛", name: "Logistics", desc: "Fleet management, route optimization, warehouse automation", projects: 7, color: "#F59E0B" },
  { icon: "🏘️", name: "Real Estate", desc: "Property platforms, virtual tours, CRM, investment analytics", projects: 4, color: "#10B981" },
  { icon: "🍽️", name: "Hospitality", desc: "Hotel management, POS, reservation systems, loyalty programs", projects: 3, color: "#C084FC" },
  { icon: "📡", name: "Telecommunications", desc: "Network monitoring, billing systems, customer portals, analytics", projects: 5, color: "#38BDF8" },
];

export default function IndustriesSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="industries" className="py-28 relative" style={{ background: "#050816" }}>
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-cyan-300 font-mono tracking-wider">INDUSTRIES WE SERVE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Domain <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Deep vertical knowledge across 10+ industries — we understand your domain before we write a single line.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group glass-card rounded-2xl p-5 border border-blue-500/10 hover:border-opacity-60 transition-all duration-300 relative overflow-hidden"
              style={{
                "--hover-color": ind.color,
              } as React.CSSProperties}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${ind.color}12 0%, transparent 70%)` }}
              />

              <div className="text-3xl mb-3">{ind.icon}</div>
              <h3 className="text-white font-bold text-sm mb-2">{ind.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{ind.desc}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono" style={{ color: ind.color }}>
                  {ind.projects} projects
                </span>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: `${ind.color}20` }}
                >
                  <svg className="w-3 h-3" style={{ color: ind.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
