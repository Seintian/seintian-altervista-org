import { useQuery } from "@tanstack/react-query";
import { siteData } from "@/lib/data";

type SiteData = typeof siteData;

async function fetchSiteData(): Promise<SiteData> {
  try {
    const response = await fetch("/api/site-data");
    if (!response.ok) {
      console.warn("API request failed, falling back to local data");
      return siteData;
    }
    return response.json();
  } catch (error) {
    console.warn("Fetch error, falling back to local data:", error);
    return siteData;
  }
}

export function useSiteData() {
  return useQuery({
    queryKey: ["siteData"],
    queryFn: fetchSiteData,
  });
}
