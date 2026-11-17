"use client";

import React, { useState } from "react";
import Image from "next/image";
import { educationsData, EducationItem } from "@/config/education";

export function EducationTab() {
  return (
    <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {educationsData.map((item) => (
        <EducationCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function EducationCard({ item }: { item: EducationItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative rounded-xl p-4 sm:p-5 bg-slate-950/70 border border-slate-800 hover:border-red-500/40 hover:bg-slate-950/90 transition-all duration-300">
      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Institution Logo or Icon */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center shrink-0 overflow-hidden text-red-400 group-hover:border-red-500/50 transition-colors">
          {!imgError && item.logo && !item.logo.startsWith("/icons") ? (
            <Image
              src={item.logo}
              alt={item.institution}
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
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14v7"
              />
            </svg>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h4 className="text-base sm:text-lg font-semibold text-white truncate group-hover:text-red-300 transition-colors">
              {item.institution}
            </h4>
            <span className="text-xs font-mono font-medium text-red-400">
              {item.startYear} – {item.endYear}
            </span>
          </div>

          <div className="text-sm font-medium text-slate-300 mt-1">
            {item.specialization}
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
            {item.location && (
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item.location}
              </span>
            )}
            {item.marks && (
              <span className="inline-flex items-center gap-1 font-mono font-semibold text-red-400">
                <span className="text-red-500">★</span> {item.marks}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
