"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { ScrollBackgroundText } from "@/components/ui/scroll-background-text";
import { PostMeta } from "@/lib/mdx";

interface BlogSectionProps {
  posts: PostMeta[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const recent = posts.slice(0, 3);

  return (
    <div className="w-full py-16 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center relative">
      <ScrollBackgroundText text="UPDATES" direction="left" speed={15} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-100 mb-8 tracking-tight text-left">
          Updates
        </h2>
        <p className="text-neutral-400 font-serif text-lg mb-8 max-w-xl">
          Project release notes and technical documentation.
        </p>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recent.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: "easeOut" }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group h-full flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all overflow-hidden"
              >
                {post.coverImage && (
                  <div className="relative w-full h-44 overflow-hidden border-b border-neutral-800">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 mb-2 uppercase tracking-widest">
                    {post.type === "release" && post.version && (
                      <span className="text-blue-400">v{post.version}</span>
                    )}
                    {post.type === "article" && (
                      <span>Article</span>
                    )}
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt size={10} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-neutral-200 transition-colors line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-neutral-500 font-serif line-clamp-2 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="text-xs font-mono text-neutral-500 group-hover:text-white transition-colors mt-4 flex items-center gap-1 uppercase tracking-wider">
                    {post.type === "release" ? "View Release" : "Read"}
                    <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-end px-4">
          <Link
            href="/blog"
            className="text-sm font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2 group"
          >
            View All Updates{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              -&gt;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
