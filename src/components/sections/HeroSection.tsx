"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "../ui/MagneticButton";
import { usePerfContext } from "@/components/providers/PerfProvider";
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
    const isLowPerf = usePerfContext();

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
        }, isLowPerf ? 7000 : 5000);

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

            // ─── BACKGROUND PARALLAX ───
            if (bgRef.current) {
                if (isLowPerf) {
                    gsap.set(bgRef.current, { scale: 1, opacity: 1 });
                } else {
                    tl.fromTo(
                        bgRef.current,
                        { scale: 1.2, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
                        0
                    );
                    gsap.to(bgRef.current, {
                        yPercent: 15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: s,
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                        },
                    });
                }
            }

            // ─── WORDS ANIMATION ───
            if (headingRef.current) {
                const words = headingRef.current.querySelectorAll(".word");
                if (isLowPerf) {
                    gsap.set(words, { y: 0, opacity: 1, rotateX: 0, scale: 1 });
                } else {
                    tl.fromTo(
                        words,
                        { y: 120, opacity: 0, rotateX: -90, scale: 0.8 },
                        {
                            y: 0, opacity: 1, rotateX: 0, scale: 1,
                            stagger: 0.08, duration: 1.2, ease: "power4.out",
                        },
                        0.2
                    );
                }
            }

            // ─── SUBTITLE & CTA ───
            if (subtitleRef.current && ctaRef.current) {
                if (isLowPerf) {
                    gsap.set([subtitleRef.current, ctaRef.current], { y: 0, opacity: 1 });
                } else {
                    tl.fromTo(
                        [subtitleRef.current, ctaRef.current],
                        { y: 40, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            stagger: 0.15, duration: 1, ease: "power3.out",
                        },
                        0.8
                    );
                }
            }

            // ─── CAROUSEL IMAGE REVEAL ───
            if (carouselRef.current && imageOverlayRef.current) {
                if (isLowPerf) {
                    gsap.set(imageOverlayRef.current, { xPercent: 100 });
                } else {
                    tl.to(
                        imageOverlayRef.current,
                        {
                            xPercent: 100, duration: 1.2, ease: "power3.inOut",
                        },
                        0.6
                    );
                }
            }

            // ─── DECORATIVE BLOBS PARALLAX ───
            if (!isLowPerf) {
                const blobs = s.querySelectorAll(".deco-blob");
                blobs.forEach((blob, i) => {
                    gsap.to(blob, {
                        y: -100 - i * 50,
                        x: i % 2 === 0 ? 50 : -50,
                        rotate: i % 2 === 0 ? 45 : -45,
                        ease: "none",
                        scrollTrigger: {
                            trigger: s,
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                        },
                    });
                });
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

            const mm = gsap.matchMedia();
            mm.add("(min-width: 1024px)", () => {
                // ─── SCROLL-DRIVEN (Desktop Only) ───
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
            });

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    const headingWords = "Sua saúde com precisão e agilidade".split(" ");

    const renderCarousel = (isMobile: boolean) => (
        <div
            ref={!isMobile ? carouselRef : undefined}
            className={`relative w-full overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl shadow-black/50 aspect-video sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-square lg:[mask-image:linear-gradient(to_right,transparent_0%,black_35%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_35%)]`}
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
                                priority={idx === 0}
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
                                priority={idx === 0}
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
                        className={`transition-all duration-500 rounded-full ${idx === activeSlide
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
            className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden dark:bg-hemo-dark bg-color-cream lg:min-h-0 lg:h-screen"
        >
            {/* Background */}
            <div ref={bgRef} className="absolute inset-0 -top-[15%] -bottom-[15%]">
                <Image
                    src="/images/Fachada_gota.png"
                    alt="Hemolab Fachada"
                    fill
                    className="object-cover dark:opacity-40 opacity-[0.06] dark:filter-none dark:mix-blend-normal mix-blend-multiply"
                    priority
                    sizes="100vw"
                />
                {/* Scanline overlay — subtle in light, darker in dark */}
                <div className="absolute inset-0 dark:bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.008)_2px,rgba(0,0,0,0.008)_4px)]" />
            </div>

            {/* Gradients — dark mode uses deep green overlays, light mode uses opaque cream shields */}
            <div className="absolute inset-0 bg-gradient-to-r dark:from-hemo-dark dark:via-hemo-dark/85 dark:to-hemo-dark/40 from-[#F8F6F0] via-[#F8F6F0]/97 to-[#F8F6F0]/80" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t dark:from-hemo-dark from-[#F8F6F0] to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b dark:from-hemo-dark/60 from-[#F8F6F0]/80 to-transparent" />

            {/* Blobs — subtle warm tones in light, vivid in dark */}
            <div className="deco-blob absolute top-20 right-20 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full dark:bg-hemo-red/8 bg-hemo-red/4 blur-[60px]" />
            <div className="deco-blob absolute bottom-20 left-10 w-[250px] lg:w-[400px] h-[250px] lg:h-[400px] rounded-full dark:bg-hemo-lime/10 bg-hemo-green/4 blur-[60px]" />
            <div className="deco-blob absolute top-1/2 left-1/3 w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-full dark:bg-hemo-green-light/8 bg-hemo-green/3 blur-[50px]" />

            <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-[calc(7rem+env(safe-area-inset-top,0px))] lg:pt-24 xl:pt-32 pb-6 lg:pb-8 xl:pb-16 grid lg:grid-cols-2 gap-3 sm:gap-5 lg:gap-8 xl:gap-12 items-center">
                {/* Text Content */}
                <div className="hero-text mt-4 lg:mt-0">
                    {/* Badge — lime text fails WCAG on cream; use dark green in light mode */}
                    <div className="hero-badge inline-flex items-center gap-2 px-3 lg:px-5 py-1 lg:py-2 rounded-full dark:bg-white/10 bg-white/80 border dark:border-hemo-lime/20 border-hemo-dark/12 text-[10px] lg:text-sm dark:text-hemo-lime text-hemo-dark font-semibold mb-4 lg:mb-8 backdrop-blur-sm shadow-sm">
                        <span className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full dark:bg-hemo-lime bg-hemo-red animate-pulse" />
                        Desde 2016 — Bacabal, MA
                    </div>

                    <h1
                        ref={headingRef}
                        className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl 2xl:text-7xl font-bold dark:text-white text-hemo-dark leading-[1.05] lg:leading-[1.08] mb-3 lg:mb-4 xl:mb-8"
                        style={{ perspective: "800px" }}
                    >
                        {headingWords.map((word, i) => (
                            <span
                                key={i}
                                className="word inline-block mr-[0.3em]"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {i === 3 || i === 5 ? (
                                    // In dark mode: lime-green gradient. In light mode: brand red for clinical authority
                                    <span className="dark:text-gradient-brand text-hemo-red">{word}</span>
                                ) : (
                                    word
                                )}
                            </span>
                        ))}
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-sm lg:text-base xl:text-lg 2xl:text-xl dark:text-white/70 text-hemo-dark/70 max-w-lg leading-snug lg:leading-relaxed mb-4 lg:mb-6 xl:mb-10"
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

                        {/* Coleta Domiciliar — ghost button: clearly outlined in light, frosted in dark */}
                        <MagneticButton
                            href="https://wa.me/+5599981866145"
                            className="px-6 lg:px-8 py-3 lg:py-4 dark:bg-white/10 bg-white dark:text-white text-hemo-dark font-bold rounded-full flex items-center justify-center gap-2 border-2 dark:border-white/20 border-hemo-dark/25 dark:hover:bg-white/20 hover:bg-hemo-dark/5 transition-all duration-300 text-base lg:text-lg shadow-sm hover:shadow-md"
                        >
                            <Phone size={20} className="dark:text-hemo-lime text-hemo-green-light" />
                            Coleta Domiciliar
                        </MagneticButton>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════ */}
                {/* Hero Image Carousel — Visible on ALL screen sizes */}
                {/* ═══════════════════════════════════════════════════ */}
                <div className="hero-image relative mt-4 lg:mt-0">
                    {renderCarousel(false)}

                    {/* Floating badge — improved contrast in light mode */}
                    <div className="hero-floater absolute -bottom-4 lg:-bottom-6 -right-2 xl:-right-6 dark:bg-hemo-dark/90 bg-white backdrop-blur-xl rounded-2xl p-3 lg:p-4 animate-float border dark:border-hemo-lime/15 border-hemo-dark/8 shadow-xl z-10 hidden xl:block">
                        <div className="flex items-center gap-2 lg:gap-3">
                            <div className="w-9 lg:w-11 h-9 lg:h-11 rounded-full bg-hemo-red/8 dark:bg-white flex items-center justify-center shadow-inner">
                                <Image
                                    src="/images/logogota.png"
                                    alt="Hemolab gota"
                                    width={28}
                                    height={28}
                                    className="w-5 h-5 lg:w-7 lg:h-7"
                                />
                            </div>
                            <div>
                                <p className="dark:text-white text-hemo-dark font-bold text-xs lg:text-sm">Resultado Online</p>
                                <p className="dark:text-hemo-lime text-hemo-green-light text-[10px] lg:text-xs font-semibold">Acesse 24h</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute -inset-4 bg-hemo-lime/5 rounded-[2rem] blur-2xl -z-10" />
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 dark:text-white/50 text-hemo-dark/50">
                <span className="text-[10px] lg:text-xs tracking-widest uppercase font-semibold">Scroll</span>
                <div className="w-5 lg:w-6 h-8 lg:h-10 rounded-full border-2 dark:border-white/30 border-hemo-dark/20 flex items-start justify-center p-1 lg:p-1.5">
                    <div className="w-1 lg:w-1.5 h-2 lg:h-3 rounded-full bg-hemo-lime animate-bounce" />
                </div>
            </div>
        </section>
    );
}
