"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ScrollBackgroundText } from "@/components/ui/scroll-background-text";

import Link from "next/link";
import { Highlight } from "@/types";
import { HIGHLIGHTS } from "@/data/highlights";

const MediaHeader = ({ highlight }: { highlight: Highlight }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scale the image slightly up, and translate it on the Y-axis as we scroll.
  // This gives the Nfinitepaper "window" parallax effect.
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className="flex flex-1 w-full h-full min-h-[12rem] relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800"
    >
      <motion.div
        className="absolute inset-0 w-full h-full scale-110 will-change-transform grayscale group-hover/bento:grayscale-0 transition-all duration-700 ease-in-out group-hover/bento:scale-125"
        style={{
          y,
          transform: "translateZ(0)",
        }}
      >
        <Image
          src={highlight.media}
          alt={highlight.title}
          fill
          className="object-cover"
          style={{
            objectPosition: highlight.objectPosition,
            objectFit: highlight.objectFit || "cover",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 z-10 bg-black/20 group-hover/bento:bg-transparent transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

export function HighlightsSection() {
  const router = useRouter();

  return (
    <div className="w-full py-16 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center relative">
      <ScrollBackgroundText text="HIGHLIGHTS" direction="left" speed={20} />
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-100 mb-8 tracking-tight text-left">
          Highlights
        </h2>

        <BentoGrid className="max-w-7xl mx-auto">
          {HIGHLIGHTS.slice(0, 4).map((item) => (
            <BentoGridItem
              key={item.id}
              title={item.title}
              description={item.description}
              header={<MediaHeader highlight={item} />}
              className={item.className}
              onClick={() => router.push(`/highlights/${item.id}`)}
            />
          ))}
        </BentoGrid>

        <div className="mt-8 flex justify-end px-4">
          <Link
            href="/highlights"
            className="text-sm font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2 group"
          >
            View All Highlights{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              -&gt;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
