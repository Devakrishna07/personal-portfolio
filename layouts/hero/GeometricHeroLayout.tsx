"use client";

import React from "react";

interface GeometricHeroLayoutProps {
  background: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function GeometricHeroLayout({
  background,
  children,
  className = "",
}: GeometricHeroLayoutProps) {
  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden bg-[#08090b] ${className}`}
    >
      {/* 3D WebGL Background Layer */}
      <div className="absolute inset-0 z-0">{background}</div>

      {/* Foreground Content Layer */}
      {children && (
        <div className="relative z-10 w-full min-h-screen pointer-events-none flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

