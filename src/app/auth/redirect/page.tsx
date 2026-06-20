"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, ShieldAlert, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AuthRedirect() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "no_access" | "success">("loading");
  const [email, setEmail] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/");
        return;
      }

      setEmail(session.user.email || "");

      // Check if user has a profile with portal access
      const { data, error } = await supabase
        .from('client_profiles')
        .select('has_portal_access')
        .eq('user_id', session.user.id)
        .single();

      if (data && data.has_portal_access) {
        setStatus("success");
        setTimeout(() => {
          router.push("/portal");
        }, 1500);
      } else {
        setStatus("no_access");
      }
    }

    checkAccess();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#0F172A] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
              <h1 className="text-2xl font-bold text-white mb-2">Authenticating...</h1>
              <p className="text-slate-400">Verifying your account details.</p>
            </>
          )}

          {status === "success" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-8 h-8 text-green-500" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-slate-400">Redirecting you to your Command Center...</p>
            </>
          )}

          {status === "no_access" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mb-6"
              >
                <ShieldAlert className="w-8 h-8 text-orange-500" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">Account Verified</h1>
              <p className="text-slate-400 mb-6">
                You are securely logged in as <span className="text-white font-medium">{email}</span>.
              </p>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-8 text-sm text-slate-300 text-left">
                Your account does not currently have an active project portal assigned. If you recently started a project with NovaTech, your portal will be provisioned shortly.
              </div>
              <button
                onClick={() => router.push("/")}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
              >
                Return to Home <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
