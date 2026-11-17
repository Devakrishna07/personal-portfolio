"use client";

import React from "react";

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

export function HamburgerButton({
  isOpen,
  onToggle,
  ariaLabel = "Toggle navigation menu",
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      className="relative flex h-10 w-10 flex-col items-center justify-center rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl p-2 transition-all duration-300 hover:border-red-500/50 hover:bg-white/[0.15] hover:shadow-[0_0_15px_rgba(239,68,68,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <span
        className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
          isOpen ? "translate-y-1.5 rotate-45 bg-red-400" : ""
        }`}
      />
      <span
        className={`my-1 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
          isOpen ? "-translate-y-1.5 -rotate-45 bg-red-400" : ""
        }`}
      />
    </button>
  );
}
