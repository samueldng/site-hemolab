"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function GSAPRouteListener() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // When route changes, refresh ScrollTrigger after components have mounted
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return null;
}

export default function GlobalGSAPRefresh() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.ticker.lagSmoothing(1000, 16);
        ScrollTrigger.config({ ignoreMobileResize: true });

        let resizeTimer: NodeJS.Timeout;

        // Create a ResizeObserver for the body to catch any dynamic height changes
        // caused by lazy-loaded images, fonts or accordions.
        const observer = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 150); // Small debounce to avoid thrashing
        });

        observer.observe(document.body);

        return () => {
            observer.disconnect();
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <Suspense fallback={null}>
            <GSAPRouteListener />
        </Suspense>
    );
}
