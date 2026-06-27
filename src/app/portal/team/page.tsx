"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Mail, Shield, Clock } from "lucide-react";

const TEAM = [
  { name: "Sarah Chen", role: "Project Manager", email: "sarah@novatech.io", initials: "SC", color: "from-blue-500 to-cyan-400", online: true, responsibilities: ["Sprint planning", "Client communication", "Risk management", "Weekly reports"], availability: "Mon–Fri 9AM–6PM PKT" },
  { name: "Marcus Dev", role: "Tech Lead", email: "marcus@novatech.io", initials: "MD", color: "from-purple-500 to-pink-400", online: true, responsibilities: ["Architecture decisions", "Backend development", "Code reviews", "DevOps"], availability: "Mon–Fri 10AM–7PM PKT" },
  { name: "Aisha UI", role: "UI/UX Designer", email: "aisha@novatech.io", initials: "AU", color: "from-orange-500 to-yellow-400", online: false, responsibilities: ["Figma wireframes", "UI designs", "Design system", "Prototyping"], availability: "Mon–Thu 9AM–5PM PKT" },
  { name: "Reza Frontend", role: "Frontend Developer", email: "reza@novatech.io", initials: "RF", color: "from-green-500 to-emerald-400", online: true, responsibilities: ["Next.js development", "Component library", "Animations", "Responsive UI"], availability: "Mon–Fri 9AM–6PM PKT" },
  { name: "Leila QA", role: "QA Engineer", email: "leila@novatech.io", initials: "LQ", color: "from-pink-500 to-rose-400", online: false, responsibilities: ["Test planning", "Bug reporting", "E2E testing", "Acceptance criteria"], availability: "Mon–Fri 10AM–6PM PKT" },
  { name: "Omar DevOps", role: "DevOps Engineer", email: "omar@novatech.io", initials: "OD", color: "from-cyan-500 to-blue-400", online: true, responsibilities: ["CI/CD pipelines", "Kubernetes", "Monitoring", "Infrastructure"], availability: "Mon–Fri 8AM–5PM PKT" },
  { name: "Priya BA", role: "Business Analyst", email: "priya@novatech.io", initials: "PB", color: "from-violet-500 to-purple-400", online: false, responsibilities: ["Requirements gathering", "User stories", "Stakeholder alignment", "Documentation"], availability: "Mon–Fri 9AM–5PM PKT" },
  { name: "Ali Security", role: "Security Engineer", email: "ali@novatech.io", initials: "AS", color: "from-red-500 to-orange-400", online: false, responsibilities: ["Security audits", "Penetration testing", "OWASP compliance", "Data privacy"], availability: "Mon–Wed 9AM–5PM PKT" },
];

export default function TeamPage() {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-400" /> Your Project Team
        </h1>
        <p className="text-slate-400 text-sm mt-1">Meet the NovaTech team dedicated to your project. All members are here to help.</p>
      </div>

      {/* Online status summary */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0f1e] border border-white/5">
        <div className="flex -space-x-3">
          {TEAM.filter(m => m.online).slice(0, 4).map((m) => (
            <div key={m.name} className={`w-9 h-9 rounded-full bg-gradient-to-br ${m.color} border-2 border-[#0a0f1e] flex items-center justify-center text-[10px] font-bold text-white`}>
              {m.initials}
            </div>
          ))}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{TEAM.filter(m => m.online).length} online right now</p>
          <p className="text-slate-500 text-xs">{TEAM.filter(m => !m.online).length} members offline · Check back during business hours</p>
        </div>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {TEAM.map((member, i) => (
          <motion.div key={member.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="p-5 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-white/10 transition-colors group">

            {/* Avatar + online */}
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-lg font-bold text-white shadow-lg`}>
                  {member.initials}
                </div>
                <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0a0f1e] ${member.online ? "bg-green-400" : "bg-slate-600"}`} />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${member.online ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-slate-500/10 text-slate-500 border-slate-500/20"}`}>
                {member.online ? "Online" : "Offline"}
              </span>
            </div>

            <h3 className="text-white font-bold">{member.name}</h3>
            <p className="text-xs text-blue-400 font-medium mt-0.5 mb-3">{member.role}</p>

            {/* Responsibilities */}
            <div className="space-y-1 mb-4">
              {member.responsibilities.slice(0, 3).map((r) => (
                <p key={r} className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" /> {r}
                </p>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4">
              <Clock className="w-3 h-3" /> {member.availability}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-white/5">
              <button onClick={() => alert(`Opening chat with ${member.name}...`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs border border-blue-500/20 transition-colors">
                <MessageSquare className="w-3.5 h-3.5" /> Message
              </button>
              <button onClick={() => alert(`Composing email to ${member.email}...`)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/10">
                <Mail className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust badge */}
      <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
        <Shield className="w-5 h-5 text-blue-400 shrink-0" />
        <p className="text-xs text-slate-300">All team members have signed your NDA and are under strict data confidentiality agreements. Your project information is fully protected.</p>
      </div>
    </div>
  );
}
