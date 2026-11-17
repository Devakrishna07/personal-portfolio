"use client";

import React, { useState, useEffect } from "react";
import { AboutImageFrame, AboutContent } from "@/components/about";
import { getPortfolioContent } from "@/lib/portfolio/service";
import { DEFAULT_PORTFOLIO_CONTENT } from "@/lib/portfolio/types";

export function AboutSection() {
  const [data, setData] = useState(DEFAULT_PORTFOLIO_CONTENT);

  useEffect(() => {
    async function loadData() {
      const liveData = await getPortfolioContent();
      setData(liveData);
    }
    loadData();
  }, []);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 lg:px-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Main Content: Responsive 2-Column Layout */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
        {/* Left (or Top on mobile): Framed Image */}
        <div className="w-full lg:w-5/12 flex items-center justify-center">
          <AboutImageFrame
            image={data.about_image}
            name={data.about_name}
            imageFit={data.about_image_fit}
            imagePosition={data.about_image_position}
          />
        </div>

        {/* Right (or Bottom on mobile): Pure Foreground Typography */}
        <div className="w-full lg:w-7/12 flex items-center justify-center">
          <AboutContent data={data} />
        </div>
      </div>
    </section>
  );
}
