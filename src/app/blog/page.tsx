import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { getAllPosts } from "@/lib/mdx";
import { ScrollBackgroundText } from "@/components/ui/scroll-background-text";
import BlogList from "./BlogList";

export const metadata = {
  title: "Updates Archives",
  description:
    "Project release notes and technical documentation.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 relative overflow-hidden py-24">
      <ScrollBackgroundText text="UPDATES" direction="left" speed={15} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-mono text-neutral-400 hover:text-white transition-colors mb-8 group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            RETURN TO BASE
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Updates Archives
          </h1>
          <p className="text-neutral-400 font-serif text-lg">
            A log of all releases and technical documentation across projects.
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </main>
  );
}
