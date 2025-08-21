"use client";
import React, { useRef, useEffect, useState } from "react";


// Mesh color points for a dark, moody, aurora-inspired theme
const MESH_COLORS = [
  // Orange band (bottom left to top right)
  { color: "#ff6a1c", base: { x: 0.05, y: 0.85 }, amp: 0.13, speed: 0.18, angle: 0 },
  { color: "#ffb347", base: { x: 0.18, y: 0.65 }, amp: 0.10, speed: 0.13, angle: 1.2 },
  // Blue band (top left to bottom right)
  { color: "#2d3a6e", base: { x: 0.75, y: 0.15 }, amp: 0.12, speed: 0.15, angle: 2.1 },
  { color: "#5fd3fb", base: { x: 0.92, y: 0.35 }, amp: 0.10, speed: 0.12, angle: 2.7 },
  // White/cream highlight (center)
  { color: "#f7f6f2", base: { x: 0.55, y: 0.55 }, amp: 0.07, speed: 0.09, angle: 3.5 },
  // Black anchors (increased amplitude and one more for coverage)
  { color: "#18181b", base: { x: 0.5, y: 0.1 }, amp: 0.32, speed: 0.11, angle: 4.0 },
  { color: "#0a0a0e", base: { x: 0.8, y: 0.9 }, amp: 0.38, speed: 0.10, angle: 5.0 },
  { color: "#18181b", base: { x: 0.15, y: 0.15 }, amp: 0.28, speed: 0.09, angle: 5.7 },
];

export function InteractiveGradientBackground({ fadeIn = false, onFadeComplete }: { fadeIn?: boolean, onFadeComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(fadeIn ? 0 : 1);
  const [fading, setFading] = useState(fadeIn);

  // Fade in effect
  useEffect(() => {
    if (fadeIn && fading) {
      let frame: number;
      let start: number | null = null;
      const duration = 900; // ms
      function animate(ts: number) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setOpacity(progress);
        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          setFading(false);
          if (onFadeComplete) onFadeComplete();
        }
      }
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }
  }, [fadeIn, fading, onFadeComplete]);

  // Resize canvas to fit window, but use lower internal resolution for perf
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function resize() {
      if (!canvas) return;
      // Lower resolution: 1/2x for perf
      canvas.width = Math.round(window.innerWidth / 2);
      canvas.height = Math.round(window.innerHeight / 2);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Animate mesh points and draw mesh gradient at lower frame rate
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame: number;
    let t0 = performance.now();
    let lastDraw = 0;
    function drawMesh(now: number) {
      if (!canvas || !ctx) return;
      // Lower frame rate: only draw every ~40ms (~25fps)
      if (now - lastDraw < 40) {
        frame = requestAnimationFrame(drawMesh);
        return;
      }
      lastDraw = now;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // For each mesh color, compute animated position
      const points = MESH_COLORS.map((pt, i) => {
        const angle = pt.angle + t * pt.speed;
        return {
          ...pt,
          x: pt.base.x + Math.sin(angle) * pt.amp,
          y: pt.base.y + Math.cos(angle) * pt.amp,
        };
      });
      // Draw mesh: for each pixel, blend based on distance to points
      const width = canvas.width;
      const height = canvas.height;
      const img = ctx.createImageData(width, height);
      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          // Compute blend weights
          let total = 0;
          const weights = points.map(pt => {
            const dx = x / width - pt.x;
            const dy = y / height - pt.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const w = 1 / (d * d * 18 + 0.18); // tweak falloff for softness
            total += w;
            return w;
          });
          // Blend color
          let r = 0, g = 0, b = 0;
          weights.forEach((w, i) => {
            const c = points[i].color;
            const cr = parseInt(c.slice(1, 3), 16);
            const cg = parseInt(c.slice(3, 5), 16);
            const cb = parseInt(c.slice(5, 7), 16);
            r += (w / total) * cr;
            g += (w / total) * cg;
            b += (w / total) * cb;
          });
          // Write pixel (2x2 block for perf)
          for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
              const idx = 4 * ((y + dy) * width + (x + dx));
              if (idx < img.data.length) {
                img.data[idx] = r;
                img.data[idx + 1] = g;
                img.data[idx + 2] = b;
                img.data[idx + 3] = Math.floor(255 * opacity);
              }
            }
          }
        }
      }
  ctx.putImageData(img, 0, 0);
  // Add blur for painterly/smoky look
  ctx.globalAlpha = 1;
  ctx.filter = 'blur(16px)';
  ctx.drawImage(canvas, 0, 0);
  ctx.filter = 'none';
  // Overlay: stronger semi-transparent black for dark mode effect
  ctx.globalAlpha = 0.62;
  ctx.fillStyle = '#101014';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
      frame = requestAnimationFrame(drawMesh);
    }
    frame = requestAnimationFrame(drawMesh);
    return () => cancelAnimationFrame(frame);
  }, [opacity]);

  // No mouse interaction, just animated mesh
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 transition-opacity duration-700"
      style={{ opacity, transition: 'opacity 0.7s', pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
