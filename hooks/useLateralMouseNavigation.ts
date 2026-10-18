"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const SESSION_KEY = "portfolio_internal_nav_depth";

/**
 * Custom hook to enable lateral mouse button navigation (Mouse Button 4 / Back arrow,
 * and Mouse Button 5 / Forward arrow).
 *
 * Browsers and mouse drivers on Windows and Linux often fail to trigger native back
 * navigation in modern web applications. Furthermore, when a project page is accessed
 * directly or in a new tab, standard browser history has no prior entries.
 *
 * This hook:
 * 1. Intercepts Mouse Button 3 (XButton1 / Back) and Mouse Button 4 (XButton2 / Forward).
 * 2. Navigates back if previous internal history exists.
 * 3. Gracefully falls back to "/#projects" if no internal history exists on a project page,
 *    mirroring the "Back to Portfolio" arrow button.
 * 4. Debounces and guards against double navigation with native popstate events.
 */
export function useLateralMouseNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const pathnameRef = useRef(pathname);
  const routerRef = useRef(router);
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
    routerRef.current = router;
  }, [pathname, router]);

  // Track session internal navigation depth
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (prevPathnameRef.current === null) {
        prevPathnameRef.current = pathname;
        const depth = parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10);
        if (depth === 0) {
          sessionStorage.setItem(SESSION_KEY, "1");
        }
      } else if (prevPathnameRef.current !== pathname) {
        prevPathnameRef.current = pathname;
        const depth = parseInt(sessionStorage.getItem(SESSION_KEY) || "1", 10);
        sessionStorage.setItem(SESSION_KEY, String(depth + 1));
      }
    } catch {
      // Safe fallback if sessionStorage is inaccessible
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastPopstateTime = 0;
    let lastNavTime = 0;

    const onPopState = () => {
      lastPopstateTime = Date.now();
      try {
        const currentDepth = parseInt(sessionStorage.getItem(SESSION_KEY) || "1", 10);
        if (currentDepth > 1) {
          sessionStorage.setItem(SESSION_KEY, String(currentDepth - 1));
        }
      } catch {
        // Safe fallback
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // 3 = Mouse Back (XButton1), 4 = Mouse Forward (XButton2)
      if (e.button === 3 || e.button === 4) {
        e.preventDefault();
      }
    };

    const handleAuxClick = (e: MouseEvent) => {
      if (e.button === 3 || e.button === 4) {
        e.preventDefault();
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button !== 3 && e.button !== 4) return;

      e.preventDefault();

      const now = Date.now();

      // Debounce rapid clicks within 350ms
      if (now - lastNavTime < 350) return;

      // If native popstate fired immediately prior (< 300ms), avoid duplicate back
      if (now - lastPopstateTime < 300) return;

      lastNavTime = now;

      if (e.button === 3) {
        // Lateral Back Button
        let hasInternalHistory = false;
        try {
          const depth = parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10);
          hasInternalHistory = depth > 1;
        } catch {
          // Fallback check
          hasInternalHistory =
            window.history.length > 1 &&
            !!document.referrer &&
            document.referrer.startsWith(window.location.origin);
        }

        const sameOriginReferrer =
          typeof document !== "undefined" &&
          !!document.referrer &&
          document.referrer.startsWith(window.location.origin);

        const currentPath = pathnameRef.current || window.location.pathname;
        const isSubpage = currentPath !== "/" && currentPath !== "";

        if (hasInternalHistory || (window.history.length > 1 && sameOriginReferrer)) {
          routerRef.current.back();
        } else if (isSubpage) {
          // If on a project page with no in-session history, return to portfolio projects
          routerRef.current.push("/#projects");
        } else if (window.history.length > 1) {
          routerRef.current.back();
        }
      } else if (e.button === 4) {
        // Lateral Forward Button
        routerRef.current.forward();
      }
    };

    window.addEventListener("popstate", onPopState, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("auxclick", handleAuxClick);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("auxclick", handleAuxClick);
    };
  }, []);
}
