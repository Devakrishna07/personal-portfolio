"use client";

import dynamic from "next/dynamic";
import { WallLoader } from "@/components/visual/WallLoader";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { PortfolioContent } from "@/lib/portfolio/types";

// 3D Geometric Wall Background loaded dynamically
const GeometricWallCanvas = dynamic(
  () => import("@/components/visual/GeometricWallCanvas"),
  { ssr: false, loading: () => <WallLoader /> }
);

interface PortfolioHomeClientProps {
  initialData: PortfolioContent;
}

export function PortfolioHomeClient({ initialData }: PortfolioHomeClientProps) {
  return (
    <main className="relative min-h-screen bg-[#07080a] text-slate-100 overflow-x-hidden">
      {/* Persistent 3D Geometric Wall Canvas fixed across Hero & About */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <GeometricWallCanvas />
      </div>

      {/* Foreground Scrollable Sections */}
      <div className="relative z-10">
        <HeroSection initialData={initialData} />
        <AboutSection initialData={initialData} />
      </div>
    </main>
  );
}
