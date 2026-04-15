"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Detects device performance capability and applies `body.low-perf` class.
 * Checks: CPU cores, device memory, GPU canvas benchmark, reduced-motion.
 * Returns `isLowPerf` for conditional GSAP logic.
 */
export function useDevicePerf() {
    const [isLowPerf, setIsLowPerf] = useState(false);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        let score = 0;

        // 1. CPU cores (1st gen i5 = 2-4 cores)
        const cores = navigator.hardwareConcurrency || 4;
        if (cores <= 4) score += 2;

        // 2. Device memory (Chrome-only API)
        const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
        if (mem !== undefined && mem <= 4) score += 2;

        // 3. Reduced motion preference
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            score += 3;
        }

        // 4. Quick GPU benchmark: draw 2000 rects on offscreen canvas
        try {
            const canvas = document.createElement("canvas");
            canvas.width = 200;
            canvas.height = 200;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const t0 = performance.now();
                for (let i = 0; i < 2000; i++) {
                    ctx.fillStyle = `hsl(${i % 360}, 80%, 50%)`;
                    ctx.fillRect(
                        Math.random() * 180,
                        Math.random() * 180,
                        20,
                        20
                    );
                }
                const elapsed = performance.now() - t0;
                // > 16ms for 2000 rects = weak GPU
                if (elapsed > 16) score += 2;
                // > 30ms = very weak
                if (elapsed > 30) score += 1;
            }
        } catch {
            // Canvas failed, assume weak
            score += 2;
        }

        // Threshold: score >= 4 → low performance
        const lowPerf = score >= 4;

        if (lowPerf) {
            document.body.classList.add("low-perf");
            console.log(
                `[Perf] Low-performance device detected (score: ${score}). Heavy effects disabled.`
            );
        } else {
            document.body.classList.remove("low-perf");
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLowPerf(lowPerf);
    }, []);

    return isLowPerf;
}
