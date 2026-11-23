"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseProjectsCarouselProps {
  totalItems: number;
  intervalMs?: number;
}

export interface UseProjectsCarouselReturn {
  currentIndex: number;
  visibleCount: number;
  maxIndex: number;
  isPaused: boolean;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  setIsPaused: (paused: boolean) => void;
  containerProps: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export function useProjectsCarousel({
  totalItems,
  intervalMs = 6000,
}: UseProjectsCarouselProps): UseProjectsCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive visible count tracking (3 on desktop, 2 on tablet, 1 on mobile)
  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(3);
      } else if (width >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Max sliding index so we don't slide beyond available items if needed,
  // or allow rotating through all items
  const maxIndex = Math.max(0, totalItems - 1);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index <= maxIndex) {
        setCurrentIndex(index);
      }
    },
    [maxIndex]
  );

  // Auto slide effect (continuous 6-second interval, pauses on interaction)
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    const timer = setInterval(() => {
      next();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, totalItems, intervalMs, next]);

  // Touch and Mouse Swipe / Drag Gesture State
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startXRef.current !== null && currentXRef.current !== null) {
      const deltaX = currentXRef.current - startXRef.current;
      const swipeThreshold = 45;

      if (deltaX < -swipeThreshold) {
        next();
      } else if (deltaX > swipeThreshold) {
        prev();
      }
    }
    startXRef.current = null;
    currentXRef.current = null;
    setIsPaused(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current && startXRef.current !== null && currentXRef.current !== null) {
      const deltaX = currentXRef.current - startXRef.current;
      const swipeThreshold = 50;

      if (deltaX < -swipeThreshold) {
        next();
      } else if (deltaX > swipeThreshold) {
        prev();
      }
    }
    isDraggingRef.current = false;
    startXRef.current = null;
    currentXRef.current = null;
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    startXRef.current = null;
    currentXRef.current = null;
    setIsPaused(false);
  };

  return {
    currentIndex,
    visibleCount,
    maxIndex,
    isPaused,
    goTo,
    next,
    prev,
    setIsPaused,
    containerProps: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
