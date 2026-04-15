"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CONVENIOS = [
    { name: "Humana Saúde", logo: "/hemolab/images/convenios/humana.png" },
    { name: "CASSI", logo: "/hemolab/images/convenios/cassi.png" },
    { name: "Santa Terezinha", logo: "/hemolab/images/convenios/santa-terezinha.png" },
    { name: "Plasfran", logo: "/hemolab/images/convenios/plasfran.png" },
    { name: "Bradesco Saúde", logo: "/hemolab/images/convenios/bradesco.png" },
    { name: "Vida", logo: "/hemolab/images/convenios/vida.png" },
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
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="convenios" className="bg-[#f2f4f1] py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="convenios-title inline-block px-4 py-1.5 rounded-full bg-[#004731]/10 text-[#006B4A] text-xs font-bold tracking-widest uppercase mb-4">
                        Convênios & Parceiros
                    </span>
                    <h2 className="convenios-title font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-hemo-dark mb-6">
                        Trabalhamos com os melhores <span className="text-hemo-green">convênios</span>
                    </h2>
                    <p className="convenios-title text-base sm:text-lg text-hemo-dark/60 max-w-xl mx-auto">
                        Aceitamos os principais planos de saúde para sua comodidade
                    </p>
                </div>

                {/* Infinite Marquee */}
                <div className="relative flex overflow-x-hidden group mt-16 max-w-screen-2xl mx-auto [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex animate-marquee items-center gap-6 min-w-max hover:[animation-play-state:paused]">
                        {/* Duplicate lists twice to ensure smooth infinite scrolling. Since we only translate -50%, we need enough width to seamlessly loop */}
                        {[...CONVENIOS, ...CONVENIOS, ...CONVENIOS, ...CONVENIOS].map((convenio, index) => (
                            <div
                                key={`${convenio.name}-${index}`}
                                className="flex-shrink-0 w-36 h-20 sm:w-44 sm:h-24 md:w-56 md:h-28 bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 p-4 border border-hemo-dark/5"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={convenio.logo}
                                        alt={convenio.name}
                                        fill
                                        className="object-contain mix-blend-multiply"
                                        sizes="(max-width: 768px) 144px, 224px"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Note */}
                <div className="mt-12 flex items-center justify-center gap-2 text-sm text-hemo-dark/60">
                    <div className="w-5 h-5 rounded-full bg-[#004731] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+</span>
                    </div>
                    <span>E muitos outros! <strong className="text-[#004731]">Consulte seu convênio</strong></span>
                </div>
            </div>
        </section>
    );
}

