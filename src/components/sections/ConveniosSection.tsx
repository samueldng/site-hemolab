"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Shield, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CONVENIOS = [
    "Bradesco Saúde",
    "SulAmérica",
    "Unimed",
    "Hapvida",
    "São Francisco",
    "Particular",
    "GEAP",
    "CASSI",
    "PLAMTA",
    "POSTAL SAÚDE",
    "VIDA CARD",
    "PLAN-ASSISTE",
];

export default function ConveniosSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const titles = sectionRef.current?.querySelectorAll(".convenios-title");
            if (titles) {
                gsap.fromTo(
                    titles,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
                    }
                );
            }

            const items = sectionRef.current?.querySelectorAll(".convenio-item");
            if (items && items.length > 0) {
                gsap.fromTo(
                    items,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.06,
                        duration: 0.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current?.querySelector(".convenios-grid"),
                            start: "top 85%",
                        },
                    }
                );
            }
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="convenios" className="bg-cream py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="convenios-title inline-block text-hemo-red text-sm font-semibold tracking-widest uppercase mb-3">
                        Planos aceitos
                    </span>
                    <h2 className="convenios-title font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-hemo-dark mb-6">
                        Convênios e <span className="text-hemo-red">Planos</span>
                    </h2>
                    <p className="convenios-title text-lg text-hemo-dark/60 max-w-xl mx-auto">
                        Aceitamos os principais convênios e planos de saúde. Confira abaixo ou entre em contato para mais informações.
                    </p>
                </div>

                {/* Convenios Grid */}
                <div className="convenios-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {CONVENIOS.map((name) => (
                        <div
                            key={name}
                            className="convenio-item flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-hemo-dark/5 hover:border-hemo-green/30 hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-hemo-green/10 flex items-center justify-center shrink-0 group-hover:bg-hemo-green/20 transition-colors">
                                <Check size={16} className="text-hemo-green" />
                            </div>
                            <span className="text-sm font-medium text-hemo-dark/80">{name}</span>
                        </div>
                    ))}
                </div>

                {/* Note */}
                <div className="mt-10 flex items-center justify-center gap-2 text-sm text-hemo-dark/40">
                    <Shield size={16} />
                    <span>Também atendemos particular. Consulte valores.</span>
                </div>
            </div>
        </section>
    );
}
