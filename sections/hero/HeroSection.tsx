"use client";

import dynamic from "next/dynamic";
import React from "react";
import { HeroContent } from "@/components/ui/HeroContent";
import { WallLoader } from "@/components/visual/WallLoader";
import { SplitHeroLayout } from "@/layouts/hero/SplitHeroLayout";

// 3D Geometric Wall Background
const GeometricWallCanvas = dynamic(
  () => import("@/components/visual/GeometricWallCanvas"),
  { ssr: false, loading: () => <WallLoader /> }
);

export function HeroSection() {
  return (
    <SplitHeroLayout
      background={<GeometricWallCanvas />}
      content={<HeroContent />}
    />
  );
}
