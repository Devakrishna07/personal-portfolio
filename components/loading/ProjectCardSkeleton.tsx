import React from "react";

export function ProjectCardSkeleton() {
  return (
    <div className="relative rounded-2xl bg-[#080808] border border-neutral-800/80 p-6 flex flex-col justify-between overflow-hidden shadow-xl">
      {/* Subtle pulsing background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-950/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

      <div>
        {/* Top bar: index badge & image box */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="h-5 w-16 bg-neutral-900 border border-neutral-800/80 rounded animate-pulse" />
          <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 animate-pulse shrink-0" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-neutral-900 rounded mb-3 animate-pulse" />

        {/* Description lines */}
        <div className="space-y-2 mb-6">
          <div className="h-3 w-full bg-neutral-900/80 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-neutral-900/80 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-neutral-900/60 rounded animate-pulse" />
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <div className="h-4 w-12 bg-neutral-900 rounded animate-pulse" />
          <div className="h-4 w-16 bg-neutral-900 rounded animate-pulse" />
          <div className="h-4 w-14 bg-neutral-900 rounded animate-pulse" />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-neutral-900/80 flex items-center justify-between">
        <div className="h-3 w-20 bg-neutral-900 rounded animate-pulse" />
        <div className="h-6 w-16 bg-neutral-900 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}
