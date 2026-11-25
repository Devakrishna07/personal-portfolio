"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroContent } from "@/components/ui/HeroContent";
import { WallLoader } from "@/components/visual/WallLoader";
import { SplitHeroLayout } from "@/layouts/hero/SplitHeroLayout";
import { getPortfolioContent } from "@/lib/portfolio/service";
import { DEFAULT_PORTFOLIO_CONTENT } from "@/lib/portfolio/types";

// 3D Geometric Wall Background
const GeometricWallCanvas = dynamic(
  () => import("@/components/visual/GeometricWallCanvas"),
  { ssr: false, loading: () => <WallLoader /> }
);

interface HeroSectionProps {
  showBackground?: boolean;
  initialData?: typeof DEFAULT_PORTFOLIO_CONTENT;
}

export function HeroSection({
  showBackground = false,
  initialData = DEFAULT_PORTFOLIO_CONTENT,
}: HeroSectionProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    async function fetchContent() {
      const liveData = await getPortfolioContent();
      if (liveData) {
        setData(liveData);
      }
    }
    fetchContent();
  }, []);

  return (
    <SplitHeroLayout
      background={showBackground ? <GeometricWallCanvas /> : undefined}
      image={data.hero_image}
      imageFit={data.hero_image_fit}
      imagePosition={data.hero_image_position}
      imageScale={data.hero_image_scale}
      focalX={data.hero_image_focal_x}
      focalY={data.hero_image_focal_y}
      content={<HeroContent name={data.hero_name} roles={data.hero_roles} />}
    />
  );
}
