"use client";

import React from "react";

export function WallLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#07080a] pointer-events-none">
      <div className="relative flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-lg border border-red-500/30 border-t-red-500 animate-spin" />
        <span className="text-xs tracking-widest text-red-500/60 uppercase font-mono animate-pulse">
          Initializing Grid...
        </span>
      </div>
    </div>
  );
}

