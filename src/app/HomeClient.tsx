"use client";
import React, { useState, useEffect } from "react";
import { useRefreshRateContext } from "@/components/RefreshRateContext";
import { ToastProvider } from "@/components/ToastContext";

// Modern welcome animation - blur to focus with adaptive timing
function useWelcomeAnimation(trigger = false, adaptiveDuration = 300) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'revealing' | 'visible' | 'fading'>('hidden');

  useEffect(() => {
    if (!trigger) {
      setAnimationPhase('hidden');
      setIsVisible(false);
      return;
    }

    // Cinematic timing for welcome animation - slower and more elegant
    const baseDelay = Math.max(200, adaptiveDuration * 0.7); // Longer initial delay
    const visibleDuration = Math.max(1200, adaptiveDuration * 4); // Much longer visible time
    const fadeDelay = Math.max(2200, adaptiveDuration * 8); // Extended total experience

    const timer1 = setTimeout(() => {
      setIsVisible(true);
      setAnimationPhase('revealing');
    }, baseDelay);

    const timer2 = setTimeout(() => {
      setAnimationPhase('visible');
    }, visibleDuration);

    const timer3 = setTimeout(() => {
      setAnimationPhase('fading');
    }, fadeDelay);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [trigger, adaptiveDuration]);

  return { isVisible, animationPhase, finished: animationPhase === 'fading' };
}
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HighlightsSection } from "@/components/HighlightsSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { InteractiveGradientBackground } from "@/components/InteractiveGradientBackground";

