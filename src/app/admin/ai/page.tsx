"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Activity, Zap, Server, BrainCircuit, RefreshCw, BarChart3, Terminal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tokenData = [
  { day: "Mon", tokens: 120000 },
  { day: "Tue", tokens: 150000 },
  { day: "Wed", tokens: 180000 },
  { day: "Thu", tokens: 140000 },
  { day: "Fri", tokens: 220000 },
  { day: "Sat", tokens: 90000 },
  { day: "Sun", tokens: 85000 },
];

export default function AICenterPage() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setOutput("This is a simulated response from the NovaTech AI Engine. In a live environment, this would stream back results from OpenAI/Anthropic based on your prompt.");
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-400" /> AI Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage AI models, token usage, and system integrations.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          <Sparkles className="w-4 h-4" /> Train Model
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Models", value: "3", icon: BrainCircuit, color: "text-blue-400" },
          { label: "Tokens Today", value: "245k", icon: Activity, color: "text-purple-400" },
          { label: "Avg Latency", value: "450ms", icon: Zap, color: "text-green-400" },
          { label: "API Health", value: "99.9%", icon: Server, color: "text-emerald-400" },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-[#0F172A] border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Usage Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-[#0F172A] border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-400" /> Token Usage (7 Days)
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff10", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                <Area type="monotone" dataKey="tokens" stroke="#8B5CF6" strokeWidth={2} fill="url(#aiGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Playground */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#080B14] border border-white/5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" /> Sandbox
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] border border-purple-500/20">GPT-4o</span>
          </div>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Test a prompt..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/40 resize-none mb-3"
          />
          <button onClick={handleGenerate} disabled={generating || !prompt.trim()}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mb-4">
            {generating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {generating ? "Generating..." : "Run Prompt"}
          </button>
          
          <div className="flex-1 min-h-[100px] bg-black/40 rounded-xl border border-white/5 p-4 overflow-y-auto">
            {output ? (
              <p className="text-sm text-slate-300 leading-relaxed">{output}</p>
            ) : (
              <p className="text-xs text-slate-600 font-mono text-center mt-4">Output will appear here...</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
