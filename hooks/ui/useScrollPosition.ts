"use client";

import { useEffect, useState, useRef } from "react";

export interface ScrollState {
  scrollY: number;
  isPastHero: boolean;
  scrollDirection: "up" | "down" | null;
  shouldShowNavbar: boolean;
}

/**
 * Custom hook to track window scroll position, scroll direction, and navbar visibility.
 * Follows SOLID principles by decoupling scroll calculations from presentation.
 *
 * @param heroOffsetRatio - Fraction of window.innerHeight considered "past hero" (default: 0.75)
 */
export function useScrollPosition(heroOffsetRatio: number = 0.75): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    isPastHero: false,
    scrollDirection: null,
    shouldShowNavbar: false,
  });

  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      const currentY = window.scrollY;
      const heroThreshold = window.innerHeight * heroOffsetRatio;
      const isPastHero = currentY >= heroThreshold;

      let direction: "up" | "down" | null = null;
      const delta = currentY - lastScrollY.current;

      // Small jitter deadzone of 4px
      if (Math.abs(delta) > 4) {
        direction = delta > 0 ? "down" : "up";
      }

      // Show navbar only when past hero AND scrolling UP
      const shouldShowNavbar = isPastHero && (direction === "up" || (!direction && scrollState.shouldShowNavbar));

      setScrollState((prev) => ({
        scrollY: currentY,
        isPastHero,
        scrollDirection: direction ?? prev.scrollDirection,
        shouldShowNavbar: isPastHero ? (direction ? direction === "up" : prev.shouldShowNavbar) : false,
      }));

      lastScrollY.current = currentY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    checkScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [heroOffsetRatio]);

  return scrollState;
}
