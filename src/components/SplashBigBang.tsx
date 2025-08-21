"use client";
import React, { useEffect, useRef, useState } from "react";
// Do not import p5 at the top (causes SSR error)
import { motion, AnimatePresence } from "framer-motion";


export function SplashBigBang({ onFinish, children }: { onFinish: (fireflies?: any[]) => void; children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let p5Instance: any = null;
    let fireflies: any[] = [];
    let t = 0;
    let burst = true;
    let burstTime = 0;
    let initialWidth: number;
    let initialHeight: number;
    import("p5").then(({ default: p5 }) => {
      const sketch = (p: any) => {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          initialWidth = p.windowWidth;
          initialHeight = p.windowHeight;
          p.pixelDensity(1);
          p.frameRate(60);
          fireflies = [];
          for (let i = 0; i < 24; i++) {
            fireflies.push({
              x: p.width / 2,
              y: p.height / 2,
              vx: p.random(-8, 8),
              vy: p.random(-8, 8),
              alpha: p.random(120, 200),
              size: p.random(3, 7),
              phase: p.random(0, Math.PI * 2),
            });
          }
        };
        p.draw = () => {
          p.background(0, 0, 0, 255);
          t += 0.02;
          if (burst) {
            burstTime++;
            for (let i = 0; i < fireflies.length; i++) {
              let f = fireflies[i];
              f.x += f.vx;
              f.y += f.vy;
              f.vx *= 0.93;
              f.vy *= 0.93;
              p.noStroke();
              for (let g = 6; g > 0; g--) {
                p.fill(255, 255, 255, (f.alpha / g) * 0.7);
                p.ellipse(f.x, f.y, f.size * g, f.size * g);
              }
              p.fill(255, 255, 255, f.alpha);
              p.ellipse(f.x, f.y, f.size, f.size);
            }
            if (burstTime > 120) {
              burst = false;
              // Prepare fireflies for handoff: normalize positions and scale velocities
              const transformedFireflies = fireflies.map(f => ({
                ...f,
                x: f.x / initialWidth,
                y: f.y / initialHeight,
                vx: f.vx * 0.05,
                vy: f.vy * 0.05,
              }));
              setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => {
                  setActive(false);
                  onFinish(transformedFireflies);
                }, 700);
              }, 400);
            }
          }
        };
      };
      if (canvasRef.current) {
        p5Instance = new p5(sketch, canvasRef.current);
      }
    });
    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [onFinish]);

  // Always render homepage content, fade in as splash overlay fades out
  return (
    <div className="fixed inset-0 w-full h-full z-[99]">
      {/* Homepage content, opacity fades in as splash fades out */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeOut ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{ pointerEvents: fadeOut || !active ? "auto" : "none", overflow: fadeOut || !active ? "auto" : "hidden" }}
      >
        {children}
      </motion.div>
      {/* Splash overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            ref={canvasRef}
            className="fixed inset-0 z-[100] w-full h-full bg-black/90 flex items-center justify-center"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Optionally add a logo or text in the center */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
