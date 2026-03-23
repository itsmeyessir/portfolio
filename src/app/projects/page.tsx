"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/types";
import { ScrollBackgroundText } from "@/components/ui/scroll-background-text";

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

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-colors cursor-pointer overflow-hidden h-[400px]"
            >
              <div className="absolute inset-0 z-0 h-1/2">
                <ProjectMedia project={project} />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
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

      {/* Reused Modal from ProjectsSection */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="modal modal-open modal-bottom sm:modal-middle z-[9999]"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="modal-box bg-[#0a0a0a] border border-neutral-800 text-neutral-200 p-0 overflow-y-auto overflow-x-hidden shadow-2xl shadow-black max-w-3xl relative z-10"
              data-lenis-prevent="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-48 sm:h-64 border-b border-neutral-800">
                <ProjectMedia project={selectedProject} isModal={true} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h3 className="font-bold text-2xl sm:text-3xl text-white">
                    {selectedProject.title}
                  </h3>
                  <div className="flex gap-3">
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-neutral-800 hover:bg-white hover:text-black transition-colors border border-neutral-700 hover:border-white"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {selectedProject.links.live && (
                      <a
                        href={selectedProject.links.live}
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
                  {selectedProject.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2 py-1 bg-neutral-900 text-neutral-400 rounded-md border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-neutral-400 text-sm sm:text-base leading-relaxed font-serif">
                    {selectedProject.details}
                  </p>
                </div>
              </div>

              <div className="modal-action p-6 pt-0 mt-0">
                <button
                  className="btn bg-transparent border border-neutral-600 text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 rounded-none uppercase tracking-wider text-xs font-bold"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop bg-black/90 backdrop-blur-sm"
            >
              <button className="cursor-default">close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
