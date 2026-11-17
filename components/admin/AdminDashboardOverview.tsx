"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { signOutAdmin } from "@/actions/auth";

interface AdminDashboardOverviewProps {
  userEmail?: string;
}

export function AdminDashboardOverview({ userEmail }: AdminDashboardOverviewProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAdmin();
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-neutral-400">AUTHENTICATED // SECURE COOKIE SESSION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Website Content Manager
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Logged in as: <span className="text-red-400">{userEmail || "dprasadnr@gmail.com"}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-mono transition-colors"
          >
            Live Site ↗
          </Link>
          <button
            onClick={handleSignOut}
            disabled={isPending}
            className="px-4 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/40 border border-red-800/60 text-red-400 hover:text-red-300 text-xs font-mono transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Ending Session..." : "Sign Out"}
          </button>
        </div>
      </div>

      {/* Pages Section Description */}
      <div className="mt-8 mb-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
          Select Page To Edit
        </h2>
      </div>

      {/* Interactive Page Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Home Page Card */}
        <Link
          href="/admin/dashboard/home"
          className="group relative rounded-2xl bg-[#080808] border border-neutral-800 hover:border-red-500/60 hover:bg-[#0c0c0c] p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                Active
              </span>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
              Home (Hero)
            </h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Edit display name, comma-separated glitch effect roles, hero image, and scale/alignment.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-neutral-200">
            <span>Manage Content</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        {/* 2. About Me Card */}
        <Link
          href="/admin/dashboard/about"
          className="group relative rounded-2xl bg-[#080808] border border-neutral-800 hover:border-red-500/60 hover:bg-[#0c0c0c] p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                Active
              </span>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
              About Me
            </h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Update name, glitch roles, image, crop focus, location, email, LinkedIn, GitHub, and biography.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-neutral-200">
            <span>Manage Content</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>

        {/* 3. Projects Card */}
        <div className="rounded-2xl bg-[#080808]/50 border border-neutral-800/60 p-6 flex flex-col justify-between opacity-75">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                Section
              </span>
            </div>

            <h3 className="text-lg font-bold text-neutral-300">
              Projects
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Manage portfolio projects, tech stacks, live URLs, and GitHub source repository links.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Linked to #projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
