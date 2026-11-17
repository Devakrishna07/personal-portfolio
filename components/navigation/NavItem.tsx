"use client";

import React from "react";
import Link from "next/link";
import { NavItemConfig } from "@/config/navigation";

interface NavItemProps {
  item: NavItemConfig;
  onClick?: () => void;
  className?: string;
}

export function NavItem({ item, onClick, className = "" }: NavItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      target={item.isExternal ? "_blank" : undefined}
      rel={item.isExternal ? "noopener noreferrer" : undefined}
      className={`group relative px-4 py-2 text-sm font-medium tracking-wide text-neutral-300 transition-all duration-300 hover:text-white rounded-full ${className}`}
    >
      {/* Background soft red glow on hover */}
      <span className="absolute inset-0 rounded-full bg-red-500/0 opacity-0 blur-sm transition-all duration-300 group-hover:bg-red-500/15 group-hover:opacity-100" />
      
      {/* Red ambient border highlight on hover */}
      <span className="absolute inset-0 rounded-full border border-red-500/0 transition-all duration-300 group-hover:border-red-500/30 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.35)]" />

      {/* Label with drop shadow text glow */}
      <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]">
        {item.label}
      </span>
    </Link>
  );
}
