"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface CropFrameSelectorProps {
  imageUrl: string;
  focalX: number;
  focalY: number;
  aspectRatioLabel?: string;
  aspectRatioClass?: string;
  onChange: (x: number, y: number) => void;
}

export function CropFrameSelector({
  imageUrl,
  focalX,
  focalY,
  aspectRatioLabel = "4:5 Portrait Frame",
  aspectRatioClass = "aspect-[4/5]",
  onChange,
}: CropFrameSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateFocalPoint = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, Math.round(((clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(0, Math.min(100, Math.round(((clientY - rect.top) / rect.height) * 100)));
    onChange(x, y);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    calculateFocalPoint(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      calculateFocalPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        calculateFocalPoint(e.clientX, e.clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        calculateFocalPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="rounded-xl bg-[#0c0c0c] border border-neutral-800 p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-neutral-800/80">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-red-400">
            Interactive Crop Frame Selector
          </span>
          <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
            Click or drag the crosshair reticle on your photo to choose which section to display.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-700/80 px-2 py-0.5 rounded">
            X: <strong className="text-red-400">{focalX}%</strong>
          </span>
          <span className="text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-700/80 px-2 py-0.5 rounded">
            Y: <strong className="text-red-400">{focalY}%</strong>
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Full Interactive Picker Canvas */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-neutral-400 block">
            1. Click on focus point (e.g. face/subject):
          </span>
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 cursor-crosshair select-none group"
          >
            {/* The full source image */}
            <Image
              src={imageUrl}
              alt="Source crop"
              fill
              sizes="380px"
              className="object-contain pointer-events-none"
              priority
            />

            {/* Crosshair lines */}
            <div
              className="absolute left-0 right-0 h-px bg-red-500/50 pointer-events-none"
              style={{ top: `${focalY}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-px bg-red-500/50 pointer-events-none"
              style={{ left: `${focalX}%` }}
            />

            {/* Glowing Focal Point Reticle */}
            <div
              className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500 bg-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.8)] pointer-events-none flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ left: `${focalX}%`, top: `${focalY}%` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-neutral-500 mr-1 self-center">Presets:</span>
            <button
              type="button"
              onClick={() => onChange(50, 15)}
              className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-mono text-neutral-300"
            >
              Top (Face)
            </button>
            <button
              type="button"
              onClick={() => onChange(50, 50)}
              className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-mono text-neutral-300"
            >
              Center
            </button>
            <button
              type="button"
              onClick={() => onChange(50, 85)}
              className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-mono text-neutral-300"
            >
              Bottom
            </button>
          </div>
        </div>

        {/* Right: Live Resulting Crop Frame Preview */}
        <div className="space-y-2 flex flex-col items-center">
          <span className="text-xs font-mono text-neutral-400 block self-start">
            2. Live Display Frame Preview ({aspectRatioLabel}):
          </span>
          <div
            className={`relative w-40 sm:w-48 ${aspectRatioClass} rounded-xl overflow-hidden bg-slate-950 border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]`}
          >
            <Image
              src={imageUrl}
              alt="Live crop preview"
              fill
              sizes="200px"
              className="object-cover transition-all duration-150"
              style={{ objectPosition: `${focalX}% ${focalY}%` }}
              priority
            />
            {/* Live frame corner markers for visual realism */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-red-400 pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-red-400 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-red-400 pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-red-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
