"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setErrorMessage(
            "Email not confirmed yet. Please confirm your email in your inbox, or click 'Confirm user' in your Supabase Dashboard under Authentication -> Users."
          );
        } else if (
          process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder") ||
          error.message.includes("Failed to fetch")
        ) {
          setErrorMessage(
            "Supabase credentials needed. Please configure your NEXT_PUBLIC_SUPABASE_URL and KEY in .env.local"
          );
        } else {
          setErrorMessage(error.message);
        }
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Minimalist Pure Black Box with Crisp Border */}
      <div className="relative rounded-2xl bg-[#050505] border border-neutral-800 p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 mb-4 text-red-500">
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100 font-sans">
            Admin Portal
          </h1>
          <p className="mt-1.5 text-xs text-neutral-500 font-mono">
            SECURE ACCESS // PORTFOLIO CMS
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-6 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300 leading-relaxed font-mono">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@devaprasad.com"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm placeholder-neutral-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider mb-2">
              Master Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm placeholder-neutral-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-[0_4px_16px_rgba(239,68,68,0.25)]"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-neutral-900 text-center">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-300 font-mono transition-colors inline-flex items-center gap-1.5"
          >
            <span>←</span> Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
