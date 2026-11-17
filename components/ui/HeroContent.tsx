"use client";

import React from "react";
import { useGlitchText } from "@/hooks/animation/useGlitchText";

const DEFAULT_ROLES = ["Developer", "Creator", "DevOps Engineer"];

interface HeroContentProps {
  name?: string;
  roles?: string[];
}

export function HeroContent({
  name = "Deva Prasad NR",
  roles = DEFAULT_ROLES,
}: HeroContentProps) {
  const activeRoles = roles && roles.length > 0 ? roles : DEFAULT_ROLES;
  const { displayText, isGlitching } = useGlitchText(activeRoles, 2000);

  return (
    <div className="flex flex-col items-start justify-center max-w-2xl text-left select-none z-20 pointer-events-auto font-sans">
      {/* Line 1: Hello */}
      <span className="text-xl sm:text-2xl lg:text-3xl font-light text-white/80 tracking-tight mb-1">
        Hello
      </span>

      {/* Line 2: I am */}
      <span className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white/90 tracking-tight mb-2">
        I am
      </span>

      {/* Line 3: Name */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-md">
        {name}
      </h1>

      {/* Line 4: A Developer (with Glitch Loop) */}
      <div className="flex items-baseline gap-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-red-500 mb-10">
        <span className="text-white/80 font-medium">A</span>
        <span
          className={`font-mono transition-all duration-75 inline-block ${
            isGlitching
              ? "text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)] scale-105"
              : "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
          }`}
        >
          {displayText}
        </span>
      </div>

      {/* Minimalist "View My Work" with Hand-drawn Underline */}
      <div className="group inline-flex flex-col items-start cursor-pointer">
        <a
          href="#projects"
          className="text-xl sm:text-2xl font-bold text-white tracking-tight transition-opacity duration-200 group-hover:opacity-85"
        >
          View My Work
        </a>
        <svg
          className="w-36 sm:w-44 h-4 mt-1.5 text-white/80 transition-transform duration-300 ease-out group-hover:scale-105"
          viewBox="0 0 160 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 13C30 5 95 3 158 11"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
