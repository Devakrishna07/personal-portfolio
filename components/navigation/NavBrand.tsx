"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavBrandProps {
  href?: string;
  className?: string;
}

export function NavBrand({ href = "#home", className = "" }: NavBrandProps) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-2 focus:outline-none select-none ${className}`}
      aria-label="Home"
    >
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Image
          src="/images/nav-logo.png"
          alt="Brand Emblem"
          width={36}
          height={36}
          priority
          className="object-contain w-full h-full drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(239,68,68,0.95)]"
        />
      </div>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_10px_#ef4444]" />
    </Link>
  );
}
