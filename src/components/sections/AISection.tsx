"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import dynamic from "next/dynamic";

const features = [
  { icon: "🧠", title: "Large Language Models", desc: "Custom LLM fine-tuning, prompt engineering, and deployment pipelines for domain-specific AI." },
  { icon: "🔍", title: "RAG Systems", desc: "Retrieval-augmented generation pipelines with vector databases for knowledge-grounded AI responses." },
  { icon: "🤖", title: "Intelligent Chatbots", desc: "Context-aware conversational AI with memory, tool use, and seamless human handoff capabilities." },
  { icon: "⚡", title: "AI Automation", desc: "Autonomous agent workflows that execute multi-step business processes with minimal human oversight." },
  { icon: "📄", title: "Document Intelligence", desc: "Extract, classify, and analyze structured data from documents, PDFs, contracts, and images." },
  { icon: "👁️", title: "Computer Vision", desc: "Object detection, medical imaging analysis, quality control, and real-time video processing." },
  { icon: "🎙️", title: "Speech AI", desc: "Real-time transcription, voice synthesis, speaker identification, and multilingual audio processing." },
  { icon: "📊", title: "Predictive Analytics", desc: "ML models for demand forecasting, churn prediction, fraud detection, and business intelligence." },
];

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 30;

  const { nodePositions, lineGeometry, nodeGeometry } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
      ));
    }

    const linePositions: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const d = positions[i].distanceTo(positions[j]);
        if (d < 2.5) {
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z,
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    const nodePositionArray = new Float32Array(positions.flatMap(p => [p.x, p.y, p.z]));
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositionArray, 3));

    return { nodePositions: positions, lineGeometry: lineGeo, nodeGeometry: nodeGeo };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </lineSegments>
      <points geometry={nodeGeometry}>
        <pointsMaterial color="#38BDF8" size={0.12} sizeAttenuation transparent opacity={0.9} />
      </points>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} color="#3B82F6" intensity={2} />
    </group>
  );
}

function NeuralCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <NeuralNetwork />
    </Canvas>
  );
}

const DynamicNeuralCanvas = dynamic(() => Promise.resolve(NeuralCanvas), { ssr: false });

export default function AISection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="ai" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #050816 0%, #0a0f2e 50%, #050816 100%)" }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Neural canvas background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <DynamicNeuralCanvas />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs text-purple-300 font-mono tracking-wider">ARTIFICIAL INTELLIGENCE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            AI That <span className="gradient-text-warm">Actually Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Not demos. Not prototypes. Production AI systems deployed in regulated industries,
            handling millions of requests daily with enterprise-grade reliability.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group glass-card rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(192,132,252,0.08) 0%, transparent 70%)" }}
              />
              <span className="text-3xl block mb-3">{f.icon}</span>
              <h3 className="text-white font-bold text-sm mb-2 group-hover:text-purple-300 transition-colors">{f.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlight stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 glass-card rounded-3xl p-8 border border-purple-500/15 flex flex-col md:flex-row items-center gap-6 md:gap-10"
        >
          <div className="text-center md:text-left">
            <div
              className="text-5xl font-bold font-mono mb-1"
              style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              73%
            </div>
            <div className="text-slate-300 font-semibold">Auto-resolution rate</div>
            <div className="text-slate-500 text-sm">AI customer support deployment</div>
          </div>
          <div className="h-px md:h-16 md:w-px bg-white/10 w-full" />
          <div className="text-center md:text-left">
            <div
              className="text-5xl font-bold font-mono mb-1"
              style={{ background: "linear-gradient(135deg, #38BDF8, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              99.2%
            </div>
            <div className="text-slate-300 font-semibold">Fraud detection accuracy</div>
            <div className="text-slate-500 text-sm">ML model in production banking</div>
          </div>
          <div className="h-px md:h-16 md:w-px bg-white/10 w-full" />
          <div className="text-center md:text-left flex-1">
            <p className="text-slate-300 text-base leading-relaxed">
              Our AI engineering team has deployed models in healthcare, finance, and legal domains —
              industries where <span className="text-purple-400 font-medium">accuracy and compliance are non-negotiable</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
