import React from "react";

export function ProjectEmptyState() {
  return (
    <div className="w-full max-w-xl mx-auto py-16 px-6 rounded-2xl bg-[#080808] border border-neutral-800/80 text-center flex flex-col items-center shadow-xl">
      <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-4 shadow-sm shadow-red-500/10">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      </div>

      <h3 className="text-base font-bold text-white mb-2 font-sans tracking-tight">
        No Projects Published Yet
      </h3>
      <p className="text-xs text-neutral-400 font-mono leading-relaxed max-w-md">
        Projects are currently undergoing curation and will appear dynamically once deployed to the backend.
      </p>
    </div>
  );
}
