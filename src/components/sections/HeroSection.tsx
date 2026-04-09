"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "../ui/MagneticButton";
import { FEATURED_EXAMS, formatPrice } from "@/data/exams";
import { ArrowRight, Phone, Clock, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = [
    {
        type: "image" as const,
        src: "/images/01-1024x1004.png",
        alt: "Laboratório Hemolab - Estrutura moderna",
    },
    ...FEATURED_EXAMS.map((exam) => ({
        type: "exam" as const,
        exam,
    })),
];

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const imageOverlayRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isAnimatingRef = useRef(false);

    // ─── Slide transition with GSAP ───
    const goToSlide = useCallback(
        (nextIdx: number) => {
            if (isAnimatingRef.current) return;
            const prevIdx = activeSlide;
            if (nextIdx === prevIdx) return;
            isAnimatingRef.current = true;

            const prevSlide = slideRefs.current[prevIdx];
            const nextSlide = slideRefs.current[nextIdx];
            if (!prevSlide || !nextSlide) {
                isAnimatingRef.current = false;
                return;
            }

            const direction = nextIdx > prevIdx ? 1 : -1;

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimatingRef.current = false;
                },
            });

            // Set next slide starting position
            gsap.set(nextSlide, {
                xPercent: direction * 100,
                opacity: 1,
                scale: 1.05,
                zIndex: 2,
            });
            gsap.set(prevSlide, { zIndex: 1 });

            // Animate out current
            tl.to(
                prevSlide,
                {
                    xPercent: direction * -30,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.7,
                    ease: "power3.inOut",
                },
                0
            );

            // Animate in next
            tl.to(
                nextSlide,
                {
                    xPercent: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: "power3.inOut",
                },
                0
            );

            // Animate inner content of exam cards with stagger
            const slide = HERO_SLIDES[nextIdx];
            if (slide.type === "exam") {
                const infoItems = nextSlide.querySelectorAll(".slide-info-item");
                tl.fromTo(
                    infoItems,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: "power3.out",
                    },
                    0.3
                );
            }

            setActiveSlide(nextIdx);
        },
        [activeSlide]
    );

    const nextSlide = useCallback(() => {
        const next = (activeSlide + 1) % HERO_SLIDES.length;
        goToSlide(next);
    }, [activeSlide, goToSlide]);

    const prevSlide = useCallback(() => {
        const prev = (activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
        goToSlide(prev);
    }, [activeSlide, goToSlide]);

    // ─── Auto-play ───
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (!isAnimatingRef.current) {
                const next = (activeSlide + 1) % HERO_SLIDES.length;
                goToSlide(next);
            }
        }, 5000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [activeSlide, goToSlide]);

    // Reset timer on manual interaction
    const handleManualNav = useCallback(
        (idx: number) => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            goToSlide(idx);
        },
        [goToSlide]
    );

    useGSAP(
        () => {
            const s = sectionRef.current;
            if (!s) return;

            // ─── ENTRANCE TIMELINE ───
            const tl = gsap.timeline({ delay: 0.6 });

            if (bgRef.current) {
                tl.fromTo(
                    bgRef.current,
                    { scale: 1.2, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
                    0
                );
            }

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

            const badge = s.querySelector(".hero-badge");
            if (badge) {
                tl.fromTo(
                    badge,
                    { x: -40, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                    0.5
                );
            }

            if (subtitleRef.current) {
                tl.fromTo(
                    subtitleRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    1.0
                );
            }

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

            // Image reveal
            if (imageOverlayRef.current) {
                tl.to(
                    imageOverlayRef.current,
                    { x: "105%", duration: 1.4, ease: "power4.inOut" },
                    0.8
                );
            }

            // First slide entrance
            const firstSlide = slideRefs.current[0];
            if (firstSlide) {
                tl.fromTo(
                    firstSlide,
                    { scale: 1.3 },
                    { scale: 1, duration: 2, ease: "power3.out" },
                    1.0
                );
            }

            // Floating badge
            const floater = s.querySelector(".hero-floater");
            if (floater) {
                tl.fromTo(
                    floater,
                    { y: 30, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
                    2.0
                );
            }

            // Scroll indicator
            const scrollInd = s.querySelector(".scroll-indicator");
            if (scrollInd) {
                tl.fromTo(scrollInd, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2.5);
            }

            // ─── SCROLL-DRIVEN ───
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

            const blobs = s.querySelectorAll(".deco-blob");
            blobs.forEach((blob, i) => {
                gsap.to(blob, {
                    y: i % 2 === 0 ? -80 : 60,
                    x: i % 2 === 0 ? 40 : -40,
                    scale: 1 + i * 0.1,
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

    // ─── Shared Carousel JSX ───
    const renderCarousel = (isMobile: boolean) => (
        <div
            ref={!isMobile ? carouselRef : undefined}
            className={`relative overflow-hidden rounded-3xl shadow-2xl shadow-black/50 ${
                isMobile ? "aspect-[4/3]" : "aspect-square"
            }`}
        >
            {/* Red curtain overlay for initial reveal */}
            <div
                ref={!isMobile ? imageOverlayRef : undefined}
                className={`absolute inset-0 bg-hemo-red z-30 rounded-3xl ${isMobile ? "hero-mobile-overlay" : ""}`}
            />

            {/* Slides */}
            {HERO_SLIDES.map((slide, idx) => (
                <div
                    key={idx}
                    ref={(el) => {
                        slideRefs.current[idx] = el;
                    }}
                    className="absolute inset-0 w-full h-full"
                    style={{
                        opacity: idx === 0 ? 1 : 0,
                        zIndex: idx === 0 ? 2 : 1,
                    }}
                >
                    {slide.type === "image" ? (
                        /* ── Lab Image Slide ── */
                        <div className="w-full h-full relative">
                            <Image
                                src={slide.src!}
                                alt={slide.alt!}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Subtle label overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-black/70 to-transparent">
                                <p className="text-white font-bold text-base lg:text-lg font-[family-name:var(--font-display)]">
                                    Nossa Estrutura
                                </p>
                                <p className="text-white/60 text-xs lg:text-sm">
                                    Tecnologia e conforto para você
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* ── Exam Card Slide ── */
                        <Link
                            href={`/exames/${slide.exam!.slug}`}
                            className="block w-full h-full relative group cursor-pointer"
                        >
                            {/* Background image */}
                            <Image
                                src={slide.exam!.image}
                                alt={slide.exam!.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-8">
                                {/* Badge */}
                                {slide.exam!.badge && (
                                    <div className="slide-info-item self-start mb-auto mt-2">
                                        <span className="px-3 lg:px-4 py-1 lg:py-1.5 bg-hemo-red text-white text-[10px] lg:text-xs font-bold rounded-full shadow-lg shadow-hemo-red/30">
                                            {slide.exam!.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Category */}
                                <span className="slide-info-item text-hemo-lime text-[10px] lg:text-xs font-semibold uppercase tracking-widest mb-1">
                                    {slide.exam!.category}
                                </span>

                                {/* Name */}
                                <h3 className="slide-info-item font-[family-name:var(--font-display)] text-lg lg:text-2xl font-bold text-white mb-2 lg:mb-3">
                                    {slide.exam!.name}
                                </h3>

                                {/* Price + Time */}
                                <div className="slide-info-item flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                                    <div className="flex items-baseline gap-1.5 lg:gap-2">
                                        {slide.exam!.oldPrice && (
                                            <span className="text-white/40 text-xs lg:text-sm line-through">
                                                {formatPrice(slide.exam!.oldPrice)}
                                            </span>
                                        )}
                                        <span className="text-xl lg:text-2xl font-bold text-white">
                                            {formatPrice(slide.exam!.price)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 lg:gap-1.5 text-white/60 text-xs lg:text-sm">
                                        <Clock size={12} className="text-hemo-lime lg:hidden" />
                                        <Clock size={14} className="text-hemo-lime hidden lg:block" />
                                        <span className="hidden sm:inline">{slide.exam!.productionTime}</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="slide-info-item flex items-center gap-2 px-4 lg:px-5 py-2.5 lg:py-3 bg-hemo-red/90 backdrop-blur-sm text-white font-bold rounded-full w-fit group-hover:bg-hemo-red transition-colors shadow-lg shadow-hemo-red/30 text-xs lg:text-sm">
                                    <ShoppingCart size={14} className="lg:hidden" />
                                    <ShoppingCart size={16} className="hidden lg:block" />
                                    Comprar Exame
                                    <ArrowRight
                                        size={14}
                                        className="group-hover:translate-x-1 transition-transform lg:hidden"
                                    />
                                    <ArrowRight
                                        size={16}
                                        className="group-hover:translate-x-1 transition-transform hidden lg:block"
                                    />
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            ))}

            {/* Navigation arrows */}
            <button
                onClick={() => handleManualNav((activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all duration-300 border border-white/10"
                aria-label="Slide anterior"
            >
                <ChevronLeft size={16} className="lg:hidden" />
                <ChevronLeft size={20} className="hidden lg:block" />
            </button>
            <button
                onClick={() => handleManualNav((activeSlide + 1) % HERO_SLIDES.length)}
                className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all duration-300 border border-white/10"
                aria-label="Próximo slide"
            >
                <ChevronRight size={16} className="lg:hidden" />
                <ChevronRight size={20} className="hidden lg:block" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 lg:gap-2">
                {HERO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleManualNav(idx)}
                        className={`transition-all duration-500 rounded-full ${
                            idx === activeSlide
                                ? "w-6 lg:w-8 h-2 lg:h-2.5 bg-hemo-red shadow-lg shadow-hemo-red/50"
                                : "w-2 lg:w-2.5 h-2 lg:h-2.5 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Ir para slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 lg:h-1 z-20">
                <div
                    className="h-full bg-gradient-to-r from-hemo-red to-hemo-lime rounded-full"
                    style={{
                        animation: "heroProgress 5s linear infinite",
                        width: "100%",
                        transformOrigin: "left",
                    }}
                    key={activeSlide}
                />
            </div>
        </div>
    );

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-hemo-dark"
        >
            {/* Background */}
            <div ref={bgRef} className="absolute inset-0 -top-[15%] -bottom-[15%]">
                <Image
                    src="/images/Fachada_gota.png"
                    alt="Hemolab Fachada"
                    fill
                    className="object-cover opacity-40"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            </div>

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-hemo-dark via-hemo-dark/85 to-hemo-dark/40" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-hemo-dark to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-hemo-dark/60 to-transparent" />

            {/* Blobs */}
            <div className="deco-blob absolute top-20 right-20 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full bg-hemo-red/8 blur-[100px]" />
            <div className="deco-blob absolute bottom-20 left-10 w-[250px] lg:w-[400px] h-[250px] lg:h-[400px] rounded-full bg-hemo-lime/10 blur-[100px]" />
            <div className="deco-blob absolute top-1/2 left-1/3 w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-full bg-hemo-green-light/8 blur-[80px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 lg:py-32 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div className="hero-text">
                    <div className="hero-badge inline-flex items-center gap-2 px-4 lg:px-5 py-1.5 lg:py-2 rounded-full bg-white/10 border border-hemo-lime/20 text-xs lg:text-sm text-hemo-lime font-semibold mb-6 lg:mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-hemo-lime animate-pulse" />
                        Desde 2016 — Bacabal, MA
                    </div>

                    <h1
                        ref={headingRef}
                        className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-5 lg:mb-8"
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
                        className="text-base lg:text-lg xl:text-xl text-white/70 max-w-lg leading-relaxed mb-6 lg:mb-10"
                    >
                        Exames laboratoriais confiáveis com tecnologia de ponta,
                        resultados ágeis e atendimento humanizado.
                    </p>

                    <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4">
                        <MagneticButton
                            href="https://www.hemolabma.com.br/resultados-pulse/"
                            className="px-6 lg:px-8 py-3 lg:py-4 bg-hemo-red text-white font-bold rounded-full flex items-center justify-center gap-2 hover:bg-hemo-red-dark transition-all duration-300 shadow-lg shadow-hemo-red/30 group text-base lg:text-lg"
                        >
                            Consultar Resultados
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </MagneticButton>

                        <MagneticButton
                            href="https://wa.me/+5599981866145"
                            className="px-6 lg:px-8 py-3 lg:py-4 bg-white/10 text-white font-bold rounded-full flex items-center justify-center gap-2 border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-base lg:text-lg"
                        >
                            <Phone size={20} className="text-hemo-lime" />
                            Coleta Domiciliar
                        </MagneticButton>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════ */}
                {/* Hero Image Carousel — Visible on ALL screen sizes */}
                {/* ═══════════════════════════════════════════════════ */}
                <div className="hero-image relative mt-4 lg:mt-0">
                    {renderCarousel(false)}

                    {/* Floating badge — hidden on very small screens */}
                    <div className="hero-floater absolute -bottom-4 lg:-bottom-6 -right-2 lg:-right-6 bg-hemo-dark/90 backdrop-blur-xl rounded-2xl p-3 lg:p-4 animate-float border border-hemo-lime/15 shadow-xl z-10 hidden sm:block">
                        <div className="flex items-center gap-2 lg:gap-3">
                            <div className="w-9 lg:w-11 h-9 lg:h-11 rounded-full bg-white flex items-center justify-center shadow-inner">
                                <Image
                                    src="/images/logogota.png"
                                    alt="Hemolab gota"
                                    width={28}
                                    height={28}
                                    className="w-5 h-5 lg:w-7 lg:h-7"
                                />
                            </div>
                            <div>
                                <p className="text-white font-bold text-xs lg:text-sm">Resultado Online</p>
                                <p className="text-hemo-lime text-[10px] lg:text-xs font-medium">Acesse 24h</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute -inset-4 bg-hemo-lime/5 rounded-[2rem] blur-2xl -z-10" />
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
                <span className="text-[10px] lg:text-xs tracking-widest uppercase font-semibold">Scroll</span>
                <div className="w-5 lg:w-6 h-8 lg:h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1 lg:p-1.5">
                    <div className="w-1 lg:w-1.5 h-2 lg:h-3 rounded-full bg-hemo-lime animate-bounce" />
                </div>
            </div>
        </section>
    );
}
