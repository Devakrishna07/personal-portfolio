"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { signInAdmin, AuthState } from "@/actions/auth";

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    signInAdmin,
    null
  );

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
            SECURE COOKIE SESSION // PORTFOLIO CMS
          </p>
        </div>

        {/* Error notification */}
        {state?.error && (
          <div className="mb-6 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300 leading-relaxed font-mono">
            {state.error}
          </div>
        )}

        {/* Login Form using Server Action */}
        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue="dprasadnr@gmail.com"
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
              name="password"
              required
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm placeholder-neutral-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-[0_4px_16px_rgba(239,68,68,0.25)]"
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Creating Session...</span>
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
