"use client";

import { useEffect } from "react";

/**
 * Hook to lock body scroll when an overlay/drawer is active.
 * Restores previous overflow style on cleanup.
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}
