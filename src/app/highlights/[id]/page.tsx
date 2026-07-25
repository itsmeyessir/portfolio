import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { HIGHLIGHTS } from "@/data/highlights";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return HIGHLIGHTS.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function HighlightPage({ params }: Props) {
  const { id } = await params;
  const highlight = HIGHLIGHTS.find((h) => h.id.toString() === id);

  if (!highlight) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 relative overflow-hidden py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/highlights"
          className="inline-flex items-center text-sm font-mono text-neutral-400 hover:text-white transition-colors mb-8 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          RETURN TO ARCHIVES
        </Link>

        <div className="relative w-full h-64 md:h-[400px] rounded-xl overflow-hidden border border-neutral-800 bg-[#050505] mb-12">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {highlight.title}
        </h1>

        <p className="text-neutral-400 font-serif text-lg mb-10 leading-relaxed">
          {highlight.description}
        </p>

        <div className="border-t border-neutral-800 pt-10">
          <p className="whitespace-pre-wrap text-neutral-400 text-sm sm:text-base leading-relaxed font-serif">
            {highlight.story}
          </p>
        </div>
      </div>
    </main>
  );
}
