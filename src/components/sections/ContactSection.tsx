"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, Clock, CheckCircle, AlertCircle } from "lucide-react";
import LoginModal from "@/components/ui/LoginModal";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateCompany,
  validateMessage,
} from "@/lib/validators";

// ─── Types ─────────────────────────────────────────────────────────────────
type FormFields = {
  name: string; email: string; phone: string;
  company: string; budget: string; message: string; service: string;
};
type FieldErrors = Partial<Record<keyof FormFields, string>>;

// ─── Reusable input wrapper ─────────────────────────────────────────────────
function Field({
  label, required = false, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 font-mono mb-2">
        {label}{required && <span className="text-blue-400 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 mt-1.5 text-xs text-red-400"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600
   focus:outline-none transition-colors resize-none
   ${hasError ? "border-red-500/60 focus:border-red-500/80" : "border-white/10 focus:border-blue-500/50"}`;

// ─── Main Component ─────────────────────────────────────────────────────────
export default function ContactSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  const [form, setForm] = useState<FormFields>({
    name: "", email: "", phone: "", company: "", budget: "", message: "", service: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      let loggedIn = false;
      if (document.cookie.includes('demo_client_session=true')) {
        setUser({ isDemo: true });
        loggedIn = true;
      } else {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          loggedIn = true;
        }
      }

      const saved = localStorage.getItem('pending_project_request');
      if (saved) {
        try {
          setForm(JSON.parse(saved));
        } catch (e) {}
      }
    };
    checkSession();
  }, []);

  // Validate a single field on blur
  const validateField = useCallback((name: keyof FormFields, value: string): string => {
    switch (name) {
      case "name":    return validateName(value).error ?? "";
      case "email":   return validateEmail(value).error ?? "";
      case "phone":   return validatePhone(value).error ?? "";
      case "company": return validateCompany(value).error ?? "";
      case "message": return validateMessage(value).error ?? "";
      default:        return "";
    }
  }, []);

  const handleChange = (name: keyof FormFields, value: string) => {
    setForm(s => ({ ...s, [name]: value }));
    // Clear error as user types (only if field was already touched)
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors(e => ({ ...e, [name]: err }));
    }
  };

  const handleBlur = (name: keyof FormFields) => {
    setTouched(t => ({ ...t, [name]: true }));
    const err = validateField(name, form[name]);
    setErrors(e => ({ ...e, [name]: err }));
  };

  // Full client-side validation before submit
  const validateAll = (): boolean => {
    const newErrors: FieldErrors = {
      name:    validateField("name", form.name),
      email:   validateField("email", form.email),
      phone:   validateField("phone", form.phone),
      company: validateField("company", form.company),
      message: validateField("message", form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, company: true, message: true });
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return; // stop if client errors exist
    
    if (!user) {
      localStorage.setItem('pending_project_request', JSON.stringify(form));
      setIsLoginModalOpen(true);
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      localStorage.removeItem('pending_project_request');
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
            style={{ fontFamily: "Space Grotesk" }}
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
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "Space Grotesk" }}>
                  Message Received!
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Thank you for reaching out. Our team will review your project details and respond within{" "}
                  <span className="text-green-400">4 business hours</span> with next steps.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="glass-card rounded-3xl p-8 border border-blue-500/10 space-y-5">

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="FULL NAME" required error={errors.name}>
                    <input
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={e => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      placeholder="John Smith"
                      maxLength={60}
                      className={inputClass(!!errors.name)}
                    />
                  </Field>
                  <Field label="EMAIL" required error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={e => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder="john@company.com"
                      maxLength={254}
                      className={inputClass(!!errors.email)}
                    />
                  </Field>
                </div>

                {/* Row 2: Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="PHONE NUMBER" error={errors.phone}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={e => {
                        // Only allow digits, +, spaces, -, (, )
                        const filtered = e.target.value.replace(/[^\d\s+\-().]/g, "");
                        handleChange("phone", filtered);
                      }}
                      onBlur={() => handleBlur("phone")}
                      placeholder="+92 300 000 0000"
                      maxLength={20}
                      className={inputClass(!!errors.phone)}
                    />
                  </Field>
                  <Field label="COMPANY" error={errors.company}>
                    <input
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={e => handleChange("company", e.target.value)}
                      onBlur={() => handleBlur("company")}
                      placeholder="Acme Corp"
                      maxLength={100}
                      className={inputClass(!!errors.company)}
                    />
                  </Field>
                </div>

                {/* Row 3: Service + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="SERVICE NEEDED">
                    <select
                      value={form.service}
                      onChange={e => handleChange("service", e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option>Custom Software Development</option>
                      <option>Web Application</option>
                      <option>Mobile App</option>
                      <option>AI / ML Integration</option>
                      <option>Cloud &amp; DevOps</option>
                      <option>Enterprise ERP/CRM</option>
                      <option>Cybersecurity Audit</option>
                      <option>UI/UX Design</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="BUDGET RANGE">
                    <select
                      value={form.budget}
                      onChange={e => handleChange("budget", e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    >
                      <option value="">Select range</option>
                      <option>$10K – $50K</option>
                      <option>$50K – $150K</option>
                      <option>$150K – $500K</option>
                      <option>$500K+</option>
                    </select>
                  </Field>
                </div>

                {/* Project Details */}
                <Field label="PROJECT DETAILS" required error={errors.message}>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    placeholder="Tell us about your project, goals, timeline, and any technical requirements..."
                    maxLength={5000}
                    className={inputClass(!!errors.message)}
                  />
                  <div className="text-right text-xs text-slate-600 mt-1">
                    {form.message.length}/5000
                  </div>
                </Field>

                {/* Global submit error */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {submitError}
                    </motion.div>
                  )}
                </AnimatePresence>

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
              <h3 className="text-white font-bold mb-5" style={{ fontFamily: "Space Grotesk" }}>Direct Contact</h3>
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
              <h3 className="text-white font-bold mb-4" style={{ fontFamily: "Space Grotesk" }}>You&apos;re in Safe Hands</h3>
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
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </section>
  );
}
