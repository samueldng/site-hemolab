"use client";

import * as React from "react";
import { Phone } from "lucide-react";

const WA_URL = "https://wa.me/+5599981866145?text=Olá!%20Gostaria%20de%20agendar%20uma%20coleta%20domiciliar.";

export default function FloatingActionButton() {
    const [visible, setVisible] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    // Slide-in after initial page load
    React.useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            id="fab-coleta-domiciliar"
            className="fixed bottom-6 right-5 z-50 flex items-center gap-0"
            style={{
                transform: visible ? "translateY(0)" : "translateY(120px)",
                opacity: visible ? 1 : 0,
                transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
            }}
        >
            {/* Expandable label — slides in on hover */}
            <div
                aria-hidden
                style={{
                    maxWidth: hovered ? "200px" : "0px",
                    opacity: hovered ? 1 : 0,
                    transition: "max-width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    marginRight: hovered ? "10px" : "0px",
                }}
            >
                <div className="dark:bg-hemo-dark/90 bg-white/95 backdrop-blur-xl rounded-2xl px-4 py-3 border dark:border-hemo-lime/15 border-black/8 shadow-xl">
                    <p className="font-bold text-sm dark:text-white text-hemo-dark leading-tight">Coleta Domiciliar</p>
                    <p className="text-hemo-lime text-[11px] font-semibold">Agende pelo WhatsApp</p>
                </div>
            </div>

            {/* Main FAB button */}
            <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                aria-label="Agendar Coleta Domiciliar pelo WhatsApp"
                className="relative flex items-center justify-center w-16 h-16 rounded-full bg-hemo-red text-white shadow-2xl shadow-hemo-red/40 animate-pulse-glow hover:bg-hemo-red-dark active:scale-95 transition-all duration-200 group select-none"
                style={{
                    transform: hovered ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease",
                }}
            >
                {/* Ripple ring */}
                <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-hemo-red/40"
                    style={{
                        animation: "fabRipple 2.5s ease-out infinite",
                    }}
                />

                <Phone size={26} className="relative z-10 drop-shadow" />

                {/* Badge counter — "24h" pill on top-right */}
                <span
                    aria-hidden
                    className="absolute -top-1 -right-1 bg-hemo-lime text-hemo-dark text-[10px] font-black leading-none px-1.5 py-0.5 rounded-full shadow border-2 border-white dark:border-hemo-dark"
                >
                    24h
                </span>
            </a>
        </div>
    );
}
