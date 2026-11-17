"use client";

import React, { useState } from "react";
import Image from "next/image";
import { certificationsData, CertificationItem } from "@/config/certifications";

export function CertificationsTab() {
  return (
    <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {certificationsData.map((item) => (
        <CertificationCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function CertificationCard({ item }: { item: CertificationItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative rounded-xl p-4 sm:p-5 bg-slate-950/70 border border-slate-800 hover:border-red-500/40 hover:bg-slate-950/90 transition-all duration-300">
      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Certification Icon or Logo */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center shrink-0 overflow-hidden text-red-400 group-hover:border-red-500/50 transition-colors">
          {!imgError && item.logo && !item.logo.startsWith("/icons") ? (
            <Image
              src={item.logo}
              alt={item.name}
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
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h4 className="text-base sm:text-lg font-semibold text-white truncate group-hover:text-red-300 transition-colors">
              {item.name}
            </h4>
            {item.issueDate && (
              <span className="text-xs font-mono font-medium text-red-400">
                {item.issueDate}
              </span>
            )}
          </div>

          <div className="text-sm font-medium text-slate-300 mt-0.5">
            Issued by <span className="text-slate-200">{item.issuer}</span>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-medium text-red-400/90 select-all">
              ID: {item.credentialId}
            </span>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-300 underline underline-offset-4 transition-colors group/link"
              >
                <span>Verify Credential</span>
                <svg
                  className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
