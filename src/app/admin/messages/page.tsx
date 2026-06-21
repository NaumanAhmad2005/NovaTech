"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Search, Circle, Loader2, MessageSquare, Lock } from "lucide-react";

interface Thread {
  id: string;
  client_name: string;
  client_email: string;
  project: string;
  last_message: string;
  last_time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: "admin" | "client";
  time: string;
}

const DEMO_THREADS: Thread[] = [
  { id: "1", client_name: "Sophia Martinez", client_email: "sophia@globaltech.io", project: "GlobalTech Enterprise App", last_message: "We're targeting July 1st for the Payment Gateway milestone.", last_time: "2:34 PM", unread: 0, online: true },
  { id: "2", client_name: "Priya Sharma", client_email: "priya@fintech.co", project: "FinTech Compliance Platform", last_message: "Can we schedule a call this week?", last_time: "Yesterday", unread: 2, online: false },
  { id: "3", client_name: "James Wilson", client_email: "james@acmecorp.com", project: "Pending Approval", last_message: "Looking forward to hearing from you!", last_time: "Mon", unread: 1, online: false },
];

const DEMO_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "1", content: "Hello! Your project is progressing well. We've completed the authentication module this week.", sender: "admin", time: "10:00 AM" },
    { id: "2", content: "That's great to hear! When will the payment gateway be ready?", sender: "client", time: "10:15 AM" },
    { id: "3", content: "We're targeting July 1st for the Payment Gateway milestone. We're currently building the Stripe webhook handlers.", sender: "admin", time: "2:34 PM" },
  ],
  "2": [
    { id: "1", content: "Hi! I just reviewed the discovery report — looks comprehensive.", sender: "admin", time: "Yesterday 9:00 AM" },
    { id: "2", content: "Thank you! Can we schedule a call this week to discuss the API design?", sender: "client", time: "Yesterday 11:30 AM" },
    { id: "3", content: "Can we schedule a call this week?", sender: "client", time: "Yesterday 3:00 PM" },
  ],
  "3": [
    { id: "1", content: "Hi James, thanks for submitting your project request. We'll review it shortly.", sender: "admin", time: "Mon 10:00 AM" },
    { id: "2", content: "Looking forward to hearing from you!", sender: "client", time: "Mon 10:05 AM" },
  ],
};

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}
const COLORS = ["from-blue-500 to-cyan-400", "from-purple-500 to-pink-400", "from-green-500 to-emerald-400"];

export default function AdminMessagesPage() {
  const [threads] = useState<Thread[]>(DEMO_THREADS);
  const [selectedThread, setSelectedThread] = useState<Thread>(DEMO_THREADS[0]);
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES["1"]);
  const [newMsg, setNewMsg] = useState("");
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const selectThread = (thread: Thread) => {
    setSelectedThread(thread);
    setMessages(DEMO_MESSAGES[thread.id] || []);
  };

  const handleSend = () => {
    if (!newMsg.trim()) return;
    const msg: Message = { id: Date.now().toString(), content: newMsg.trim(), sender: "admin", time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, msg]);
    setNewMsg("");
  };

  const filteredThreads = threads.filter(t => !search || [t.client_name, t.project].some(v => v.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-0 rounded-2xl overflow-hidden border border-white/5">
      {/* Threads sidebar */}
      <div className="w-80 shrink-0 bg-[#080f1e] border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-base font-bold text-white mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {filteredThreads.map((thread, i) => (
            <button key={thread.id} onClick={() => selectThread(thread)}
              className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors ${selectedThread.id === thread.id ? "bg-blue-500/5 border-l-2 border-l-blue-500" : ""}`}>
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${COLORS[i % COLORS.length]} flex items-center justify-center text-xs font-bold text-white`}>
                    {getInitials(thread.client_name)}
                  </div>
                  {thread.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#080f1e]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white truncate">{thread.client_name}</span>
                    <span className="text-[10px] text-slate-500 shrink-0 ml-2">{thread.last_time}</span>
                  </div>
                  <p className="text-xs text-blue-400 truncate mt-0.5">{thread.project}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{thread.last_message}</p>
                </div>
                {thread.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {thread.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-[#0A1020]">
        {/* Chat header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${COLORS[threads.indexOf(selectedThread) % COLORS.length]} flex items-center justify-center text-xs font-bold text-white`}>
              {getInitials(selectedThread.client_name)}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{selectedThread.client_name}</p>
              <p className="text-xs text-slate-400">{selectedThread.project}</p>
            </div>
            {selectedThread.online && <span className="flex items-center gap-1 text-xs text-green-400 ml-1"><Circle className="w-2 h-2 fill-green-400" /> Online</span>}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[65%] flex flex-col gap-1 ${msg.sender === "admin" ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "admin" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-sm"
                }`}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-600 px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <input type="text" value={newMsg} onChange={e => setNewMsg(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={`Reply to ${selectedThread.client_name}...`}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all" />
            <button onClick={handleSend} disabled={!newMsg.trim()}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors disabled:opacity-40 shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-600 mt-2 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> Encrypted. Only you and the client can see this.</p>
        </div>
      </div>
    </div>
  );
}
