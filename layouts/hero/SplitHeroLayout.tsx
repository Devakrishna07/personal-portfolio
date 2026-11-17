"use client";

import React from "react";
import Image from "next/image";

interface SplitHeroLayoutProps {
  background: React.ReactNode;
  content: React.ReactNode;
}

export function SplitHeroLayout({
  background,
  content,
}: SplitHeroLayoutProps) {
  return (
    <section
      id="home"
      className="relative w-dvw h-dvh min-h-dvh max-w-dvw overflow-hidden bg-[#07080a] flex items-center justify-between"
    >
      {/* 3D Geometric Wall Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {background}
      </div>

      {/* Main Foreground Layout */}
      <div className="relative z-10 w-dvw h-dvh min-h-dvh flex flex-col lg:flex-row items-center justify-between pointer-events-none">
        {/* Right Side: Exactly 50% width on desktop, 0 margin, fully scaled image */}
        <div className="order-1 lg:order-2 w-dvw lg:w-1/2 h-[50dvh] sm:h-[56dvh] lg:h-dvh m-0 p-0 flex items-end justify-center lg:justify-end relative pointer-events-none select-none">
          <div className="relative w-full h-full flex items-end justify-center lg:justify-end">
            <Image
              src="/deva-mood.png"
              alt="Deva Prasad NR"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-bottom lg:object-right-bottom scale-105 lg:scale-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter contrast-[1.05] brightness-[1.02]"
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
