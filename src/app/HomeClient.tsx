"use client";
import React from "react";
import { ToastProvider } from "@/components/ToastContext";

import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HighlightsSection } from "@/components/HighlightsSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ParallaxWrapper } from "@/components/ParallaxWrapper";

export default function Home() {
  return (
    <ToastProvider>
      <ErrorBoundary>
        <div className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-neutral-800">
          <Navbar />
        </div>
        <main className="min-h-screen w-full text-neutral-100 flex flex-col items-center justify-center px-0 sm:px-2 md:px-4 pt-12 xs:pt-14 sm:pt-16 md:pt-20 lg:pt-24 relative z-10">
          {/* Each section is stacked, full viewport height, and centered */}
          <ParallaxWrapper id="about" yOffset={[60, -60]}>
            <AboutSection />
          </ParallaxWrapper>

          <ParallaxWrapper id="highlights" yOffset={[80, -80]}>
            <HighlightsSection />
          </ParallaxWrapper>

          <ParallaxWrapper id="projects" yOffset={[60, -60]}>
            <ProjectsSection />
          </ParallaxWrapper>

          <ParallaxWrapper id="contact" yOffset={[40, -40]}>
            <ContactSection />
          </ParallaxWrapper>
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </ErrorBoundary>
    </ToastProvider>
  );
}
