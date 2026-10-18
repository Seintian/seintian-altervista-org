"use client";

import React, { useEffect, useRef } from "react";
import { Cpu } from "lucide-react";

interface Particle {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    currentX: number;
    currentY: number;
    progress: number;
    speed: number;
    type: "local" | "remote" | "snoop";
    waypoints?: Array<{ x: number; y: number }>;
    currentWaypointIndex?: number;
    color: string;
    size: number;
    nodeOrigin: 0 | 1;
}

export default function NumaArchitectureCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);


    // Track mouse coordinates for interactive probing
    const mousePosRef = useRef<{ x: number; y: number } | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mousePosRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleMouseLeave = () => {
        mousePosRef.current = null;
        
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let nextParticleId = 0;
        let lastSpawnTime = 0;

        // Resize handler with High-DPI support
        let width = 0;
        let height = 0;

        const handleResize = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpr, dpr);
        };

        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });
        resizeObserver.observe(container);
        handleResize();

        // Animation Loop
        const render = (time: number) => {
            if (width === 0 || height === 0) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const isDark = document.documentElement.classList.contains("dark");

            // Clean canvas
            ctx.clearRect(0, 0, width, height);

            // Compute Key Node Coordinates
            const centerY = height * 0.48;
            const node0CenterX = width * 0.22;
            const node1CenterX = width * 0.78;

            const socketWidth = Math.min(width * 0.32, 280);
            const socketHeight = Math.min(height * 0.62, 220);

            const node0Left = node0CenterX - socketWidth / 2;
            const node0Top = centerY - socketHeight / 2;

            const node1Left = node1CenterX - socketWidth / 2;
            const node1Top = centerY - socketHeight / 2;

            // IMC (Integrated Memory Controller) positions
            const imc0 = { x: node0CenterX + socketWidth * 0.35, y: centerY };
            const imc1 = { x: node1CenterX - socketWidth * 0.35, y: centerY };

            // RAM Bank positions
            const ram0 = { x: node0Left - 28, y: centerY };
            const ram1 = { x: node1Left + socketWidth + 28, y: centerY };

            // Check mouse hover over nodes
            const mouse = mousePosRef.current;
            let currentHover: "node0" | "node1" | "upi" | null = null;
            if (mouse) {
                if (
                    mouse.x >= node0Left &&
                    mouse.x <= node0Left + socketWidth &&
                    mouse.y >= node0Top &&
                    mouse.y <= node0Top + socketHeight
                ) {
                    currentHover = "node0";
                } else if (
                    mouse.x >= node1Left &&
                    mouse.x <= node1Left + socketWidth &&
                    mouse.y >= node1Top &&
                    mouse.y <= node1Top + socketHeight
                ) {
                    currentHover = "node1";
                } else if (
                    mouse.x >= imc0.x &&
                    mouse.x <= imc1.x &&
                    Math.abs(mouse.y - centerY) < 40
                ) {
                    currentHover = "upi";
                }
            }
            

            // ==========================================
            // 1. Draw Central UPI / Interconnect Fabric
            // ==========================================
            const upiLeft = imc0.x;
            const upiRight = imc1.x;
            const upiWidth = upiRight - upiLeft;

            // Multi-lane bus tracks
            const laneOffsets = [-12, -4, 4, 12];
            ctx.lineWidth = 1.5;

            laneOffsets.forEach((offset, idx) => {
                const laneY = centerY + offset;
                const isHoveredLane = currentHover === "upi";

                ctx.strokeStyle = isHoveredLane
                    ? isDark
                        ? "rgba(245, 158, 11, 0.6)"
                        : "rgba(217, 119, 6, 0.5)"
                    : isDark
                    ? idx % 2 === 0
                        ? "rgba(59, 130, 246, 0.25)"
                        : "rgba(147, 51, 234, 0.25)"
                    : idx % 2 === 0
                    ? "rgba(59, 130, 246, 0.3)"
                    : "rgba(147, 51, 234, 0.3)";

                ctx.beginPath();
                ctx.setLineDash([4, 4]);
                ctx.moveTo(upiLeft, laneY);
                ctx.lineTo(upiRight, laneY);
                ctx.stroke();
                ctx.setLineDash([]);
            });

            // Ambient UPI central bridge glow
            const upiGradient = ctx.createLinearGradient(upiLeft, centerY, upiRight, centerY);
            upiGradient.addColorStop(0, "rgba(59, 130, 246, 0.15)");
            upiGradient.addColorStop(0.5, "rgba(245, 158, 11, 0.25)");
            upiGradient.addColorStop(1, "rgba(147, 51, 234, 0.15)");

            ctx.fillStyle = upiGradient;
            ctx.fillRect(upiLeft, centerY - 18, upiWidth, 36);

            // Interconnect Label in the Center
            ctx.fillStyle = isDark ? "rgba(226, 232, 240, 0.9)" : "rgba(30, 41, 59, 0.9)";
            ctx.font = "bold 9px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("UPI 11.2 GT/s (Ultra Path Interconnect)", (upiLeft + upiRight) / 2, centerY - 28);
            ctx.fillStyle = isDark ? "rgba(245, 158, 11, 0.85)" : "rgba(217, 119, 6, 0.85)";
            ctx.font = "8px monospace";
            ctx.fillText("Cross-Socket Non-Uniform Transit :: ~138 ns", (upiLeft + upiRight) / 2, centerY + 28);

            // ==========================================
            // 2. Draw Sockets (NUMA Node 0 & Node 1)
            // ==========================================
            const drawSocket = (
                nodeIdx: 0 | 1,
                left: number,
                top: number,
                w: number,
                h: number,
                isHovered: boolean
            ) => {
                // Outer Socket Chassis
                ctx.save();
                ctx.fillStyle = isDark
                    ? isHovered
                        ? "rgba(15, 23, 42, 0.85)"
                        : "rgba(15, 23, 42, 0.65)"
                    : isHovered
                    ? "rgba(248, 250, 252, 0.95)"
                    : "rgba(241, 245, 249, 0.8)";

                ctx.strokeStyle = isHovered
                    ? nodeIdx === 0
                        ? "rgba(59, 130, 246, 0.8)"
                        : "rgba(147, 51, 234, 0.8)"
                    : isDark
                    ? "rgba(51, 65, 85, 0.5)"
                    : "rgba(203, 213, 225, 0.8)";
                ctx.lineWidth = isHovered ? 2 : 1;

                // Rounded Rect for Socket
                const radius = 16;
                ctx.beginPath();
                ctx.roundRect(left, top, w, h, radius);
                ctx.fill();
                ctx.stroke();

                // Socket Header Label
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                ctx.font = "bold 11px monospace";
                ctx.fillStyle = nodeIdx === 0
                    ? isDark ? "#60a5fa" : "#2563eb"
                    : isDark ? "#c084fc" : "#9333ea";
                ctx.fillText(`NUMA NODE ${nodeIdx} :: SOCKET ${nodeIdx}`, left + 14, top + 12);

                ctx.font = "9px monospace";
                ctx.fillStyle = isDark ? "rgba(148, 163, 184, 0.8)" : "rgba(100, 116, 139, 0.8)";
                ctx.fillText(nodeIdx === 0 ? "Affinity: CPU 0-7" : "Affinity: CPU 8-15", left + 14, top + 26);

                // CPU Core Cluster (8 Micro-Cores in 2x4 grid)
                const coresStartX = left + 14;
                const coresStartY = top + 44;
                const coreW = (w - 60) / 4;
                const coreH = (h - 96) / 2;

                for (let row = 0; row < 2; row++) {
                    for (let col = 0; col < 4; col++) {
                        const coreId = nodeIdx * 8 + row * 4 + col;
                        const cx = coresStartX + col * (coreW + 4);
                        const cy = coresStartY + row * (coreH + 4);

                        const isCoreActive = Math.sin(time * 0.003 + coreId * 1.5) > 0.1;

                        ctx.fillStyle = isCoreActive
                            ? nodeIdx === 0
                                ? isDark ? "rgba(37, 99, 235, 0.25)" : "rgba(219, 234, 254, 0.8)"
                                : isDark ? "rgba(147, 51, 234, 0.25)" : "rgba(243, 232, 255, 0.8)"
                            : isDark ? "rgba(30, 41, 59, 0.4)" : "rgba(226, 232, 240, 0.5)";

                        ctx.strokeStyle = isCoreActive
                            ? nodeIdx === 0
                                ? isDark ? "rgba(96, 165, 250, 0.5)" : "rgba(59, 130, 246, 0.5)"
                                : isDark ? "rgba(192, 132, 252, 0.5)" : "rgba(147, 51, 234, 0.5)"
                            : isDark ? "rgba(51, 65, 85, 0.3)" : "rgba(203, 213, 225, 0.5)";
                        ctx.lineWidth = 1;

                        ctx.beginPath();
                        ctx.roundRect(cx, cy, coreW, coreH, 4);
                        ctx.fill();
                        ctx.stroke();

                        // Core label
                        ctx.font = "8px monospace";
                        ctx.fillStyle = isDark ? "rgba(203, 213, 225, 0.7)" : "rgba(71, 85, 105, 0.8)";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(`C${coreId}`, cx + coreW / 2, cy + coreH / 2);
                    }
                }

                // Shared L3 Cache Bar at bottom
                const l3Y = top + h - 34;
                const l3W = w - 28;
                ctx.fillStyle = isDark ? "rgba(30, 41, 59, 0.6)" : "rgba(226, 232, 240, 0.8)";
                ctx.strokeStyle = isDark ? "rgba(71, 85, 105, 0.4)" : "rgba(203, 213, 225, 0.8)";
                ctx.beginPath();
                ctx.roundRect(left + 14, l3Y, l3W, 20, 4);
                ctx.fill();
                ctx.stroke();

                ctx.font = "8px monospace";
                ctx.fillStyle = isDark ? "rgba(148, 163, 184, 0.9)" : "rgba(71, 85, 105, 0.9)";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`L3 Unified Cache :: 32 MB (Node ${nodeIdx})`, left + 14 + l3W / 2, l3Y + 10);

                ctx.restore();
            };

            drawSocket(0, node0Left, node0Top, socketWidth, socketHeight, currentHover === "node0");
            drawSocket(1, node1Left, node1Top, socketWidth, socketHeight, currentHover === "node1");

            // ==========================================
            // 3. Draw Local RAM DIMMs & Bus Connections
            // ==========================================
            const drawRamModule = (
                x: number,
                y: number,
                nodeIdx: 0 | 1,
                channelName: string
            ) => {
                const ramW = 16;
                const ramH = socketHeight * 0.7;
                const ramTop = y - ramH / 2;

                ctx.save();
                ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(241, 245, 249, 0.9)";
                ctx.strokeStyle = nodeIdx === 0
                    ? isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(37, 99, 235, 0.5)"
                    : isDark ? "rgba(168, 85, 247, 0.5)" : "rgba(147, 51, 234, 0.5)";
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.roundRect(x - ramW / 2, ramTop, ramW, ramH, 4);
                ctx.fill();
                ctx.stroke();

                // DRAM Chips on module
                const chipCount = 4;
                const chipH = (ramH - 20) / chipCount;
                for (let i = 0; i < chipCount; i++) {
                    const cy = ramTop + 8 + i * chipH;
                    ctx.fillStyle = isDark ? "rgba(51, 65, 85, 0.6)" : "rgba(203, 213, 225, 0.7)";
                    ctx.fillRect(x - ramW / 2 + 3, cy, ramW - 6, chipH - 4);
                }

                // Channel Label
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(-Math.PI / 2);
                ctx.font = "8px monospace";
                ctx.fillStyle = isDark ? "#94a3b8" : "#475569";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(channelName, 0, 0);
                ctx.restore();

                // Bus Link from RAM to Socket IMC
                const socketEdgeX = nodeIdx === 0 ? node0Left : node1Left + socketWidth;
                ctx.strokeStyle = isDark ? "rgba(96, 165, 250, 0.3)" : "rgba(59, 130, 246, 0.3)";
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(x + (nodeIdx === 0 ? ramW / 2 : -ramW / 2), y);
                ctx.lineTo(socketEdgeX, y);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.restore();
            };

            drawRamModule(ram0.x, centerY, 0, "DDR5 Ch. A/B :: 64GB");
            drawRamModule(ram1.x, centerY, 1, "DDR5 Ch. C/D :: 64GB");

            // ==========================================
            // 4. Particle Generation & Simulation
            // ==========================================
            // Spawn new memory traffic packets at periodic intervals
            if (time - lastSpawnTime > 120) {
                lastSpawnTime = time;

                const isRemote = Math.random() < 0.28; // ~28% remote NUMA accesses
                const originNode: 0 | 1 = Math.random() < 0.5 ? 0 : 1;
                const originSocketCenterX = originNode === 0 ? node0CenterX : node1CenterX;
                
                const startCoreX = originSocketCenterX + (Math.random() - 0.5) * (socketWidth * 0.5);
                const startCoreY = centerY - socketHeight * 0.2 + (Math.random() - 0.5) * 30;

                if (!isRemote) {
                    // Local Memory Access: Core -> Local RAM
                    const targetRamX = originNode === 0 ? ram0.x : ram1.x;
                    particles.push({
                        id: nextParticleId++,
                        startX: startCoreX,
                        startY: startCoreY,
                        endX: targetRamX,
                        endY: centerY,
                        currentX: startCoreX,
                        currentY: startCoreY,
                        progress: 0,
                        speed: 0.022 + Math.random() * 0.008, // Fast local access
                        type: "local",
                        color: originNode === 0 ? "#38bdf8" : "#c084fc",
                        size: 3,
                        nodeOrigin: originNode,
                    });
                } else {
                    // Remote NUMA Access: Core -> IMC -> UPI Bridge -> Remote IMC -> Remote RAM
                    const localImcX = originNode === 0 ? imc0.x : imc1.x;
                    const remoteImcX = originNode === 0 ? imc1.x : imc0.x;
                    const remoteRamX = originNode === 0 ? ram1.x : ram0.x;

                    particles.push({
                        id: nextParticleId++,
                        startX: startCoreX,
                        startY: startCoreY,
                        endX: remoteRamX,
                        endY: centerY,
                        currentX: startCoreX,
                        currentY: startCoreY,
                        progress: 0,
                        speed: 0.009 + Math.random() * 0.003, // Slower cross-socket travel
                        type: "remote",
                        waypoints: [
                            { x: localImcX, y: centerY },
                            { x: remoteImcX, y: centerY },
                            { x: remoteRamX, y: centerY },
                        ],
                        currentWaypointIndex: 0,
                        color: "#f59e0b", // Amber warning color for NUMA penalty
                        size: 3.5,
                        nodeOrigin: originNode,
                    });
                }

                // If hovered, spawn extra transaction
                if (currentHover) {
                    particles.push({
                        id: nextParticleId++,
                        startX: originNode === 0 ? node0CenterX : node1CenterX,
                        startY: centerY,
                        endX: originNode === 0 ? ram0.x : ram1.x,
                        endY: centerY,
                        currentX: originNode === 0 ? node0CenterX : node1CenterX,
                        currentY: centerY,
                        progress: 0,
                        speed: 0.03,
                        type: "local",
                        color: "#10b981",
                        size: 3,
                        nodeOrigin: originNode,
                    });
                }
            }

            // Update & Render Particles
            particles.forEach((p) => {
                p.progress += p.speed;

                if (p.type === "local") {
                    p.currentX = p.startX + (p.endX - p.startX) * p.progress;
                    p.currentY = p.startY + (p.endY - p.startY) * p.progress;
                } else if (p.waypoints && p.waypoints.length > 0) {
                    const totalSegments = p.waypoints.length;
                    const segProgress = p.progress * totalSegments;
                    const curSeg = Math.min(Math.floor(segProgress), totalSegments - 1);
                    const segLocalProgress = segProgress - curSeg;

                    const p0 = curSeg === 0 ? { x: p.startX, y: p.startY } : p.waypoints[curSeg - 1];
                    const p1 = p.waypoints[curSeg];

                    p.currentX = p0.x + (p1.x - p0.x) * segLocalProgress;
                    p.currentY = p0.y + (p1.y - p0.y) * segLocalProgress;
                }

                // Draw Particle Glow
                ctx.save();
                ctx.beginPath();
                ctx.arc(p.currentX, p.currentY, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = p.type === "remote" ? 10 : 6;
                ctx.fill();

                // Trailing trace
                ctx.beginPath();
                ctx.arc(p.currentX, p.currentY, p.size * 1.8, 0, Math.PI * 2);
                ctx.fillStyle = p.type === "remote" ? "rgba(245, 158, 11, 0.2)" : "rgba(56, 189, 248, 0.2)";
                ctx.fill();
                ctx.restore();
            });

            // Filter out completed particles
            particles = particles.filter((p) => p.progress < 1);

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 backdrop-blur-md transition-colors shadow-xl group select-none h-[340px] sm:h-[380px] lg:h-[420px]"
        >
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-amber-500/5 to-purple-500/5 pointer-events-none" />

            {/* Top Telemetry Overlay */}
            <div className="absolute top-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm">
                    <Cpu className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>2-Socket NUMA Topology (16 Cores / 128 GB DDR5)</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Local RAM: ~58 ns
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        Remote Cross-UPI: ~138 ns
                    </span>
                </div>
            </div>

            {/* HTML5 Canvas */}
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Bottom Status / Legend */}
            <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pointer-events-none z-10">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        Node 0 Local
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        Node 1 Local
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Cross-Socket Penalty (2.38x)
                    </span>
                </div>

                <div className="text-right hidden sm:block">
                    Interactive Hardware Fabric :: Move cursor to probe
                </div>
            </div>
        </div>
    );
}
