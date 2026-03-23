"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { PostMeta } from "@/lib/mdx";

interface BlogListProps {
  posts: PostMeta[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div className="flex flex-col">
      {/* Filtering Navigation */}
      {uniqueTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12 items-center">
          <span className="text-sm font-mono text-neutral-500 mr-2 uppercase tracking-wider">
            Filter by:
          </span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors border ${
              selectedTag === null
                ? "bg-white text-black border-white"
                : "bg-neutral-900/50 text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            ALL
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors border ${
                selectedTag === tag
                  ? "bg-white text-black border-white"
                  : "bg-neutral-900/50 text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Blog Feed */}
      <div className="flex flex-col gap-10">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/80 transition-colors overflow-hidden"
          >
            {post.coverImage && (
              <div className="relative w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden flex-shrink-0 border border-neutral-800 bg-[#050505]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
            )}

            <div className="flex flex-col flex-1 justify-center">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 mb-3">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {post.readingTime && (
                  <span className="flex items-center gap-1.5 border-l border-neutral-800 pl-4">
                    <FaClock />
                    {post.readingTime}
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {post.title}
              </h2>

              <p className="text-neutral-400 font-serif mb-6 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 bg-black/50 text-neutral-400 rounded border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-sm font-mono text-neutral-500 group-hover:text-white transition-colors flex items-center gap-2 uppercase tracking-wider">
                  Read{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    -&gt;
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="p-12 border border-neutral-800 border-dashed rounded-xl flex flex-col items-center justify-center text-center bg-neutral-900/20">
            <div className="text-neutral-500 font-mono mb-4 text-sm">
              NO BLOGS DETECTED
            </div>
            <p className="text-neutral-400 font-serif">
              The archives are currently empty for this category. Awaiting new
              data inputs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
