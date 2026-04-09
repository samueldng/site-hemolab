"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { MapPin, Phone, Globe, Video, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const QUICK_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Unidades", href: "#unidades" },
    { label: "Convênios", href: "#convenios" },
    { label: "Contato", href: "#contato" },
];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".footer-content > *", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                },
            });
        },
        { scope: footerRef }
    );

    return (
        <footer ref={footerRef} className="bg-hemo-dark text-white/80">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Image
                            src="/images/logo-hemolab-1024x434 1.png"
                            alt="Hemolab"
                            width={180}
                            height={76}
                            className="h-14 w-auto mb-4 brightness-0 invert opacity-90"
                        />
                        <p className="text-sm leading-relaxed text-white/60">
                            Referência em análises clínicas em Bacabal-MA. Tecnologia de
                            ponta, rigor técnico e atendimento humanizado.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-[family-name:var(--font-display)] text-white font-semibold text-lg mb-4">
                            Navegação
                        </h4>
                        <ul className="space-y-2">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm hover:text-hemo-lime transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-[family-name:var(--font-display)] text-white font-semibold text-lg mb-4">
                            Contato
                        </h4>
                        <div className="space-y-3">
                            <a
                                href="https://www.google.com/maps/place/Laborat%C3%B3rio+Hemolab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 text-sm hover:text-hemo-lime transition-colors"
                            >
                                <MapPin size={16} className="mt-0.5 shrink-0 text-hemo-red" />
                                Rua Magalhães de Almeida, n° 469, Centro — Bacabal-MA
                            </a>
                            <a
                                href="https://wa.me/+5599981866145"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm hover:text-hemo-lime transition-colors"
                            >
                                <Phone size={16} className="shrink-0 text-hemo-red" />
                                (99) 98186-6145
                            </a>
                            <a
                                href="mailto:contato@hemolabma.com.br"
                                className="flex items-center gap-3 text-sm hover:text-hemo-lime transition-colors"
                            >
                                <Mail size={16} className="shrink-0 text-hemo-red" />
                                contato@hemolabma.com.br
                            </a>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-[family-name:var(--font-display)] text-white font-semibold text-lg mb-4">
                            Redes Sociais
                        </h4>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/hemolabma/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hemo-red transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <Globe size={18} />
                            </a>
                            <a
                                href="https://www.youtube.com/@laboratoriohemolab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hemo-red transition-colors duration-300"
                                aria-label="YouTube"
                            >
                                <Video size={18} />
                            </a>
                        </div>
                        <div className="mt-6">
                            <a
                                href="https://www.hemolabma.com.br/resultados-pulse/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex px-5 py-2.5 bg-hemo-red text-white text-sm font-semibold rounded-full hover:bg-hemo-red-dark transition-colors"
                            >
                                Consultar Resultados
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} Laboratório Hemolab. Todos os direitos reservados.</p>
                    <p>Resp. Técnico: Dr. Alexson Carvalho — CRF/MA</p>
                </div>
            </div>
        </footer>
    );
}
