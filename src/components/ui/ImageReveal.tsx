"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    overlayColor?: string;
    direction?: "left" | "right" | "top" | "bottom";
    delay?: number;
    premium?: boolean;
}

export default function ImageReveal({
    src,
    alt,
    width,
    height,
    className = "",
    overlayColor = "var(--color-hemo-red)",
    direction = "right",
    delay = 0,
    premium = true,
}: ImageRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !overlayRef.current || !imageRef.current) return;

            const directionMap = {
                left: { from: "0%", to: "-105%" },
                right: { from: "0%", to: "105%" },
                top: { from: "0%", to: "-105%" },
                bottom: { from: "0%", to: "105%" },
            };

            const axis = direction === "left" || direction === "right" ? "x" : "y";
            const { to } = directionMap[direction];

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.set(imageRef.current, { scale: 1.3 })
                .to(
                    overlayRef.current,
                    {
                        [axis]: to,
                        duration: 1.2,
                        ease: "power4.inOut",
                        delay,
                    }
                )
                .to(
                    imageRef.current,
                    {
                        scale: 1,
                        duration: 1.6,
                        ease: "power3.out",
                    },
                    "-=0.8"
                );

            if (premium) {
                const img = containerRef.current.querySelector("img");
                if (img) {
                    img.classList.add("photo-premium");
                    ScrollTrigger.create({
                        trigger: containerRef.current,
                        start: "top 80%",
                        onEnter: () => img.classList.add("revealed"),
                    });
                }
            }
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className={`image-reveal-container rounded-2xl ${className}`}>
            <div
                ref={overlayRef}
                className="image-reveal-overlay rounded-2xl"
                style={{ backgroundColor: overlayColor }}
            />
            <div ref={imageRef} className="overflow-hidden rounded-2xl">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full h-full object-cover"
                    quality={85}
                />
            </div>
        </div>
    );
}
