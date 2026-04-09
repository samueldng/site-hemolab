"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import ImageReveal from "../ui/ImageReveal";
import { MapPin, ExternalLink, ArrowRight } from "lucide-react";

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
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const s = sectionRef.current;
            const track = trackRef.current;
            if (!s || !track) return;

            // ─── HORIZONTAL SCROLL: Units + Gallery ───
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
                const titles = s.querySelectorAll(".units-title");
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

                // ─── Card reveals ───
                const items = gsap.utils.toArray<HTMLElement>(".unit-item", track);
                items.forEach((item) => {
                    gsap.fromTo(
                        item,
                        { y: 60, opacity: 0, scale: 0.9 },
                        {
                            y: 0, opacity: 1, scale: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: item,
                                containerAnimation: scrollTween,
                                start: "left 85%",
                                end: "left 40%",
                                scrub: true,
                            },
                        }
                    );
                });

                // ─── Gallery reveals ───
                const photos = gsap.utils.toArray<HTMLElement>(".gallery-item", track);
                photos.forEach((photo) => {
                    const mask = photo.querySelector(".gallery-mask");
                    const img = photo.querySelector(".gallery-img");

                    if (mask) {
                        gsap.fromTo(
                            mask,
                            { scaleX: 1 },
                            {
                                scaleX: 0,
                                ease: "power3.inOut",
                                scrollTrigger: {
                                    trigger: photo,
                                    containerAnimation: scrollTween,
                                    start: "left 80%",
                                    end: "left 40%",
                                    scrub: true,
                                },
                            }
                        );
                    }

                    if (img) {
                        gsap.fromTo(
                            img,
                            { scale: 1.4 },
                            {
                                scale: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: photo,
                                    containerAnimation: scrollTween,
                                    start: "left 80%",
                                    end: "left 20%",
                                    scrub: true,
                                },
                            }
                        );
                    }
                });
            });

            mm.add("(max-width: 1023px)", () => {
                const elements = s.querySelectorAll(".units-title, .unit-item, .gallery-item");
                
                elements.forEach((el) => {
                    const mask = el.querySelector(".gallery-mask");
                    if (mask) {
                        gsap.to(mask, {
                            scaleX: 0,
                            ease: "power3.inOut",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 75%",
                            }
                        });
                    }

                    gsap.fromTo(
                        el,
                        { y: 40, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 85%",
                            }
                        }
                    );
                });
            });

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="unidades" className="relative bg-cream min-h-screen overflow-hidden">
            {/* Smooth transition from dark to cream */}
            <div className="absolute -top-px left-0 right-0 h-32 bg-gradient-to-b from-hemo-dark to-cream z-20 pointer-events-none" />

            {/* ═══ HORIZONTAL SCROLL TRACK ═══ */}
            <div
                ref={trackRef}
                className="flex flex-col lg:flex-row items-stretch lg:items-center lg:h-screen will-change-transform gap-10 pt-48 pb-16 lg:py-0 px-6 lg:px-[6vw] w-full lg:w-max relative z-10"
            >
                {/* ─── Title Panel ─── */}
                <div className="lg:flex-shrink-0 lg:w-[35vw] flex flex-col justify-center lg:pr-8 w-full">
                    <span className="units-title inline-block text-hemo-red text-sm font-semibold tracking-widest uppercase mb-4">
                        Onde estamos
                    </span>
                    <h2 className="units-title font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-hemo-dark mb-6 leading-tight">
                        Nossas <span className="text-hemo-red">Unidades</span>
                    </h2>
                    <p className="units-title text-lg text-hemo-dark/50 max-w-md mb-8">
                        Duas unidades estrategicamente localizadas para atender
                        Bacabal e região com excelência.
                    </p>
                    <div className="units-title flex items-center gap-3 text-hemo-dark/25">
                        <div className="w-12 h-px bg-hemo-dark/15" />
                        <span className="text-xs font-semibold uppercase tracking-widest">Deslize</span>
                        <ArrowRight size={16} className="animate-pulse" />
                    </div>
                </div>

                {/* ─── Unit Cards ─── */}
                <div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto overflow-hidden">
                    {UNITS.map((unit) => (
                        <div
                            key={unit.name}
                            className="unit-item w-full md:w-1/2 lg:w-[400px] lg:flex-shrink-0 group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-hemo-dark/5 hover:-translate-y-2"
                        >
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={unit.image}
                                alt={unit.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
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

                {/* ─── Divider ─── */}
                <div className="lg:flex-shrink-0 flex lg:flex-col items-center justify-center lg:px-8 self-center py-6 lg:py-0 w-full lg:w-auto">
                    <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-transparent via-hemo-dark/10 to-transparent" />
                    <div className="lg:hidden h-px w-full max-w-xs bg-gradient-to-r from-transparent via-hemo-dark/10 to-transparent" />
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-hemo-dark my-4 lg:[writing-mode:vertical-rl] lg:rotate-180 px-4 lg:px-0 text-center">
                        Nossa <span className="text-hemo-red">Estrutura</span>
                    </h3>
                    <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-transparent via-hemo-dark/10 to-transparent" />
                    <div className="lg:hidden h-px w-full max-w-xs bg-gradient-to-r from-transparent via-hemo-dark/10 to-transparent" />
                </div>

                {/* ─── Gallery Photos with mask reveal ─── */}
                <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-6 w-full lg:w-auto">
                    {GALLERY.map((img) => (
                        <div
                            key={img.src}
                            className="gallery-item w-full sm:w-auto lg:w-[350px] aspect-square relative rounded-3xl overflow-hidden shadow-lg lg:self-center"
                        >
                        {/* Red mask that slides away */}
                        <div
                            className="gallery-mask absolute inset-0 bg-hemo-red z-10"
                            style={{ transformOrigin: "right center" }}
                        />
                        <div className="gallery-img absolute inset-0">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="350px"
                            />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
