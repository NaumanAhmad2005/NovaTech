"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Mail, Phone, Clock, CheckCircle } from "lucide-react";



export default function ContactSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [formState, setFormState] = useState({
    name: "", email: "", phone: "", company: "", budget: "", message: "", service: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: "#050816" }}>
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-300 font-mono tracking-wider">AVAILABLE FOR NEW PROJECTS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Let&apos;s Build Something <span className="gradient-text">Extraordinary</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Tell us about your project. We respond within 4 business hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-10 border border-green-500/20 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                  Message Received!
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Thank you for reaching out. Our team will review your project details and respond within <span className="text-green-400">4 business hours</span> with next steps.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 border border-blue-500/10 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 font-mono mb-2">FULL NAME *</label>
                    <input
                      required
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      placeholder="John Smith"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 font-mono mb-2">EMAIL *</label>
                    <input
                      required
                      type="email"
                      value={formState.email}
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      placeholder="john@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 font-mono mb-2">PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 font-mono mb-2">COMPANY</label>
                    <input
                      value={formState.company}
                      onChange={e => setFormState(s => ({ ...s, company: e.target.value }))}
                      placeholder="Acme Corp"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 font-mono mb-2">SERVICE NEEDED</label>
                    <select
                      value={formState.service}
                      onChange={e => setFormState(s => ({ ...s, service: e.target.value }))}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option>Custom Software Development</option>
                      <option>Web Application</option>
                      <option>Mobile App</option>
                      <option>AI / ML Integration</option>
                      <option>Cloud & DevOps</option>
                      <option>Enterprise ERP/CRM</option>
                      <option>Cybersecurity Audit</option>
                      <option>UI/UX Design</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 font-mono mb-2">BUDGET RANGE</label>
                    <select
                      value={formState.budget}
                      onChange={e => setFormState(s => ({ ...s, budget: e.target.value }))}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    >
                      <option value="">Select range</option>
                      <option>$10K – $50K</option>
                      <option>$50K – $150K</option>
                      <option>$150K – $500K</option>
                      <option>$500K+</option>
                    </select>
                  </div>
                </div>



                <div>
                  <label className="block text-xs text-slate-500 font-mono mb-2">PROJECT DETAILS *</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    placeholder="Tell us about your project, goals, timeline, and any technical requirements..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2.5 text-base disabled:opacity-60"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Project Brief
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Contact details */}
            <div className="glass-card rounded-2xl p-6 border border-blue-500/10">
              <h3 className="text-white font-bold mb-5" style={{ fontFamily: 'Space Grotesk' }}>Direct Contact</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "naumanf25@gmail.com", color: "#38BDF8" },
                  { icon: Phone, label: "Phone", value: "+92 302 646 8105", color: "#3B82F6" },
                  { icon: Clock, label: "Response Time", value: "Within 4 business hours", color: "#10B981" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                      <div className="text-white text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>



            {/* Trust signals */}
            <div className="glass-card rounded-2xl p-6 border border-blue-500/10">
              <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>You&apos;re in Safe Hands</h3>
              <div className="space-y-3">
                {[
                  "NDA signed before any discussion",
                  "Free initial consultation — no strings attached",
                  "Detailed proposal within 3 business days",
                  "Agile delivery with weekly client demos",
                  "100% source code ownership transferred on completion",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
