"use client";

import React from "react";
import { AboutImageFrame, AboutContent } from "@/components/about";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 lg:px-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Main Content: Responsive 2-Column Layout */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
        {/* Left (or Top on mobile): Framed Image */}
        <div className="w-full lg:w-5/12 flex items-center justify-center">
          <AboutImageFrame />
        </div>

        {/* Right (or Bottom on mobile): Pure Foreground Typography directly on 3D canvas */}
        <div className="w-full lg:w-7/12 flex items-center justify-center">
          <AboutContent />
        </div>
      </div>
    </section>
  );
}
