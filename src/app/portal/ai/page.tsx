"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Send, RefreshCw, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const SUGGESTED_QUESTIONS = [
  "What was completed this week?",
  "When will authentication be finished?",
  "Explain the latest deployment.",
  "What approvals are waiting?",
  "Generate a progress report.",
  "What risks currently exist?",
  "When is the project due?",
  "Summarize yesterday's meeting.",
];

const AI_RESPONSES: Record<string, string> = {
  default: "I'm Nova AI, your dedicated project advisor. I have full context of your project at NovaTech. I can answer any question about timelines, progress, the team, risks, and deliverables — always in plain business language.",
  "What was completed this week?": "This week (June 23–27), the team completed: ✅ Authentication module — fully tested and deployed to staging. ✅ 14 sprint tasks closed. ✅ Payment webhook handler — 80% complete. ✅ New UI designs uploaded for your review. One deployment to staging with build v1.4.7 went live on June 27.",
  "When will authentication be finished?": "Great news — authentication is already 100% complete as of June 25th. It includes JWT tokens, Google and GitHub OAuth, two-factor authentication, and session management. It was deployed to staging and passed all QA tests.",
  "Explain the latest deployment.": "The latest deployment (v1.4.7) was pushed to Staging on June 27th. It was a hotfix targeting a race condition in the Stripe payment webhook handler — specifically, when two webhook events arrived simultaneously, only one was being processed. The fix adds a queue-based handler. The build took 1 minute 42 seconds and all tests are passing.",
  "What approvals are waiting?": "You currently have 2 items awaiting your approval: 1. 🎨 Payment Flow UI Designs v4 — uploaded by Aisha UI. Review recommended before Friday so development can begin Monday. 2. 🚀 Production Deploy — v1.4.7 hotfix is staged and ready. Approve to push to production. Both are available in your Approvals tab.",
  "Generate a progress report.": "📊 Project Status Report — June 27, 2026\n\nOverall Completion: 68% (On Track)\nCurrent Phase: Frontend Development (Sprint 14)\nSprint 14: 72% complete — 18 tasks done, 7 remaining\nEstimated Delivery: August 20, 2026 (54 days remaining)\n\nCompleted Milestones: Project Kickoff ✅, UI/UX Design ✅, Backend Architecture ✅, Auth Module ✅\nIn Progress: Payment Gateway (78%), CRM Module (45%)\nUpcoming: Reporting Engine, Final QA, Production Launch\n\nNo critical risks identified. Budget utilization at 62%.",
  "What risks currently exist?": "Currently, there is 1 low-level risk on record:\n\n⚠️ Payment Gateway Complexity — The Stripe webhook system was more complex than initially scoped. Marcus has resolved the race condition bug. This added ~3 days but we're still within the buffer period.\n\nNo high or critical risks have been identified. The project is healthy and on schedule.",
  "When is the project due?": "Your project — the GlobalTech Enterprise Platform — is estimated to be completed by August 20, 2026. That's approximately 54 days from today. The team is currently at 68% completion and on track to meet this deadline. The final milestones are the Payment Gateway (due July 15) and the Production Launch (due August 20).",
};

function getResponse(question: string): string {
  for (const key of Object.keys(AI_RESPONSES)) {
    if (key !== "default" && question.toLowerCase().includes(key.toLowerCase().slice(0, 20))) {
      return AI_RESPONSES[key];
    }
  }
  return `Thanks for your question about "${question}". Based on your project data, here's what I can tell you: Your GlobalTech Enterprise Platform is currently 68% complete, in Sprint 14, with an estimated delivery of August 20, 2026. For a more specific answer, try one of the suggested questions or ask about a specific module, milestone, or team member.`;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0", role: "assistant",
      content: AI_RESPONSES.default,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;

    const userMsg: Message = {
      id: Date.now().toString(), role: "user", content,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(), role: "assistant",
        content: getResponse(content),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-400" /> Nova AI Assistant
          </h1>
          <p className="text-slate-400 text-sm mt-1">Your intelligent project advisor. Ask anything about your project in plain English.</p>
        </div>
        <button onClick={() => setMessages([{ id: "0", role: "assistant", content: AI_RESPONSES.default, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }])}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-sm border border-white/10 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Chat container */}
      <div className="flex-1 rounded-2xl bg-[#0a0f1e] border border-white/5 flex flex-col overflow-hidden">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[75%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-sm"
                }`}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-600 px-1">{msg.time}</span>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} className="w-2 h-2 rounded-full bg-slate-400"
                      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        <div className="px-4 py-3 border-t border-white/5">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {SUGGESTED_QUESTIONS.map(q => (
              <button key={q} onClick={() => sendMessage(q)} disabled={isTyping}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/20 text-xs text-slate-400 hover:text-blue-300 border border-white/10 transition-colors disabled:opacity-50">
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <input
              type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !isTyping && sendMessage()}
              placeholder="Ask Nova AI anything about your project..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 flex items-center justify-center text-white transition-all disabled:opacity-40 shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-600 mt-2 text-center">Nova AI has full context of your project. All answers are in plain business language.</p>
        </div>
      </div>
    </div>
  );
}
