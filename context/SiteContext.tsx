import { createContext, useContext, ReactNode } from "react";
import { siteData } from "@/lib/data";

type SiteData = typeof siteData;

const SiteContext = createContext<SiteData | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  return (
    <SiteContext.Provider value={siteData}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSiteContext must be used within a SiteProvider");
  }
  return context;
}
