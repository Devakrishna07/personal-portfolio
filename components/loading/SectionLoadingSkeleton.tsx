import React from "react";

export function SectionLoadingSkeleton({ title }: { title?: string }) {
  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-8">
      {title && (
        <div className="flex items-center gap-3 mb-10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            LOADING {title}...
          </span>
        </div>
      )}

      <div className="w-full h-64 rounded-2xl bg-[#080808] border border-neutral-800/80 p-8 flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-950/10 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
        
        <div className="w-10 h-10 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin mb-4" />
        <p className="text-xs font-mono text-neutral-500">
          SYNCHRONIZING WITH SUPABASE REPOSITORY...
        </p>
      </div>
    </div>
  );
}
