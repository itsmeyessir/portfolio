"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  HoverEffect,
  CardTitle,
  CardDescription,
} from "@/components/ui/card-hover-effect";
import { ScrollBackgroundText } from "@/components/ui/scroll-background-text";
import Link from "next/link";
import { Project } from "@/types";
import { PROJECTS } from "@/data/projects";

const ProjectMedia = ({
  project,
  isModal = false,
}: {
  project: Project;
  isModal?: boolean;
}) => {
  if (project.mediaType === "video") {
    return (
      <video
        src={project.media}
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
          isModal
            ? "grayscale-0"
            : "grayscale group-hover:grayscale-0 group-hover:scale-105"
        }`}
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
      className={`object-cover transition-all duration-700 ease-in-out ${
        isModal
          ? "grayscale-0"
          : "grayscale group-hover:grayscale-0 group-hover:scale-105"
      }`}
      style={{
        objectPosition: project.objectPosition,
        objectFit: project.objectFit || "cover",
      }}
    />
  );
};

const ProjectCardMediaWrapper = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scale the media slightly up to avoid clipping, and translate it vertically as we scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className="w-full h-48 sm:h-56 relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 mb-4 group flex-shrink-0"
    >
      <motion.div
        className="absolute inset-0 w-full h-full scale-110 will-change-transform"
        style={{
          y,
          transform: "translateZ(0)",
        }}
      >
        <ProjectMedia project={project} />
      </motion.div>
      <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

export function ProjectsSection() {
  const router = useRouter();

  const hoverItems = PROJECTS.slice(0, 4).map((project) => ({
    id: project.id,
    onClick: () => router.push(`/projects/${project.id}`),
    children: (
      <>
        <ProjectCardMediaWrapper project={project} />
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs font-mono px-2 py-1 bg-neutral-800 text-neutral-300 rounded-md border border-neutral-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </>
    ),
  }));

  return (
    <div className="w-full py-16 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center relative">
      <ScrollBackgroundText text="PROJECTS" direction="right" speed={20} />
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        <div className="lg:w-1/3 sticky top-32 z-20 pb-4 lg:pb-0">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-100 tracking-tight text-left">
            Projects
          </h2>
          <div className="w-12 h-px bg-neutral-700 mt-6 mb-6 hidden lg:block" />
          <p className="text-neutral-400 font-serif text-sm md:text-base leading-relaxed hidden lg:block max-w-sm">
            A selection of my technical work, demonstrating problem-solving,
            architectural design, and full-stack engineering across various
            domains.
          </p>
        </div>
        <div className="lg:w-2/3 w-full">
          <HoverEffect
            items={hoverItems}
            className="w-full mx-auto py-0 lg:grid-cols-2"
          />
          <div className="mt-4 flex justify-end px-4 lg:px-8">
            <Link
              href="/projects"
              className="text-sm font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2 group"
            >
              View All Projects{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                -&gt;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
