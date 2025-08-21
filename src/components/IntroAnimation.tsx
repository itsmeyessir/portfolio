"use client";
import React, { useRef, useEffect, useState } from "react";

export function IntroAnimation({ onFinish }: { onFinish?: () => void }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [burstStarted, setBurstStarted] = useState(false);

  useEffect(() => {
    let p5Instance: any = null;
    let t = 0;
    let firefly = {
      radius: 1,
      angle: 0,
      speed: 0.1,
      size: 8,
      alpha: 200,
      x: 0,
      y: 0,
    };
    let burstParticles: any[] = [];
    let frameCount = 0;
    const maxFrames = 200; // ~5s at 40fps
    const burstFrames = 20; // ~0.7s burst
    import("p5").then(({ default: p5 }) => {
      const sketch = (p: any) => {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.pixelDensity(1);
          p.frameRate(110);
          firefly.angle = 0;
          frameCount = 0;
          burstParticles = [];
        };
        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
        p.draw = () => {
          p.background(0, 0, 0, 255);
          t += 0.02;
          frameCount++;
          const progress = frameCount / maxFrames;
          if (!burstStarted && frameCount < maxFrames - burstFrames) {
            // Pre-burst: orbiting firefly
            firefly.speed = 0.1 + 0.25 * (progress * progress);
            firefly.radius = 120 - 80 * progress;
            firefly.angle += firefly.speed;
            const cx = p.width / 2;
            const cy = p.height / 2;
            firefly.x = cx + Math.cos(firefly.angle) * firefly.radius;
            firefly.y = cy + Math.sin(firefly.angle) * firefly.radius;
            p.noStroke();
            for (let g = 6; g > 0; g--) {
              p.fill(255, 255, 255, (firefly.alpha / g) * 0.7);
              p.ellipse(firefly.x, firefly.y, firefly.size * g, firefly.size * g);
            }
            p.fill(255, 255, 255, firefly.alpha);
            p.ellipse(firefly.x, firefly.y, firefly.size, firefly.size);
          } else {
            // Burst phase
            if (!burstStarted) {
              setBurstStarted(true);
              // Create burst particles
              burstParticles = [];
              for (let i = 0; i < 24; i++) {
                const angle = (Math.PI * 2 * i) / 24;
                burstParticles.push({
                  x: firefly.x,
                  y: firefly.y,
                  vx: Math.cos(angle) * (3 + Math.random() * 2),
                  vy: Math.sin(angle) * (3 + Math.random() * 2),
                  alpha: 200,
                  size: 6 + Math.random() * 2,
                });
              }
              // Sync: call onFinish to start BigBangBackground instantly
              if (onFinish) onFinish();
            }
            // Animate burst particles
            for (let i = 0; i < burstParticles.length; i++) {
              let f = burstParticles[i];
              f.x += f.vx;
              f.y += f.vy;
              f.vx *= 0.96;
              f.vy *= 0.96;
              f.alpha *= 0.97;
              p.noStroke();
              for (let g = 6; g > 0; g--) {
                p.fill(255, 255, 255, (f.alpha / g) * 0.7);
                p.ellipse(f.x, f.y, f.size * g, f.size * g);
              }
              p.fill(255, 255, 255, f.alpha);
              p.ellipse(f.x, f.y, f.size, f.size);
            }
          }
        };
      };
      if (canvasRef.current) {
        p5Instance = new p5(sketch, canvasRef.current);
      }
    });
    // Remove after full duration
    const timer = setTimeout(() => {
      if (p5Instance) {
        p5Instance.remove();
        p5Instance = null;
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
      if (p5Instance) {
        p5Instance.remove();
        p5Instance = null;
      }
    };
  }, [onFinish, burstStarted]);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
