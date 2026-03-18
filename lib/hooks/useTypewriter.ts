"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  loop = false,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayText("");
    setIsTyping(true);
    setIsDone(false);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        charIndex++;
        timeoutId = setTimeout(typeChar, speed);
      } else {
        setIsTyping(false);
        setIsDone(true);
        if (loop) {
          timeoutId = setTimeout(() => {
            startTyping();
          }, 2000);
        }
      }
    };

    timeoutId = setTimeout(() => {
      startTyping();
      typeChar();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay, loop, startTyping]);

  return { displayText, isTyping, isDone, startTyping };
}
