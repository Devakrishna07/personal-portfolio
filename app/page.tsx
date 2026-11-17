"use client";

import dynamic from "next/dynamic";
import { WallLoader } from "@/components/visual/WallLoader";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";

// 3D Geometric Wall Background loaded dynamically
const GeometricWallCanvas = dynamic(
  () => import("@/components/visual/GeometricWallCanvas"),
  { ssr: false, loading: () => <WallLoader /> }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#07080a] text-slate-100 overflow-x-hidden">
      {/* Persistent 3D Geometric Wall Canvas fixed across Hero & About */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <GeometricWallCanvas />
      </div>

      {/* Foreground Scrollable Sections */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
      </div>
    </main>
  );
}
