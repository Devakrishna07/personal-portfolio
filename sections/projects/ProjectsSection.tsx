"use client";

import React, { useState, useEffect } from "react";
import { ProjectCarousel } from "@/components/projects";
import { Project, DEFAULT_PROJECTS } from "@/lib/portfolio/types";
import { getProjects } from "@/lib/portfolio/service";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProjectsSectionProps {
  initialProjects?: Project[];
}

export function ProjectsSection({
  initialProjects = DEFAULT_PROJECTS,
}: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        if (isMounted && data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
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

        {/* Carousel Container */}
        <div className="w-full">
          {projects.length > 0 ? (
            <ProjectCarousel projects={projects} />
          ) : (
            <div className="text-center py-16 text-slate-500 font-mono text-sm">
              {loading ? "Loading projects..." : "No projects found."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
