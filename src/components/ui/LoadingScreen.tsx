"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ zIndex: 99999 }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-blue-500/20"
                style={{ width: i * 180, height: i * 180 }}
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6 relative z-10"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400"
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                />
                <div className="absolute inset-1 rounded-lg bg-[#050816] flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>N</span>
                </div>
              </div>
              <span className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>
                NovaTech
              </span>
            </div>

            <p className="text-sm text-slate-400 font-mono tracking-widest">
              INITIALIZING SYSTEMS...
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #3B82F6, #38BDF8)",
                  width: `${Math.min(progress, 100)}%`
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <span className="font-mono text-xs text-slate-500">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
