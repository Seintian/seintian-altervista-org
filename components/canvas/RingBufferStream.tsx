"use client";

import { useEffect, useRef } from "react";
import { useResonance } from "@/lib/context/ResonanceContext";
import { useTheme } from "next-themes";

interface Particle {
  t: number;          // Position [0, 1) where 0..0.5 is Primary Ring, 0.5..1.0 is Mirror Ring
  speed: number;
  size: number;
  color: string;
  isContiguousSpan?: boolean;
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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = x * 0.35;
      targetTiltY = y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Stream particles: representing packet payloads traversing both Virtual Buffers
    const PARTICLE_COUNT = 36;
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        t: i / PARTICLE_COUNT,
        speed: 0.0016 + Math.random() * 0.001,
        size: 2 + Math.random() * 2,
        color: i % 2 === 0 ? "#06b6d4" : "#6366f1",
      });
    }

    // A large contiguous message packet that demonstrably crosses the boundary
    let contiguousPacketT = 0.42; // Starts just before Boundary (at 0.5)

    let globalAngle = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      const isDark = themeRef.current === "dark";
      const tech = (activeTechRef.current || "").toLowerCase();

      let primaryHue = isDark ? "#06b6d4" : "#0284c7"; // Cyan
      let mirrorHue = isDark ? "#818cf8" : "#4f46e5";  // Indigo
      let speedMult = 1.0;

      if (tech.includes("c23") || tech.includes("ipc") || tech.includes("futex")) {
        primaryHue = isDark ? "#38bdf8" : "#0284c7";
        mirrorHue = isDark ? "#22d3ee" : "#0891b2";
        speedMult = 1.8;
      } else if (tech.includes("rust") || tech.includes("telemetry")) {
        primaryHue = isDark ? "#818cf8" : "#4f46e5";
        mirrorHue = isDark ? "#a855f7" : "#7e22ce";
        speedMult = 1.6;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const rBase = Math.min(width, height) * 0.38;
      const tiltFactor = 0.45 + currentTiltY * 0.4;

      globalAngle += 0.002 * speedMult;

      // Dimensions for the 2 Concentric / Contiguous Virtual Memory Tracks
      const rInner = rBase * 0.82; // Track A: Primary Virtual Memory Space [0..N-1]
      const rOuter = rBase * 1.08; // Track B: Mirror Virtual Memory Space [N..2N-1]

      // 1. Draw Physical Memory Center Frame (Single memfd_create shared buffer)
      const rCore = rBase * 0.35;
      ctx.beginPath();
      ctx.ellipse(cx + currentTiltX * 35, cy, rCore, rCore * tiltFactor, 0, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(241, 245, 249, 0.9)";
      ctx.fill();
      ctx.strokeStyle = isDark ? "rgba(51, 65, 85, 0.6)" : "rgba(203, 213, 225, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Core Physical Label
      ctx.font = "9px ui-monospace, SFMono-Regular, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isDark ? "rgba(148, 163, 184, 0.8)" : "rgba(71, 85, 105, 0.9)";
      ctx.fillText("PHYSICAL RAM", cx + currentTiltX * 35, cy - 6);
      ctx.fillStyle = isDark ? "#38bdf8" : "#0284c7";
      ctx.fillText("memfd_create(1x)", cx + currentTiltX * 35, cy + 8);

      // 2. Draw Virtual Memory Ring Tracks
      // Track A (Primary Buffer): Cyan
      ctx.beginPath();
      ctx.ellipse(cx + currentTiltX * 35, cy, rInner, rInner * tiltFactor, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(6, 182, 212, 0.28)" : "rgba(2, 132, 199, 0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Track B (Mirror Buffer - MAP_FIXED): Indigo
      ctx.beginPath();
      ctx.ellipse(cx + currentTiltX * 35, cy, rOuter, rOuter * tiltFactor, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.32)" : "rgba(79, 70, 229, 0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3. Draw 16 Memory Page Aliases connecting Track A & Track B to Physical Core
      const SLOTS = 16;
      for (let s = 0; s < SLOTS; s++) {
        const slotAngle = (s / SLOTS) * Math.PI * 2 + globalAngle;
        const cosA = Math.cos(slotAngle);
        const sinA = Math.sin(slotAngle);

        const xCore = cx + cosA * rCore + currentTiltX * 35;
        const yCore = cy + sinA * rCore * tiltFactor;

        const xInner = cx + cosA * rInner + currentTiltX * 35;
        const yInner = cy + sinA * rInner * tiltFactor;

        const xOuter = cx + cosA * rOuter + currentTiltX * 35;
        const yOuter = cy + sinA * rOuter * tiltFactor;

        const depth = (sinA + 1) / 2; // 0 = back, 1 = front

        // Virtual-to-Physical MMU Mapping Line (demonstrates 2 virtual addresses mapping to 1 physical slot)
        ctx.beginPath();
        ctx.moveTo(xInner, yInner);
        ctx.lineTo(xCore, yCore);
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${0.06 + depth * 0.12})`
          : `rgba(2, 132, 199, ${0.05 + depth * 0.08})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Connection between Primary Virtual Slot and Mirror Virtual Slot
        ctx.beginPath();
        ctx.moveTo(xInner, yInner);
        ctx.lineTo(xOuter, yOuter);
        ctx.strokeStyle = isDark
          ? `rgba(129, 140, 248, ${0.15 + depth * 0.25})`
          : `rgba(79, 70, 229, ${0.12 + depth * 0.2})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Slot Tick Heads on Track A
        ctx.beginPath();
        ctx.arc(xInner, yInner, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = primaryHue;
        ctx.globalAlpha = 0.4 + depth * 0.6;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Slot Tick Heads on Track B (Mirror)
        ctx.beginPath();
        ctx.arc(xOuter, yOuter, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = mirrorHue;
        ctx.globalAlpha = 0.4 + depth * 0.6;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 4. MAP_FIXED Boundary Seam Annotation (at angle ~0, 3 o'clock)
      const seamAngle = globalAngle;
      const seamCos = Math.cos(seamAngle);
      const seamSin = Math.sin(seamAngle);
      const xSeam1 = cx + seamCos * (rInner - 8) + currentTiltX * 35;
      const ySeam1 = cy + seamSin * (rInner - 8) * tiltFactor;
      const xSeam2 = cx + seamCos * (rOuter + 8) + currentTiltX * 35;
      const ySeam2 = cy + seamSin * (rOuter + 8) * tiltFactor;

      ctx.beginPath();
      ctx.moveTo(xSeam1, ySeam1);
      ctx.lineTo(xSeam2, ySeam2);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Boundary Tag
      ctx.font = "bold 8.5px ui-monospace, SFMono-Regular, monospace";
      ctx.fillStyle = isDark ? "#38bdf8" : "#0284c7";
      ctx.textAlign = "left";
      ctx.fillText("2x MAP_FIXED BOUNDARY (0 memcpy)", xSeam2 + 6, ySeam2);

      // 5. Draw Streaming Packet Packets across the dual continuum
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.t = (p.t + p.speed * speedMult) % 1;
        }

        // p.t from 0..0.5 traverses Primary Ring (rInner)
        // p.t from 0.5..1.0 traverses Mirror Ring (rOuter)
        const isMirror = p.t >= 0.5;
        const currentR = isMirror ? rOuter : rInner;
        const localAngle = (p.t * 2 * Math.PI * 2) + globalAngle;

        const px = cx + Math.cos(localAngle) * currentR + currentTiltX * 35;
        const py = cy + Math.sin(localAngle) * currentR * tiltFactor;
        const depth = (Math.sin(localAngle) + 1) / 2;

        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.8 + depth * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = isMirror ? mirrorHue : primaryHue;
        ctx.globalAlpha = 0.35 + depth * 0.65;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 6. Contiguous Wrap-Around Write Payload (Demonstrating multi-slot linear write across boundary)
      if (!prefersReducedMotion) {
        contiguousPacketT = (contiguousPacketT + 0.002 * speedMult) % 1;
      }

      // Draw contiguous message spanning across the boundary
      const spanSteps = 7;
      for (let s = 0; s < spanSteps; s++) {
        const stepT = (contiguousPacketT + (s * 0.012)) % 1;
        const inMirror = stepT >= 0.5;
        const rTrack = inMirror ? rOuter : rInner;
        const angle = (stepT * 4 * Math.PI) + globalAngle;

        const xSpan = cx + Math.cos(angle) * rTrack + currentTiltX * 35;
        const ySpan = cy + Math.sin(angle) * rTrack * tiltFactor;

        ctx.beginPath();
        ctx.arc(xSpan, ySpan, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = inMirror ? "#a855f7" : "#06b6d4";
        ctx.shadowColor = inMirror ? "#a855f7" : "#06b6d4";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
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
    <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[420px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/60 backdrop-blur-xs p-2">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />

      {/* Top Left: Memory Architecture Monospace Telemetry */}
      <div className="absolute top-3 left-4 flex flex-col gap-0.5 font-mono text-[0.65rem] text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/60 pointer-events-none">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>VIRTUAL MEMORY DUAL MIRROR</span>
        </div>
        <div>Base Mapping: <span className="text-cyan-600 dark:text-cyan-400">0x7f00 [0 .. N-1]</span></div>
        <div>Mirror Mapping: <span className="text-indigo-600 dark:text-indigo-400">MAP_FIXED [N .. 2N-1]</span></div>
      </div>

      {/* Bottom Right: Systems Zero-Copy Invariant */}
      <div className="absolute bottom-3 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/60 font-mono text-[0.65rem] text-slate-600 dark:text-slate-300 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>Contiguous Wrap-Around :: 0 Split Writes</span>
      </div>
    </div>
  );
}
