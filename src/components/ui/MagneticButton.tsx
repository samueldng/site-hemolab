"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    href,
    className = "",
    strength = 0.35,
    onClick,
}: MagneticButtonProps) {
    const btnRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!btnRef.current) return;
            const rect = btnRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btnRef.current, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: "power2.out",
            });
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });
    }, []);

    const Tag = href ? "a" : onClick ? "button" : "div";
    const linkProps = href
        ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined }
        : {};

    return (
        <div className="magnetic-wrap">
            <div
                ref={btnRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <Tag
                    {...linkProps}
                    onClick={onClick}
                    className={`inline-flex items-center justify-center cursor-pointer ${className}`}
                >
                    {children}
                </Tag>
            </div>
        </div>
    );
}
