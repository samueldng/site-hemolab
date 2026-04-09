"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ImageReveal from "../ui/ImageReveal";
import { MapPin, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const UNITS = [
    {
        name: "Matriz — Bacabal",
        address: "Rua Magalhães de Almeida, n° 469, Centro",
        city: "Bacabal - MA",
        mapLink:
            "https://www.google.com/maps/place/Laborat%C3%B3rio+Hemolab",
        image: "/images/fachada-300x300.png",
    },
    {
        name: "Unidade Satubinha",
        address: "Satubinha - MA",
        city: "Satubinha - MA",
        mapLink: "https://www.google.com/maps",
        image: "/images/hemolab-satubinha-300x300.png",
    },
];

const GALLERY = [
    { src: "/images/01-1024x1004.png", alt: "Laboratório Hemolab - Análises", delay: 0 },
    { src: "/images/02-1024x1004.png", alt: "Laboratório Hemolab - Equipamentos", delay: 0.15 },
    { src: "/images/04-1024x1001.png", alt: "Laboratório Hemolab - Coleta", delay: 0.3 },
    { src: "/images/03-300x294.png", alt: "Laboratório Hemolab - Recepção", delay: 0.45 },
];

export default function UnitsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const s = sectionRef.current;
            if (!s) return;

            const titles = s.querySelectorAll(".units-title");
            if (titles.length) {
                gsap.fromTo(titles, { y: 50, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: s, start: "top 85%" },
                });
            }

            const cards = s.querySelectorAll(".unit-card");
            if (cards.length) {
                gsap.fromTo(cards, { y: 60, opacity: 0 }, {
                    y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: s.querySelector(".units-grid"), start: "top 80%" },
                });
            }

            const galleryTitle = s.querySelector(".gallery-title");
            if (galleryTitle) {
                gsap.fromTo(galleryTitle, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: galleryTitle, start: "top 85%" },
                });
            }
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="unidades" className="bg-cream py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="units-title inline-block text-hemo-red text-sm font-semibold tracking-widest uppercase mb-3">
                        Onde estamos
                    </span>
                    <h2 className="units-title font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-hemo-dark mb-6">
                        Nossas <span className="text-hemo-red">Unidades</span>
                    </h2>
                </div>

                {/* Units Grid */}
                <div className="units-grid grid md:grid-cols-2 gap-8 mb-20">
                    {UNITS.map((unit) => (
                        <div
                            key={unit.name}
                            className="unit-card group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-hemo-dark/5"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute inset-0">
                                    <img
                                        src={unit.image}
                                        alt={unit.name}
                                        className="w-full h-full object-cover photo-premium group-hover:revealed transition-all duration-700"
                                        onMouseEnter={(e) => e.currentTarget.classList.add("revealed")}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove("revealed")}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-hemo-dark/80 to-transparent" />
                                <h3 className="absolute bottom-4 left-6 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                                    {unit.name}
                                </h3>
                            </div>

                            <div className="p-6">
                                <div className="flex items-start gap-3 text-hemo-dark/70 mb-4">
                                    <MapPin size={18} className="shrink-0 text-hemo-red mt-0.5" />
                                    <div>
                                        <p className="text-sm">{unit.address}</p>
                                        <p className="text-sm font-medium text-hemo-dark">{unit.city}</p>
                                    </div>
                                </div>

                                <a
                                    href={unit.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-hemo-green font-semibold hover:text-hemo-red transition-colors"
                                >
                                    Ver no Google Maps <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gallery */}
                <div className="mb-8">
                    <h3 className="gallery-title font-[family-name:var(--font-display)] text-3xl font-bold text-hemo-dark text-center mb-12">
                        Nossa <span className="text-hemo-red">Estrutura</span>
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {GALLERY.map((img) => (
                            <ImageReveal
                                key={img.src}
                                src={img.src}
                                alt={img.alt}
                                width={500}
                                height={500}
                                delay={img.delay}
                                className="aspect-square"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
