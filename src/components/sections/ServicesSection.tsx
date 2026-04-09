"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "../ui/MagneticButton";
import {
    Droplets,
    FlaskConical,
    Microscope,
    Home,
    FileText,
    Heart,
    ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        icon: Droplets,
        title: "Exames de Sangue",
        description:
            "Hemograma completo, glicemia, colesterol, hormônios e mais de 500 tipos de exames laboratoriais.",
        color: "from-hemo-red to-hemo-red-dark",
        iconBg: "bg-hemo-red/10",
        iconColor: "text-hemo-red",
    },
    {
        icon: FlaskConical,
        title: "Toxicológico",
        description:
            "Exame toxicológico para motoristas profissionais (CNH), com amostra de cabelo e resultado rápido.",
        color: "from-hemo-green to-hemo-dark",
        iconBg: "bg-hemo-green/10",
        iconColor: "text-hemo-green",
    },
    {
        icon: Microscope,
        title: "Análises Clínicas",
        description:
            "Bioquímica, imunologia, parasitologia, uroanálise e microbiologia com equipamentos de última geração.",
        color: "from-hemo-lime to-hemo-green",
        iconBg: "bg-hemo-lime/10",
        iconColor: "text-hemo-green-light",
    },
    {
        icon: Home,
        title: "Coleta Domiciliar",
        description:
            "Agende pelo WhatsApp sua coleta em casa, com todo conforto e segurança que você merece.",
        color: "from-gold to-yellow-700",
        iconBg: "bg-gold/10",
        iconColor: "text-gold",
    },
    {
        icon: FileText,
        title: "Resultados Online",
        description:
            "Acesse seus resultados de qualquer lugar, a qualquer hora, pelo portal Pulse Saúde.",
        color: "from-blue-500 to-blue-700",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-500",
    },
    {
        icon: Heart,
        title: "Check-up Completo",
        description:
            "Pacotes de exames para acompanhamento preventivo da sua saúde com preços especiais.",
        color: "from-rose-500 to-rose-700",
        iconBg: "bg-rose-500/10",
        iconColor: "text-rose-500",
    },
];

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const s = sectionRef.current;
            if (!s) return;

            // Title scrub-driven entrance
            const titles = s.querySelectorAll(".services-title");
            if (titles.length) {
                gsap.fromTo(
                    titles,
                    { y: 60, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        stagger: 0.1, ease: "none",
                        scrollTrigger: {
                            trigger: s,
                            start: "top 85%",
                            end: "top 55%",
                            scrub: 1,
                        },
                    }
                );
            }

            // Cards — scrub-driven 3D reveal
            const cards = s.querySelectorAll(".service-card");
            if (cards.length) {
                cards.forEach((card, i) => {
                    gsap.fromTo(
                        card,
                        { y: 100, opacity: 0, scale: 0.85, rotateY: -15 },
                        {
                            y: 0, opacity: 1, scale: 1, rotateY: 0,
                            ease: "none",
                            scrollTrigger: {
                                trigger: s.querySelector(".services-grid"),
                                start: `top ${90 - i * 3}%`,
                                end: `top ${55 - i * 3}%`,
                                scrub: 1.2,
                            },
                        }
                    );
                });
            }

            // Subtle continuous icon pulse
            const icons = s.querySelectorAll(".service-icon");
            if (icons.length) {
                gsap.to(icons, {
                    scale: 1.15,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: { each: 0.3, from: "random" },
                });
            }
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="servicos"
            className="relative bg-hemo-dark py-24 overflow-hidden"
        >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-hemo-green/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-hemo-red/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="services-title inline-block text-hemo-lime text-sm font-semibold tracking-widest uppercase mb-3">
                        O que oferecemos
                    </span>
                    <h2 className="services-title font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-6">
                        Nossos <span className="text-gradient-brand">Serviços</span>
                    </h2>
                    <p className="services-title text-lg text-white/50 max-w-2xl mx-auto">
                        Tecnologia avançada e profissionais especializados para cuidar da sua saúde
                        com excelência.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
                    {SERVICES.map((service) => (
                        <div
                            key={service.title}
                            className="service-card group relative bg-surface-light/50 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-white/15 transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Gradient line top */}
                            <div
                                className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            <div className={`service-icon w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-5`}>
                                <service.icon size={28} className={service.iconColor} />
                            </div>

                            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white mb-3">
                                {service.title}
                            </h3>

                            <p className="text-white/50 text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-1 text-sm text-hemo-lime opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                                Saiba mais <ArrowRight size={14} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Row */}
                <div className="flex flex-wrap justify-center gap-4 mt-16">
                    <MagneticButton
                        href="https://www.hemolabma.com.br/resultados-pulse/"
                        className="px-8 py-4 bg-hemo-red text-white font-semibold rounded-full flex items-center gap-2 hover:bg-hemo-red-dark transition-colors shadow-lg shadow-hemo-red/20 group"
                    >
                        Acessar Resultados
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>

                    <MagneticButton
                        href="https://wa.me/+5599981866145"
                        className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full flex items-center gap-2 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        Agendar Coleta
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
