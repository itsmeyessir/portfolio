"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ScrollBackgroundTextProps {
  /** The text to display in the background */
  text: string;
  /** Direction the text moves as the user scrolls down */
  direction?: "left" | "right";
  /** How far the text translates (percentage) */
  speed?: number;
  /** Optional extra classes for the container */
  className?: string;
}

/**
 * ScrollBackgroundText
 *
 * Creates a massive, transparent "hollow" typography background that moves
 * horizontally in response to vertical scrolling. This gives the Nfinitepaper
 * agency-style "scrollytelling" depth to any section.
 */
export function ScrollBackgroundText({
  text,
  direction = "left",
  speed = 30,
  className,
}: ScrollBackgroundTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start end": animation starts when top of container hits bottom of viewport
    // "end start": animation ends when bottom of container hits top of viewport
    offset: ["start end", "end start"],
  });

  // We repeat the text multiple times so that it forms an infinite-looking ribbon
  // Removed the em-dash for a cleaner, more brutalist typographic look
  const repeatedText = Array(10).fill(text).join("     ");

  // Map the 0-1 scroll progress to a CSS translation percentage
  const xRange =
    direction === "left" ? ["0%", `-${speed}%`] : [`-${speed}%`, "0%"];

  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0",
        className,
      )}
    >
      <motion.div
        style={{
          x,
          // Hardware acceleration for the text sliding
          transform: "translateZ(0)",
          willChange: "transform",
        }}
        className="whitespace-nowrap font-black text-[25vw] md:text-[20vw] leading-none uppercase tracking-tighter select-none"
      >
        <span
          style={{
            // Creates the "Neo-Analog" hollow text effect
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
            color: "transparent",
          }}
        >
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}
