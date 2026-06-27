"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Hash, Send, Smile, Paperclip, Search, Pin, AtSign, ChevronRight } from "lucide-react";

const CHANNELS = [
  { id: "general",     name: "general",     desc: "General project updates and announcements", unread: 0 },
  { id: "development", name: "development",  desc: "Backend & frontend development discussions", unread: 2 },
  { id: "design",      name: "design",       desc: "UI/UX design feedback and approvals", unread: 5 },
  { id: "testing",     name: "testing",      desc: "QA reports, bugs, and test results", unread: 0 },
  { id: "billing",     name: "billing",      desc: "Invoices, payments, and finance queries", unread: 1 },
  { id: "support",     name: "support",      desc: "Technical questions and help requests", unread: 0 },
];

type Reaction = { emoji: string; count: number; reacted: boolean };
interface Message {
  id: string; sender: string; initials: string; color: string;
  time: string; content: string; pinned?: boolean;
  reactions?: Reaction[];
}

const CHANNEL_MESSAGES: Record<string, Message[]> = {
  general: [
    { id: "1", sender: "Sarah Chen", initials: "SC", color: "from-blue-500 to-cyan-400", time: "10:15 AM", content: "Good morning team! Quick update — authentication module has been deployed to staging and all tests are passing. 🎉", reactions: [{ emoji: "🎉", count: 3, reacted: false }, { emoji: "👍", count: 2, reacted: true }] },
    { id: "2", sender: "Marcus Dev", initials: "MD", color: "from-purple-500 to-pink-400", time: "10:22 AM", content: "Confirmed! The auth flow is solid. v1.4.7 hotfix for the webhook issue is also staged and ready for approval.", reactions: [] },
    { id: "3", sender: "Sarah Chen", initials: "SC", color: "from-blue-500 to-cyan-400", time: "10:30 AM", content: "@Ahmed — can you review and approve the Payment Flow designs when you get a chance? Aisha needs the go-ahead to start implementation.", reactions: [{ emoji: "👀", count: 1, reacted: false }] },
    { id: "4", sender: "You", initials: "AH", color: "from-slate-600 to-slate-700", time: "11:05 AM", content: "Will do! I'll check the designs after our morning meeting.", reactions: [] },
    { id: "5", sender: "Aisha UI", initials: "AU", color: "from-orange-500 to-yellow-400", time: "11:10 AM", content: "Thank you! The designs are in the Design Center tab — all three screens are ready for your review.", reactions: [{ emoji: "🙏", count: 1, reacted: false }] },
  ],
  design: [
    { id: "1", sender: "Aisha UI", initials: "AU", color: "from-orange-500 to-yellow-400", time: "9:00 AM", content: "Just uploaded Payment Flow v4 to the Design Center. This is the most polished version yet — checkout, 3DS screen, and success/failure states all included.", pinned: true, reactions: [{ emoji: "🔥", count: 4, reacted: false }] },
    { id: "2", sender: "Reza Frontend", initials: "RF", color: "from-green-500 to-emerald-400", time: "9:45 AM", content: "Looks amazing @Aisha! The 3DS screen especially — much cleaner than v3.", reactions: [] },
    { id: "3", sender: "You", initials: "AH", color: "from-slate-600 to-slate-700", time: "10:00 AM", content: "I'll review these today. Really like the direction.", reactions: [] },
    { id: "4", sender: "Aisha UI", initials: "AU", color: "from-orange-500 to-yellow-400", time: "10:02 AM", content: "No rush, but if we can get approval by EOD it allows Reza to start implementation Monday morning!", reactions: [{ emoji: "🤞", count: 2, reacted: false }] },
    { id: "5", sender: "Sarah Chen", initials: "SC", color: "from-blue-500 to-cyan-400", time: "10:30 AM", content: "I've also left a few notes in the Approvals tab for context on the design decisions.", reactions: [] },
  ],
  development: [
    { id: "1", sender: "Marcus Dev", initials: "MD", color: "from-purple-500 to-pink-400", time: "8:30 AM", content: "Fixed the race condition in the Stripe webhook handler. The issue was two events arriving within 50ms — added a Redis queue to handle ordering. Build v1.4.7 is staged.", reactions: [{ emoji: "💪", count: 3, reacted: false }] },
    { id: "2", sender: "Leila QA", initials: "LQ", color: "from-pink-500 to-rose-400", time: "9:10 AM", content: "Ran the full test suite on v1.4.7 — all 324 unit tests pass, E2E is clean. Ready for production approval.", reactions: [{ emoji: "✅", count: 2, reacted: true }] },
    { id: "3", sender: "Omar DevOps", initials: "OD", color: "from-cyan-500 to-blue-400", time: "9:45 AM", content: "Deployment pipeline is ready. Just need the client's approval to push to production. It's a 2-minute deploy, no downtime expected.", reactions: [] },
  ],
  billing: [
    { id: "1", sender: "Sarah Chen", initials: "SC", color: "from-blue-500 to-cyan-400", time: "Jun 27", content: "Invoice #INV-004 for $22,500 has been generated and sent. This covers Sprint 13-14 as per the payment schedule. Due date is July 15.", reactions: [] },
  ],
  testing: [],
  support: [],
};

const EMOJIS = ["👍", "❤️", "🎉", "🔥", "🙏", "✅", "👀", "💪"];

