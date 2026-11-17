"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to track window scroll position.
 * Uses passive event listener and requestAnimationFrame throttle.
 *
 * @param threshold - Distance from the top in pixels to consider "at top" (default: 20)
 * @returns { scrollY: number, isAtTop: boolean }
 */
export function useScrollPosition(threshold: number = 20) {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    isAtTop: true,
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollPosition({
            scrollY: currentY,
            isAtTop: currentY <= threshold,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollPosition;
}
