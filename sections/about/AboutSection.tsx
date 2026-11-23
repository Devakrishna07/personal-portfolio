"use client";

import React, { useState, useEffect } from "react";
import { AboutImageFrame, AboutContent } from "@/components/about";
import { getPortfolioContent } from "@/lib/portfolio/service";
import { DEFAULT_PORTFOLIO_CONTENT } from "@/lib/portfolio/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface AboutSectionProps {
  initialData?: typeof DEFAULT_PORTFOLIO_CONTENT;
}

export function AboutSection({ initialData = DEFAULT_PORTFOLIO_CONTENT }: AboutSectionProps) {
  const [data, setData] = useState(initialData);

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
      <div className="w-full max-w-7xl mx-auto flex flex-col mb-8 sm:mb-12">
        {/* Section Heading: Placed on the top-left of the about section */}
        <div className="flex flex-col items-start">
          <SectionHeading title="About Me" />
        </div>
      </div>

      {/* Main Content: Responsive 2-Column Layout */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
        {/* Left (or Top on mobile): Framed Image */}
        <div className="w-full lg:w-5/12 flex items-center justify-center">
          <AboutImageFrame
            image={data.about_image}
            name={data.about_name}
            imageFit={data.about_image_fit}
            imagePosition={data.about_image_position}
            focalX={data.about_image_focal_x}
            focalY={data.about_image_focal_y}
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
