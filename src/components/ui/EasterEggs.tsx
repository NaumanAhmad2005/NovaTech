"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Konami Code sequence
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

// Matrix rain component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 8, 22, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 99990 }} />;
}

// ─── Terminal ────────────────────────────────────────────────────────────────
type TerminalMode = "normal" | "admin-id" | "admin-pass";

function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<string[]>([
    "NovaTech Terminal v2.6.1",
    "Type 'help' for available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<TerminalMode>("normal");
  const [adminId, setAdminId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const print = (...msgs: string[]) => {
    setLines(prev => [...prev, ...msgs, ""]);
  };

  const handleAdminLogin = async (password: string) => {
    setIsLoading(true);
    print("  Authenticating...");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, password }),
      });
      const data = await res.json();
      if (data.success) {
        print(
          "  ✅ Access Granted.",
          "  ─────────────────────────────────",
          "  Initializing Enterprise Portal...",
          "  Opening in a new tab.",
          "  ─────────────────────────────────",
        );
        setTimeout(() => {
          window.open("/admin", "_blank");
          onClose(); // Optional: close terminal after successful login
        }, 1000);
      } else {
        print(`  ❌ ${data.error ?? "Invalid credentials."}`);
      }
    } catch {
      print("  ❌ Network error. Could not reach server.");
    } finally {
      setIsLoading(false);
      setMode("normal");
      setAdminId("");
    }
  };

  const handleCommand = (cmd: string) => {
    const c = cmd.trim().toLowerCase();

    // ── Admin ID prompt mode ──
    if (mode === "admin-id") {
      setLines(prev => [...prev, `  ID: ${cmd}`]);
      if (!cmd.trim()) {
        print("  ❌ Admin ID cannot be empty.");
        setMode("normal");
        return;
      }
      setAdminId(cmd.trim());
      setMode("admin-pass");
      setLines(prev => [...prev, "  Enter password:"]);
      return;
    }

    // ── Password prompt mode ──
    if (mode === "admin-pass") {
      setLines(prev => [...prev, "  Password: ••••••••"]);
      handleAdminLogin(cmd.trim());
      return;
    }

    // ── Normal commands ──
    setLines(prev => [...prev, `> ${cmd}`]);

    const responses: Record<string, string[]> = {
      help: [
        "Available commands:",
        "  about     — About NovaTech",
        "  stack     — Our tech stack",
        "  jobs      — Open positions",
        "  contact   — Contact info",
        "  admin     — Access admin panel",
        "  clear     — Clear terminal",
        "  exit      — Close terminal",
      ],
      about: [
        "NovaTech Technologies Inc.",
        "Engineering Tomorrow Since 2018",
        "50+ Enterprise Projects | 12 Countries | 120 Engineers",
      ],
      stack: [
        "Frontend:  React · Next.js · TypeScript · Vue",
        "Backend:   Node.js · Python · Go · .NET",
        "AI:        OpenAI · LangChain · TensorFlow",
        "Cloud:     AWS · Azure · GCP · Kubernetes",
      ],
      jobs: [
        "Open Positions:",
        "  → Senior Full-Stack Engineer (Remote)",
        "  → ML Engineer — LLM Systems (Dubai)",
        "  → DevOps Lead (London)",
        "  → Product Designer (Remote)",
        "  Apply: naumanf25@gmail.com",
      ],
      contact: [
        "━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  Email : naumanf25@gmail.com",
        "  Phone : +92 302 646 8105",
        "  Web   : novatech.vercel.app",
        "━━━━━━━━━━━━━━━━━━━━━━━━━",
      ],
      exit: [],
      clear: [],
    };

    if (c === "clear") { setLines(["NovaTech Terminal v2.6.1", ""]); return; }
    if (c === "exit") { onClose(); return; }

    if (c === "admin") {
      setMode("admin-id");
      setLines(prev => [
        ...prev,
        "  ─────────────────────────────────",
        "  🔐 ADMIN PANEL — Secure Login",
        "  ─────────────────────────────────",
        "  Enter Admin ID:",
      ]);
      return;
    }

    if (responses[c]) {
      setLines(prev => [...prev, ...responses[c], ""]);
    } else {
      setLines(prev => [...prev, `Command not found: ${cmd}`, "Type 'help' for commands.", ""]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() && !isLoading) {
      handleCommand(input);
      setInput("");
    }
  };

  const getPromptLabel = () => {
    if (mode === "admin-id") return "admin-id❯";
    if (mode === "admin-pass") return "password❯";
    return "❯";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      className="fixed bottom-8 right-8 w-[500px] max-w-[calc(100vw-2rem)] z-[99992] rounded-2xl overflow-hidden shadow-2xl border border-green-500/30"
      style={{ background: "rgba(5,8,22,0.97)" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/20">
        <div className="flex gap-1.5">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-green-400 text-xs font-mono ml-2">novatech — bash — 80×24</span>
        {mode !== "normal" && (
          <button
            onClick={() => { setMode("normal"); setAdminId(""); print("  [cancelled]"); }}
            className="ml-auto text-xs text-red-400 font-mono hover:text-red-300"
          >
            [cancel]
          </button>
        )}
      </div>

      {/* Output */}
      <div className="h-72 overflow-y-auto p-4 font-mono text-sm text-green-400 leading-relaxed">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith(">") ? "text-cyan-400" :
              line.includes("✅") ? "text-green-300" :
              line.includes("❌") ? "text-red-400" :
              line.includes("🔐") ? "text-yellow-400" :
              line.startsWith("  ━") || line.startsWith("  ─") ? "text-green-700" :
              ""
            }
          >
            {line || "\u00A0"}
          </div>
        ))}
        {isLoading && (
          <div className="text-yellow-400 animate-pulse">  Verifying credentials...</div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-green-500/20">
        <span className="text-green-500 font-mono text-sm whitespace-nowrap">{getPromptLabel()}</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          type={mode === "admin-pass" ? "password" : "text"}
          disabled={isLoading}
          className="flex-1 bg-transparent text-green-400 font-mono text-sm outline-none disabled:opacity-50"
          placeholder={isLoading ? "processing..." : "type a command..."}
        />
      </div>
    </motion.div>
  );
}

