"use client";
import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";

export function OceanBackground({ onFinish }: { onFinish?: () => void }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'burst' | 'roam'>('burst');
  const burstDuration = 120; // ~2 seconds at 60fps
  const fadeDuration = 40; // ~0.7 seconds at 60fps

  useEffect(() => {
    let p5Instance: p5 | null = null;
    let fireflies: any[] = [];
    let t = 0;
    let burstTime = 0;
    let fadeTime = 0;
    let fading = false;
    let mouseX = -1000;
    let mouseY = -1000;
    function handleMouseOut() {
      mouseX = -1000;
      mouseY = -1000;
    }
    const lerp = (a: number, b: number, amt: number) => a + (b - a) * amt;
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
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
        const canvasEl = (p as any).canvas;
        if (canvasEl) {
          canvasEl.addEventListener("mouseout", handleMouseOut);
        }
      };
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        fireflies.forEach((f) => {
          f.x = p.constrain(f.x, 0, p.width);
          f.y = p.constrain(f.y, 0, p.height);
        });
      };
      p.mouseMoved = () => {
        mouseX = p.mouseX;
        mouseY = p.mouseY;
      };
      p.draw = () => {
        p.background(0, 0, 0, 255);
        t += 0.02;
        if (phase === 'burst') {
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
          if (burstTime > burstDuration) {
            setPhase('roam');
            fading = true;
          }
        } else {
          // Roaming phase: gentle movement, interactivity, fade in
          if (fading && fadeTime < fadeDuration) {
            fadeTime++;
          }
          for (let i = 0; i < fireflies.length; i++) {
            let f = fireflies[i];
            // Morph velocities to gentle roaming
            f.vx = lerp(f.vx, p.random(-0.3, 0.3), 0.01);
            f.vy = lerp(f.vy, p.random(-0.3, 0.3), 0.01);
            f.x += f.vx + Math.sin(t + f.phase) * 0.1;
            f.y += f.vy + Math.cos(t + f.phase) * 0.1;
            // Wrap around edges
            if (f.x < 0) f.x = p.width;
            if (f.x > p.width) f.x = 0;
            if (f.y < 0) f.y = p.height;
            if (f.y > p.height) f.y = 0;
            // Alpha pulses for glowing
            let pulse = Math.sin(t * 2 + f.phase) * 0.5 + 0.5;
            let alpha = lerp(60, 200, pulse);
            // Mouse interaction: fireflies move away from mouse
            let d = p.dist(f.x, f.y, mouseX, mouseY);
            if (d < 80) {
              let angle = Math.atan2(f.y - mouseY, f.x - mouseX);
              f.x += Math.cos(angle) * 1.2;
              f.y += Math.sin(angle) * 1.2;
            }
            // Draw glow
            p.noStroke();
            for (let g = 6; g > 0; g--) {
              p.fill(255, 255, 255, (alpha / g) * 0.7);
              p.ellipse(f.x, f.y, f.size * g, f.size * g);
            }
            p.fill(255, 255, 255, alpha);
            p.ellipse(f.x, f.y, f.size, f.size);
          }
          // Optionally fade in homepage content after fadeDuration
          if (fading && fadeTime === fadeDuration && onFinish) {
            onFinish();
            fading = false;
          }
        }
      };
    };
    if (canvasRef.current) {
      p5Instance = new p5(sketch, canvasRef.current);
    }
    return () => {
      if (p5Instance) {
        p5Instance.remove();
        p5Instance = null;
      }
    };
  }, [onFinish, phase]);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
