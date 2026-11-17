"use client";

import React, { useState } from "react";
import Image from "next/image";
import { experiencesData, ExperienceItem } from "@/config/experience";

export function ExperienceTab() {
  return (
    <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {experiencesData.map((item) => (
        <ExperienceCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative rounded-xl p-4 sm:p-5 bg-slate-950/70 border border-slate-800 hover:border-red-500/40 hover:bg-slate-950/90 transition-all duration-300">
      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Company Logo or Icon */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center shrink-0 overflow-hidden text-red-400 group-hover:border-red-500/50 transition-colors">
          {!imgError && item.logo && !item.logo.startsWith("/icons") ? (
            <Image
              src={item.logo}
              alt={item.company}
              fill
              sizes="48px"
              onError={() => setImgError(true)}
              className="object-contain p-1"
            />
          ) : (
            <svg
              className="w-6 h-6 stroke-red-400"
              fill="none"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h4 className="text-base sm:text-lg font-semibold text-white truncate group-hover:text-red-300 transition-colors">
              {item.company}
            </h4>
            <span className="text-xs font-mono font-medium text-red-400">
              {item.startYear} – {item.endYear}
            </span>
          </div>

          <div className="text-sm font-medium text-slate-300 mt-0.5">
            {item.role}
            {item.location && (
              <span className="text-xs text-slate-400 font-normal ml-2">
                • {item.location}
              </span>
            )}
          </div>

          {item.description && item.description.length > 0 && (
            <ul className="mt-2.5 space-y-1.5 text-xs sm:text-sm text-slate-400">
              {item.description.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">▹</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
