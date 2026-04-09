"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    end,
    suffix = "",
    prefix = "",
    duration = 2,
    className = "",
}: AnimatedCounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!counterRef.current || !containerRef.current) return;

            const obj = { value: 0 };

            gsap.to(obj, {
                value: end,
                duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
                    }
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            <span ref={counterRef} className={className}>
                {prefix}0{suffix}
            </span>
        </div>
    );
}
