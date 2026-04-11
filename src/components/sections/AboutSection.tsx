"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import AnimatedCounter from "../ui/AnimatedCounter";
import { Target, Eye, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        icon: Target,
        title: "Missão",
        description:
            "Levar exames de qualidade para Bacabal e região, para que as pessoas não precisem buscar esses serviços em grandes cidades.",
        color: "text-hemo-red",
        bgColor: "bg-hemo-red/10",
    },
    {
        icon: Eye,
        title: "Visão",
        description:
            "Ser referência em análises clínicas no Maranhão, com tecnologia, inovação e capacitação profissional contínua.",
        color: "text-hemo-green",
        bgColor: "bg-hemo-green/10",
    },
    {
        icon: TrendingUp,
        title: "Valores",
        description:
            "Precisão científica, atendimento humanizado, inovação tecnológica e compromisso com o crescimento da equipe e da comunidade.",
        color: "text-gold",
        bgColor: "bg-gold/10",
    },
];

const STATS = [
    { value: 10, suffix: "+", label: "Anos de experiência" },
    { value: 2, suffix: "", label: "Unidades" },
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

                        {/* Values Cards - stacked */}
                        <div className="space-y-4">
                            {VALUES.map((item) => (
                                <div
                                    key={item.title}
                                    className="panel-item group flex gap-5 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-500 border border-hemo-dark/5"
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center shrink-0`}>
                                        <item.icon size={28} className={item.color} />
                                    </div>
                                    <div>
                                        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-hemo-dark mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-hemo-dark/50 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
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

                {/* ─── Panel 3: Dr. Alexson ─── */}
                <div className="about-panel lg:flex-shrink-0 w-full lg:w-screen min-h-screen flex items-center relative py-16 lg:py-0 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-8 md:px-16 w-full grid lg:grid-cols-2 gap-20 items-center">
                        {/* Photo */}
                        <div className="panel-img relative mx-auto lg:mx-0">
                            <div className="relative w-80 h-96 md:w-[400px] md:h-[500px]">
                                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-hemo-red/20 via-transparent to-hemo-lime/20 blur-sm" />
                                <div className="absolute inset-0 rounded-[2rem] overflow-hidden border-2 border-hemo-dark/10 shadow-2xl">
                                    <Image
                                        src="/images/Dr-Alexson.png"
                                        alt="Dr. Alexson Carvalho - Responsável Técnico"
                                        width={400}
                                        height={500}
                                        className="w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-hemo-dark/80 to-transparent" />
                                </div>
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-hemo-red text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-hemo-red/30 whitespace-nowrap">
                                    Dr. Alexson Carvalho
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div>
                            <span className="panel-title block text-hemo-red text-sm font-semibold tracking-widest uppercase mb-3">
                                Responsável Técnico
                            </span>
                            <h3 className="panel-title font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-hemo-dark mb-8 leading-tight">
                                Dr. Alexson <br />Carvalho
                            </h3>
                            <ul className="space-y-3">
                                {DR_QUALIFICATIONS.map((item) => (
                                    <li key={item} className="panel-item flex items-start gap-3 text-hemo-dark/70 text-sm">
                                        <span className="w-2 h-2 rounded-full bg-hemo-lime mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
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
