"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

export function isTechMatch(techA: string, techB: string): boolean {
  if (!techA || !techB) return false;
  const a = techA.toLowerCase().trim();
  const b = techB.toLowerCase().trim();
  if (a === b) return true;

  // Protect strict distinctions like C vs C++ vs C#
  if ((a === "c" && (b === "c++" || b === "c#")) || (b === "c" && (a === "c++" || a === "c#"))) {
    return false;
  }
  // C matches C23 and ISO C23
  if ((a === "c" && b.includes("c23")) || (b === "c" && a.includes("c23"))) {
    return true;
  }
  // Linux systems matches Linux and io_uring
  if (a.includes("linux") && b.includes("linux")) {
    return true;
  }

  // Substring match for compound phrases like "Algorithms & DS" and "Algorithms"
  if (a.includes(b) || b.includes(a)) {
    if (a.length <= 2 || b.length <= 2) {
      return a === b;
    }
    return true;
  }
  return false;
}

interface ResonanceContextType {
  hoveredTech: string | null;
  selectedTech: string | null;
  activeTech: string | null;
  setHoveredTech: (tech: string | null) => void;
  toggleSelectedTech: (tech: string) => void;
  clearResonance: () => void;
  matchesTech: (techList: string[] | string | undefined) => boolean;
}

const ResonanceContext = createContext<ResonanceContextType | null>(null);

export function ResonanceProvider({ children }: { children: ReactNode }) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const activeTech = selectedTech || hoveredTech;

  const toggleSelectedTech = useCallback((tech: string) => {
    setSelectedTech((prev) => (prev === tech ? null : tech));
  }, []);

  const clearResonance = useCallback(() => {
    setSelectedTech(null);
    setHoveredTech(null);
  }, []);

  const matchesTech = useCallback(
    (techList: string[] | string | undefined): boolean => {
      if (!activeTech || !techList) return false;
      if (Array.isArray(techList)) {
        return techList.some((tech) => isTechMatch(tech, activeTech));
      }
      return isTechMatch(techList, activeTech);
    },
    [activeTech]
  );

  const value = useMemo(
    () => ({
      hoveredTech,
      selectedTech,
      activeTech,
      setHoveredTech,
      toggleSelectedTech,
      clearResonance,
      matchesTech,
    }),
    [hoveredTech, selectedTech, activeTech, toggleSelectedTech, clearResonance, matchesTech]
  );

  return <ResonanceContext.Provider value={value}>{children}</ResonanceContext.Provider>;
}

export function useResonance() {
  const context = useContext(ResonanceContext);
  if (!context) {
    throw new Error("useResonance must be used within a ResonanceProvider");
  }
  return context;
}
