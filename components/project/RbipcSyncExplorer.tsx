"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Cpu, Zap, Layers } from "lucide-react";

interface TierData {
  id: number;
  name: string;
  hardware: string;
  latency: string;
  syscall: string;
  descriptionKey: string;
  defaultDescription: string;
  codeSnippet: string;
  color: string;
  accentBg: string;
  borderColor: string;
}

const TIERS: TierData[] = [
  {
    id: 0,
    name: "Tier 0: Bounded Micro-Spin",
    hardware: "CPU PAUSE / YIELD (x86_64 & AArch64)",
    latency: "~18 ns",
    syscall: "Zero Syscalls (User-space Fast Path)",
    descriptionKey: "projects.librbipc.explorer.tier0",
    defaultDescription: "Executes bounded exponential backoff with CPU pause instructions. Completely avoids kernel context switches on uncontended and brief contention windows.",
    codeSnippet: `for (int i = 0; i < 48; i++) {\n    _mm_pause(); // Prevents CPU pipeline memory order violations\n    if (atomic_load_explicit(&slot->seq, memory_order_acquire) == turn)\n        return true;\n}`,
    color: "text-emerald-500",
    accentBg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/40",
  },
  {
    id: 1,
    name: "Tier 1: Hardware-Assisted Wait",
    hardware: "Intel WAITPKG (UMWAIT C0.1) & ARM64 WFET",
    latency: "40 – 70 ns",
    syscall: "User-Level Hardware Monitor (C0.1 sub-state)",
    descriptionKey: "projects.librbipc.explorer.tier1",
    defaultDescription: "Arms CPU cache monitoring on &slot->sequence via UMONITOR. Enters ultra-low-latency C0.1 core sub-state, dropping core power while retaining instant hardware wakeups.",
    codeSnippet: `_umonitor((void*)&slot->sequence);\n// UMWAIT in C0.1 state with nanosecond timeout\nunsigned int control = 0; // C0.1 sub-state\n_umwait(control, __rdtsc() + timeout_cycles);`,
    color: "text-cyan-500",
    accentBg: "bg-cyan-500/10",
    borderColor: "border-cyan-500/40",
  },
  {
    id: 2,
    name: "Tier 2: Asymmetric Dekker & futex2",
    hardware: "sys_membarrier(2) + sys_futex_waitv (Linux 5.16+)",
    latency: "~299 ns (p50)",
    syscall: "Vectorized 64-bit futex2 multi-wait",
    descriptionKey: "projects.librbipc.explorer.tier2",
    defaultDescription: "Eliminates MFENCE store-buffer stalls using asymmetric memory barriers. Performs vectorized 64-bit multi-waits on slot sequences and shutdown flags simultaneously.",
    codeSnippet: `struct futex_waitv waiters[2] = {\n    { .val = expected_seq, .uaddr = (uintptr_t)&slot->sequence, .flags = FUTEX_32 },\n    { .val = 0,            .uaddr = (uintptr_t)&rb->shutdown,       .flags = FUTEX_32 }\n};\nsyscall(SYS_futex_waitv, waiters, 2, 0, NULL, CLOCK_MONOTONIC);`,
    color: "text-indigo-500",
    accentBg: "bg-indigo-500/10",
    borderColor: "border-indigo-500/40",
  },
  {
    id: 3,
    name: "Tier 3: Passive Suspension & FUTEX_WAKE_OP",
    hardware: "Linux SYS_futex (FUTEX_WAKE_OP dual-word atomic)",
    latency: "~1.2 µs",
    syscall: "Deterministic Deep Sleep (0.13% Idle CPU)",
    descriptionKey: "projects.librbipc.explorer.tier3",
    defaultDescription: "Transfers dormant consumers to kernel wait-queues without spurious wakeups. Atomically evaluates slot tickets and wakes subsequent wait-queues in a single syscall.",
    codeSnippet: `// Atomic dual-queue wake: wakes thread on slot while modifying ticket\nsyscall(SYS_futex, &slot->sequence, FUTEX_WAKE_OP, 1, 1,\n        &rb->waiters_count, FUTEX_OP(FUTEX_OP_ADD, -1, FUTEX_OP_CMP_GT, 0));`,
    color: "text-amber-500",
    accentBg: "bg-amber-500/10",
    borderColor: "border-amber-500/40",
  },
];

export default function RbipcSyncExplorer() {
  const { t } = useTranslation();
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const tier = TIERS[selectedTier];

  return (
    <section className="bg-white dark:bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors my-8 relative overflow-hidden isolate">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 mb-2">
            <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{t("projects.librbipc.explorer.badge", "Interactive Systems Architecture")}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <span>{t("projects.librbipc.explorer.title", "4-Tier Hybrid Synchronization State Machine")}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>ISO C23 :: Zero Spin Squelch</span>
        </div>
      </div>

      {/* Tier Selector Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {TIERS.map((item) => {
          const isSelected = item.id === selectedTier;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedTier(item.id)}
              className={`flex flex-col p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? `${item.borderColor} ${item.accentBg} shadow-sm scale-[1.02]`
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${item.color}`}>
                  Tier {item.id}
                </span>
                <span className="text-[0.65rem] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {item.latency}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 line-clamp-1">
                {item.name.replace(/^Tier \d+:\s*/, "")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tier Deep-Dive Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${tier.borderColor} ${tier.accentBg} transition-all duration-300 mb-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
              <Zap className={`w-5 h-5 ${tier.color}`} />
              <span>{tier.name}</span>
            </h3>
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
              Hardware / Instruction: <strong className="text-slate-800 dark:text-slate-200">{tier.hardware}</strong>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
              Latency: <strong className={tier.color}>{tier.latency}</strong>
            </div>
            <div className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
              Kernel: <strong className="text-slate-900 dark:text-slate-100">{tier.syscall}</strong>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {t(tier.descriptionKey, tier.defaultDescription)}
        </p>

        {/* C23 Implementation Code Block */}
        <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[0.65rem] text-slate-500 uppercase tracking-widest">
            <span>librbipc / sync_engine.c</span>
            <span>ISO C23</span>
          </div>
          <pre className="leading-relaxed text-cyan-300">
            <code>{tier.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
