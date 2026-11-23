import React from "react";
import Image from "next/image";
import { Project } from "@/lib/portfolio/types";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function CodeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = Boolean(project.image_url && project.image_url.trim() !== "");

  return (
    <article className="group relative flex flex-col justify-between min-h-[360px] sm:min-h-[390px] h-full w-full rounded-3xl p-7 sm:p-8 bg-white/[0.07] backdrop-blur-2xl border border-white/20 hover:border-crimson-400/50 transition-all duration-300 shadow-[0_16px_40px_0_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_20px_50px_0_rgba(225,29,72,0.22),inset_0_1px_2px_0_rgba(255,255,255,0.35)] overflow-hidden">
      {/* Milky frosted glass ambient shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-white/[0.06] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Decorative subtle ambient crimson gradient */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-crimson-600/15 rounded-full blur-3xl group-hover:bg-crimson-500/25 transition-all duration-500" />

      {/* Top Header Section: Title & Right-Top Thumbnail */}
      <div className="relative z-10 flex items-start justify-between gap-5 mb-5">
        {/* Left header details */}
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-crimson-200 transition-colors duration-200 line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Right-Top Image / Glassmorphic Code Icon Frame */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border border-white/25 bg-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center group-hover:border-crimson-400/60 transition-all duration-300">
          {hasImage ? (
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              sizes="96px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-white/20 via-white/5 to-crimson-500/15 text-crimson-400 group-hover:text-crimson-300 transition-colors duration-300">
              <CodeIcon className="w-8 h-8 drop-shadow-[0_0_10px_rgba(244,63,94,0.7)]" />
            </div>
          )}
        </div>
      </div>

      {/* Middle Description */}
      <div className="relative z-10 flex-1 mb-6">
        <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed line-clamp-4 font-normal">
          {project.description}
        </p>

        {/* Tag List without square border boxes */}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono font-medium text-slate-300/80 group-hover:text-white transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer: External Links */}
      <div className="relative z-10 pt-5 border-t border-white/15 flex items-center justify-between gap-3">
        <span className="text-xs sm:text-sm font-mono text-slate-300/70">Explore</span>
        <div className="flex items-center gap-2.5">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-slate-200 hover:text-white transition-all duration-200 shadow-sm"
              title="View Source on GitHub"
              aria-label="View Source on GitHub"
            >
              <GithubIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-crimson-500/20 hover:bg-crimson-500/35 border border-crimson-400/40 hover:border-crimson-400/70 text-crimson-200 hover:text-white transition-all duration-200 shadow-sm"
              title="View Live Application"
              aria-label="View Live Application"
            >
              <ExternalLinkIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