// ─── Main EasterEggs Component ───────────────────────────────────────────────
export default function EasterEggs() {
  const [matrixActive, setMatrixActive] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const konamiProgress = useRef<string[]>([]);
  const typedBuffer = useRef<string>("");
  const typedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip if user is typing in an input/textarea
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    // Konami code check
    konamiProgress.current = [...konamiProgress.current, e.key].slice(-KONAMI.length);
    if (konamiProgress.current.join(",") === KONAMI.join(",")) {
      setMatrixActive(prev => !prev);
      konamiProgress.current = [];
      return;
    }

    // "hello" easter egg — only single chars
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      typedBuffer.current = (typedBuffer.current + e.key).slice(-10);
      if (typedTimeout.current) clearTimeout(typedTimeout.current);
      typedTimeout.current = setTimeout(() => { typedBuffer.current = ""; }, 2000);

      if (typedBuffer.current.toLowerCase().includes("hello")) {
        setTerminalOpen(true);
        typedBuffer.current = "";
      }
    }
  }, []);

  useEffect(() => {
    console.log(
      "%c\n  ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ ████████╗███████╗ ██████╗██╗  ██╗\n  ████╗  ██║██╔═══██╗██║   ██║██╔══██╗╚══██╔══╝██╔════╝██╔════╝██║  ██║\n  ██╔██╗ ██║██║   ██║██║   ██║███████║   ██║   █████╗  ██║     ███████║\n  ██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║   ██║   ██╔══╝  ██║     ██╔══██║\n  ██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║   ██║   ███████╗╚██████╗██║  ██║\n  ╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\n",
      "color: #38BDF8; font-family: monospace;"
    );
    console.log("%c👋 Hey developer! We see you.", "color: #3B82F6; font-size: 14px; font-weight: bold;");
    console.log("%c🚀 We're hiring senior engineers. Email: naumanf25@gmail.com", "color: #94A3B8;");
    console.log("%c🔐 Security bug? naumanf25@gmail.com", "color: #94A3B8;");

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto-dismiss matrix after 8 seconds
  useEffect(() => {
    if (!matrixActive) return;
    const t = setTimeout(() => setMatrixActive(false), 8000);
    return () => clearTimeout(t);
  }, [matrixActive]);

  return (
    <>
      {/* Matrix Rain */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99990] pointer-events-none"
          >
            <MatrixRain />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto z-[99995]">
              <div className="glass-card rounded-2xl p-8 border border-green-500/30">
                <p className="text-green-400 font-mono text-lg mb-2">CYBER MODE ACTIVATED</p>
                <p className="text-green-600 font-mono text-sm">Konami code detected. Welcome, operator.</p>
                <button
                  onClick={() => setMatrixActive(false)}
                  className="mt-4 px-4 py-2 rounded-lg border border-green-500/30 text-green-400 font-mono text-sm hover:bg-green-500/10 transition-colors"
                >
                  [ EXIT ]
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal */}
      <AnimatePresence>
        {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
