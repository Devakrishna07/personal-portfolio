"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSequentialGlitchText } from "@/hooks/animation/useSequentialGlitchText";
import { useGlitchText } from "@/hooks/animation/useGlitchText";
import { aboutConfig } from "@/config/about";

const ROLES = ["Developer", "Designer", "Creator", "Engineer"];

export function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Sequential reveal for "Who Am I ?"
  const { displayText: whoAmIText } = useSequentialGlitchText(
    ["Who", "Am", "I", "?"],
    isInView
  );

  // Glitching role cycle for "A [Developer, Designer, Creator, Engineer]"
  const { displayText: activeRole, isGlitching: isRoleGlitching } = useGlitchText(
    ROLES,
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
      {/* 1. Who am I ? (Sequential Glitch Effect) */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-red-500 font-mono font-semibold tracking-wider text-base sm:text-lg drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
          {whoAmIText || "Who Am I ?"}
        </span>
      </div>

      {/* 2. Main Headline: I am Deva Prasad NR , A [Developer, Designer, Creator, Engineer] */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-5 leading-snug">
        I am {aboutConfig.name}, A{" "}
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

      {/* 3. Short introduction in ~160 words */}
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
        I am a passionate software engineer and creative technologist dedicated to crafting
        high-performance web applications and immersive digital experiences. With a deep foundation
        in modern full-stack development, I specialize in translating complex architectural
        challenges into clean, modular, and maintainable software systems. My technical expertise spans
        the entire React and Next.js ecosystem, robust backend engineering, and interactive 3D WebGL
        visualizations with Three.js. I thrive at the intersection of functional programming, fluid motion
        design, and systems architecture—always prioritizing pixel perfection, accessibility, and optimal
        performance metrics. Whether architecting scalable cloud solutions, designing intuitive user
        journeys, or optimizing rendering pipelines for seamless 60fps animations, I approach every project
        with relentless curiosity and engineering discipline. Beyond writing code, I love collaborating with
        cross-functional teams, exploring cutting-edge web technologies, and contributing to open-source
        innovations that make the modern web faster, more dynamic, and visually engaging for everyone.
      </p>

      {/* 4. Subtle Reference Divider */}
      <div className="w-full h-px bg-slate-800/80 mb-6" />

      {/* 5. Quick Info Grid (Matching reference image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm mb-8">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Name:</span>
          <span className="text-white font-medium">{aboutConfig.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">From:</span>
          <span className="text-white font-medium">Karnataka, India</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Role:</span>
          <span className="text-red-400 font-medium">Full Stack & Creative Dev</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Email:</span>
          <a
            href="mailto:contact@devaprasad.com"
            className="text-white hover:text-red-400 transition-colors font-medium truncate"
          >
            devaprasadnr@gmail.com
          </a>
        </div>
      </div>

      {/* 6. Action Button: Download CV */}
      <div>
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
      </div>
    </motion.div>
  );
}
