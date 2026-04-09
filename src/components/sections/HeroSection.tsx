"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import MagneticButton from "../ui/MagneticButton";
import { ArrowRight, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const imageOverlayRef = useRef<HTMLDivElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const s = sectionRef.current;
            if (!s) return;

            // ─── ENTRANCE TIMELINE (dramatic on page load) ───
            const tl = gsap.timeline({ delay: 0.6 });

            // Background zooms in from a slight blur
            if (bgRef.current) {
                tl.fromTo(
                    bgRef.current,
                    { scale: 1.2, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
                    0
                );
            }

            // Word-by-word text reveal — 3D flip from below
            if (headingRef.current) {
                const words = headingRef.current.querySelectorAll(".word");
                tl.fromTo(
                    words,
                    { y: 120, opacity: 0, rotateX: -90, scale: 0.8 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        scale: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "back.out(1.4)",
                    },
                    0.3
                );
            }

            // Badge slides in
            const badge = s.querySelector(".hero-badge");
            if (badge) {
                tl.fromTo(
                    badge,
                    { x: -40, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                    0.5
                );
            }

            // Subtitle slides up
            if (subtitleRef.current) {
                tl.fromTo(
                    subtitleRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    1.0
                );
            }

            // CTAs bounce in
            if (ctaRef.current) {
                tl.fromTo(
                    ctaRef.current.children,
                    { y: 40, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        stagger: 0.15,
                        duration: 0.7,
                        ease: "back.out(1.5)",
                    },
                    1.2
                );
            }

            // Image reveal — red curtain slides away
            if (imageOverlayRef.current) {
                tl.to(
                    imageOverlayRef.current,
                    { x: "105%", duration: 1.4, ease: "power4.inOut" },
                    0.8
                );
            }

            // Image zoom-in settle
            if (imageWrapRef.current) {
                tl.fromTo(
                    imageWrapRef.current,
                    { scale: 1.4 },
                    { scale: 1, duration: 2, ease: "power3.out" },
                    1.0
                );
            }

            // Floating badge pops in
            const floater = s.querySelector(".hero-floater");
            if (floater) {
                tl.fromTo(
                    floater,
                    { y: 30, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
                    2.0
                );
            }

            // Scroll indicator fade
            const scrollInd = s.querySelector(".scroll-indicator");
            if (scrollInd) {
                tl.fromTo(
                    scrollInd,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 },
                    2.5
                );
            }

            // ─── SCROLL-DRIVEN IMMERSION ───

            // Background parallax — moves slower than scroll
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    yPercent: 30,
                    scale: 1.15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: s,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });
            }

            // Text pulls away on scroll — creates depth
            const textCol = s.querySelector(".hero-text");
            if (textCol) {
                gsap.to(textCol, {
                    y: -80,
                    opacity: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: s,
                        start: "20% top",
                        end: "60% top",
                        scrub: 1,
                    },
                });
            }

            // Image scales up + fades out on scroll
            const imageCol = s.querySelector(".hero-image");
            if (imageCol) {
                gsap.to(imageCol, {
                    y: -40,
                    scale: 0.9,
                    opacity: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: s,
                        start: "30% top",
                        end: "70% top",
                        scrub: 1,
                    },
                });
            }

            // Decorative blobs drift on scroll
            const blobs = s.querySelectorAll(".deco-blob");
            blobs.forEach((blob, i) => {
                gsap.to(blob, {
                    y: i % 2 === 0 ? -80 : 60,
                    x: i % 2 === 0 ? 40 : -40,
                    scale: 1 + (i * 0.1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: s,
                        start: "top top",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            });
        },
        { scope: sectionRef }
    );

    const headingWords = "Sua saúde com precisão e agilidade".split(" ");

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-hemo-dark"
        >
            {/* Background Image — higher visibility */}
            <div ref={bgRef} className="absolute inset-0 -top-[15%] -bottom-[15%]">
                <Image
                    src="/images/Fachada_gota.png"
                    alt="Hemolab Fachada"
                    fill
                    className="object-cover opacity-40"
                    priority
                    sizes="100vw"
                />
                {/* Subtle scan-line texture */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            </div>

            {/* Gradient overlays — less aggressive, allow bg to show */}
            <div className="absolute inset-0 bg-gradient-to-r from-hemo-dark via-hemo-dark/85 to-hemo-dark/40" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-hemo-dark to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-hemo-dark/60 to-transparent" />

            {/* Decorative animated blobs */}
            <div className="deco-blob absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-hemo-red/8 blur-[100px]" />
            <div className="deco-blob absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full bg-hemo-lime/10 blur-[100px]" />
            <div className="deco-blob absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-hemo-green-light/8 blur-[80px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="hero-text">
                    {/* Badge */}
                    <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-hemo-lime/20 text-sm text-hemo-lime font-semibold mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-hemo-lime animate-pulse" />
                        Desde 2016 — Bacabal, MA
                    </div>

                    {/* Main heading - word by word with 3D perspective */}
                    <h1
                        ref={headingRef}
                        className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-8"
                        style={{ perspective: "800px" }}
                    >
                        {headingWords.map((word, i) => (
                            <span
                                key={i}
                                className="word inline-block mr-[0.3em]"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {i === 3 || i === 5 ? (
                                    <span className="text-gradient-brand">{word}</span>
                                ) : (
                                    word
                                )}
                            </span>
                        ))}
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed mb-10"
                    >
                        Exames laboratoriais confiáveis com tecnologia de ponta,
                        resultados ágeis e atendimento humanizado.
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRef} className="flex flex-wrap gap-4">
                        <MagneticButton
                            href="https://www.hemolabma.com.br/resultados-pulse/"
                            className="px-8 py-4 bg-hemo-red text-white font-bold rounded-full flex items-center gap-2 hover:bg-hemo-red-dark transition-all duration-300 shadow-lg shadow-hemo-red/30 group text-lg"
                        >
                            Consultar Resultados
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </MagneticButton>

                        <MagneticButton
                            href="https://wa.me/+5599981866145"
                            className="px-8 py-4 bg-white/10 text-white font-bold rounded-full flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-lg"
                        >
                            <Phone size={20} className="text-hemo-lime" />
                            Coleta Domiciliar
                        </MagneticButton>
                    </div>
                </div>

                {/* Hero Image with Reveal */}
                <div className="hero-image hidden lg:block relative">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/50">
                        <div
                            ref={imageOverlayRef}
                            className="absolute inset-0 bg-hemo-red z-10 rounded-3xl"
                        />
                        <div ref={imageWrapRef} className="overflow-hidden rounded-3xl">
                            <Image
                                src="/images/01-1024x1004.png"
                                alt="Laboratório Hemolab - Estrutura moderna"
                                width={1024}
                                height={1004}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Floating badge */}
                    <div className="hero-floater absolute -bottom-6 -left-6 bg-hemo-dark/90 backdrop-blur-xl rounded-2xl p-4 animate-float border border-hemo-lime/15 shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-hemo-lime/20 flex items-center justify-center">
                                <Image
                                    src="/images/logogota.png"
                                    alt="Hemolab gota"
                                    width={28}
                                    height={28}
                                />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Resultado Online</p>
                                <p className="text-hemo-lime text-xs font-medium">Acesse 24h</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative glow behind image */}
                    <div className="absolute -inset-4 bg-hemo-lime/5 rounded-[2rem] blur-2xl -z-10" />
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
                <span className="text-xs tracking-widest uppercase font-semibold">Scroll</span>
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
                    <div className="w-1.5 h-3 rounded-full bg-hemo-lime animate-bounce" />
                </div>
            </div>
        </section>
    );
}
