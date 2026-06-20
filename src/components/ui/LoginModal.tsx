"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, Zap, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const supabase = createClient();

  const handleOAuthLogin = async (provider: 'google' | 'apple' | 'facebook' | 'demo') => {
    setLoadingProvider(provider);
    setErrorMsg(null);

    if (provider === 'demo') {
      // Set a dummy cookie and hard redirect to portal
      document.cookie = "demo_client_session=true; path=/; max-age=86400";
      window.location.href = "/portal";
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        if (error.message.includes('not enabled') || error.message.includes('URL and API key')) {
          throw new Error("OAuth is not yet configured on your Supabase backend.");
        }
        throw error;
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      setErrorMsg(error.message || "Failed to authenticate. Please check configuration.");
      setLoadingProvider(null);
    }
  };

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
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0F172A] border border-white/10 shadow-2xl shadow-blue-900/20"
          >
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2 font-mono">Client Portal</h2>
              <p className="text-slate-400 text-center text-sm mb-8">
                Sign in to manage your projects, view progress, and collaborate with your team.
              </p>

              <div className="space-y-3">
                {/* Google Button */}
                <button
                  onClick={() => handleOAuthLogin('google')}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-medium transition-colors disabled:opacity-50"
                >
                  {loadingProvider === 'google' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  Continue with Google
                </button>

                {/* Apple Button */}
                <button
                  onClick={() => handleOAuthLogin('apple')}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-black border border-white/20 text-white hover:bg-white/5 font-medium transition-colors disabled:opacity-50"
                >
                  {loadingProvider === 'apple' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.43.987 3.96.948 1.567-.04 2.559-1.497 3.546-2.943 1.144-1.674 1.616-3.298 1.634-3.381-.035-.013-3.179-1.22-3.218-4.852-.032-3.045 2.493-4.512 2.613-4.587-1.425-2.083-3.635-2.366-4.437-2.4-1.905-.183-3.805 1.106-4.821 1.106-1.04 0-2.585-1.053-4.137-1.053zM15.485 3.32c.844-1.022 1.411-2.441 1.256-3.856-1.218.049-2.709.811-3.58 1.861-.784.93-1.418 2.378-1.233 3.766 1.365.105 2.716-.748 3.557-1.77z"/>
                    </svg>
                  )}
                  Continue with Apple
                </button>

                {/* Facebook Button */}
                <button
                  onClick={() => handleOAuthLogin('facebook')}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#1877F2] text-white hover:bg-[#1877F2]/90 font-medium transition-colors disabled:opacity-50"
                >
                  {loadingProvider === 'facebook' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.394.995-.394 1.724v2.009h3.82l-.52 3.667h-3.3v7.98h-4.333Z"/>
                    </svg>
                  )}
                  Continue with Facebook
                </button>
              </div>

              {errorMsg && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                  <p className="text-red-400 text-xs">{errorMsg}</p>
                </div>
              )}

              <div className="mt-8 text-center space-y-4">
                <button
                  onClick={() => handleOAuthLogin('demo')}
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  Skip authentication & use Demo Login
                </button>
                <p className="text-xs text-slate-500">
                  By signing in, you agree to NovaTech's Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
