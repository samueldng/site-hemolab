"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when viewport is below the given breakpoint (default 1024px = lg).
 * Uses matchMedia for efficiency — no resize event polling.
 */
export function useIsMobile(breakpoint = 1024) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        setIsMobile(mql.matches);

        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, [breakpoint]);

    return isMobile;
}
