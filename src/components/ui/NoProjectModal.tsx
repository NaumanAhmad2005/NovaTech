import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface NoProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export default function NoProjectModal({ isOpen, onClose, userName }: NoProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02040a]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#0F172A] border border-white/10 shadow-2xl shadow-blue-900/20 text-center p-8"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 relative z-10">
              <Rocket className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3 relative z-10 font-mono">
              Welcome, {userName}!
            </h2>
            <p className="text-slate-400 text-[15px] mb-8 leading-relaxed relative z-10">
              You haven't started any project yet. Let's build something extraordinary together.
            </p>

            <div className="relative z-10">
              <Link
                href="/#contact"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-500/50"
              >
                Start Your Project <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
