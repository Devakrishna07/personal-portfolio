"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { aboutConfig } from "@/config/about";

interface AboutImageFrameProps {
  image?: string;
  name?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "top" | "center" | "bottom";
  focalX?: number;
  focalY?: number;
}

export function AboutImageFrame({
  image = aboutConfig.imagePath,
  name = aboutConfig.name,
  imageFit = "cover",
  imagePosition = "top",
  focalX = 50,
  focalY = 20,
}: AboutImageFrameProps) {
  const [imgSrc, setImgSrc] = useState(image);

  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  const fitClass = imageFit === "contain" ? "object-contain" : "object-cover";
  const positionClass =
    imagePosition === "bottom"
      ? "object-bottom"
      : imagePosition === "center"
      ? "object-center"
      : "object-top";

  const objectPositionStyle =
    imageFit === "cover" ? { objectPosition: `${focalX}% ${focalY}%` } : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: -70, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-[4/5] mx-auto group"
    >
      {/* Floating inner container */}
      <motion.div
        animate={{
          y: [0, -7, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-slate-900/90 backdrop-blur-2xl border border-red-500/20 shadow-2xl transition-colors duration-500 overflow-hidden flex flex-col justify-between"
      >
        {/* Subtle red corner accents */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-red-500/80 rounded-tl pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-red-500/80 rounded-tr pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-red-500/80 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-red-500/80 rounded-br pointer-events-none" />

        {/* Inner Image Container */}
        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
          <Image
            src={imgSrc}
            alt={`${name} - Full-Stack Python, Django & Frappe Developer`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 440px"
            style={objectPositionStyle}
            onError={() => setImgSrc(aboutConfig.fallbackImagePath)}
            className={`${fitClass} ${imageFit === "contain" ? positionClass : ""} opacity-100 transition-transform duration-700 ease-out group-hover:scale-105`}
            priority
          />
          {/* Subtle bottom vignette to keep name legible */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />
        </div>

        {/* Bottom Title Bar */}
        <div className="mt-2.5 px-2 py-1.5 flex items-center justify-between text-xs font-mono text-red-300">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            {name}
          </span>
          <span className="text-slate-400 text-[11px] tracking-wider">PORTFOLIO // PROFILE</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
