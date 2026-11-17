"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface AdminDashboardOverviewProps {
  userEmail?: string;
}

export function AdminDashboardOverview({ userEmail }: AdminDashboardOverviewProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/adminlogin");
      router.refresh();
    } catch {
      router.push("/adminlogin");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-neutral-400">AUTHENTICATED // ADMIN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Portfolio Management Dashboard
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Logged in as: <span className="text-neutral-200">{userEmail || "Admin User"}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-mono transition-colors"
          >
            View Live Site
          </Link>
          <button
            onClick={handleSignOut}
            disabled={loggingOut}
            className="px-4 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/40 border border-red-800/60 text-red-400 hover:text-red-300 text-xs font-mono transition-colors cursor-pointer"
          >
            {loggingOut ? "Signing Out..." : "Sign Out"}
          </button>
        </div>
      </div>

      {/* Dynamic Content Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="rounded-xl bg-[#080808] border border-neutral-800 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white">About Me Content</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Update biography, roles, contact details, and custom uploaded portrait image.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-900">
            <span className="text-xs font-mono text-neutral-500">Database connected</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#080808] border border-neutral-800 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white">Experience & Roles</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Add new career milestones, companies, dates, logos, and contribution bullet points.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-900">
            <span className="text-xs font-mono text-neutral-500">Database connected</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#080808] border border-neutral-800 p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white">Certifications & Education</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Manage degrees, CGPA/marks, verified certificates, and credentials.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-900">
            <span className="text-xs font-mono text-neutral-500">Database connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
