"use client";

import React from "react";
import Link from "next/link";

interface NavBrandProps {
  href?: string;
  name?: string;
}

export function NavBrand({ href = "#home", name = "Deva" }: NavBrandProps) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-1.5 focus:outline-none"
    >
      <span className="font-mono text-xl sm:text-2xl font-black tracking-wider uppercase text-white transition-all duration-300 group-hover:text-red-500 group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]">
        {name}
      </span>
      <span className="inline-block w-2 h-2 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_10px_#ef4444]" />
    </Link>
  );
}
