"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function useGlitchText(words: string[], intervalMs = 6000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % words.length;
      const targetWord = words[nextIndex];
      setIsGlitching(true);

      let step = 0;
      const totalSteps = 10;
      const glitchInterval = setInterval(() => {
        step++;
        if (step >= totalSteps) {
          clearInterval(glitchInterval);
          setDisplayText(targetWord);
          setCurrentIndex(nextIndex);
          setIsGlitching(false);
        } else {
          // Scramble characters with random glitch glyphs
          const scrambled = targetWord
            .split("")
            .map((char) =>
              Math.random() < 0.65
                ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                : char
            )
            .join("");
          setDisplayText(scrambled);
        }
      }, 50);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [currentIndex, words, intervalMs]);

  return { displayText, isGlitching };
}

