"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import AnimatedCounter from "../ui/AnimatedCounter";
import { Target, Eye, TrendingUp, Rocket, HeartHandshake, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        icon: Rocket,
        title: "Missão",
        description: "Contribuir para a gestão da saúde e o bem estar das pessoas com qualidade e agilidade.",
        color: "text-hemo-red",
        bgColor: "bg-hemo-red/10",
        colSpan: "col-span-1"
    },
    {
        icon: Eye,
        title: "Visão",
        description: "Ser referência em análises clínicas e ser reconhecido por excelência e inovação.",
        color: "text-hemo-green",
        bgColor: "bg-hemo-green/10",
        colSpan: "col-span-1"
    },
    {
        icon: HeartHandshake,
        title: "Valores",
        description: "Alegria • Compromisso • Comunhão • Competência • Empatia • Evolução • Ética • Respeito",
        color: "text-hemo-dark",
        bgColor: "bg-hemo-dark/5",
        colSpan: "md:col-span-2"
    },
    {
        icon: Users,
        title: "Cultura",
        description: "Comunhão para a abundância de todos.",
        color: "text-hemo-lime",
        bgColor: "bg-hemo-lime/20",
        colSpan: "md:col-span-2"
    },
    {
        icon: Target,
        title: "Objetivo",
        description: "",
        list: [
            "Levar exames de qualidade para Bacabal e região para que as pessoas não se sintam obrigadas a sair em busca desses serviços em grandes cidades.",
            "Propagar conhecimento em saúde e em exames laboratoriais para os colaboradores e para a população (sociedade).",
            "Fazer o Hemolab crescer a ponto dos colaboradores crescerem juntos gerando empregos diretos e indiretos."
        ],
        color: "text-gold",
        bgColor: "bg-gold/10",
        colSpan: "md:col-span-2"
    },
];

const STATS = [
    { value: 10, suffix: "+", label: "Anos de experiência" },
    { value: 20, suffix: "+", label: "Unidades" },
    { value: 500, suffix: "+", label: "Exames disponíveis" },
    { value: 10000, suffix: "+", label: "Pacientes atendidos" },
];

