"use client";

import React, { useEffect } from "react";
import { NavItemConfig } from "@/config/navigation";
import { NavItem } from "./NavItem";
import { useScrollLock } from "@/hooks/ui/useScrollLock";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: readonly NavItemConfig[];
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  items,
}: MobileNavDrawerProps) {
  // Lock scroll when drawer is open
  useScrollLock(isOpen);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Frosted Backdrop overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-over Drawer Panel with Ultra-Frost Milky Glass */}
      <aside
        className={`absolute top-0 right-0 h-full w-[80vw] max-w-sm border-l border-white/20 bg-[#0a0d14]/75 backdrop-blur-2xl backdrop-saturate-150 p-6 sm:p-8 flex flex-col justify-between shadow-[-15px_0_40px_rgba(0,0,0,0.7),inset_1px_0_1px_0_rgba(255,255,255,0.15)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Header inside drawer */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-wider text-white">
                Deva
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </div>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-neutral-200 transition-all hover:border-red-500/50 hover:bg-white/[0.15] hover:text-white hover:shadow-[0_0_12px_rgba(239,68,68,0.4)]"
            >
              ✕
            </button>
          </div>

          {/* Links list */}
          <nav className="flex flex-col gap-3">
            {items.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                onClick={onClose}
                className="w-full text-base py-3 px-4 border border-white/5 bg-white/[0.03] hover:border-red-500/30 hover:bg-white/[0.08]"
              />
            ))}
          </nav>
        </div>

        {/* Footer info inside drawer */}
        <div className="border-t border-white/15 pt-4 text-xs text-neutral-400 font-mono">
          <p>© 2026 Deva Prasad</p>
        </div>
      </aside>
    </div>
  );
}
