"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Al-Mansouri",
    title: "CTO, MedCore Health Systems",
    avatar: "👩‍⚕️",
    company: "MedCore",
    quote: "NovaTech didn't just build us a system — they transformed how our entire hospital network operates. The attention to clinical workflow detail was extraordinary. Our staff adoption rate hit 94% in the first month.",
    rating: 5,
    project: "Hospital Management System",
    country: "🇦🇪 UAE",
  },
  {
    name: "James Whitfield",
    title: "VP Engineering, NexaBank",
    avatar: "👨‍💼",
    company: "NexaBank",
    quote: "We've worked with agencies in London, NYC, and Berlin. NovaTech outperformed all of them. Their ML fraud detection alone saved us $2.1M in the first quarter. The team is senior, communicative, and deeply technical.",
    rating: 5,
    project: "Digital Banking Dashboard",
    country: "🇬🇧 UK",
  },
  {
    name: "Aisha Nkemdirim",
    title: "Director of Technology, EduNova",
    avatar: "👩‍🏫",
    company: "EduNova",
    quote: "Managing 80,000 students across 5 campuses was a nightmare before NovaTech. They delivered an ERP that our most non-technical staff love. The mobile app for students has a 4.9-star rating on both stores.",
    rating: 5,
    project: "University ERP System",
    country: "🇳🇬 Nigeria",
  },
  {
    name: "Carlos Reyes",
    title: "CEO, LogiTrack International",
    avatar: "👨‍💻",
    company: "LogiTrack",
    quote: "The logistics platform NovaTech built handles 50,000 shipments per day without breaking a sweat. We went from 22% delivery failures to under 2%. The ROI paid for the project in 3 months.",
    rating: 5,
    project: "National Logistics Platform",
    country: "🇲🇽 Mexico",
  },
  {
    name: "Priya Krishnamurthy",
    title: "Head of AI, TechVentures Inc.",
    avatar: "👩‍🔬",
    company: "TechVentures",
    quote: "We came to NovaTech with a complex AI vision and zero technical roadmap. Six months later, our support platform auto-resolves 73% of tickets. The LangChain integration they built is production-grade engineering.",
    rating: 5,
    project: "AI Customer Support Platform",
    country: "🇮🇳 India",
  },
];

export default function TestimonialsSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #050816 0%, #0F172A 50%, #050816 100%)" }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="text-xs text-yellow-300 font-mono tracking-wider">CLIENT VOICES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </div>

        {/* Main Testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl p-8 lg:p-12 mb-8 border border-blue-500/10 relative overflow-hidden"
          >
            {/* Quote mark */}
            <div className="absolute top-6 right-8 text-8xl font-serif text-blue-500/10 leading-none select-none pointer-events-none">
              &ldquo;
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl text-white leading-relaxed mb-8 font-light">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl glass border border-blue-500/20 flex items-center justify-center text-2xl">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="text-white font-bold">{testimonials[current].name}</div>
                  <div className="text-slate-400 text-sm">{testimonials[current].title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{testimonials[current].country}</div>
                </div>
              </div>

              <div className="glass rounded-xl px-4 py-2 border border-blue-500/10 text-right">
                <div className="text-xs text-slate-500">Project</div>
                <div className="text-sm text-blue-400 font-medium">{testimonials[current].project}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 h-2 bg-blue-500"
                    : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            <motion.button
              onClick={prev}
              className="w-11 h-11 glass rounded-xl flex items-center justify-center border border-blue-500/10 hover:border-blue-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-slate-300" />
            </motion.button>
            <motion.button
              onClick={next}
              className="w-11 h-11 glass rounded-xl flex items-center justify-center border border-blue-500/10 hover:border-blue-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </motion.button>
          </div>
        </div>

        {/* Small cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-10">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => setCurrent(i)}
              className={`glass-card rounded-xl p-3 text-left border transition-all duration-300 ${
                i === current ? "border-blue-500/40 bg-blue-500/5" : "border-blue-500/10 hover:border-blue-500/25"
              }`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-xl mb-1">{t.avatar}</div>
              <div className="text-xs text-white font-medium leading-tight">{t.name.split(" ")[0]}</div>
              <div className="text-xs text-slate-500 leading-tight">{t.company}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