const DR_QUALIFICATIONS = [
    "Graduado em Farmácia (UFMA – 2005)",
    "Especialista em Citologia Clínica (2006)",
    "Especialista em Docência do Ensino Superior (2008)",
    "Especialista em Hematologia Clínica (2019)",
    "MBA em Gestão Laboratorial (2020)",
    "MBA Executivo em Liderança e Gestão Empresarial com I.A (2026)",
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const s = sectionRef.current;
            const track = trackRef.current;
            if (!s || !track) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                // ─── HORIZONTAL SCROLL: About panels ───
                const panels = gsap.utils.toArray<HTMLElement>(".about-panel", track);
                if (!panels.length) return;

                const totalScroll = track.scrollWidth - window.innerWidth;

                const scrollTween = gsap.to(track, {
                    x: -totalScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: s,
                        pin: true,
                        scrub: 1,
                        end: () => `+=${totalScroll * 1.2}`,
                        invalidateOnRefresh: true,
                    },
                });

                // ─── Per-panel content reveals ───
                panels.forEach((panel) => {
                    const title = panel.querySelector(".panel-title");
                    const subtitle = panel.querySelector(".panel-subtitle");
                    const content = panel.querySelectorAll(".panel-item");
                    const image = panel.querySelector(".panel-img");

                    if (title) {
                        gsap.fromTo(
                            title,
                            { y: 80, opacity: 0, skewY: 4 },
                            {
                                y: 0, opacity: 1, skewY: 0,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: scrollTween,
                                    start: "left 80%",
                                    end: "left 40%",
                                    scrub: true,
                                },
                            }
                        );
                    }

                    if (subtitle) {
                        gsap.fromTo(
                            subtitle,
                            { y: 60, opacity: 0 },
                            {
                                y: 0, opacity: 1,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: scrollTween,
                                    start: "left 70%",
                                    end: "left 35%",
                                    scrub: true,
                                },
                            }
                        );
                    }

                    if (content.length) {
                        gsap.fromTo(
                            content,
                            { y: 60, opacity: 0 },
                            {
                                y: 0, opacity: 1,
                                stagger: 0.05,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: scrollTween,
                                    start: "left 65%",
                                    end: "left 15%",
                                    scrub: true,
                                },
                            }
                        );
                    }

                    if (image) {
                        gsap.fromTo(
                            image,
                            { scale: 1.3, opacity: 0, x: 80 },
                            {
                                scale: 1, opacity: 1, x: 0,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: scrollTween,
                                    start: "left 75%",
                                    end: "left 25%",
                                    scrub: true,
                                },
                            }
                        );
                    }
                });
            });

            mm.add("(max-width: 1023px)", () => {
                const panels = gsap.utils.toArray<HTMLElement>(".about-panel", track);
                panels.forEach((panel) => {
                    const elements = panel.querySelectorAll(".panel-title, .panel-subtitle, .panel-item, .panel-img");
                    if (elements.length) {
                        gsap.fromTo(
                            elements,
                            { y: 40, opacity: 0 },
                            {
                                y: 0, opacity: 1,
                                stagger: 0.1,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: panel,
                                    start: "top 75%",
                                }
                            }
                        );
                    }
                });
            });

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="sobre" className="relative bg-cream min-h-screen overflow-hidden">
            {/* Smooth dark-to-cream transition: in dark mode this fades hero to cream array, in light mode it is transparent since the hero is also cream */}
            <div className="absolute -top-px left-0 right-0 h-32 bg-gradient-to-b dark:from-hemo-dark from-[#F8F6F0] to-cream z-20 pointer-events-none" />

            {/* ═══ HORIZONTAL SCROLL TRACK ═══ */}
            <div
                ref={trackRef}
                className="flex flex-col lg:flex-row items-center lg:items-stretch lg:h-screen will-change-transform lg:w-[400vw] relative z-10"
            >
                {/* ─── Panel 1: Intro + Mission/Vision/Values ─── */}
                <div className="about-panel lg:flex-shrink-0 w-full lg:w-screen min-h-screen flex items-center relative pt-48 pb-16 lg:py-0 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-8 md:px-16 w-full grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="panel-title inline-block text-hemo-red text-sm font-semibold tracking-widest uppercase mb-4">
                                Quem Somos
                            </span>
                            <h2 className="panel-title font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-hemo-dark mb-6 leading-tight">
                                Sobre o <span className="text-hemo-red">Hemolab</span>
                            </h2>
                            <p className="panel-subtitle text-lg text-hemo-dark/60 leading-relaxed mb-10 max-w-lg">
                                Fundado em 2016, o Hemolab consolidou-se como referência regional
                                em serviços laboratoriais, combinando tecnologia de ponta, rigor
                                técnico e atendimento humanizado.
                            </p>
                            {/* Scroll hint */}
                            <div className="panel-subtitle flex items-center gap-3 text-hemo-dark/30">
                                <div className="w-12 h-px bg-hemo-dark/20" />
                                <span className="text-xs font-semibold uppercase tracking-widest">Continue rolando</span>
                                <span className="animate-pulse">→</span>
                            </div>
                        </div>

                        {/* Values Cards - grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-h-[60vh] lg:max-h-[65vh] md:overflow-y-auto p-2 sm:p-4 -m-2 sm:-m-4 scrollbar-thin scrollbar-thumb-hemo-dark/10 hover:scrollbar-thumb-hemo-red/40 scrollbar-track-transparent transition-colors">
                            {VALUES.map((item) => (
                                <div
                                    key={item.title}
                                    className={`panel-item group flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,46,32,0.03)] hover:shadow-xl transition-shadow duration-500 border border-hemo-dark/5 ${item.colSpan}`}
                                >
                                    <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0`}>
                                        <item.icon size={24} className={item.color} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold text-hemo-dark mb-1.5 leading-tight">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-hemo-dark/65 text-[0.85rem] leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                        {item.list && (
                                            <ul className="space-y-2.5 mt-2">
                                                {item.list.map((listItem, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-hemo-dark/65 text-[0.85rem] leading-relaxed">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                                                        <span>{listItem}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── Panel 2: Stats ─── */}
                <div className="about-panel lg:flex-shrink-0 w-full lg:w-screen min-h-screen flex items-center relative overflow-hidden py-16 lg:py-0">
                    {/* BG */}
                    <div className="absolute inset-0 dark:bg-hemo-dark bg-[#ebebeb]" />
                    <div className="absolute inset-0 bg-[url('/images/Fachada_gota.png')] bg-cover bg-center dark:opacity-10 opacity-5" />
                    <div className="absolute inset-0 bg-gradient-to-r dark:from-hemo-dark dark:via-hemo-dark/90 dark:to-hemo-dark/70 from-[#ebebeb] via-[#ebebeb]/90 to-[#ebebeb]/70" />

                    <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 w-full">
                        <span className="panel-title block text-hemo-lime text-sm font-semibold tracking-widest uppercase mb-4">
                            Nossos Números
                        </span>
                        <h2 className="panel-title font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold dark:text-white text-hemo-dark mb-16 leading-tight">
                            Resultados que <br />
                            <span className="text-gradient-brand">falam por si</span>
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="panel-item text-center">
                                    <AnimatedCounter
                                        end={stat.value}
                                        suffix={stat.suffix}
                                        className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-gradient-brand"
                                    />
                                    <p className="dark:text-white/40 text-hemo-dark/60 text-sm mt-3">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── Panel 3: Dr. Alexson (Editorial Layout) ─── */}
                <div className="about-panel lg:flex-shrink-0 w-full lg:w-screen min-h-screen flex items-center relative py-16 lg:py-0 overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Soft radial glow behind photo area */}
                        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-hemo-green/[0.04] blur-[100px]" />
                        <div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] rounded-full bg-hemo-red/[0.03] blur-[80px]" />
                        {/* Subtle grid pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,46,32,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,46,32,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
                        {/* Decorative thin lines */}
                        <div className="hidden lg:block absolute top-[15%] left-[8%] w-px h-[70%] bg-gradient-to-b from-transparent via-hemo-red/10 to-transparent" />
                        <div className="hidden lg:block absolute top-[25%] right-[10%] w-px h-[50%] bg-gradient-to-b from-transparent via-hemo-lime/15 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
                        {/* Photo — artistic treatment */}
                        <div className="panel-img relative mx-auto lg:mx-0 flex justify-center">
                            <div className="relative">
                                {/* Organic background shape */}
                                <div className="absolute -inset-8 md:-inset-12">
                                    <svg viewBox="0 0 400 500" fill="none" className="w-full h-full" preserveAspectRatio="none">
                                        <path
                                            d="M200 10 C320 10, 380 80, 385 180 C390 280, 360 400, 280 460 C200 520, 100 490, 50 400 C0 310, 10 200, 40 120 C70 40, 120 10, 200 10Z"
                                            fill="url(#organicGrad)"
                                            opacity="0.07"
                                        />
                                        <defs>
                                            <linearGradient id="organicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#004731" />
                                                <stop offset="100%" stopColor="#A4CD39" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Main photo container */}
                                <div className="relative w-72 h-80 md:w-[300px] md:h-[360px] xl:w-[340px] xl:h-[420px]">
                                    {/* Accent border - partial arc */}
                                    <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]" viewBox="0 0 364 444" fill="none">
                                        <path
                                            d="M182 3 C280 3, 361 60, 361 170 L361 340 C361 390, 320 441, 260 441 L104 441 C44 441, 3 390, 3 340 L3 170 C3 60, 84 3, 182 3Z"
                                            stroke="url(#arcGrad)"
                                            strokeWidth="1.5"
                                            strokeDasharray="8 12"
                                            opacity="0.4"
                                        />
                                        <defs>
                                            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#C42129" />
                                                <stop offset="50%" stopColor="#A4CD39" />
                                                <stop offset="100%" stopColor="#004731" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Photo with editorial crop */}
                                    <div className="relative w-full h-full rounded-[2.2rem] bg-white/50 backdrop-blur-sm dark:bg-surface/50 shadow-[0_25px_60px_rgba(0,46,32,0.15)] p-[6px]">
                                        <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-[#004731]">
                                            <Image
                                                src="/images/Dr-Alexson.png"
                                                alt="Dr. Alexson Carvalho - Responsável Técnico"
                                                width={400}
                                                height={500}
                                                className="w-full h-full object-cover object-[center_top]"
                                            />
                                            {/* Cinematic bottom vignette */}
                                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hemo-dark/60 via-hemo-dark/10 to-transparent" />
                                        </div>
                                    </div>

                                    {/* Floating name badge */}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-hemo-red/20 rounded-full blur-xl" />
                                            <div className="relative bg-gradient-to-r from-hemo-red to-hemo-red-dark text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg whitespace-nowrap tracking-wide">
                                                Dr. Alexson Carvalho
                                            </div>
                                        </div>
                                    </div>

                                    {/* Small decorative corner accent */}
                                    <div className="absolute top-4 right-4 w-8 h-8">
                                        <div className="w-full h-px bg-gradient-to-r from-white/60 to-transparent" />
                                        <div className="w-px h-full bg-gradient-to-b from-white/60 to-transparent absolute top-0 right-0" />
                                    </div>
                                </div>

                                {/* Decorative dots pattern */}
                                <div className="absolute -bottom-6 -left-6 grid grid-cols-3 gap-2 opacity-20">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-hemo-green" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Info — Editorial typography + Timeline */}
                        <div className="relative">
                            {/* Accent line */}
                            <div className="panel-title flex items-center gap-4 mb-6">
                                <div className="w-10 h-px bg-hemo-red" />
                                <span className="text-hemo-red text-xs font-semibold tracking-[0.25em] uppercase">
                                    Responsável Técnico
                                </span>
                            </div>

                            <h3 className="panel-title font-[family-name:var(--font-display)] text-4xl md:text-4xl lg:text-[2.5rem] xl:text-[3.2rem] font-bold text-hemo-dark mb-2 xl:mb-3 leading-[1.1] tracking-tight">
                                Dr. Alexson
                            </h3>
                            <h3 className="panel-title font-[family-name:var(--font-display)] text-4xl md:text-4xl lg:text-[2.5rem] xl:text-[3.2rem] font-bold text-hemo-dark mb-5 xl:mb-8 leading-[1.1] tracking-tight">
                                Carvalho
                            </h3>

                            {/* Subtle separator */}
                            <div className="panel-subtitle w-20 h-0.5 bg-gradient-to-r from-hemo-lime to-hemo-green/30 rounded-full mb-6 xl:mb-8" />

                            {/* Timeline-style qualifications */}
                            <div className="relative pl-6">
                                {/* Timeline vertical line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-hemo-lime/40 via-hemo-green/20 to-transparent" />

                                <ul className="space-y-4">
                                    {DR_QUALIFICATIONS.map((item, index) => (
                                        <li key={item} className="panel-item relative flex items-start gap-4 group">
                                            {/* Timeline dot */}
                                            <span className="absolute -left-6 top-1 flex items-center justify-center">
                                                <span className="w-[15px] h-[15px] rounded-full border-2 border-hemo-lime/50 bg-cream flex items-center justify-center group-hover:border-hemo-lime transition-colors duration-300">
                                                    <span className="w-[5px] h-[5px] rounded-full bg-hemo-lime/70 group-hover:bg-hemo-lime transition-colors duration-300" />
                                                </span>
                                            </span>
                                            {/* Year badge + description */}
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                                {(() => {
                                                    const yearMatch = item.match(/\((\d{4})\)/);
                                                    const year = yearMatch ? yearMatch[1] : '';
                                                    const text = item.replace(/\s*\(\d{4}\)/, '');
                                                    return (
                                                        <>
                                                            {year && (
                                                                <span className="text-[11px] font-bold text-hemo-green bg-hemo-green/8 px-2.5 py-0.5 rounded-full whitespace-nowrap tracking-wide shrink-0">
                                                                    {year}
                                                                </span>
                                                            )}
                                                            <span className="text-hemo-dark/65 text-sm leading-relaxed group-hover:text-hemo-dark/90 transition-colors duration-300">
                                                                {text}
                                                            </span>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Decorative bottom element */}
                            <div className="panel-item mt-10 flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-hemo-red/60" />
                                    <div className="w-2 h-2 rounded-full bg-hemo-lime/60" />
                                    <div className="w-2 h-2 rounded-full bg-hemo-green/40" />
                                </div>
                                <span className="text-[11px] text-hemo-dark/30 uppercase tracking-[0.2em] font-medium">
                                    Laboratório Hemolab · Excelência em exames médicos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Panel 4: CTA ─── */}
                <div className="about-panel lg:flex-shrink-0 w-full lg:w-screen min-h-screen flex items-center justify-center relative overflow-hidden py-16 lg:py-0">
                    <div className="absolute inset-0 dark:bg-hemo-dark bg-[#ebebeb]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(164,205,57,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(164,205,57,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-hemo-red/5 blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-hemo-lime/5 blur-[100px]" />

                    <div className="relative z-10 text-center px-8 max-w-2xl">
                        <h2 className="panel-title font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold dark:text-white text-hemo-dark mb-8 leading-tight">
                            Cuide da sua <br />
                            <span className="text-gradient-brand">saúde conosco</span>
                        </h2>
                        <p className="panel-subtitle text-xl dark:text-white/50 text-hemo-dark/60 mb-10">
                            Mais de 500 exames disponíveis com tecnologia de ponta e
                            atendimento humanizado.
                        </p>
                        <div className="panel-item flex flex-wrap justify-center gap-4">
                            <a
                                href="https://wa.me/+5599981866145"
                                className="px-10 py-4 bg-hemo-red text-white font-bold rounded-full flex items-center gap-2 hover:bg-hemo-red-dark transition-all shadow-xl shadow-hemo-red/30 text-lg group"
                            >
                                Agendar Exame
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                            <Link
                                href="/exames"
                                className="px-10 py-4 dark:bg-white/10 bg-hemo-dark/5 dark:text-white text-hemo-dark font-bold rounded-full flex items-center gap-2 border dark:border-white/15 border-hemo-dark/15 dark:hover:bg-white/20 hover:bg-hemo-dark/10 transition-all text-lg"
                            >
                                Ver Exames
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
