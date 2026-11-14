"use client";

import dynamic from "next/dynamic";
import React from "react";
import { WallLoader } from "@/components/visual/WallLoader";
import { GeometricHeroLayout } from "@/layouts/hero/GeometricHeroLayout";

// High-Performance Lazy Loading: Load Three.js client-side only with dark skeleton loader
const GeometricWallCanvas = dynamic(
  () => import("@/components/visual/GeometricWallCanvas"),
  {
    ssr: false,
    loading: () => <WallLoader />,
  }
);

interface GeometricWallSectionProps {
  title?: string;
  subtitle?: string;
}

export function GeometricWallSection({
  title = "PORTFOLIO",
  subtitle = "Hover & Click To Interact With The 3D Grid",
}: GeometricWallSectionProps) {
  return (
    <GeometricHeroLayout background={<GeometricWallCanvas />}>
      <div className="text-center px-4 max-w-3xl select-none">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-white/90 drop-shadow-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-xs md:text-sm font-semibold text-red-500/80 tracking-[0.3em] uppercase">
            {subtitle}
          </p>
        )}
      </div>
    </GeometricHeroLayout>
  );
}

