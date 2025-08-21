"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useRefreshRateContext } from "@/components/RefreshRateContext";

type Project = {
  id: number;
  media: string;
  mediaType: 'image' | 'video'; // Specify whether the media is an image or video
  title: string;
  description: string; // Short description for hover preview
  details: string; // Longer, detailed description for the modal
  tech: string[]; // Technologies used
  links: {
    github?: string;
    live?: string;
  };
  objectPosition?: string;
  objectFit?: 'cover' | 'contain';
};

const PROJECTS: Project[] = [
  {
    id: 1,
    media: "/project-calculator.mov", // Video file
    mediaType: 'video', // Specify this is a video
    title: "Modern Scientific Calculator",
    description: "A feature-rich scientific calculator built with Java in Android Studio, featuring advanced math functions and a sleek UI design.",
    details: `As part of my exploration into Android development, I created a comprehensive scientific calculator application using Java in Android Studio. This project pushed me to deeply understand UI design principles, state management, and mathematical computations on mobile platforms.

The calculator goes beyond basic arithmetic to include trigonometric functions, logarithms, exponents, and complex equation solving. I implemented a dynamic history feature that allows users to recall and reuse previous calculations, enhancing productivity for students and professionals.

One of the most challenging aspects was designing the UI to be both visually appealing and highly functional. I created a responsive layout that adapts to different screen sizes and orientations, with careful attention to touch targets and interaction feedback.

The application uses custom animations for button presses and transitions between calculation modes, creating a fluid, engaging user experience. For error handling, I implemented a robust system that prevents invalid operations and provides clear feedback when errors occur.

Performance optimization was another key focus, ensuring rapid calculations even for complex operations. The app maintains state efficiently, preserving history and settings across sessions without excessive memory usage.

This project deepened my understanding of Java programming, Android's lifecycle management, and UI/UX design principles. It also taught me valuable lessons about user testing and iterative improvement based on feedback.`,
    tech: ["Java", "Android Studio", "XML", "Material Design", "JUnit"],
    links: {
      github: "https://github.com/itsmeyessir/AndroidStudio/tree/main/SciCal",
    },
    objectPosition: "center center",
  },
  {
    id: 2,
    media: "/project-roadfie.mov", // Placeholder image
    mediaType: 'video', // Specify this is a video
    title: "Roadfie",
    description: "A geospatial temporal risk analysis app that provides context-aware navigation recommendations based on MMDA monitored roads data.",
    details: `Roadfie emerged from our frustration with existing navigation apps that only provide route estimates without contextual risk information. Our daily commutes through Manila's unpredictable streets inspired us to create something more helpful for commuters.

The app analyzes multiple data layers simultaneously—historical traffic patterns, road accidents, weather forecasts, flood data, social media reports, and real-time road conditions. When users input their "from-to" destinations like in Google Maps, Roadfie provides a risk score, detailed contextual information, and specific actions to take.

For example, a high-risk score during rainy season might trigger recommendations like "Take route B instead—it's 10 minutes longer but has 85% less chance of flooding" or "Leave 25 minutes earlier to avoid the predicted traffic congestion at Quezon Avenue." This context-aware approach helps commuters make better decisions.

The technical architecture uses an XGBoost model that achieved 97.94% accuracy in predicting urban mobility risks. The front end was built using React Native for cross-platform support, with Node.js powering the backend API. We integrated data from the MMDA (Metro Manila Development Authority), weather services, and crowdsourced reports to create a comprehensive risk assessment system.

User testing showed that our recommendations reduced commute disruptions significantly compared to standard navigation apps. The UI was designed to present complex risk information in an intuitive way, using color-coded routes and simple action cards rather than overwhelming users with data.

This project was acknowledged at multiple academic conferences, especially in the 8th International Conference on Machine Learning and Machine Intelligence (MLMI 2025) where it is accepted for publication. We're currently exploring more algorithms and ways for us to improve our model so that we can find and land a partnership with transportation agencies and ride-sharing companies.`,
    tech: ["Python", "XGBoost", "Clustering", "Streamlit", "GIS"],
    links: {
      github: "https://github.com/itsmeyessir/Python/tree/main/ROADFIE",
      // live: "https://roadfie.vercel.app",
    },
    objectPosition: "center center",
  }
];

