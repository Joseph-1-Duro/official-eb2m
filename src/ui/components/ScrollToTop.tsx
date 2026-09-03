"use client"

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

// Scroll threshold (px) after which the button becomes visible
const SCROLL_THRESHOLD = 800;
const THROTTLE_DELAY = 150;

// helper function for throttling to improve performance
function throttle<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible((prev) => {
        const next = window.scrollY > SCROLL_THRESHOLD;
        return prev === next ? prev : next;
      });
    };

    const throttledToggle = throttle(toggleVisibility, THROTTLE_DELAY);

    window.addEventListener("scroll", throttledToggle, { passive: true });
    throttledToggle(); // set the initial state on mount

    return () => {
      window.removeEventListener("scroll", throttledToggle);
    };
  }, []);

  const scrollBackToTop = () => window.scroll({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={scrollBackToTop}
      className={isVisible ? "scroll-top scroll-top--visible" : "scroll-top"}
      aria-label="Back to top"
    >
      <ArrowUp />
    </button>
  );
}