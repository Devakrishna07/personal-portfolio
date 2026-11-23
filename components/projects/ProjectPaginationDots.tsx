"use client";

import React from "react";

interface ProjectPaginationDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function ProjectPaginationDots({
  total,
  current,
  onSelect,
}: ProjectPaginationDotsProps) {
  if (total <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-8 py-2"
      aria-label="Projects pagination"
    >
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === current;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(idx)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-400 ${
              isActive
                ? "w-8 h-2.5 bg-crimson-500 shadow-[0_0_12px_rgba(244,63,94,0.9)]"
                : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to project slide ${idx + 1}`}
            aria-current={isActive ? "true" : undefined}
          />
        );
      })}
    </nav>
  );
}
