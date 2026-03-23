"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes safely.
 * We are using clsx and tailwind-merge which are already in package.json.
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ParallaxWrapperProps {
  children: React.ReactNode;
  /** Custom classes for the outer section container */
  className?: string;
  /** [startOffset, endOffset] in pixels. Defaults to [50, -50] for a subtle effect */
  yOffset?: [number, number];
  /** Optional ID for smooth scrolling navigation */
  id?: string;
}

/**
 * ParallaxWrapper
 *
 * A reusable container component that applies a hardware-accelerated vertical
 * parallax effect to its children as they scroll into and out of the viewport.
 * Perfect for giving that continuous, fluid feel to portfolio sections.
 */
export function ParallaxWrapper({
  children,
  className,
  yOffset = [60, -60],
  id,
}: ParallaxWrapperProps) {
  // Ref to track the section in the viewport
  const ref = useRef<HTMLElement>(null);

  // Track scroll progress of this specific section.
  // "start end" means: when the top of the target hits the bottom of the viewport
  // "end start" means: when the bottom of the target hits the top of the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map the scroll progress (0 to 1) to our yOffset pixel values
  const y = useTransform(scrollYProgress, [0, 1], yOffset);
  // Fade in slightly as it enters, fade out as it leaves for a neo-analog film transition
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative w-full flex items-center justify-center min-h-screen overflow-hidden",
        className
      )}
    >
      <motion.div
        style={{
          y,
          opacity,
          // Force hardware acceleration for buttery smooth 120fps+ scrolling
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
