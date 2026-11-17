"use client";

import React from "react";
import Image from "next/image";

interface SplitHeroLayoutProps {
  background?: React.ReactNode;
  content: React.ReactNode;
  image?: string;
  imageFit?: "contain" | "cover";
  imagePosition?: "bottom-right" | "center" | "bottom-center" | "top";
  imageScale?: number;
}

export function SplitHeroLayout({
  background,
  content,
  image = "/deva-mood.png",
  imageFit = "contain",
  imagePosition = "bottom-right",
  imageScale = 110,
}: SplitHeroLayoutProps) {
  // Map positioning choices to Tailwind object position classes
  const positionClasses = {
    "bottom-right": "object-bottom lg:object-right-bottom justify-center lg:justify-end",
    "center": "object-center justify-center",
    "bottom-center": "object-bottom justify-center",
    "top": "object-top justify-center",
  }[imagePosition] || "object-bottom lg:object-right-bottom justify-center lg:justify-end";

  const fitClass = imageFit === "cover" ? "object-cover" : "object-contain";
  const scaleStyle = { transform: `scale(${imageScale / 100})` };

  return (
    <section
      id="home"
      className="relative w-dvw h-dvh min-h-dvh max-w-dvw overflow-hidden flex items-center justify-between"
    >
      {/* Optional 3D Geometric Wall Background if passed */}
      {background && (
        <div className="absolute inset-0 z-0 pointer-events-auto">
          {background}
        </div>
      )}

      {/* Main Foreground Layout */}
      <div className="relative z-10 w-dvw h-dvh min-h-dvh flex flex-col lg:flex-row items-center justify-between pointer-events-none">
        {/* Right Side: Exactly 50% width on desktop */}
        <div className="order-1 lg:order-2 w-dvw lg:w-1/2 h-[50dvh] sm:h-[56dvh] lg:h-dvh m-0 p-0 flex items-end justify-center lg:justify-end relative pointer-events-none select-none">
          <div className="relative w-full h-full flex items-end justify-center lg:justify-end overflow-hidden">
            <Image
              src={image}
              alt="Deva Prasad NR"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={scaleStyle}
              className={`${fitClass} ${positionClasses} drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter contrast-[1.05] brightness-[1.02] transition-all duration-300`}
            />
          </div>
        </div>

        {/* Left Side: Portfolio Typography (50% on desktop) */}
        <div className="order-2 lg:order-1 w-full lg:w-1/2 px-6 sm:px-12 lg:pl-16 xl:pl-24 pt-4 sm:pt-6 lg:pt-0 pb-12 sm:pb-16 lg:pb-0 flex flex-col justify-center pointer-events-auto">
          {content}
        </div>
      </div>
    </section>
  );
}