export default function Home() {
  // Use the shared refresh rate context with fallback
  const { refreshRate, animationDuration } = useRefreshRateContext();
  
  // Ensure we have a stable animation duration (don't let it change mid-animation)
  const [stableAnimationDuration] = useState(animationDuration || 300);
  
  // introPhase: 'black' | 'welcome' | 'gradient' | 'done'
  const [introPhase, setIntroPhase] = useState<'black' | 'welcome' | 'gradient' | 'done'>('black');
  
  // Modern welcome animation with adaptive timing
  const { isVisible, animationPhase, finished: welcomeDone } = useWelcomeAnimation(
    introPhase === 'welcome',
    stableAnimationDuration
  );

  useEffect(() => {
    const adaptiveDelay = Math.max(500, stableAnimationDuration * 1.5); // Much slower, more cinematic transitions
    
    if (introPhase === 'black') {
      const t = setTimeout(() => setIntroPhase('welcome'), adaptiveDelay);
      return () => clearTimeout(t);
    }
    if (introPhase === 'welcome' && welcomeDone) {
      const t = setTimeout(() => setIntroPhase('gradient'), adaptiveDelay * 0.8); // Slightly faster transition to gradient
      return () => clearTimeout(t);
    }
  }, [introPhase, welcomeDone, stableAnimationDuration]);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  // Sequence: black -> gradient fade in -> BigBangBackground + content
  // Remove duplicate/incorrect transition to gradient

  // When gradient fade-in completes, show main content
  const handleGradientFadeComplete = () => {
    setIntroPhase('done');
    // Smooth, elegant content reveals - no bouncy animations
    const staggerDelay = Math.max(200, stableAnimationDuration * 0.8); // Much more deliberate spacing
    
    setTimeout(() => setShowNavbar(true), staggerDelay);
    setTimeout(() => setShowAbout(true), staggerDelay * 2);
    setTimeout(() => setShowHighlights(true), staggerDelay * 3);
    setTimeout(() => setShowProjects(true), staggerDelay * 4);
    setTimeout(() => setShowContact(true), staggerDelay * 5);
    setTimeout(() => setShowFooter(true), staggerDelay * 6);
    
    // Cinematic scroll timing - much later
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, staggerDelay * 7);
  };

  // Helper for fade-in classes - Smooth, elegant transitions
  const fadeIn = (show: boolean) => {
    const duration = Math.max(300, stableAnimationDuration * 1.2); // Longer, more elegant duration
    return `${show ? "opacity-100 translate-y-0 translate-z-0" : "opacity-0 translate-y-4 translate-z-0"} transition-all ease-out will-change-transform`
      .replace('transition-all', `transition-all duration-[${duration}ms]`);
  };

  return (
    <ToastProvider>
      {/* Show black screen, then Welcome, then gradient, then main content */}
      {introPhase === 'black' && (
        <div className="fixed inset-0 w-full h-full bg-black z-50 transition-opacity duration-50 ease-out" style={{opacity: 1}} aria-hidden="true" />
      )}
      {introPhase === 'welcome' && (
        <div
          className={`fixed inset-0 w-full h-full flex items-center justify-center z-50 bg-black transition-all ease-in-out will-change-transform ${animationPhase === 'fading' ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            transitionDuration: `${stableAnimationDuration}ms`,
            backfaceVisibility: 'hidden', // Prevent flickering on high refresh
            perspective: 1000, // Enable 3D acceleration
          }}
          aria-hidden="true"
        >
          <div className="relative will-change-transform" style={{ transform: 'translateZ(0)' }}>
            <span
              className={`text-base font-sans font-light text-white tracking-wider transition-all ease-out will-change-transform ${
                animationPhase === 'hidden' 
                  ? 'opacity-0 scale-95 blur-sm' 
                  : animationPhase === 'revealing'
                  ? 'opacity-100 scale-100 blur-none'
                  : animationPhase === 'visible'
                  ? 'opacity-100 scale-100 blur-none'
                  : 'opacity-0 scale-105 blur-sm'
              }`}
              style={{
                fontSize: '20px',
                letterSpacing: '0.12em',
                textShadow: '0 4px 16px rgba(255,255,255,0.15), 0 1px 8px rgba(255,255,255,0.1)',
                filter: animationPhase === 'hidden' || animationPhase === 'fading' ? 'blur(4px)' : 'blur(0px)',
                transform: 'translateZ(0)', // Force GPU acceleration
                transitionDuration: `${stableAnimationDuration}ms`,
                backfaceVisibility: 'hidden',
              }}
            >
              welcome
            </span>
          </div>
        </div>
      )}
      {(introPhase === 'gradient' || introPhase === 'done') && (
        <InteractiveGradientBackground fadeIn={introPhase === 'gradient'} onFadeComplete={handleGradientFadeComplete} />
      )}
      <ErrorBoundary>
        <div
          className={`fixed top-0 left-0 w-full z-40 bg-black border-b border-neutral-800 transition-all ease-out will-change-transform ${showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          style={{ 
            transitionDuration: `${Math.max(200, stableAnimationDuration * 1.5)}ms`,
            backfaceVisibility: 'hidden'
          }}
        >
          <Navbar />
        </div>
        <main className="min-h-screen w-full text-neutral-100 flex flex-col items-center justify-center px-0 sm:px-2 md:px-4 pt-12 xs:pt-14 sm:pt-16 md:pt-20 lg:pt-24">
          {/* Each section is stacked, full viewport height, and centered */}
          <section id="about" className="w-full min-h-screen flex flex-col justify-center items-center scroll-mt-16 xs:scroll-mt-18 sm:scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28">
            {showAbout && <AboutSection />}
          </section>
          <section id="highlights" className="w-full min-h-screen flex items-center justify-center scroll-mt-16 xs:scroll-mt-18 sm:scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28">
            <div className={fadeIn(showHighlights)} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {showHighlights && <HighlightsSection />}
            </div>
          </section>
          <section id="projects" className="w-full min-h-screen flex items-center justify-center scroll-mt-16 xs:scroll-mt-18 sm:scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28">
            <div className={fadeIn(showProjects)} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {showProjects && <ProjectsSection />}
            </div>
          </section>
          <section id="contact" className="w-full min-h-screen flex items-center justify-center scroll-mt-16 xs:scroll-mt-18 sm:scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28">
            <div className={fadeIn(showContact)} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {showContact && <ContactSection />}
            </div>
          </section>
        </main>
        <div className={fadeIn(showFooter)}>{showFooter && <Footer />}</div>
      </ErrorBoundary>
    </ToastProvider>
  );
}
