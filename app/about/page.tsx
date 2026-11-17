"use client";

import React from "react";
import dynamic from "next/dynamic";
import { WallLoader } from "@/components/visual/WallLoader";
import { AboutSection } from "@/sections/about";

const GeometricWallCanvas = dynamic(
  () => import("@/components/visual/GeometricWallCanvas"),
  { ssr: false, loading: () => <WallLoader /> }
);

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#07080a] text-slate-100 overflow-x-hidden pt-20">
      {/* 3D Persistent Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <GeometricWallCanvas />
      </div>

      {/* Foreground About Section */}
      <div className="relative z-10">
        <AboutSection />
      </div>
    </main>
  );
}
