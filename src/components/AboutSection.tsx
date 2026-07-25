"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRefreshRateContext } from "@/components/RefreshRateContext";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function AboutSection() {
  const { refreshRate } = useRefreshRateContext();

  return (
    <motion.section
      className="w-full max-w-4xl mx-auto py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh] text-center bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: refreshRate >= 120 ? 0.6 : 0.8,
        ease:
          refreshRate >= 120 ? [0.25, 0.46, 0.45, 0.94] : [0.23, 1, 0.32, 1],
        type: "tween",
      }}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
      }}
    >
      <div className="flex flex-col items-center max-w-full">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-neutral-100">
          About Me
        </h2>
        <div className="w-16 h-px bg-neutral-700 mb-8" />
        <TextGenerateEffect
          words="Hi! I'm Robbie, a data scientist and software engineer with a passion for turning complex information into clear, actionable insights. I work extensively with Python and PHP to analyze data, build backend systems, and develop scalable solutions. On the development side, I create sleek, high-performance web and mobile experiences using Flutter, React, Next.js, and other modern web frameworks to bridge the gap between analytical precision and intuitive design."
          className="text-neutral-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl text-center font-serif"
        />
      </div>
    </motion.section>
  );
}
