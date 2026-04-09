"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import MagneticButton from "../ui/MagneticButton";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Unidades", href: "#unidades" },
    { label: "Contato", href: "#contato" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.3 });
        // Logo slides in from left
        tl.fromTo(".header-logo", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
        // Nav links stagger from top
        tl.fromTo(".nav-link", { y: -20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.4");
        // CTA pops in
        tl.fromTo(".header-cta", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");
    }, { scope: headerRef });

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-hemo-dark/95 backdrop-blur-xl shadow-2xl shadow-black/30 py-2 border-b border-hemo-lime/10"
                : "bg-hemo-dark/70 backdrop-blur-md py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo — white filtered for high contrast */}
                <MagneticButton href="#home" strength={0.2}>
                    <div className="header-logo">
                        <Image
                            src="/images/logo-hemolab-1024x434 1.png"
                            alt="Hemolab - Laboratório de Análises Clínicas"
                            width={180}
                            height={76}
                            className="h-11 md:h-14 w-auto brightness-0 invert drop-shadow-[0_0_12px_rgba(164,205,57,0.3)]"
                            priority
                        />
                    </div>
                </MagneticButton>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="nav-link relative px-4 py-2 text-sm font-semibold text-white hover:text-hemo-lime transition-colors duration-300 group"
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-hemo-lime group-hover:w-3/4 transition-all duration-300 rounded-full" />
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden lg:block header-cta">
                    <MagneticButton
                        href="https://www.hemolabma.com.br/resultados-pulse/"
                        className="px-7 py-3.5 bg-hemo-red text-white font-bold text-sm rounded-full animate-pulse-glow hover:bg-hemo-red-dark transition-colors duration-300 shadow-lg shadow-hemo-red/40"
                    >
                        Consultar Resultados
                    </MagneticButton>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden text-white p-2"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-hemo-dark/95 backdrop-blur-xl mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4 border border-white/10">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-white hover:text-hemo-lime text-lg font-semibold transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://www.hemolabma.com.br/resultados-pulse/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 px-6 py-3 bg-hemo-red text-white font-semibold text-center rounded-full"
                    >
                        Consultar Resultados
                    </a>
                </div>
            )}
        </header>
    );
}