export function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [direction, setDirection] = useState(0);
  const { refreshRate } = useRefreshRateContext();

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % PROJECTS.length);
  };

  const openModal = (project: Project) => {
    // Set state variables first
    setModalProject(project);
    setShowModal(true);
    
    // Apply classes for CSS-based scroll locking
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('modal-open');
    
    // Apply simple overflow locking - won't change position
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // Apply to all potentially scrollable containers
    const allElements = document.querySelectorAll('div, section, main, article, aside, nav, header, footer');
    allElements.forEach(element => {
      if (element instanceof HTMLElement && !element.closest('[data-modal-content]')) {
        element.style.overflow = 'hidden';
        element.style.touchAction = 'none';
      }
    });
  };

  const closeModal = () => {
    // First set state for animation to trigger exit animation
    setShowModal(false);
    
    // Use a timeout to wait for the exit animation to complete before removing content
    setTimeout(() => {
      setModalProject(null);
      
      // Remove CSS classes
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('modal-open');
      
      // Restore all scroll-related styles
      const html = document.documentElement;
      const body = document.body;
      
      // Restore html styles
      html.style.overflow = '';
      html.style.height = '';
      html.style.touchAction = '';
      
      // Restore body styles
      body.style.overflow = '';
      body.style.touchAction = '';
      
      // Restore all elements
      const allElements = document.querySelectorAll('div, section, main, article, aside, nav, header, footer');
      allElements.forEach(element => {
        if (element instanceof HTMLElement && !element.closest('[data-modal-content]')) {
          element.style.overflow = '';
          element.style.touchAction = '';
        }
      });
    }, 350); // Match the duration of the exit animation
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Full emergency cleanup when component unmounts
      if (showModal) {
        // Remove classes
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('modal-open');
        
        // Reset styles on html
        const html = document.documentElement;
        html.style.overflow = '';
        html.style.height = '';
        html.style.touchAction = '';
        
        // Reset styles on body
        const body = document.body;
        body.style.overflow = '';
        body.style.touchAction = '';
        
        // Reset all elements in the DOM
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
          if (element instanceof HTMLElement && element !== document.body && element !== document.documentElement) {
            element.style.overflow = '';
            element.style.touchAction = '';
          }
        });
      }
    };
  }, [showModal]);
  
  return (
    <motion.section
      id="projects"
      className="w-full max-w-7xl mx-auto py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ 
        duration: refreshRate >= 120 ? 0.6 : 0.8, 
        ease: refreshRate >= 120 ? [0.25, 0.46, 0.45, 0.94] : [0.23, 1, 0.32, 1],
        type: "tween"
      }}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity'
      }}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 tracking-tight text-neutral-100">Projects</h2>
      <div className="relative w-full flex flex-col items-center">
        {/* Carousel Row */}
        <div className="flex w-full items-center justify-center gap-2 sm:gap-4 lg:gap-8">
          {/* Left Arrow OUTSIDE */}
          <button
            aria-label="Previous project"
            onClick={handlePrev}
            className="p-1 sm:p-2 text-white hover:scale-110 transition-transform duration-150 will-change-transform"
            style={{ background: 'none', border: 'none', boxShadow: 'none' }}
          >
            <FaChevronLeft size={18} className="sm:hidden" />
            <FaChevronLeft size={22} className="hidden sm:block" />
          </button>
          {/* Image Carousel */}
          <div className="relative flex-1 max-w-5xl min-w-[280px] sm:min-w-[340px] md:min-w-[600px] lg:min-w-[800px] aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/6] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg will-change-transform group"
            onClick={() => openModal(PROJECTS[current])}
            style={{
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: 'hidden',
              perspective: 1000,
              transformStyle: 'preserve-3d'
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={PROJECTS[current].id}
                custom={direction}
                initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
                transition={{ 
                  duration: refreshRate >= 120 ? 0.15 : 0.2, // Much faster for 60+ fps feel
                  ease: refreshRate >= 120 ? [0.32, 0.72, 0, 1] : [0.4, 0, 0.2, 1],
                  type: "tween"
                }}
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{ 
                  transform: "translateZ(0)", 
                  backfaceVisibility: 'hidden',
                  perspective: 1000,
                  transformStyle: 'preserve-3d'
                }}
              >
                {PROJECTS[current].mediaType === 'image' ? (
                  <Image
                    src={PROJECTS[current].media}
                    alt={PROJECTS[current].title}
                    fill
                    style={{ 
                      objectFit: PROJECTS[current].objectFit || 'cover',
                      objectPosition: PROJECTS[current].objectPosition || 'center center',
                      borderRadius: 24,
                      transform: "translate3d(0, 0, 0)", // Force hardware acceleration
                      transitionDuration: refreshRate >= 120 ? "150ms" : "200ms",
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      backfaceVisibility: 'hidden',
                      perspective: 1000,
                      willChange: 'transform, opacity, filter'
                    }}
                    className="transition-all will-change-transform group-hover:blur-sm group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    priority
                  />
                ) : (
                  <video
                    src={PROJECTS[current].media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: PROJECTS[current].objectFit || 'cover',
                      objectPosition: PROJECTS[current].objectPosition || 'center center',
                      borderRadius: 24,
                      transform: "translate3d(0, 0, 0)", // Force hardware acceleration
                      transitionDuration: refreshRate >= 120 ? "150ms" : "200ms",
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      backfaceVisibility: 'hidden',
                      perspective: 1000,
                      willChange: 'transform, opacity, filter'
                    }}
                    className="transition-all will-change-transform group-hover:blur-sm group-hover:scale-105"
                  />
                )}
                {/* Title overlay - hidden by default, shown on hover */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 sm:px-6 py-3 sm:py-4 flex items-end rounded-b-2xl sm:rounded-b-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow-lg mb-1 text-left">
                      {PROJECTS[current].title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-200 text-left line-clamp-2 opacity-90">
                      {PROJECTS[current].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Right Arrow OUTSIDE */}
          <button
            aria-label="Next project"
            onClick={handleNext}
            className="p-1 sm:p-2 text-white hover:scale-110 transition-transform duration-150 will-change-transform"
            style={{ background: 'none', border: 'none', boxShadow: 'none' }}
          >
            <FaChevronRight size={18} className="sm:hidden" />
            <FaChevronRight size={22} className="hidden sm:block" />
          </button>
        </div>
        {/* Dots/Pagination OUTSIDE */}
        <div className="flex items-center gap-1 sm:gap-2 mt-4 sm:mt-6">
          {PROJECTS.slice(0, 5).map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 sm:h-2 w-5 sm:w-6 rounded-full transition-all will-change-transform ${idx === current ? 'bg-neutral-800' : 'bg-neutral-300/50'}`}
              style={{ 
                transform: "translate3d(0, 0, 0)",
                transitionDuration: refreshRate >= 120 ? "120ms" : "180ms",
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                backfaceVisibility: 'hidden',
                willChange: 'background-color, transform'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          {showModal && modalProject && (
            <motion.div
              className="fixed z-[9999] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.35, 
                ease: "easeInOut" 
              }}
              onClick={closeModal}
              style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backdropFilter: 'blur(20px) brightness(0.7) saturate(120%)',
              WebkitBackdropFilter: 'blur(20px) brightness(0.7) saturate(120%)',
              zIndex: 9999,
              margin: 0,
              padding: '1rem',
              boxSizing: 'border-box'
            }}
          >
            <motion.div
              className={`bg-neutral-900/95 backdrop-blur-xl rounded-3xl w-full ${modalProject.mediaType === 'video' ? 'max-w-[85vw] sm:max-w-[75vw] md:max-w-[70vw] lg:max-w-[65vw] xl:max-w-[850px]' : 'max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl'} max-h-[90vh] shadow-2xl relative overflow-hidden border border-neutral-700/50 flex flex-col`}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.35, 
                ease: [0.23, 1, 0.32, 1]
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, rgba(23, 23, 23, 0.95) 0%, rgba(38, 38, 38, 0.9) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 hover:text-white transition-all duration-200 backdrop-blur-md border border-neutral-600/50 hover:border-neutral-500/50 shadow-lg"
                onClick={closeModal}
                aria-label="Close modal"
                // initial={{ opacity: 0, scale: 0.8 }}
                // animate={{ opacity: 1, scale: 1 }}
                // transition={{ 
                //   duration: 0.25, 
                //   delay: 0.2,
                //   ease: [0.23, 1, 0.32, 1]
                // }}
                // whileHover={{ scale: 1.1 }}
                // whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Hero Media (Image or Video) */}
              <motion.div 
                className={`relative w-full ${modalProject.mediaType === 'video' ? 'h-auto aspect-[16/8]' : 'h-40 sm:h-48 md:h-56 lg:h-64'} flex-shrink-0`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {modalProject.mediaType === 'image' ? (
                  <Image
                    src={modalProject.media}
                    alt={modalProject.title}
                    fill
                    style={{ 
                      objectFit: modalProject.objectFit || 'cover',
                      objectPosition: modalProject.objectPosition || 'center center'
                    }}
                    className="rounded-t-3xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 672px"
                    priority
                  />
                ) : (
                  <video
                    src={modalProject.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center center',
                      backgroundColor: '#1a1a1a',
                      padding: '0.375rem'
                    }}
                    className="rounded-t-3xl"
                  />
                )}
              </motion.div>

              {/* Content with dark theme */}
              <div className="p-3 sm:p-5 md:p-6 lg:p-7 overflow-y-auto flex-1 min-h-0" data-modal-content>
                <motion.div 
                  className="space-y-3 sm:space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut", 
                    delay: 0.15 
                  }}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight">
                    {modalProject.title}
                  </h3>
                  
                  <div className="w-10 sm:w-12 md:w-16 h-1 bg-gradient-to-r from-neutral-400 to-neutral-600 rounded-full" />
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {modalProject.tech.map((tech, i) => (
                      <motion.span 
                        key={i}
                        initial={{ background: 'rgba(38, 38, 38, 0.6)' }}
                        whileHover={{ 
                          scale: 1.05,
                          background: 'rgba(64, 64, 64, 0.8)',
                          color: '#ffffff',
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                        }}
                        transition={{ 
                          duration: refreshRate >= 120 ? 0.15 : 0.2, 
                          ease: [0.25, 0.1, 0.25, 1],
                          scale: { type: "spring", stiffness: 300, damping: 15 }
                        }}
                        className="px-2 py-1 bg-neutral-800/60 rounded-md text-xs sm:text-sm text-neutral-200 border border-neutral-700/50 cursor-pointer will-change-transform"
                        style={{ 
                          transformOrigin: 'center center', 
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Project details */}
                  <div className="text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line text-left">
                    {modalProject.details}
                  </div>
                  
                  {/* Links */}
                  <div className="pt-4 flex gap-4 justify-start">
                    {modalProject.links.github && (
                      <a 
                        href={modalProject.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-100 bg-neutral-800 hover:bg-neutral-700 px-3 py-2 rounded-lg transition-all"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                    {modalProject.links.live && (
                      <a 
                        href={modalProject.links.live}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-100 bg-neutral-800 hover:bg-neutral-700 px-3 py-2 rounded-lg transition-all"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.section>
  );
}
