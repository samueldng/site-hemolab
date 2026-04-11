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
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const s = sectionRef.current;
            const track = trackRef.current;
            if (!s || !track) return;

            // ─── HORIZONTAL SCROLL: Service cards slide laterally ───
            const totalScroll = track.scrollWidth - window.innerWidth;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                const scrollTween = gsap.to(track, {
                    x: -totalScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: s,
                        pin: true,
                        scrub: 1,
                        end: () => `+=${totalScroll * 1.1}`,
                        invalidateOnRefresh: true,
                    },
                });

                // ─── Title entrance ───
                const titles = s.querySelectorAll(".svc-title");
                if (titles.length) {
                    gsap.fromTo(
                        titles,
                        { y: 50, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            stagger: 0.08,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: s,
                                start: "top 80%",
                                end: "top 50%",
                                scrub: 1,
                            },
                        }
                    );
                }

                // ─── Per-card reveal ───
                const cards = gsap.utils.toArray<HTMLElement>(".svc-card", track);
                cards.forEach((card) => {
                    gsap.fromTo(
                        card,
                        { y: 80, opacity: 0, scale: 0.85, rotateX: 15 },
                        {
                            y: 0, opacity: 1, scale: 1, rotateX: 0,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: scrollTween,
                                start: "left 85%",
                                end: "left 45%",
                                scrub: true,
                            },
                        }
                    );
                });
            });

            mm.add("(max-width: 1023px)", () => {
                // ─── Title entrance ───
                const titles = s.querySelectorAll(".svc-title");
                if (titles.length) {
                    gsap.fromTo(
                        titles,
                        { y: 40, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            stagger: 0.1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: s,
                                start: "top 80%",
                            },
                        }
                    );
                }

                // ─── Per-card reveal ───
                const cards = gsap.utils.toArray<HTMLElement>(".svc-card", track);
                cards.forEach((card) => {
                    gsap.fromTo(
                        card,
                        { y: 50, opacity: 0, scale: 0.95 },
                        {
                            y: 0, opacity: 1, scale: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                            },
                        }
                    );
                });
            });

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
            
            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="servicos"
            className="relative dark:bg-hemo-dark bg-[#F0EDE6] overflow-hidden"
        >
            {/* ═══ Horizontal Track ═══ */}
            <div
                ref={trackRef}
                className="flex flex-col lg:flex-row items-stretch lg:items-center lg:h-screen will-change-transform gap-8 py-20 lg:py-0 px-6 lg:px-[6vw] w-full lg:w-max"
            >
                {/* ─── Title Panel ─── */}
                <div className="lg:flex-shrink-0 lg:w-[40vw] flex flex-col justify-center lg:pr-12 w-full">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full dark:bg-hemo-green/5 bg-hemo-green/8 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full dark:bg-hemo-red/5 bg-hemo-red/8 blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <span className="svc-title inline-block text-hemo-lime text-sm font-semibold tracking-widest uppercase mb-4">
                        O que oferecemos
                    </span>
                    <h2 className="svc-title font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold dark:text-white text-hemo-dark mb-6 leading-tight">
                        Nossos{" "}
                        <span className="text-gradient-brand">Serviços</span>
                    </h2>
                    <p className="svc-title text-lg dark:text-white/50 text-hemo-dark/60 max-w-md mb-8">
                        Tecnologia avançada e profissionais especializados para cuidar
                        da sua saúde com excelência.
                    </p>
                    <div className="svc-title flex items-center gap-3 dark:text-white/25 text-hemo-dark/30">
                        <div className="w-12 h-px dark:bg-white/15 bg-hemo-dark/20" />
                        <span className="text-xs font-semibold uppercase tracking-widest">Deslize</span>
                        <ArrowRight size={16} className="animate-pulse" />
                    </div>
                </div>

                {/* ─── Service Cards ─── */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-6 lg:gap-8 justify-center items-stretch w-full lg:w-auto">
                    {SERVICES.map((service) => (
                        <div
                            key={service.title}
                            className="svc-card sm:w-[calc(50%-12px)] lg:w-[350px] lg:flex-shrink-0 group relative dark:bg-surface-light/50 bg-white/90 backdrop-blur-sm rounded-3xl p-8 dark:border-white/5 border-black/6 border hover:border-black/12 dark:hover:border-white/15 transition-all duration-500 hover:-translate-y-2 lg:self-center shadow-sm hover:shadow-xl dark:shadow-none"
                            style={{ perspective: "800px" }}
                        >
                        {/* Gradient line top */}
                        <div
                            className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />

                        <div className={`service-icon w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6`}>
                            <service.icon size={32} className={service.iconColor} />
                        </div>

                        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold dark:text-white text-hemo-dark mb-3">
                            {service.title}
                        </h3>

                        <p className="dark:text-white/50 text-hemo-dark/60 text-sm leading-relaxed mb-6">
                            {service.description}
                        </p>

                        <div className="flex items-center gap-1 text-sm text-hemo-lime opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                            Saiba mais <ArrowRight size={14} />
                        </div>
                    </div>
                    ))}
                </div>

                {/* ─── CTA at end ─── */}
                <div className="lg:flex-shrink-0 lg:w-[40vw] w-full flex flex-col items-center justify-center lg:pl-8 mt-12 lg:mt-0">
                    <MagneticButton
                        href="https://www.hemolabma.com.br/resultados-pulse/"
                        className="px-10 py-5 bg-hemo-red text-white font-bold rounded-full flex items-center justify-center gap-3 hover:bg-hemo-red-dark transition-colors shadow-xl shadow-hemo-red/20 group text-base md:text-lg mb-4 w-full sm:w-auto"
                    >
                        Acessar Resultados
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>

                    <MagneticButton
                        href="https://wa.me/+5599981866145"
                        className="px-10 py-5 dark:bg-white/5 bg-hemo-dark/8 dark:text-white text-hemo-dark font-semibold rounded-full flex items-center justify-center gap-3 dark:border-white/10 border-hemo-dark/10 border dark:hover:bg-white/10 hover:bg-hemo-dark/15 transition-colors text-base md:text-lg w-full sm:w-auto"
                    >
                        Agendar Coleta
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
