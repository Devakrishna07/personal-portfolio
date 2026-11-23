"use client";

import React from "react";
import { Project } from "@/lib/portfolio/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectPaginationDots } from "./ProjectPaginationDots";
import { useProjectsCarousel } from "@/hooks/ui/useProjectsCarousel";

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const {
    currentIndex,
    visibleCount,
    goTo,
    containerProps,
  } = useProjectsCarousel({
    totalItems: projects.length,
    intervalMs: 6000,
  });

  if (!projects || projects.length === 0) {
    return null;
  }

  // Calculate percentage offset per project step
  // When visibleCount = 3, each card is 33.333%, so 1 item step = (100 / visibleCount)%
  // To avoid leaving empty space at the end of sliding list:
  const maxSafeOffset = Math.max(0, projects.length - visibleCount);
  const effectiveIndex = Math.min(currentIndex, maxSafeOffset);
  const translatePercent = (effectiveIndex * (100 / visibleCount));

  return (
    <div className="w-full relative select-none">
      {/* Swipeable & Draggable Viewport */}
      <div
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing px-1 py-4"
        {...containerProps}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${translatePercent}%)`,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="shrink-0 px-2 sm:px-3"
              style={{
                width: `${100 / visibleCount}%`,
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <ProjectPaginationDots
        total={projects.length}
        current={currentIndex}
        onSelect={goTo}
      />
    </div>
  );
}
