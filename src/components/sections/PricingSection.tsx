"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tagline: "For growing startups",
    icon: "🚀",
    color: "#38BDF8",
    description: "Perfect for MVPs, early-stage products, and small business digitization projects.",
    features: [
      "Dedicated project manager",
      "Up to 3 engineers",
      "Weekly progress reports",
      "Basic cloud deployment",
      "3 months post-launch support",
      "Source code ownership",
    ],
    notIncluded: ["AI/ML features", "24/7 support SLA", "Multi-region deployment"],
    badge: null,
    cta: "Request Proposal",
  },
  {
    name: "Professional",
    tagline: "For scaling businesses",
    icon: "⚡",
    color: "#3B82F6",
    description: "For complex products requiring full-stack engineering, AI integration, and performance at scale.",
    features: [
      "Senior engineering team (6–10)",
      "Dedicated DevOps engineer",
      "AI/ML integration available",
      "Multi-cloud deployment",
      "6 months post-launch support",
      "24/7 monitoring & alerting",
      "Monthly strategy reviews",
      "Source code + documentation",
    ],
    notIncluded: ["24/7 on-call SLA"],
    badge: "MOST POPULAR",
    cta: "Request Proposal",
  },
  {
    name: "Enterprise",
    tagline: "For mission-critical systems",
    icon: "🏢",
    color: "#818CF8",
    description: "Full-scope engagement with dedicated teams, white-glove support, and enterprise-grade SLAs.",
    features: [
      "Dedicated squad (10–25 engineers)",
      "Architecture consulting",
      "Full AI/ML suite",
      "Global multi-region infrastructure",
      "12 months dedicated support",
      "24/7 on-call SLA (99.99% uptime)",
      "Quarterly executive reviews",
      "IP transfer & compliance docs",
      "ISO 27001 aligned delivery",
    ],
    notIncluded: [],
    badge: "FULL-SERVICE",
    cta: "Schedule Discovery Call",
  },
];

export default function PricingSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="pricing" className="py-28 relative overflow-hidden" style={{ background: "#050816" }}>
      <div className="absolute inset-0 grid-pattern opacity-25" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-xs text-blue-300 font-mono tracking-wider">ENGAGEMENT MODELS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Transparent <span className="gradient-text">Engagement</span> Models
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            No hidden fees. No surprise bills. Every engagement starts with a free discovery session and detailed proposal.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className={`relative glass-card rounded-3xl p-7 border transition-all duration-400 flex flex-col ${
                plan.badge === "MOST POPULAR"
                  ? "border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.15)]"
                  : "border-blue-500/10 hover:border-blue-500/25"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${plan.color}, ${plan.color}80)`,
                    boxShadow: `0 0 20px ${plan.color}40`,
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{plan.icon}</span>
                  <div>
                    <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Space Grotesk' }}>{plan.name}</h3>
                    <p className="text-xs" style={{ color: plan.color }}>{plan.tagline}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: `${plan.color}20` }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                    </div>
                    <span className="text-slate-300 text-sm">{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f, j) => (
                  <div key={j} className="flex items-start gap-3 opacity-40">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 bg-slate-700">
                      <div className="w-2 h-px bg-slate-500" />
                    </div>
                    <span className="text-slate-500 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                style={
                  plan.badge === "MOST POPULAR"
                    ? { background: `linear-gradient(135deg, ${plan.color}, ${plan.color}80)`, color: "white" }
                    : { background: `${plan.color}12`, color: plan.color, border: `1px solid ${plan.color}30` }
                }
                whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${plan.color}30` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          All engagements begin with a <span className="text-blue-400">free 90-minute discovery session</span>.
          Custom pricing based on scope, timeline, and team size.
        </motion.p>
      </div>
    </section>
  );
}
