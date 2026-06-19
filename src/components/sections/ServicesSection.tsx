"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Globe, Smartphone, Brain, Cloud, Shield,
  Palette, Building2, BarChart3, Workflow, Server, Bot
} from "lucide-react";

const services = [
  { icon: Code2, title: "Custom Software", desc: "Bespoke software engineered to your exact specifications, built for scale and longevity.", color: "#3B82F6" },
  { icon: Globe, title: "Web Applications", desc: "High-performance web apps with modern architecture, pixel-perfect UI, and enterprise security.", color: "#38BDF8" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform and native mobile applications that deliver exceptional user experiences.", color: "#818CF8" },
  { icon: Brain, title: "AI Integration", desc: "Embed cutting-edge AI — LLMs, computer vision, NLP, and predictive analytics into your systems.", color: "#C084FC" },
  { icon: Cloud, title: "Cloud Solutions", desc: "Multi-cloud architecture, migration strategies, and Kubernetes orchestration at global scale.", color: "#38BDF8" },
  { icon: Shield, title: "Cybersecurity", desc: "End-to-end security audits, penetration testing, and compliance-ready infrastructure hardening.", color: "#10B981" },
  { icon: Palette, title: "UI/UX Design", desc: "Research-driven design systems that convert visitors into loyal users through delightful experiences.", color: "#F59E0B" },
  { icon: Building2, title: "Enterprise Systems", desc: "Mission-critical enterprise applications designed for thousands of concurrent users.", color: "#3B82F6" },
  { icon: BarChart3, title: "ERP & CRM", desc: "Integrated business management platforms with real-time dashboards and automated workflows.", color: "#38BDF8" },
  { icon: Server, title: "API Development", desc: "RESTful and GraphQL APIs built for speed, reliability, and developer-first documentation.", color: "#818CF8" },
  { icon: Workflow, title: "Automation", desc: "Intelligent process automation that eliminates repetitive work and multiplies team output.", color: "#10B981" },
  { icon: Bot, title: "DevOps", desc: "CI/CD pipelines, infrastructure as code, and GitOps practices for zero-downtime deployments.", color: "#F59E0B" },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative glass-card rounded-2xl p-6 cursor-pointer overflow-hidden card-hover"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${service.color}15 0%, transparent 70%)`,
        }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />

      {/* Icon */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}
      >
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" style={{ color: service.color }} />
        {/* Icon glow on hover */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 blur-lg transition-opacity duration-300"
          style={{ background: service.color }}
        />
      </div>

      <h3 className="text-white font-semibold text-base mb-2 group-hover:gradient-text transition-all">
        {service.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>

      {/* Corner arrow */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${service.color}20` }}>
          <svg className="w-3 h-3" style={{ color: service.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="services" className="py-28 relative" style={{ background: "linear-gradient(180deg, #050816 0%, #0F172A 50%, #050816 100%)" }}>
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-xs text-blue-300 font-mono tracking-wider">WHAT WE BUILD</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Our <span className="gradient-text">Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From concept to deployment, we engineer software that doesn&apos;t just work —
            it <span className="text-white">outperforms expectations</span>.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
