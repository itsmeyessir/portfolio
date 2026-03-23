"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { HIGHLIGHTS } from "@/data/highlights";
import { Highlight } from "@/types";
import { ScrollBackgroundText } from "@/components/ui/scroll-background-text";

export default function HighlightsPage() {
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(
    null,
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 relative overflow-hidden py-24">
      <ScrollBackgroundText text="HIGHLIGHTS" direction="left" speed={15} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-mono text-neutral-400 hover:text-white transition-colors mb-8 group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            RETURN TO BASE
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Highlight Archives
          </h1>
          <p className="text-neutral-400 max-w-2xl font-serif text-lg">
            A comprehensive collection of milestones, speaking engagements, and
            major achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedHighlight(item)}
              className="group relative flex flex-col justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors cursor-pointer overflow-hidden h-[400px]"
            >
              <div className="absolute inset-0 z-0 h-2/3">
                <Image
                  src={item.media}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                  style={{
                    objectPosition: item.objectPosition,
                    objectFit: item.objectFit || "cover",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
              </div>

              <div className="relative z-10 mt-auto pt-48">
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DaisyUI Modal for Monochromatic Neo-Analog aesthetic */}
      <AnimatePresence>
        {selectedHighlight && (
          <div
            className="modal modal-open modal-bottom sm:modal-middle z-[9999]"
            onClick={() => setSelectedHighlight(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="modal-box bg-[#0a0a0a] border border-neutral-800 text-neutral-200 p-0 overflow-y-auto overflow-x-hidden shadow-2xl shadow-black max-w-3xl relative z-10"
              data-lenis-prevent="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-48 sm:h-64 border-b border-neutral-800">
                <Image
                  src={selectedHighlight.media}
                  alt={selectedHighlight.title}
                  fill
                  className="object-cover grayscale"
                  style={{
                    objectPosition: selectedHighlight.objectPosition,
                    objectFit: selectedHighlight.objectFit || "cover",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="font-bold text-2xl sm:text-3xl mb-4 text-white">
                  {selectedHighlight.title}
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-neutral-400 text-sm sm:text-base leading-relaxed font-serif">
                    {selectedHighlight.story}
                  </p>
                </div>
              </div>

              <div className="modal-action p-6 pt-0 mt-0">
                <button
                  className="btn bg-transparent border border-neutral-600 text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 rounded-none uppercase tracking-wider text-xs font-bold"
                  onClick={() => setSelectedHighlight(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop bg-black/90 backdrop-blur-sm"
            >
              <button className="cursor-default">close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
