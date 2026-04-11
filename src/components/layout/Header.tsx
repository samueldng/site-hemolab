"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "../ui/MagneticButton";
import CartIcon from "../ecommerce/CartIcon";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", href: "/#home" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Exames", href: "/exames" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Unidades", href: "/#unidades" },
    { label: "Contato", href: "/#contato" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [renderMobile, setRenderMobile] = useState(false);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { contextSafe } = useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.3 });
        // Logo slides in from left
        tl.fromTo(".header-logo", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
        // Nav links stagger from top
        tl.fromTo(".nav-link", { y: -20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.4");
        // CTA pops in
        tl.fromTo(".header-cta", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");
    }, { scope: headerRef });

    const toggleMenu = contextSafe(() => {
        if (!mobileOpen) {
            setMobileOpen(true);
            setRenderMobile(true);
            // Aguarda a renderização para executar a animação
            requestAnimationFrame(() => {
                gsap.fromTo(
                    ".mobile-menu-overlay",
                    { clipPath: "circle(0% at 90% 10%)" },
                    { clipPath: "circle(150% at 90% 10%)", duration: 0.8, ease: "power3.inOut" }
                );
                gsap.fromTo(
                    ".mobile-link",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out", delay: 0.3 }
                );
                gsap.fromTo(
                    ".mobile-cta",
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.6 }
                );
            });
        } else {
            setMobileOpen(false);
            gsap.to(".mobile-menu-overlay", {
                clipPath: "circle(0% at 90% 10%)",
                duration: 0.6,
                ease: "power3.inOut",
                onComplete: () => setRenderMobile(false),
            });
        }
    });

    const handleNavClick = contextSafe((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Only handle hash navigation on the same page
        if (href.startsWith("/#")) {
            const hash = href.slice(1); // remove leading /
            if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                if (mobileOpen) toggleMenu();

                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }
        if (mobileOpen) toggleMenu();
    });

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-[max(0.5rem,env(safe-area-inset-top))] ${scrolled
                ? "dark:bg-hemo-dark/95 backdrop-blur-xl shadow-2xl dark:shadow-black/30 shadow-black/5 pb-2 lg:pt-[max(0.5rem,env(safe-area-inset-top))] border-b dark:border-hemo-lime/10 border-black/5 bg-white/95"
                : "dark:bg-hemo-dark/70 bg-white/70 backdrop-blur-md pb-4 pt-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo — colored filter on light, white on dark */}
                <MagneticButton href="/" strength={0.2}>
                    <div className="header-logo">
                        <Image
                            src="/images/logo-hemolab-1024x434 1.png"
                            alt="Hemolab - Laboratório de Análises Clínicas"
                            width={180}
                            height={76}
                            className="h-11 md:h-14 w-auto dark:brightness-0 dark:invert dark:drop-shadow-[0_0_12px_rgba(164,205,57,0.3)] brightness-90 hue-rotate-[160deg] saturate-200 contrast-125"
                            priority
                        />
                    </div>
                </MagneticButton>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="nav-link relative px-4 py-2 text-sm font-semibold dark:text-white text-hemo-dark hover:text-hemo-lime transition-colors duration-300 group"
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-hemo-lime group-hover:w-3/4 transition-all duration-300 rounded-full" />
                        </Link>
                    ))}
                </nav>

                {/* CTA + Cart */}
                <div className="hidden lg:flex items-center gap-3 header-cta">
                    <ThemeToggle />
                    <CartIcon />
                    <MagneticButton
                        href="https://www.hemolabma.com.br/resultados-pulse/"
                        className="px-7 py-3.5 bg-hemo-red text-white font-bold text-sm rounded-full animate-pulse-glow hover:bg-hemo-red-dark transition-colors duration-300 shadow-lg shadow-hemo-red/40"
                    >
                        Consultar Resultados
                    </MagneticButton>
                </div>

                {/* Mobile: Cart + Toggle */}
                <div className="lg:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <CartIcon />
                    <button
                        onClick={toggleMenu}
                        className="p-2 relative z-50 w-10 h-10 flex items-center justify-center dark:text-white text-hemo-dark"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={28} className="animate-in fade-in zoom-in duration-300 dark:text-white text-hemo-dark" /> : <Menu size={28} className="animate-in fade-in zoom-in duration-300 dark:text-white text-hemo-dark" />}
                    </button>
                </div>
            </div>

            {/* Full-Screen Mobile Menu Overlay */}
            {renderMobile && (
                <div
                    className="mobile-menu-overlay fixed inset-0 dark:bg-hemo-dark bg-color-cream z-40 lg:hidden flex flex-col justify-center items-center overflow-hidden h-[100dvh]"
                    style={{ clipPath: "circle(0% at 90% 10%)" }}
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full dark:bg-hemo-green/10 bg-hemo-green/5 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full dark:bg-hemo-red/10 bg-hemo-red/5 blur-[100px] pointer-events-none" />

                    <nav className="flex flex-col items-center gap-8 z-10 w-full px-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="mobile-link dark:text-white text-hemo-dark hover:text-hemo-lime text-4xl font-[family-name:var(--font-display)] font-bold transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mobile-cta mt-12 w-full px-8 z-10 flex justify-center">
                        <MagneticButton
                            href="https://www.hemolabma.com.br/resultados-pulse/"
                            className="w-full max-w-[280px] py-5 bg-hemo-red text-white font-bold text-center rounded-full text-lg shadow-xl shadow-hemo-red/20 flex items-center justify-center justify-self-center mx-auto"
                        >
                            Consultar Resultados
                        </MagneticButton>
                    </div>

                    {/* Social/Contact footer in menu */}
                    <div className="absolute bottom-12 w-full flex items-center justify-center z-10 mobile-link">
                        <span className="text-white/50 text-sm font-semibold tracking-widest uppercase">Laboratório Hemolab</span>
                    </div>
                </div>
            )}
        </header>
    );
}
