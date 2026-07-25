import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { MdxComponents } from "@/components/MdxComponents";
import { Giscus } from "@/components/Giscus";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    return {
      title: `${meta.title} | Blog`,
      description: meta.excerpt,
    };
  } catch {
    return {
      title: "Updates Not Found",
    };
  }
}

const typeColors: Record<string, string> = {
  feature: "text-blue-400 border-blue-500/30 bg-blue-500/5",
  improvement: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
  fix: "text-amber-400 border-amber-500/30 bg-amber-500/5",
  breaking: "text-red-400 border-red-500/30 bg-red-500/5",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = post;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <article className="max-w-3xl mx-auto relative z-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-mono text-neutral-400 hover:text-white transition-colors mb-12 group uppercase tracking-wider"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Return to Archives
        </Link>

        <header className="mb-12">
          {meta.type === "release" && (
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${typeColors.feature}`}>
                {meta.version ? `v${meta.version}` : "RELEASE"}
              </span>
              {meta.projectTitle && (
                <span className="text-xs font-mono text-neutral-500">
                  {meta.projectTitle}
                </span>
              )}
            </div>
          )}

          {meta.type === "article" && (
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border text-neutral-500 border-neutral-700 bg-neutral-800/50 mb-4 inline-block">
              ARTICLE
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {meta.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-neutral-500 mb-8 pb-8 border-b border-neutral-800">
            <span className="flex items-center gap-2">
              <FaCalendarAlt />
              {new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {meta.readingTime && (
              <span className="flex items-center gap-2">
                <FaClock />
                {meta.readingTime}
              </span>
            )}
            {meta.tags && meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-neutral-900 text-neutral-400 rounded border border-neutral-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {meta.coverImage && (
            <div className="relative w-full h-64 md:h-[400px] rounded-xl overflow-hidden border border-neutral-800 bg-[#050505] mb-12 group">
              <Image
                src={meta.coverImage}
                alt={meta.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </div>
          )}
        </header>

        {meta.toc && meta.toc.length > 0 && (
          <div className="mb-12 p-6 rounded-xl border border-neutral-800 bg-neutral-900/30">
            <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider font-mono">
              Table of Contents
            </h2>
            <ul className="space-y-2">
              {meta.toc.map((item, index) => (
                <li
                  key={index}
                  className={`text-neutral-400 hover:text-white transition-colors text-sm font-serif ${
                    item.level === 3 ? "ml-4" : ""
                  }`}
                >
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose prose-invert max-w-none prose-neutral">
          <MDXRemote source={content} components={MdxComponents} />
        </div>

        <Giscus />
      </article>
    </main>
  );
}
