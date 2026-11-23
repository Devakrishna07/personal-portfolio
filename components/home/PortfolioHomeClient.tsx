"use client";

import dynamic from "next/dynamic";
import { WallLoader } from "@/components/visual/WallLoader";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { ProjectsSection } from "@/sections/projects";
import { PortfolioContent } from "@/lib/portfolio/types";

// 3D Crimson Particle Background & Top-Left Logo Morph
const CrimsonParticleBackground = dynamic(
  () =>
    import("@/components/visual/CrimsonParticleBackground").then(
      (mod) => mod.CrimsonParticleBackground
    ),
  { ssr: false, loading: () => <WallLoader /> }
);

interface PortfolioHomeClientProps {
  initialData: PortfolioContent;
}

export function PortfolioHomeClient({ initialData }: PortfolioHomeClientProps) {
  return (
    <main className="relative min-h-screen bg-black text-slate-100 overflow-x-hidden">
      {/* 3D Crimson WebGL Background & Top-Left Particle Logo fixed behind UI */}
      <CrimsonParticleBackground />

      {/* Foreground Scrollable Sections */}
      <div className="relative z-10">
        <HeroSection initialData={initialData} />
        <AboutSection initialData={initialData} />
        <ProjectsSection />
      </div>
    </main>
  );
}
