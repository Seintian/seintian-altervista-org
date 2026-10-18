"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Cpu, Zap, Layers, Terminal } from "lucide-react";
import { formatCodeSpans } from "@/lib/formatText";

interface TierData {
  id: number;
  name: string;
  shortName: string;
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
    shortName: "Bounded Micro-Spin",
    hardware: "CPU PAUSE / YIELD (x86_64 & AArch64)",
    latency: "~18 ns",
    syscall: "Zero Syscalls (User-Space Fast Path)",
    descriptionKey: "projects.librbipc.explorer.tier0",
    defaultDescription: "Bounded exponential backoff with CPU pause instructions. Avoids kernel context switches during uncontended and brief contention windows.",
    codeSnippet: `// Tier 0: Fast-path bounded spin loop with pause instructions
for (int i = 0; i < 48; i++) {
    _mm_pause(); // Mitigates CPU pipeline memory order violations
    if (atomic_load_explicit(&slot->sequence, memory_order_acquire) == expected_turn) {
        return RBIPC_OK;
    }
}`,
    color: "text-emerald-500 dark:text-emerald-400",
    accentBg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/40",
  },
  {
    id: 1,
    name: "Tier 1: Hardware-Assisted Wait",
    shortName: "WAITPKG (UMWAIT)",
    hardware: "Intel WAITPKG (UMWAIT C0.1) & ARM64 WFET",
    latency: "40 – 70 ns",
    syscall: "User-Level Monitor Wait (C0.1 sub-state)",
    descriptionKey: "projects.librbipc.explorer.tier1",
    defaultDescription: "Arms CPU cache monitoring on `&slot->sequence` via `UMONITOR`. Enters the ultra-low-latency C0.1 core sub-state, reducing core power while maintaining hardware-level wakeups.",
    codeSnippet: `// Tier 1: Hardware-assisted cacheline monitoring via WAITPKG
_umonitor((void*)&slot->sequence);

// UMWAIT in C0.1 sub-state with bounded cycle timeout
unsigned int control = 0; // Selects C0.1 low-latency state
_umwait(control, __rdtsc() + timeout_cycles);`,
    color: "text-cyan-500 dark:text-cyan-400",
    accentBg: "bg-cyan-500/10",
    borderColor: "border-cyan-500/40",
  },
  {
    id: 2,
    name: "Tier 2: Asymmetric Dekker & futex2",
    shortName: "Dekker & futex2",
    hardware: "sys_membarrier(2) + sys_futex_waitv (Linux 5.16+)",
    latency: "~299 ns (p50)",
    syscall: "Vectorized 64-bit futex2 multi-wait",
    descriptionKey: "projects.librbipc.explorer.tier2",
    defaultDescription: "Eliminates `MFENCE` store-buffer stalls using asymmetric memory barriers. Executes vectorized 64-bit multi-waits on slot sequences and shutdown flags simultaneously.",
    codeSnippet: `// Tier 2: Asymmetric Dekker barrier + Linux 5.16+ vectorized futex2
struct futex_waitv waiters[2] = {
    { .val = expected_seq, .uaddr = (uintptr_t)&slot->sequence, .flags = FUTEX_32 },
    { .val = 0,            .uaddr = (uintptr_t)&rb->shutdown,       .flags = FUTEX_32 }
};

// Direct vectorized kernel wait without global lock contention
syscall(SYS_futex_waitv, waiters, 2, 0, NULL, CLOCK_MONOTONIC);`,
    color: "text-indigo-500 dark:text-indigo-400",
    accentBg: "bg-indigo-500/10",
    borderColor: "border-indigo-500/40",
  },
  {
    id: 3,
    name: "Tier 3: Passive Suspension & FUTEX_WAKE_OP",
    shortName: "Passive Sleep",
    hardware: "Linux SYS_futex (FUTEX_WAKE_OP dual-word atomic)",
    latency: "~1.2 µs",
    syscall: "Deterministic Kernel Sleep (0.13% Idle CPU)",
    descriptionKey: "projects.librbipc.explorer.tier3",
    defaultDescription: "Suspends dormant consumer threads into kernel wait-queues without spurious wakeups. Atomically evaluates slot tickets and wakes subsequent wait-queues in a single system call.",
    codeSnippet: `// Tier 3: Atomic dual-queue wake upon producer commit
syscall(SYS_futex, &slot->sequence, FUTEX_WAKE_OP, 1, 1,
        &rb->waiters_count, FUTEX_OP(FUTEX_OP_ADD, -1, FUTEX_OP_CMP_GT, 0));`,
    color: "text-amber-500 dark:text-amber-400",
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
            <span>{t("projects.librbipc.explorer.badge", "Systems Architecture Dossier")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>{t("projects.librbipc.explorer.title", "4-Tier Hybrid Synchronization State Machine")}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>ISO C23 :: Hardware Validated</span>
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
              className={`flex flex-col justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer min-h-[84px] ${
                isSelected
                  ? `${item.borderColor} ${item.accentBg} shadow-sm ring-1 ring-cyan-500/30 scale-[1.02]`
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${item.color}`}>
                  Tier {item.id}
                </span>
                <span className="text-[0.68rem] font-mono whitespace-nowrap px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  {item.latency}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 leading-tight">
                {item.shortName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tier Deep-Dive Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${tier.borderColor} ${tier.accentBg} transition-all duration-300 mb-6`}>
        {/* Tier Title & Technical Metrics Grid */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Zap className={`w-5 h-5 ${tier.color} shrink-0`} />
            <span>{tier.name}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <span className="text-slate-400 block text-[0.68rem] uppercase tracking-wider mb-1">Latency Target</span>
              <strong className={`text-sm ${tier.color}`}>{tier.latency}</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <span className="text-slate-400 block text-[0.68rem] uppercase tracking-wider mb-1">Kernel Interface</span>
              <strong className="text-slate-900 dark:text-slate-100 text-xs block leading-relaxed">{tier.syscall}</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <span className="text-slate-400 block text-[0.68rem] uppercase tracking-wider mb-1">Hardware Target</span>
              <strong className="text-slate-900 dark:text-slate-100 text-xs block leading-relaxed">{tier.hardware}</strong>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {formatCodeSpans(t(tier.descriptionKey, tier.defaultDescription))}
        </p>

        {/* C23 Implementation Code Block - Reset scroll on tier change */}
        <div key={tier.id} className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200 border border-slate-800 shadow-inner overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[0.68rem] text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>librbipc / sync_engine.c</span>
            </div>
            <span className="font-semibold text-slate-500">ISO C23</span>
          </div>
          <pre className="overflow-x-auto py-2 px-1 text-xs leading-relaxed text-cyan-300 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <code>{tier.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
