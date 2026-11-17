"use client";

import React from "react";
import { AboutImageFrame, GlassTabContainer } from "@/components/about";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-20 px-4 sm:px-8 lg:px-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Section Header (without "Know More" badge) */}
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            Me
          </span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          My professional background, technical education, and industry-recognized certifications.
        </p>
      </div>

      {/* Main Content: Responsive Split Layout */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
        {/* Left (or Top on mobile): Framed Image with red glow & floating animation */}
        <div className="w-full lg:w-5/12 flex items-center justify-center">
          <AboutImageFrame />
        </div>

        {/* Right (or Bottom on mobile): Frosted Glass Tab Container with red theme */}
        <div className="w-full lg:w-7/12 flex items-center justify-center">
          <GlassTabContainer />
        </div>
      </div>
    </section>
  );
}
