"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number;
    overlay?: boolean;
}

export default function ParallaxImage({
    src,
    alt,
    className = "",
    speed = 0.3,
    overlay = true,
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !imageRef.current) return;

            gsap.to(imageRef.current, {
                yPercent: speed * 100,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <div ref={imageRef} className="absolute inset-0 -top-[20%] -bottom-[20%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    quality={80}
                    sizes="100vw"
                />
            </div>
            {overlay && <div className="absolute inset-0 gradient-dark-bottom" />}
        </div>
    );
}
