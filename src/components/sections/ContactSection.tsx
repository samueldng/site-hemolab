"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "../ui/MagneticButton";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

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

    useGSAP(
        () => {
            const s = sectionRef.current;
            if (!s) return;

            const titles = s.querySelectorAll(".contact-title");
            if (titles.length) {
                gsap.fromTo(titles, { y: 50, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "top 85%" },
                });
            }

            const cards = s.querySelectorAll(".contact-card");
            if (cards.length) {
                gsap.fromTo(cards, { y: 50, opacity: 0 }, {
                    y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out",
                    scrollTrigger: { trigger: s.querySelector(".contact-grid"), start: "top 85%" },
                });
            }

            const cta = s.querySelector(".contact-cta");
            if (cta) {
                gsap.fromTo(cta, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: cta, start: "top 90%" },
                });
            }
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="contato" className="relative bg-hemo-dark py-24 overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-hemo-green/3 blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="contact-title inline-block text-hemo-lime text-sm font-semibold tracking-widest uppercase mb-3">
                        Fale Conosco
                    </span>
                    <h2 className="contact-title font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-6">
                        Entre em <span className="text-gradient-brand">Contato</span>
                    </h2>
                    <p className="contact-title text-lg text-white/50 max-w-xl mx-auto">
                        Tire suas dúvidas, agende exames ou solicite coleta domiciliar.
                        Estamos prontos para atendê-lo.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="contact-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {CONTACT_INFO.map((info) => {
                        const Tag = info.href ? "a" : "div";
                        const linkProps = info.href
                            ? {
                                href: info.href,
                                target: info.href.startsWith("http") ? "_blank" : undefined,
                                rel: info.href.startsWith("http") ? "noopener noreferrer" : undefined,
                            }
                            : {};

                        return (
                            <Tag
                                key={info.label}
                                {...linkProps}
                                className="contact-card group bg-surface-light/50 backdrop-blur-sm rounded-3xl p-6 border border-white/5 hover:border-white/15 transition-all duration-500 text-center hover:-translate-y-1"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${info.color} flex items-center justify-center mx-auto mb-4`}>
                                    <info.icon size={22} />
                                </div>
                                <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">
                                    {info.label}
                                </h4>
                                <p className="text-white text-sm font-medium leading-relaxed">
                                    {info.value}
                                </p>
                            </Tag>
                        );
                    })}
                </div>

                {/* CTA Banner */}
                <div className="contact-cta relative rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-hemo-red via-hemo-red-dark to-hemo-green" />
                    <div className="absolute inset-0 bg-[url('/images/Fachada_gota.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-10 md:p-14">
                        <div>
                            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-2">
                                Agende seu exame agora
                            </h3>
                            <p className="text-white/70">
                                Ligue ou envie uma mensagem no WhatsApp para mais informações.
                            </p>
                        </div>
                        <MagneticButton
                            href="https://wa.me/+5599981866145"
                            className="shrink-0 px-10 py-4 bg-white text-hemo-red font-bold rounded-full flex items-center gap-2 hover:bg-cream transition-colors shadow-xl group"
                        >
                            WhatsApp
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
