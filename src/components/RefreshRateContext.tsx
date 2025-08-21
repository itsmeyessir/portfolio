"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

interface RefreshRateContextType {
  refreshRate: number;
  animationDuration: number;
  fastDuration: number;
  ultraFastDuration: number;
}

const RefreshRateContext = createContext<RefreshRateContextType>({
  refreshRate: 60,
  animationDuration: 300,
  fastDuration: 150,
  ultraFastDuration: 75,
});

export const useRefreshRateContext = () => {
  const context = useContext(RefreshRateContext);
  if (!context) {
    // Provide fallback values if context is not available
    return {
      refreshRate: 60,
      animationDuration: 300,
      fastDuration: 150,
      ultraFastDuration: 75,
    };
  }
  return context;
};

export function RefreshRateProvider({ children }: { children: React.ReactNode }) {
  const [refreshRate, setRefreshRate] = useState(60);
  const [animationDuration, setAnimationDuration] = useState(300);
  const [fastDuration, setFastDuration] = useState(150);
  const [ultraFastDuration, setUltraFastDuration] = useState(75);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let animationId: number;
    let measurementComplete = false;

    const detectRefreshRate = () => {
      if (measurementComplete) return;

      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed >= 1000) { // Measure for 1 second
        const measuredFPS = Math.round((frameCount / elapsed) * 1000);
        setRefreshRate(measuredFPS);
        measurementComplete = true;
        
        // Adaptive animation durations based on refresh rate
        if (measuredFPS >= 120) {
          // 120Hz+ displays (ProMotion, gaming monitors)
          setAnimationDuration(200);
          setFastDuration(100);
          setUltraFastDuration(50);
        } else if (measuredFPS >= 90) {
          // 90Hz displays
          setAnimationDuration(250);
          setFastDuration(125);
          setUltraFastDuration(60);
        } else if (measuredFPS >= 75) {
          // 75Hz displays
          setAnimationDuration(280);
          setFastDuration(140);
          setUltraFastDuration(70);
        } else {
          // 60Hz displays
          setAnimationDuration(300);
          setFastDuration(150);
          setUltraFastDuration(75);
        }
        
        console.log(`🎮 Detected ${measuredFPS}Hz display - Optimized durations: ${animationDuration}ms / ${fastDuration}ms / ${ultraFastDuration}ms`);
        return;
      }

      animationId = requestAnimationFrame(detectRefreshRate);
    };

    // Start detection after a brief delay
    const startDelay = setTimeout(() => {
      animationId = requestAnimationFrame(detectRefreshRate);
    }, 100);

    return () => {
      clearTimeout(startDelay);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <RefreshRateContext.Provider value={{ 
      refreshRate, 
      animationDuration, 
      fastDuration, 
      ultraFastDuration 
    }}>
      {children}
    </RefreshRateContext.Provider>
  );
}
