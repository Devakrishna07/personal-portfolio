import React from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export function SectionHeading({ title, className = "" }: SectionHeadingProps) {
  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-normal font-sans drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] select-none">
        {title}
      </h2>
      {/* Subtle curved underline accent matching the reference style */}
      <svg
        className="w-full max-w-[200px] sm:max-w-[240px] h-3 sm:h-4 text-white/70 mt-1"
        viewBox="0 0 200 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 6 12 Q 100 2 194 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
