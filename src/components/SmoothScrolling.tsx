"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Accessibility check: Do not initialize smooth scrolling if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis for that premium, momentum-based scrolling feel
    const lenis = new Lenis({
      lerp: 0.08, // Controls the smoothness. Lower = smoother/slower. 0.08 is a sweet spot.
      wheelMultiplier: 1, // Scroll speed multiplier
      smoothWheel: true,
    });

    // Tie Lenis to the browser's native requestAnimationFrame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
