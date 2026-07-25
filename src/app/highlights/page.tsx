"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { HIGHLIGHTS } from "@/data/highlights";
import { ScrollBackgroundText } from "@/components/ui/scroll-background-text";
import { useRouter } from "next/navigation";

export default function HighlightsPage() {
  const router = useRouter();

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
              onClick={() => router.push(`/highlights/${item.id}`)}
              className="group relative flex flex-col justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors cursor-pointer overflow-hidden h-[400px]"
            >
              <div className="absolute inset-0 z-0">
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
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
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
    </main>
  );
}
