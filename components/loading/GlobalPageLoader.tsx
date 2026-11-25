import React from "react";

export function GlobalPageLoader({ label = "INITIALIZING PORTFOLIO ENGINE..." }: { label?: string }) {
  return (
    <div className="min-h-screen w-full bg-[#000000] text-neutral-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient crimson glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Futuristic Spinner Box */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl border border-red-500/20 animate-ping" />
          <div className="w-12 h-12 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-center shadow-lg shadow-red-500/10">
            <div className="w-5 h-5 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono text-neutral-300 tracking-wider">
              {label}
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-600">
            CONNECTING TO DEPLOYED SERVICES & DATA GRAPH
          </span>
        </div>
      </div>
    </div>
  );
}
