"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";
import { Menu, X, ChevronDown, Zap, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/ThemeContext";
import LoginModal from "@/components/ui/LoginModal";

const navLinks = [
  { label: "Home", href: "#home" },
  {
    label: "Services", href: "#services",
    children: [
      { label: "Custom Software", href: "#services" },
      { label: "AI Solutions", href: "#services" },
      { label: "Cloud Solutions", href: "#services" },
      { label: "Cybersecurity", href: "#services" },
    ]
  },
  {
    label: "Solutions", href: "#solutions",
    children: [
      { label: "Enterprise ERP", href: "#solutions" },
      { label: "CRM Systems", href: "#solutions" },
      { label: "API Development", href: "#solutions" },
      { label: "Automation", href: "#solutions" },
      { label: "DevOps", href: "#solutions" },
    ]
  },
  { label: "Industries", href: "#industries" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Careers", href: "#careers" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 60);
    });
    return unsubscribe;
  }, [scrollY]);

  const handleScroll = (href: string) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-blue-500/10 py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleScroll("#home")}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-9 h-9">
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 opacity-80"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              />
              <div className="absolute inset-0.5 rounded-lg bg-[#050816] flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>
                NovaTech
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest font-mono -mt-0.5">ENGINEERING TOMORROW</span>
            </div>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  onClick={() => handleScroll(link.href)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3 opacity-60" />}
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-52 glass-dropdown rounded-xl p-2 shadow-2xl"
                    >
                      {link.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleScroll(child.href)}
                          className="w-full text-left px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all"
                        >
                          {child.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative w-9 h-9 rounded-lg glass flex items-center justify-center border border-white/10 hover:border-blue-500/30 transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <Sun className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <Moon className="w-4 h-4 text-blue-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => handleScroll("#contact")}
              className="btn-primary text-sm py-2.5 px-5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Your Project
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden relative w-10 h-10 flex items-center justify-center rounded-lg glass"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-80 glass border-l border-blue-500/10 flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleScroll(link.href)}
                  className="text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-blue-500/10 rounded-xl transition-all text-base font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={() => handleScroll("#contact")}
                className="btn-primary w-full text-center"
              >
                Start Your Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
