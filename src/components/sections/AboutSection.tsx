"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
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
        color: "text-hemo-lime",
        bgColor: "bg-hemo-lime/10",
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
    { value: 7, suffix: "+", label: "Anos de experiência" },
    { value: 2, suffix: "", label: "Unidades" },
    { value: 500, suffix: "+", label: "Exames disponíveis" },
    { value: 10000, suffix: "+", label: "Pacientes atendidos" },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const s = sectionRef.current;
            if (!s) return;

            // Section title
            const aboutTitles = s.querySelectorAll(".about-title");
            if (aboutTitles.length) {
                gsap.fromTo(aboutTitles, { y: 60, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "top 85%" },
                });
            }

            // Description
            const desc = s.querySelector(".about-desc");
            if (desc) {
                gsap.fromTo(desc, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: desc, start: "top 85%" },
                });
            }

            // Cards stagger
            const cards = s.querySelectorAll(".value-card");
            if (cards.length) {
                gsap.fromTo(cards, { y: 80, opacity: 0 }, {
                    y: 0, opacity: 1, stagger: 0.2, duration: 0.9, ease: "power3.out",
                    scrollTrigger: { trigger: s.querySelector(".values-grid"), start: "top 80%" },
                });
            }

            // Stats
            const stats = s.querySelectorAll(".stat-item");
            if (stats.length) {
                gsap.fromTo(stats, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power3.out",
                    scrollTrigger: { trigger: s.querySelector(".stats-grid"), start: "top 85%" },
                });
            }

            // Dr photo
            const drPhoto = s.querySelector(".dr-photo");
            if (drPhoto) {
                gsap.fromTo(drPhoto, { x: 60, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: drPhoto, start: "top 80%" },
                });
            }

            // Dr info
            const drInfo = s.querySelector(".dr-info");
            if (drInfo) {
                const children = drInfo.children;
                gsap.fromTo(children, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
                    scrollTrigger: { trigger: drInfo, start: "top 85%" },
                });
            }
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="sobre" className="relative bg-cream">
            {/* Top wave transition */}
            <div className="absolute -top-1 left-0 right-0 h-24 bg-hemo-dark" />
            <svg
                viewBox="0 0 1440 80"
                className="absolute -top-1 left-0 right-0 w-full text-cream"
                preserveAspectRatio="none"
            >
                <path fill="currentColor" d="M0,40 C360,100 1080,-20 1440,40 L1440,80 L0,80 Z" />
            </svg>

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="about-title inline-block text-hemo-red text-sm font-semibold tracking-widest uppercase mb-3">
                        Quem Somos
                    </span>
                    <h2 className="about-title font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-hemo-dark mb-6">
                        Sobre o <span className="text-hemo-red">Hemolab</span>
                    </h2>
                    <p className="about-desc text-lg text-hemo-dark/60 max-w-2xl mx-auto leading-relaxed">
                        Fundado em 2016, o Hemolab consolidou-se como referência regional
                        em serviços laboratoriais, combinando tecnologia de ponta, rigor
                        técnico e atendimento humanizado.
                    </p>
                </div>

                {/* Values Cards */}
                <div className="values-grid grid md:grid-cols-3 gap-6 mb-20">
                    {VALUES.map((item) => (
                        <div
                            key={item.title}
                            className="value-card group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 border border-hemo-dark/5 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hemo-red via-hemo-green to-hemo-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <div className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center mb-5`}>
                                <item.icon size={28} className={item.color} />
                            </div>
                            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-hemo-dark mb-3">
                                {item.title}
                            </h3>
                            <p className="text-hemo-dark/60 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 bg-hemo-dark rounded-3xl p-10">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="stat-item text-center">
                            <AnimatedCounter
                                end={stat.value}
                                suffix={stat.suffix}
                                className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-gradient-brand"
                            />
                            <p className="text-white/50 text-sm mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Dr. Alexson */}
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="dr-photo relative mx-auto md:mx-0">
                        <div className="relative w-80 h-96 md:w-96 md:h-[28rem]">
                            {/* Decorative accent */}
                            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-hemo-red/20 via-transparent to-hemo-lime/20" />
                            <div className="absolute inset-0 rounded-[2rem] overflow-hidden border-2 border-hemo-dark/10 shadow-xl">
                                <Image
                                    src="/images/Dr-Alexson.png"
                                    alt="Dr. Alexson Carvalho - Responsável Técnico"
                                    width={400}
                                    height={500}
                                    className="w-full h-full object-cover object-top"
                                />
                                {/* Gradient overlay at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-hemo-dark/70 to-transparent" />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-hemo-red text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-hemo-red/30 whitespace-nowrap">
                                Dr. Alexson Carvalho
                            </div>
                        </div>
                    </div>

                    <div className="dr-info">
                        <span className="text-hemo-red text-sm font-semibold tracking-widest uppercase">
                            Responsável Técnico
                        </span>
                        <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-hemo-dark mt-2 mb-6">
                            Dr. Alexson Carvalho
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Graduado em Farmácia (UFMA – 2005)",
                                "Especialista em Citologia Clínica (2006)",
                                "Especialista em Docência do Ensino Superior (2008)",
                                "Especialista em Hematologia Clínica (2019)",
                                "MBA em Gestão Laboratorial (2020)",
                                "MBA Executivo em Liderança e Gestão Empresarial com I.A (2026)",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-hemo-dark/70 text-sm">
                                    <span className="w-2 h-2 rounded-full bg-hemo-lime mt-1.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
