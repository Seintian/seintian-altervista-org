import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook to detect whether the component has mounted on the client.
 * Uses useSyncExternalStore to avoid synchronous setState inside useEffect,
 * preventing cascading renders and hydration warnings in React 19.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
