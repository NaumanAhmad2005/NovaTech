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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClient();

  const handleEmailAuth = async (type: 'login' | 'signup') => {
    setLoadingProvider(type);
    setErrorMsg(null);
    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        if (error) throw error;
        setErrorMsg("Success! Please check your email for a confirmation link.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        // On success, redirect to portal
        window.location.href = "/portal";
      }
    } catch (error: any) {
      console.error('Error with email auth:', error);
      setErrorMsg(error.message || "Authentication failed.");
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'demo') => {
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
          throw new Error("Google OAuth is not configured on your Supabase backend yet.");
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

              <div className="space-y-4">
                {/* Email / Password Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEmailAuth('login');
                  }} 
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-9 pr-3 py-2.5 border border-white/10 rounded-xl bg-black/30 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-3 py-2.5 border border-white/10 rounded-xl bg-black/30 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loadingProvider !== null}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-medium transition-colors text-sm flex justify-center items-center h-[44px]"
                    >
                      {loadingProvider === 'login' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEmailAuth('signup')}
                      disabled={loadingProvider !== null}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-2.5 rounded-xl font-medium transition-colors text-sm flex justify-center items-center h-[44px]"
                    >
                      {loadingProvider === 'signup' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
                    </button>
                  </div>
                </form>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-[#0F172A] text-xs text-slate-500">Or continue with</span>
                  </div>
                </div>

                {/* Google Button */}
                <button
                  onClick={() => handleOAuthLogin('google')}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-medium transition-colors disabled:opacity-50"
                >
                  {loadingProvider === 'google' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  Google
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
