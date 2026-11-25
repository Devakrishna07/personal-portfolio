"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Project } from "@/lib/portfolio/types";
import { getProjects } from "@/lib/portfolio/service";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectEmptyState } from "@/components/projects/ProjectEmptyState";
import { ProjectsGridSkeleton } from "@/components/loading/ProjectCardSkeleton";

// Dynamically lazy-load the interactive carousel with futuristic skeleton fallback
const ProjectCarousel = dynamic(
  () => import("@/components/projects").then((mod) => mod.ProjectCarousel),
  {
    ssr: false,
    loading: () => <ProjectsGridSkeleton count={3} />,
  }
);

interface ProjectsSectionProps {
  initialProjects?: Project[];
}

export function ProjectsSection({ initialProjects = [] }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        if (isMounted) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to load projects from backend API:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadLiveProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full py-24 px-4 sm:px-8 lg:px-16 flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        {/* Section Heading: Placed on the top-left of the section */}
        <div className="flex flex-col items-start mb-10 sm:mb-14">
          <SectionHeading title="My Projects" />
        </div>

        {/* Content Area with Lazy Loading / Skeletons / Empty State */}
        {loading ? (
          <ProjectsGridSkeleton count={3} />
        ) : projects.length === 0 ? (
          <ProjectEmptyState />
        ) : (
          <ProjectCarousel projects={projects} />
        )}
      </div>
    </section>
  );
}
