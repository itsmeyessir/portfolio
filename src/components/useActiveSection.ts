"use client";
import { useEffect, useState, useRef } from "react";

export function useActiveSection(sectionIds: string[]) {
  // Store the active section ID
  const [active, setActive] = useState(sectionIds[0]);
  
  // Track if we're currently in a programmatic scroll
  const isProgrammaticScrollRef = useRef(false);
  
  // Use a ref to store the last time active section was changed
  const lastChangeTimeRef = useRef(0);
  
  // Debounce function for smooth transitions
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to change active section with debouncing
  const changeActiveSection = (newSection: string) => {
    if (newSection === active) return;
    
    // Clear any pending debounce
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Check if we need to debounce (prevent rapid changes)
    const now = Date.now();
    const timeSinceLastChange = now - lastChangeTimeRef.current;
    
    if (timeSinceLastChange < 100) {
      // Debounce the change
      debounceTimeoutRef.current = setTimeout(() => {
        setActive(newSection);
        lastChangeTimeRef.current = Date.now();
      }, 100);
    } else {
      // Make the change immediately
      setActive(newSection);
      lastChangeTimeRef.current = now;
    }
  };
  
  // Setup intersection observer for detecting which section is visible
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR guard
    
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // If we're in a programmatic scroll, give it priority
      if (isProgrammaticScrollRef.current) return;
      
      // Get visible sections
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          // Sort by position in viewport
          const aRect = a.boundingClientRect;
          const bRect = b.boundingClientRect;
          // Sections closer to the top (but still visible) are prioritized
          return aRect.top - bRect.top;
        })
        .map(entry => entry.target.id);
      
      if (visibleSections.length > 0) {
        changeActiveSection(visibleSections[0]);
      }
    };
    
    // More stable configuration for the IntersectionObserver
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-10% 0px -70% 0px", // Better detection near the top of the viewport
      threshold: [0.1],
    });
    
    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, [sectionIds, active]);

  // Handle direct navigation via clicks - with priority over scroll events
  useEffect(() => {
    const handleNavigationEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.id && sectionIds.includes(customEvent.detail.id)) {
        // Mark that we're in a programmatic scroll
        isProgrammaticScrollRef.current = true;
        
        // Update active immediately for better feedback
        setActive(customEvent.detail.id);
        lastChangeTimeRef.current = Date.now();
        
        // Reset the programmatic scroll flag after animation completes
        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 1000); // Typical scroll animation duration
      }
    };
    
    window.addEventListener('activeSectionChange', handleNavigationEvent);
    return () => window.removeEventListener('activeSectionChange', handleNavigationEvent);
  }, [sectionIds]);
  
  return active;

  return active;
}
