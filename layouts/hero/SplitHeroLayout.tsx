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
    <section className="relative w-full min-h-screen overflow-x-hidden bg-[#07080a] flex items-center justify-between">
      {/* 3D Geometric Wall Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {background}
      </div>

      {/* Main Foreground Layout */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between pointer-events-none">
        {/* Image Container:
            - flex items-center justify-center in all cases
            - Mobile & Tablet: w-screen with no explicit height specified
            - Desktop (lg:): w-[40%] and h-screen
        */}
        <div className="order-1 lg:order-2 w-screen lg:w-[50%] lg:h-screen flex items-center justify-center relative pointer-events-none select-none mt-[12px] lg:mt-0 px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-center">
            <Image
              src="/deva-closeup.png"
              alt="Deva Prasad NR"
              width={1200}
              height={1200}
              priority
              className="w-auto sm:max-w-[90dvw] lg:max-w-none max-h-[50vh] sm:max-h-[60dvh] lg:max-h-[calc(100vh-10px)] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter contrast-[1.05] brightness-[1.03]"
            />
          </div>
        </div>

        {/* Text Content:
            - Mobile & Tablet: Below image (order-2)
            - Desktop: Left side w-[60%] (lg:order-1)
        */}
        <div className="order-2 lg:order-1 w-full lg:w-[50%] px-6 sm:px-12 lg:pl-16 xl:pl-24 pt-6 sm:pt-8 lg:pt-0 pb-16 lg:pb-0 flex flex-col justify-center pointer-events-auto">
          {content}
        </div>
      </div>
    </section>
  );
}
