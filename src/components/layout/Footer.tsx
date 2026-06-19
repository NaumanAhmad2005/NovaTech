"use client";

import { motion } from "framer-motion";
import { Zap, Globe2, ArrowRight, GitBranch, ExternalLink, MessageSquare } from "lucide-react";

const footerLinks = {
  Company: ["About", "Careers", "Press", "Partners", "Contact"],
  Solutions: ["Custom Software", "Web Applications", "Mobile Apps", "AI Integration", "Cloud Solutions"],
  Industries: ["Healthcare", "Finance", "Education", "Logistics", "Government"],
  Resources: ["Engineering Blog", "Case Studies", "Documentation", "Open Source", "Security"],
};

const socials = [
  { icon: Globe2, href: "#", label: "Website" },
  { icon: GitBranch, href: "#", label: "GitHub" },
  { icon: MessageSquare, href: "#", label: "Slack" },
  { icon: ExternalLink, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 border-t border-blue-500/10" style={{ background: "#050816" }}>
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 border border-blue-500/15 mb-16 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 100%)" }}
          />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative" style={{ fontFamily: 'Space Grotesk' }}>
            Ready to Build Your Next <span className="gradient-text">Big Thing?</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Join 50+ companies that trusted NovaTech to engineer their most ambitious digital products.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Our Work
            </motion.button>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 opacity-80"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                <div className="absolute inset-0.5 rounded-lg bg-[#050816] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>NovaTech</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              Engineering tomorrow&apos;s digital infrastructure today. Enterprise-grade software, built with precision.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs text-slate-500 font-mono tracking-wider mb-3">STAY UPDATED</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <motion.button
                  className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5 mt-5">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center border border-white/5 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono text-slate-500 tracking-widest mb-4">{category.toUpperCase()}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-slate-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block transition-transform duration-200">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © 2026 NovaTech Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map((link) => (
              <button key={link} className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* Easter egg hint */}
        <p className="text-center text-slate-800 text-xs mt-6 font-mono">
          // Try typing &quot;hello&quot; or press ↑↑↓↓←→←→BA ✨
        </p>
      </div>
    </footer>
  );
}
