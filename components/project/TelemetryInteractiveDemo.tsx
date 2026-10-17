"use client";

import { useState } from "react";
import { Activity, Gauge, Server, HardDrive, Cpu, ShieldCheck } from "lucide-react";

export default function TelemetryInteractiveDemo() {
    const [frequency, setFrequency] = useState<number>(100); // 100 Hz
    const [backpressure, setBackpressure] = useState<number>(25); // 25%
    const [allocator, setAllocator] = useState<"jemalloc" | "mimalloc">("jemalloc");

    // Dynamic Gzip level calculation with hysteresis
    let gzipLevel = 1;
    let gzipLabel = "Level 1 (Low Overhead)";
    let gzipColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/30";

    if (backpressure > 70) {
        gzipLevel = 9;
        gzipLabel = "Level 9 (Max Ratio - Backpressure Active)";
        gzipColor = "text-rose-500 bg-rose-500/10 border-rose-500/30";
    } else if (backpressure > 35) {
        gzipLevel = 5;
        gzipLabel = "Level 5 (Balanced Adaptation)";
        gzipColor = "text-amber-500 bg-amber-500/10 border-amber-500/30";
    }

    // Dynamic telemetry calculations
    const activeCollectors = 9;
    const pointsPerSec = frequency * activeCollectors;
    const estimatedThroughput = (pointsPerSec * 142) / 1024; // KB/s

    // Memory Allocator metrics
    const jemallocRss = 53; // MB
    const mimallocRss = 266; // MB
    const currentRss = allocator === "jemalloc" ? jemallocRss : mimallocRss;

    return (
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl overflow-hidden relative isolate my-8">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-indigo-500/20 pb-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 mb-2">
                        <Activity className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
                        Interactive Systems Architecture Lab
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
                        YATAL Telemetry & Allocator Simulator
                    </h2>
                    <p className="text-sm text-slate-300 mt-1 max-w-xl">
                        Simulate the Linux kernel zero-allocation hot path, adaptive backpressure compression, and concurrent allocator decay mechanics under live HPC datacenter loads.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/80">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-medium text-slate-300">
                        Zero-Unsafe Core: <strong className="text-emerald-400">100% Safe Rust</strong>
                    </span>
                </div>
            </div>

            {/* Interactive Controls & Real-Time Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Control 1: Frequency & Backpressure */}
                <div className="space-y-6 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                                <Gauge className="w-4 h-4 text-indigo-400" />
                                Metric Scraping Frequency
                            </label>
                            <span className="text-sm font-mono font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-lg border border-indigo-500/30">
                                {frequency} Hz
                            </span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="500"
                            step="10"
                            value={frequency}
                            onChange={(e) => setFrequency(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                            <span>10 Hz (Low Power)</span>
                            <span>250 Hz (High Density)</span>
                            <span>500 Hz (Burst Stress)</span>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                                <Server className="w-4 h-4 text-blue-400" />
                                Network Queue Backpressure
                            </label>
                            <span className={`text-sm font-mono font-bold px-2.5 py-0.5 rounded-lg border ${gzipColor}`}>
                                {backpressure}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={backpressure}
                            onChange={(e) => setBackpressure(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                            <span>0% (Empty Queue)</span>
                            <span>50% (Sustained Ingestion)</span>
                            <span>100% (Saturated Exporter)</span>
                        </div>
                    </div>

                    {/* Adaptive Compression Status */}
                    <div className="pt-3 border-t border-slate-700/60">
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Adaptive Dynamic Compression Engine
                        </div>
                        <div className={`p-3.5 rounded-xl border flex items-center justify-between ${gzipColor}`}>
                            <div>
                                <div className="text-sm font-bold">Gzip Level: {gzipLevel}</div>
                                <div className="text-xs opacity-80">{gzipLabel}</div>
                            </div>
                            <div className="text-right font-mono text-xs">
                                <div>Ratio: ~{1 + gzipLevel * 0.75}x</div>
                                <div className="text-[10px] opacity-75">CPU vs Network Balance</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Control 2: Allocator Research (jemalloc vs mimalloc) */}
                <div className="space-y-6 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                                <HardDrive className="w-4 h-4 text-purple-400" />
                                Memory Allocator Research Comparison
                            </label>
                            <span className="text-xs text-purple-300 font-mono">Section 4.3 Thesis Research</span>
                        </div>

                        {/* Allocator Toggle Buttons */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button
                                type="button"
                                onClick={() => setAllocator("jemalloc")}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${allocator === "jemalloc"
                                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                                    }`}
                            >
                                jemalloc (Production)
                            </button>
                            <button
                                type="button"
                                onClick={() => setAllocator("mimalloc")}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${allocator === "mimalloc"
                                    ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30"
                                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                                    }`}
                            >
                                mimalloc (Evaluated)
                            </button>
                        </div>

                        {/* Dynamic Memory Footprint Comparison */}
                        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-300">Operational RSS Memory Footprint:</span>
                                <span className={`font-mono font-bold text-sm ${allocator === "jemalloc" ? "text-emerald-400" : "text-rose-400"}`}>
                                    ~{currentRss} MB RSS
                                </span>
                            </div>

                            {/* Visual Bar Indicator */}
                            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${allocator === "jemalloc" ? "bg-emerald-500 w-[20%]" : "bg-rose-500 w-[100%]"
                                        }`}
                                />
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                                {allocator === "jemalloc" ? (
                                    <>
                                        <strong className="text-emerald-400 font-semibold">Active Decay Purging:</strong> Background decay threads (`background_thread: true`) trigger asynchronous `madvise(MADV_DONTNEED)`, releasing 46%+ memory back to the Linux kernel during lulls.
                                    </>
                                ) : (
                                    <>
                                        <strong className="text-rose-400 font-semibold">Memory Pinning Trap:</strong> `mimalloc` thread caches hold deallocated vector chunks permanently in mapped pages without OS return, causing RSS to remain trapped at peak usage.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Zero Allocation Verification Badge */}
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                            <div>
                                <div className="text-xs font-bold text-white">Zero-Allocation Hot Path</div>
                                <div className="text-[11px] text-slate-400">SmallVec Stack Inlining + LOCAL_POOL</div>
                            </div>
                        </div>
                        <div className="text-right font-mono">
                            <span className="text-xs font-bold text-emerald-400">0 Heap Allocs</span>
                            <div className="text-[10px] text-slate-400">Per Ingestion Tick</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-indigo-500/20">
                <div className="p-3">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        Sample Throughput
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-mono text-white">
                        {pointsPerSec.toLocaleString()} <span className="text-xs font-normal text-slate-400">pts/s</span>
                    </div>
                </div>

                <div className="p-3">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        Peak Serialization
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
                        &gt; 1.35M <span className="text-xs font-normal text-slate-400">pts/s</span>
                    </div>
                </div>

                <div className="p-3">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-blue-400" />
                        Disk Spooling
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-mono text-blue-300">
                        io_uring <span className="text-xs font-normal text-slate-400">Native</span>
                    </div>
                </div>

                <div className="p-3">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                        Estimated Bandwidth
                    </div>
                    <div className="text-lg sm:text-xl font-bold font-mono text-purple-300">
                        ~{estimatedThroughput.toFixed(1)} <span className="text-xs font-normal text-slate-400">KB/s</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
