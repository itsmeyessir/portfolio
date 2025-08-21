"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRefreshRateContext } from "@/components/RefreshRateContext";

export function AboutSection() {
  const { refreshRate } = useRefreshRateContext();
  
  return (
    <motion.section
      id="about"
      className="scroll-mt-50 sm:scroll-mt-70 w-full max-w-4xl mx-auto py-6 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh] text-center bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ 
        duration: refreshRate >= 120 ? 0.6 : 0.8, 
        ease: refreshRate >= 120 ? [0.25, 0.46, 0.45, 0.94] : [0.23, 1, 0.32, 1],
        type: "tween"
      }}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity'
      }}
    >
      <div className="flex flex-col items-center max-w-full">
        <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 tracking-tight text-neutral-100">About Me</h2>
        <p className="text-neutral-300 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-[90%] xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-center">
        Hi! I'm <span className="font-semibold text-white">Robbie</span>, an aspiring data scientist or analyst with a passion for turning complex information into clear, actionable insights. I work extensively with Python and PHP to analyze data, build backend systems, and develop scalable solutions. On the development side, I create sleek, high-performance web and mobile experiences using Flutter, React, Next.js, and other modern web frameworks to bridge the gap between analytical precision and intuitive design.
      </p>
      </div>
    </motion.section>
  );
}
