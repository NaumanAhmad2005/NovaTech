"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered", sublabel: "Across 12 countries", color: "#38BDF8" },
  { value: 99, suffix: "%", label: "Client Satisfaction", sublabel: "Based on post-project surveys", color: "#3B82F6" },
  { value: 24, suffix: "/7", label: "Support Available", sublabel: "Dedicated support engineers", color: "#818CF8" },
  { value: 100, suffix: "%", label: "Secure By Design", sublabel: "ISO 27001 compliant processes", color: "#10B981" },
  { value: 8, suffix: "+", label: "Years of Excellence", sublabel: "Continuously innovating", color: "#C084FC" },
  { value: 120, suffix: "+", label: "Engineers Worldwide", sublabel: "Senior-only talent network", color: "#F59E0B" },
];

const achievements = [
  { icon: "🏆", text: "Best Enterprise Software Company 2024" },
  { icon: "🔒", text: "ISO 27001 & SOC 2 Type II Certified" },
  { icon: "⭐", text: "5-Star Clutch Rating — Top 1% Agency" },
  { icon: "🌐", text: "Active in 12+ Countries" },
  { icon: "🚀", text: "AWS Advanced Technology Partner" },
  { icon: "🤝", text: "Microsoft Gold Partner" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="about" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #050816 0%, #0F172A 50%, #050816 100%)" }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)" }} />

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.3) 0%, transparent 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-blue-300 font-mono tracking-wider">BY THE NUMBERS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Why <span className="gradient-text">NovaTech</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Numbers don&apos;t lie. Here&apos;s what 8 years of engineering excellence looks like.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card rounded-2xl p-5 text-center border border-transparent hover:border-blue-500/20 transition-all duration-300 group"
            >
              <div
                className="text-3xl xl:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform"
                style={{ color: stat.color, fontFamily: 'JetBrains Mono, monospace' }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-slate-500 text-xs leading-tight">{stat.sublabel}</div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-full rounded-b-2xl transition-all duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-xl p-4 text-center border border-blue-500/10 hover:border-blue-500/25 transition-all"
            >
              <div className="text-2xl mb-2">{a.icon}</div>
              <p className="text-xs text-slate-400 leading-snug">{a.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
