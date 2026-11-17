"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSequentialGlitchText } from "@/hooks/animation/useSequentialGlitchText";
import { useGlitchText } from "@/hooks/animation/useGlitchText";
import { PortfolioContent, DEFAULT_PORTFOLIO_CONTENT } from "@/lib/portfolio/types";

interface AboutContentProps {
  data?: PortfolioContent;
}

export function AboutContent({ data = DEFAULT_PORTFOLIO_CONTENT }: AboutContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { displayText: whoAmIText } = useSequentialGlitchText(
    ["Who", "Am", "I", "?"],
    isInView
  );

  const activeRoles = data.about_roles && data.about_roles.length > 0 ? data.about_roles : DEFAULT_PORTFOLIO_CONTENT.about_roles;
  const { displayText: activeRole, isGlitching: isRoleGlitching } = useGlitchText(
    activeRoles,
    2200
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center text-left w-full max-w-2xl select-none"
    >
      {/* 1. Who am I ? */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-red-500 font-mono font-semibold tracking-wider text-base sm:text-lg drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
          {whoAmIText || "Who Am I ?"}
        </span>
      </div>

      {/* 2. Main Headline */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-5 leading-snug">
        I am {data.about_name || "Deva Prasad NR"}, A{" "}
        <span
          className={`font-mono text-red-500 transition-all duration-75 inline-block ${
            isRoleGlitching
              ? "text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)] scale-105"
              : "drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
          }`}
        >
          {activeRole}
        </span>
      </h3>

      {/* 3. Short introduction */}
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
        {data.about_bio || DEFAULT_PORTFOLIO_CONTENT.about_bio}
      </p>

      {/* 4. Divider */}
      <div className="w-full h-px bg-slate-800/80 mb-6" />

      {/* 5. Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm mb-8">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Name:</span>
          <span className="text-white font-medium">{data.about_name || "Deva Prasad NR"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">From:</span>
          <span className="text-white font-medium">{data.about_location || "Karnataka, India"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Role:</span>
          <span className="text-red-400 font-medium">{data.about_role_title || "Full Stack & Creative Dev"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Email:</span>
          <a
            href={`mailto:${data.about_email || "devaprasadnr@gmail.com"}`}
            className="text-white hover:text-red-400 transition-colors font-medium truncate"
          >
            {data.about_email || "devaprasadnr@gmail.com"}
          </a>
        </div>
      </div>

      {/* 6. Action Links: Download CV, LinkedIn, GitHub */}
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.35)] hover:shadow-[0_6px_25px_rgba(239,68,68,0.5)] hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Download CV</span>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>

        {data.about_linkedin && (
          <a
            href={data.about_linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/50 text-neutral-300 hover:text-white text-xs font-mono transition-all flex items-center gap-2"
          >
            <span>LinkedIn ↗</span>
          </a>
        )}

        {data.about_github && (
          <a
            href={data.about_github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/50 text-neutral-300 hover:text-white text-xs font-mono transition-all flex items-center gap-2"
          >
            <span>GitHub ↗</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
