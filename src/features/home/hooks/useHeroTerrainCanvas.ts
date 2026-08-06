"use client";

import { useEffect, useRef } from "react";

// Colors mirror design tokens from globals.css (kept as plain constants here
// since canvas 2D context needs literal color strings, not CSS variables):
//   BG_COLOR    -> --sidebar            (#150F0D)
//   LINE_RGB    -> --sidebar-foreground (224,223,221)
//   PEAK_RGB    -> --primary            (134,56,57)
const BG_COLOR = "#150F0D";
const LINE_RGB = "224,223,221";
const PEAK_RGB = "134,56,57";

const COLS = 40;
const ROWS = 26;
const SPACING = 90;

function noise(x: number, z: number) {
  return (
    Math.sin(x * 0.35 + z * 0.2) * 0.5 +
    Math.sin(x * 0.12 - z * 0.35) * 0.35 +
    Math.cos((x + z) * 0.22) * 0.3
  );
}

/**
 * Draws a mouse-reactive 3D wireframe "terrain" grid into a <canvas>,
 * driven by requestAnimationFrame. Attach the returned ref to a <canvas>.
 */
export function useHeroTerrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouseRatio = { x: 0.5, y: 0.5 };
    let rafId: number | null = null;
    let t = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const project = (gx: number, gz: number, w: number, h: number, rotY: number, tiltX: number) => {
      const height = noise(gx * 0.5 + t * 6, gz * 0.5) * 60;
      const focal = h * 0.9;
      const camY = -140;
      const horizon = h * 0.42;
      const scale = Math.min(w, h) * 0.011;

      const wx = (gx - COLS / 2) * SPACING;
      const wz = gz * SPACING;
      const rx = wx * Math.cos(rotY);
      const wy = height + camY;
      const depth = wz * Math.cos(tiltX) - wy * Math.sin(tiltX) + 900;
      const vy = wz * Math.sin(tiltX) + wy * Math.cos(tiltX);
      const f = focal / Math.max(depth, 1);

      return { x: w / 2 + rx * f * scale, y: horizon + vy * f * scale * 0.5, hgt: height };
    };

    const draw = () => {
      t += 0.006;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      const rotY = (mouseRatio.x - 0.5) * 0.35;
      const tiltX = 0.62 + (mouseRatio.y - 0.5) * 0.12;

      for (let gz = 0; gz < ROWS; gz++) {
        ctx.beginPath();
        let started = false;
        for (let gx = 0; gx <= COLS; gx++) {
          const p = project(gx, gz, w, h, rotY, tiltX);
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const fade = 1 - gz / ROWS;
        ctx.strokeStyle = `rgba(${LINE_RGB},${0.05 + fade * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let gx = 0; gx <= COLS; gx++) {
        ctx.beginPath();
        let started = false;
        for (let gz = 0; gz < ROWS; gz++) {
          const p = project(gx, gz, w, h, rotY, tiltX);
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
          const peakAlpha = Math.max(0, (p.hgt - 18) / 42);
          if (peakAlpha > 0) {
            ctx.save();
            ctx.fillStyle = `rgba(${PEAK_RGB},${Math.min(peakAlpha, 1) * (1 - gz / ROWS) * 0.9})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.6 + peakAlpha * 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
        const fade = 1 - Math.abs(gx - COLS / 2) / (COLS / 2);
        ctx.strokeStyle = `rgba(${LINE_RGB},${0.04 + fade * 0.07})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRatio.x = (e.clientX - rect.left) / rect.width;
      mouseRatio.y = (e.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      mouseRatio.x = 0.5;
      mouseRatio.y = 0.5;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      draw();
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    } else {
      draw();
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return canvasRef;
}
