import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id.toString(),
  }));
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.mediaType === "video") {
    return (
      <video
        src={project.media}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
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
      className="object-cover"
      style={{
        objectPosition: project.objectPosition,
        objectFit: project.objectFit || "cover",
      }}
    />
  );
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id.toString() === id);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 relative overflow-hidden py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-mono text-neutral-400 hover:text-white transition-colors mb-8 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          RETURN TO ARCHIVES
        </Link>

        <div className="relative w-full h-64 md:h-[400px] rounded-xl overflow-hidden border border-neutral-800 bg-[#050505] mb-12">
          <ProjectMedia project={project} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {project.title}
          </h1>
          <div className="flex gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800 hover:bg-white hover:text-black transition-colors border border-neutral-700 hover:border-white"
                aria-label="GitHub Repository"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800 hover:bg-white hover:text-black transition-colors border border-neutral-700 hover:border-white"
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs font-mono px-2 py-1 bg-neutral-900 text-neutral-400 rounded-md border border-neutral-800"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mb-12 border-b border-neutral-800 pb-10">
          <p className="whitespace-pre-wrap text-neutral-400 text-sm sm:text-base leading-relaxed font-serif">
            {project.details}
          </p>
        </div>
      </div>
    </main>
  );
}
