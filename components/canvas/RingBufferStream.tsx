"use client";

import { useEffect, useRef } from "react";
import { useResonance } from "@/lib/context/ResonanceContext";
import { useTheme } from "next-themes";

interface Particle {
  t: number;          // Position along the loop [0, 1)
  speed: number;      // Individual speed variance
  size: number;       // Particle radius
  tier: 0 | 1 | 2;    // Visual tier: 0 = fast path, 1 = waitpkg, 2 = futex2
  alpha: number;      // Opacity
  trail: Array<{ x: number; y: number }>;
}

export default function RingBufferStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeTech } = useResonance();
  const { resolvedTheme } = useTheme();

  const activeTechRef = useRef(activeTech);
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    activeTechRef.current = activeTech;
  }, [activeTech]);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse tilt parallax
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = x * 0.25;
      targetTiltY = y * 0.2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Tab visibility check
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initialize 48 telemetry & ring buffer stream particles
    const PARTICLE_COUNT = 42;
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        t: i / PARTICLE_COUNT,
        speed: 0.0018 + Math.random() * 0.0012,
        size: 1.5 + Math.random() * 2,
        tier: (i % 5 === 0 ? 2 : i % 3 === 0 ? 1 : 0) as 0 | 1 | 2,
        alpha: 0.4 + Math.random() * 0.5,
        trail: [],
      });
    }

    let globalRotation = 0;

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth tilt interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      // Determine palette based on active resonance & theme
      const isDark = themeRef.current === "dark";
      const tech = (activeTechRef.current || "").toLowerCase();

      let primaryColor = isDark ? "#06b6d4" : "#0284c7";    // Cyan default
      let accentColor = isDark ? "#6366f1" : "#4f46e5";     // Indigo default
      let speedMultiplier = 1.0;

      if (tech.includes("c23") || tech.includes("futex") || tech.includes("ipc") || tech.includes("ring")) {
        primaryColor = isDark ? "#38bdf8" : "#0284c7";
        accentColor = isDark ? "#22d3ee" : "#0891b2";
        speedMultiplier = 2.0;
      } else if (tech.includes("rust") || tech.includes("io_uring") || tech.includes("telemetry")) {
        primaryColor = isDark ? "#818cf8" : "#4f46e5";
        accentColor = isDark ? "#a855f7" : "#7e22ce";
        speedMultiplier = 1.8;
      } else if (tech.includes("algo") || tech.includes("c") || tech.includes("numa")) {
        primaryColor = isDark ? "#34d399" : "#059669";
        accentColor = isDark ? "#10b981" : "#047857";
        speedMultiplier = 1.6;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const rx = Math.min(width, height) * 0.42;
      const ry = rx * (0.38 + currentTiltY);

      globalRotation += (0.002 * speedMultiplier);

      // Draw 64-byte Vyukov Slot ticks around the ring
      const SLOT_COUNT = 32;
      ctx.lineWidth = 1;
      for (let s = 0; s < SLOT_COUNT; s++) {
        const slotAngle = (s / SLOT_COUNT) * Math.PI * 2 + globalRotation;
        const cosA = Math.cos(slotAngle);
        const sinA = Math.sin(slotAngle);

        // Project slot tick
        const x1 = cx + cosA * (rx - 6) + currentTiltX * 40;
        const y1 = cy + sinA * (ry - 4);
        const x2 = cx + cosA * (rx + 6) + currentTiltX * 40;
        const y2 = cy + sinA * (ry + 4);

        // Depth cueing
        const depthAlpha = ((sinA + 1) / 2) * 0.35 + 0.08;
        ctx.strokeStyle = isDark
          ? `rgba(148, 163, 184, ${depthAlpha})`
          : `rgba(100, 116, 139, ${depthAlpha * 0.7})`;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw the ambient double-mapped ring buffer backbone (2x MAP_FIXED guide)
      ctx.beginPath();
      ctx.ellipse(cx + currentTiltX * 40, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.12)" : "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Update and draw streaming telemetry / IPC message packets
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.t = (p.t + p.speed * speedMultiplier) % 1;
        }

        const angle = p.t * Math.PI * 2 + globalRotation;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const px = cx + cosA * rx + currentTiltX * 40;
        const py = cy + sinA * ry;

        // Depth attenuation: front of ring is brighter, back is softer
        const depth = (sinA + 1) / 2; // 0 (back) to 1 (front)
        const currentAlpha = p.alpha * (0.3 + depth * 0.7);

        // Update particle trail
        p.trail.unshift({ x: px, y: py });
        if (p.trail.length > 5) p.trail.pop();

        // Draw particle tail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = p.tier === 0
            ? `${primaryColor}${Math.floor(currentAlpha * 0.4 * 255).toString(16).padStart(2, "0")}`
            : `${accentColor}${Math.floor(currentAlpha * 0.3 * 255).toString(16).padStart(2, "0")}`;
          ctx.lineWidth = p.size * 0.8;
          ctx.stroke();
        }

        // Draw particle head
        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.7 + depth * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.tier === 0 ? primaryColor : accentColor;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Subtle glow aura for Tier 0 fast-path particles
        if (p.tier === 0 && depth > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = currentAlpha * 0.2;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[380px] flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />
      {/* Subtle overlay HUD telemetry badge */}
      <div className="absolute bottom-2 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/20 dark:border-slate-800/40 text-[0.65rem] font-mono text-slate-500 dark:text-slate-400 opacity-70">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
        <span>2x MAP_FIXED :: Ring Buffer Stream</span>
      </div>
    </div>
  );
}
