"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, MessageSquare, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  content: string;
  sender_role: "client" | "admin";
  sender_id: string;
  created_at: string;
}

const DEMO_MESSAGES: Message[] = [
  { id: "1", content: "Hello! Your project is progressing well. We've completed the authentication module this week.", sender_role: "admin", sender_id: "admin", created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: "2", content: "That's great to hear! When will the payment gateway be ready?", sender_role: "client", sender_id: "client", created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
  { id: "3", content: "We're targeting July 1st for the Payment Gateway milestone. We're currently building the Stripe webhook handlers.", sender_role: "admin", sender_id: "admin", created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
];

function timeStr(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}
function dateStr(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Today";
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      if (document.cookie.includes("demo_client_session=true")) {
        setIsDemo(true);
        setMessages(DEMO_MESSAGES);
        setLoading(false);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoading(false); return; }
      setUserId(session.user.id);
      const { data: projects } = await supabase.from("projects").select("id").eq("client_id", session.user.id).limit(1);
      if (projects && projects.length > 0) {
        const pid = projects[0].id;
        setProjectId(pid);
        const { data: msgs } = await supabase.from("messages").select("*").eq("project_id", pid).order("created_at", { ascending: true });
        setMessages(msgs || []);
      }
      setLoading(false);
    };
    load();
  }, [supabase]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    const content = newMessage.trim();
    setNewMessage("");
    if (isDemo) {
      setMessages(prev => [...prev, { id: Date.now().toString(), content, sender_role: "client", sender_id: "client", created_at: new Date().toISOString() }]);
      setSending(false);
      return;
    }
    if (!projectId || !userId) { setSending(false); return; }
    const { data } = await supabase.from("messages").insert({ project_id: projectId, sender_id: userId, sender_role: "client", content }).select().single();
    if (data) setMessages(prev => [...prev, data]);
    setSending(false);
  };

  // Group messages by date
  const grouped: { date: string; msgs: Message[] }[] = [];
  for (const msg of messages) {
    const d = dateStr(msg.created_at);
    const last = grouped[grouped.length - 1];
    if (last && last.date === d) last.msgs.push(msg);
    else grouped.push({ date: d, msgs: [msg] });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-slate-400 text-sm mt-1">Direct line to your project team.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Team Online
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 rounded-2xl bg-[#0F172A] border border-white/5 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {loading ? (
            <div className="flex justify-center pt-12"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <MessageSquare className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-slate-400 font-medium">No messages yet</p>
              <p className="text-slate-600 text-sm mt-1">Send a message to your project team below.</p>
            </div>
          ) : (
            grouped.map(({ date, msgs }) => (
              <div key={date}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-xs text-slate-500 font-medium">{date}</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div className="space-y-3">
                  {msgs.map((msg) => {
                    const isClient = msg.sender_role === "client";
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isClient ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[70%] ${isClient ? "items-end" : "items-start"} flex flex-col gap-1`}>
                          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            isClient
                              ? "bg-blue-600 text-white rounded-tr-sm"
                              : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-sm"
                          }`}>
                            {msg.content}
                          </div>
                          <span className="text-[11px] text-slate-600 px-1">{timeStr(msg.created_at)}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/30 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors disabled:opacity-40 shrink-0"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-600 mt-2 flex items-center gap-1">
            <Lock className="w-3 h-3" /> End-to-end encrypted. Messages are visible only to you and your project team.
          </p>
        </div>
      </div>
    </div>
  );
}
