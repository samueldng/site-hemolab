"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "../ui/MagneticButton";
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
    {
        icon: Phone,
        label: "WhatsApp",
        value: "(99) 98186-6145",
        href: "https://wa.me/+5599981866145",
        color: "bg-green-500/10 text-green-500",
    },
    {
        icon: Mail,
        label: "E-mail",
        value: "contato@hemolabma.com.br",
        href: "mailto:contato@hemolabma.com.br",
        color: "bg-hemo-red/10 text-hemo-red",
    },
    {
        icon: MapPin,
        label: "Endereço",
        value: "R. Magalhães de Almeida, 469 — Bacabal, MA",
        href: "https://www.google.com/maps/place/Laborat%C3%B3rio+Hemolab",
        color: "bg-hemo-lime/10 text-hemo-green-light",
    },
    {
        icon: Clock,
        label: "Horário",
        value: "Seg-Sex: 6h às 17h | Sáb: 6h às 12h",
        href: null,
        color: "bg-gold/10 text-gold",
    },
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const s = sectionRef.current;
            const track = trackRef.current;
            if (!s || !track) return;

            // ─── HORIZONTAL SCROLL ───
            const totalScroll = track.scrollWidth - window.innerWidth;

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

            // ─── Title ───
            const titles = s.querySelectorAll(".ct-title");
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

            // ─── Cards ───
            const cards = gsap.utils.toArray<HTMLElement>(".ct-card", track);
            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { y: 80, opacity: 0, scale: 0.85 },
                    {
                        y: 0, opacity: 1, scale: 1,
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

            // ─── CTA Panel ───
            const cta = track.querySelector(".ct-cta");
            if (cta) {
                gsap.fromTo(
                    cta,
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1, scale: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cta,
                            containerAnimation: scrollTween,
                            start: "left 75%",
                            end: "left 35%",
                            scrub: true,
                        },
                    }
                );
            }
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="contato" className="relative dark:bg-hemo-dark bg-[#F0EDE6] overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full dark:bg-hemo-green/3 bg-hemo-green/5 blur-3xl pointer-events-none" />

            {/* ═══ HORIZONTAL SCROLL TRACK ═══ */}
            <div
                ref={trackRef}
                className="flex items-center h-screen will-change-transform gap-8"
                style={{ paddingLeft: "6vw", paddingRight: "6vw" }}
            >
                {/* ─── Title Panel ─── */}
                <div className="flex-shrink-0 w-[35vw] flex flex-col justify-center pr-8">
                    <span className="ct-title inline-block text-hemo-lime text-sm font-semibold tracking-widest uppercase mb-4">
                        Fale Conosco
                    </span>
                    <h2 className="ct-title font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold dark:text-white text-hemo-dark mb-6 leading-tight">
                        Entre em{" "}
                        <span className="text-gradient-brand">Contato</span>
                    </h2>
                    <p className="ct-title text-lg dark:text-white/50 text-hemo-dark/60 max-w-md mb-8">
                        Tire suas dúvidas, agende exames ou solicite coleta domiciliar.
                        Estamos prontos para atendê-lo.
                    </p>
                    <div className="ct-title flex items-center gap-3 dark:text-white/25 text-hemo-dark/30">
                        <div className="w-12 h-px dark:bg-white/15 bg-hemo-dark/20" />
                        <span className="text-xs font-semibold uppercase tracking-widest">Deslize</span>
                        <ArrowRight size={16} className="animate-pulse" />
                    </div>
                </div>

                {/* ─── Contact Cards ─── */}
                {CONTACT_INFO.map((info) => {
                    const Tag = info.href ? "a" : "div";
                    const linkProps = info.href
                        ? {
                            href: info.href,
                            target: info.href.startsWith("http") ? "_blank" as const : undefined,
                            rel: info.href.startsWith("http") ? "noopener noreferrer" : undefined,
                        }
                        : {};

                    return (
                        <Tag
                            key={info.label}
                            {...linkProps}
                            className="ct-card flex-shrink-0 w-[280px] group dark:bg-surface-light/50 bg-white/90 backdrop-blur-sm rounded-3xl p-8 dark:border-white/5 border-black/6 border dark:hover:border-white/15 hover:border-black/12 transition-all duration-500 text-center hover:-translate-y-2 self-center shadow-sm hover:shadow-xl dark:shadow-none"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${info.color} flex items-center justify-center mx-auto mb-5`}>
                                <info.icon size={28} />
                            </div>
                            <h4 className="dark:text-white/40 text-hemo-dark/50 text-xs uppercase tracking-wider mb-3">
                                {info.label}
                            </h4>
                            <p className="dark:text-white text-hemo-dark text-sm font-medium leading-relaxed">
                                {info.value}
                            </p>
                        </Tag>
                    );
                })}

                {/* ─── CTA Banner ─── */}
                <div className="ct-cta flex-shrink-0 w-[50vw] self-center">
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-hemo-red via-hemo-red-dark to-hemo-green" />
                        <div className="absolute inset-0 bg-[url('/images/Fachada_gota.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-12 md:p-16">
                            <div>
                                <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-3">
                                    Agende seu exame agora
                                </h3>
                                <p className="text-white/70 text-lg">
                                    Ligue ou envie uma mensagem no WhatsApp.
                                </p>
                            </div>
                            <MagneticButton
                                href="https://wa.me/+5599981866145"
                                className="shrink-0 px-10 py-5 bg-white text-hemo-red font-bold rounded-full flex items-center gap-3 hover:bg-cream transition-colors shadow-xl group text-lg"
                            >
                                <MessageCircle size={22} />
                                WhatsApp
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
