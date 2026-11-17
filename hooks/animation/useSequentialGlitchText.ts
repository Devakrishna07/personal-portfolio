"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Sequential glitch text hook that reveals words one after another with cyber glitching
 * Example words: ["Who", "Am", "I", "?"]
 */
export function useSequentialGlitchText(
  tokens: string[] = ["Who", "Am", "I", "?"],
  trigger: boolean = true
) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!trigger || isFinished) return;

    if (revealedCount >= tokens.length) {
      setIsFinished(true);
      setDisplayText(tokens.join(" "));
      return;
    }

    const currentTargetWord = tokens[revealedCount];
    let step = 0;
    const totalSteps = 6;

    const interval = setInterval(() => {
      step++;
      if (step >= totalSteps) {
        clearInterval(interval);
        setRevealedCount((prev) => prev + 1);
        const settledWords = tokens.slice(0, revealedCount + 1).join(" ");
        setDisplayText(settledWords);
      } else {
        const scrambled = currentTargetWord
          .split("")
          .map((char) =>
            Math.random() < 0.6
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : char
          )
          .join("");

        const previousSettled = tokens.slice(0, revealedCount).join(" ");
        setDisplayText(
          previousSettled ? `${previousSettled} ${scrambled}` : scrambled
        );
      }
    }, 60);

    return () => clearInterval(interval);
  }, [revealedCount, tokens, trigger, isFinished]);

  return { displayText, isFinished };
}
