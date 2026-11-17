"use client";

import { useEffect, useState } from "react";

export interface ScrollState {
  scrollY: number;
  isPastHero: boolean;
}

/**
 * Custom hook to track window scroll position relative to the hero section.
 * Uses a passive scroll listener and requestAnimationFrame throttle.
 *
 * @param heroOffsetRatio - Fraction of window.innerHeight considered "past hero" (default: 0.75)
 * @returns { scrollY: number, isPastHero: boolean }
 */
export function useScrollPosition(heroOffsetRatio: number = 0.75): ScrollState {
  const [scrollPosition, setScrollPosition] = useState<ScrollState>({
    scrollY: 0,
    isPastHero: false,
  });

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      const currentY = window.scrollY;
      const threshold = window.innerHeight * heroOffsetRatio;
      setScrollPosition({
        scrollY: currentY,
        isPastHero: currentY >= threshold,
      });
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    // Initial check
    checkScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [heroOffsetRatio]);

  return scrollPosition;
}
