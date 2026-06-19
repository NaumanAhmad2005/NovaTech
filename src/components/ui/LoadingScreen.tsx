"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Hard safety: always dismiss after 3.5s no matter what
    const hardTimeout = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsLoading(false);
    }, 3500);

    intervalRef.current = setInterval(() => {
      progressRef.current += Math.random() * 15 + 5;

      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearTimeout(hardTimeout);
        // Small delay for the 100% to render, then dismiss
        setTimeout(() => setIsLoading(false), 350);
        return;
      }

      setProgress(Math.min(progressRef.current, 100));
    }, 80);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(hardTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#050816",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
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
                animate={{ rotate: 360 }}
                transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          {/* Logo & Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-6 relative z-10"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                />
                <div className="absolute inset-1 rounded-lg bg-[#050816] flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    N
                  </span>
                </div>
              </div>
              <span
                className="text-2xl font-bold gradient-text"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                NovaTech
              </span>
            </div>

            <p className="text-sm text-slate-400 font-mono tracking-widest">
              INITIALIZING SYSTEMS...
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-75"
                style={{
                  background: "linear-gradient(90deg, #3B82F6, #38BDF8)",
                  width: `${Math.round(progress)}%`,
                }}
              />
            </div>

            <span className="font-mono text-xs text-slate-500">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
