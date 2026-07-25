"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/types";
import { ScrollBackgroundText } from "@/components/ui/scroll-background-text";
import { useRouter } from "next/navigation";

const ProjectMedia = ({ project }: { project: Project }) => {
  if (project.mediaType === "video") {
    return (
      <video
        src={project.media}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105"
        style={{
          objectPosition: project.objectPosition,
          objectFit: project.objectFit || "cover",
        }}
      />
    );
  }
  return (
    <Image
      src={project.media}
      alt={project.title}
      fill
      className="object-cover transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105"
      style={{
        objectPosition: project.objectPosition,
        objectFit: project.objectFit || "cover",
      }}
    />
  );
};

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 relative overflow-hidden py-24">
      <ScrollBackgroundText text="ARCHIVE" direction="right" speed={15} />

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
            Project Archives
          </h1>
          <p className="text-neutral-400 max-w-2xl font-serif text-lg">
            A complete log of all technical transmissions, experiments, and
            deployed systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="group relative flex flex-col justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors cursor-pointer overflow-hidden h-[400px]"
            >
              <div className="absolute inset-0 z-0">
                <ProjectMedia project={project} />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
              </div>

              <div className="relative z-10 mt-auto pt-48">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2 py-1 bg-black/50 text-neutral-300 rounded border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs font-mono px-2 py-1 text-neutral-500">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