export default function MessagesPage() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(CHANNEL_MESSAGES);
  const [showEmoji, setShowEmoji] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, activeChannel]);

  const channelMessages = messages[activeChannel] || [];
  const activeChannel_ = CHANNELS.find(c => c.id === activeChannel)!;

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(), sender: "You", initials: "AH",
      color: "from-slate-600 to-slate-700",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      content: input.trim(), reactions: [],
    };
    setMessages(prev => ({ ...prev, [activeChannel]: [...(prev[activeChannel] || []), newMsg] }));
    setInput("");
    // Simulate reply after 2s on general channel
    if (activeChannel === "general") {
      setIsTyping(true);
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(), sender: "Sarah Chen", initials: "SC",
          color: "from-blue-500 to-cyan-400",
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          content: "Got it! I'll follow up on that shortly. 👍",
          reactions: [],
        };
        setMessages(prev => ({ ...prev, [activeChannel]: [...(prev[activeChannel] || []), reply] }));
        setIsTyping(false);
      }, 2000);
    }
  };

  const addReaction = (channelId: string, msgId: string, emoji: string) => {
    setMessages(prev => ({
      ...prev,
      [channelId]: prev[channelId].map(m => {
        if (m.id !== msgId) return m;
        const existing = m.reactions?.find(r => r.emoji === emoji);
        if (existing) {
          return { ...m, reactions: m.reactions?.map(r => r.emoji === emoji ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted } : r) };
        }
        return { ...m, reactions: [...(m.reactions || []), { emoji, count: 1, reacted: true }] };
      }),
    }));
    setShowEmoji(null);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] max-h-[800px] rounded-2xl overflow-hidden border border-white/5 bg-[#0a0f1e]">
      {/* Sidebar — channels */}
      <div className="w-56 border-r border-white/5 flex flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b border-white/5">
          <p className="text-white font-bold text-sm">Messages</p>
          <p className="text-slate-500 text-xs mt-0.5">GlobalTech Project</p>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">Channels</p>
          {CHANNELS.map(ch => (
            <button key={ch.id} onClick={() => setActiveChannel(ch.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${activeChannel === ch.id ? "bg-blue-600/10 text-blue-400" : "text-slate-500 hover:text-slate-200 hover:bg-white/5"}`}>
              <span className="flex items-center gap-2 text-sm">
                <Hash className="w-3.5 h-3.5 shrink-0" />
                {ch.name}
              </span>
              {ch.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold shrink-0">{ch.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel header */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-500" />
            <span className="text-white font-bold text-sm">{activeChannel_.name}</span>
            <span className="text-slate-500 text-xs hidden md:block">— {activeChannel_.desc}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => alert("Search coming soon...")} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => alert("Pinned messages...")} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Pin className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
          {channelMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageSquare className="w-10 h-10 text-slate-700 mb-3" />
              <p className="text-slate-500 font-medium">No messages yet</p>
              <p className="text-slate-600 text-sm mt-1">Start the conversation in #{activeChannel_.name}</p>
            </div>
          ) : (
            channelMessages.map((msg, i) => {
              const isMe = msg.sender === "You";
              const prevSender = i > 0 ? channelMessages[i - 1].sender : null;
              const grouped = prevSender === msg.sender;
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 group relative ${isMe ? "flex-row-reverse" : ""} ${grouped ? "mt-0.5" : "mt-4"}`}>

                  {/* Avatar */}
                  {!grouped ? (
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5`}>
                      {msg.initials}
                    </div>
                  ) : <div className="w-8 shrink-0" />}

                  <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                    {!grouped && (
                      <div className={`flex items-baseline gap-2 mb-1 ${isMe ? "flex-row-reverse" : ""}`}>
                        <span className="text-sm font-semibold text-white">{msg.sender}</span>
                        <span className="text-[10px] text-slate-600">{msg.time}</span>
                        {msg.pinned && <Pin className="w-3 h-3 text-yellow-400" />}
                      </div>
                    )}

                    <div className={`relative px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white/[0.05] text-slate-200 rounded-tl-sm border border-white/5"
                    }`}>
                      {msg.content}
                    </div>

                    {/* Reactions */}
                    {msg.reactions && msg.reactions.filter(r => r.count > 0).length > 0 && (
                      <div className={`flex gap-1 mt-1 flex-wrap ${isMe ? "justify-end" : ""}`}>
                        {msg.reactions.filter(r => r.count > 0).map(r => (
                          <button key={r.emoji} onClick={() => addReaction(activeChannel, msg.id, r.emoji)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-colors ${r.reacted ? "bg-blue-500/20 border-blue-500/40 text-blue-300" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"}`}>
                            {r.emoji} <span>{r.count}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Hover actions */}
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 mt-1 ${isMe ? "justify-end" : ""}`}>
                      <button onClick={() => setShowEmoji(showEmoji === msg.id ? null : msg.id)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                        <Smile className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Emoji picker */}
                    <AnimatePresence>
                      {showEmoji === msg.id && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                          className={`absolute z-10 top-full mt-1 p-2 rounded-xl bg-[#111827] border border-white/10 flex gap-1 ${isMe ? "right-0" : "left-8"}`}>
                          {EMOJIS.map(e => (
                            <button key={e} onClick={() => addReaction(activeChannel, msg.id, e)}
                              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-lg transition-colors">
                              {e}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })
          )}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0">SC</div>
                <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-1.5">
                  {[0, 1, 2].map(j => (
                    <motion.span key={j} className="w-1.5 h-1.5 rounded-full bg-slate-400"
                      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }} />
                  ))}
                </div>
                <span className="text-xs text-slate-500">Sarah Chen is typing…</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500/30 transition-all">
            <button onClick={() => alert("Attach file...")} className="text-slate-500 hover:text-white transition-colors shrink-0">
              <Paperclip className="w-4 h-4" />
            </button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder={`Message #${activeChannel_.name}`}
              className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-600 focus:outline-none" />
            <button onClick={() => alert("Emoji picker...")} className="text-slate-500 hover:text-white transition-colors shrink-0">
              <Smile className="w-4 h-4" />
            </button>
            <button onClick={sendMessage} disabled={!input.trim()}
              className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors disabled:opacity-40 shrink-0">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
