"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

const HeroGlobe = dynamic(() => import("@/components/three/HeroGlobe"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const codeSnippets = [
  {
    title: "ai.service.ts",
    code: [
      { type: "comment", text: "// NovaTech AI Engine" },
      { type: "keyword", text: "const" },
      { text: " model = " },
      { type: "keyword", text: "await" },
      { text: " " },
      { type: "function", text: "initLLM" },
      { text: "({" },
      { type: "string", text: "\n  model: 'gpt-4o'" },
      { text: "\n})" },
    ],
    delay: 0,
  },
  {
    title: "cloud.deploy.sh",
    code: [
      { type: "comment", text: "# Deploy to Kubernetes" },
      { type: "keyword", text: "kubectl" },
      { text: " apply -f " },
      { type: "string", text: "./k8s/production.yaml" },
      { text: "\n" },
      { type: "function", text: "echo" },
      { text: " " },
      { type: "string", text: '"Scaling globally..."' },
    ],
    delay: 0.3,
  },
  {
    title: "api.gateway.ts",
    code: [
      { type: "keyword", text: "export async function" },
      { text: " " },
      { type: "function", text: "handler" },
      { text: "(req, res) {" },
      { type: "comment", text: "\n  // 99.99% uptime SLA" },
      { text: "\n  " },
      { type: "keyword", text: "return" },
      { text: " res." },
      { type: "function", text: "json" },
      { text: "({ status: " },
      { type: "string", text: "'ok'" },
      { text: " })" },
      { text: "\n}" },
    ],
    delay: 0.6,
  },
];

function FloatingCode({ snippet, className }: { snippet: typeof codeSnippets[0]; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: snippet.delay + 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute code-block p-4 pointer-events-none hidden lg:block ${className}`}
      style={{ minWidth: 240 }}
    >
      <div className="flex items-center gap-2 mb-3 border-b border-blue-500/10 pb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-slate-500 text-[11px]">{snippet.title}</span>
      </div>
      <pre className="text-xs leading-relaxed whitespace-pre-wrap">
        {snippet.code.map((part, i) => (
          <span
            key={i}
            className={
              part.type === "comment" ? "code-comment" :
              part.type === "keyword" ? "code-keyword" :
              part.type === "function" ? "code-function" :
              part.type === "string" ? "code-string" :
              "text-slate-300"
            }
          >
            {part.text}
          </span>
        ))}
      </pre>
    </motion.div>
  );
}

function LightBeams() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />

      {/* Diagonal light beams */}
      {[
        { deg: 35, color: "rgba(59,130,246,0.08)", width: 300, left: "60%", top: 0 },
        { deg: -20, color: "rgba(56,189,248,0.06)", width: 200, left: "25%", top: 0 },
        { deg: 60, color: "rgba(129,140,248,0.05)", width: 180, left: "75%", top: 0 },
      ].map((beam, i) => (
        <div
          key={i}
          className="absolute top-0 h-full blur-2xl"
          style={{
            left: beam.left,
            width: beam.width,
            background: `linear-gradient(${beam.deg}deg, transparent 0%, ${beam.color} 40%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const spotY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const globeScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.width / 2) / rect.width);
      mouseY.set((e.clientY - rect.height / 2) / rect.height);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050816" }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <LightBeams />

      {/* Mouse spotlight */}
      <motion.div
        className="absolute pointer-events-none rounded-full opacity-10 blur-3xl"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)",
          x: useTransform(spotX, [-0.5, 0.5], [-80, 80]),
          y: useTransform(spotY, [-0.5, 0.5], [-80, 80]),
          left: "calc(50% - 200px)",
          top: "calc(50% - 200px)",
        }}
      />

      {/* Globe — right half */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: globeScale, opacity: globeOpacity }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] xl:w-[50%]">
          <HeroGlobe />
        </div>
      </motion.div>

      {/* Floating Code Snippets */}
      <FloatingCode snippet={codeSnippets[0]} className="top-[22%] right-[8%]" />
      <FloatingCode snippet={codeSnippets[1]} className="bottom-[25%] right-[5%]" />
      <FloatingCode snippet={codeSnippets[2]} className="top-[55%] left-[3%]" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="flex-1 max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-mono tracking-wider">ENTERPRISE SOFTWARE COMPANY</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              We Engineer
              <br />
              <span className="gradient-text">Digital</span>
              <br />
              Excellence.
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.7 }}
            className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-lg"
          >
            Building{" "}
            <span className="text-cyan-400">enterprise software</span>,{" "}
            <span className="text-blue-400">AI systems</span>,{" "}
            <span className="text-indigo-400">cloud platforms</span>,
            and digital products
            <br className="hidden sm:block" />
            that <span className="text-white font-medium">scale globally</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.button
              className="btn-primary flex items-center gap-2.5 text-base"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              className="btn-secondary flex items-center gap-2.5 text-base"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
            >
              <div className="w-7 h-7 rounded-full border border-cyan-400/40 flex items-center justify-center">
                <Play className="w-3 h-3 ml-0.5 text-cyan-400" />
              </div>
              Explore Our Work
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="flex gap-8"
          >
            {[
              { num: "50+", label: "Projects Delivered" },
              { num: "99%", label: "Client Satisfaction" },
              { num: "24/7", label: "Global Support" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold gradient-text font-mono">{stat.num}</span>
                <span className="text-xs text-slate-500 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right spacer for globe */}
        <div className="flex-1 hidden lg:block" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 tracking-widest font-mono">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
