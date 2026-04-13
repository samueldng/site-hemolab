"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { MapPin, Navigation, Map, X, ExternalLink } from "lucide-react";
import { clinics, Clinic } from "@/data/units";
import MaranhaoRegionMap from "@/components/maps/MaranhaoRegionMap";

export default function UnitsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const mapInnerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const pinsRef = useRef<(HTMLButtonElement | null)[]>([]);

    const [activeClinic, setActiveClinic] = useState<Clinic>(clinics[0]);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [mapModalClinic, setMapModalClinic] = useState<Clinic | null>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    // ─── GSAP MAP PAN & ZOOM ───
    useGSAP(() => {
        if (!mapInnerRef.current || !cardRef.current) return;

        // Calculating the pan. The mapInner is 200% size, meaning its absolute center is its own center.
        // If the pin is at x: 40%, we shift the map so 40% becomes the visual center.
        // It's basic relative offset math.
        const targetX = 50 - activeClinic.coords.x;
        const targetY = 50 - activeClinic.coords.y;

        gsap.to(mapInnerRef.current, {
            x: `${targetX}%`,
            y: `${targetY}%`,
            scale: 1, // Leve zoom for effect
            duration: 1.5,
            ease: "power4.inOut"
        });

        // Animate Float Card (Preview)
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, scale: 0.8, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 0.2, ease: "back.out(1.5)" }
        );

        // Animate Pins
        pinsRef.current.forEach((pin, i) => {
            if (!pin) return;
            const isTarget = clinics[i].id === activeClinic.id;
            gsap.to(pin, {
                scale: isTarget ? 1.4 : 1,
                opacity: isTarget ? 1 : 0.6,
                zIndex: isTarget ? 50 : 10,
                duration: 0.6,
                ease: "back.out(2)"
            });

            const ping = pin.querySelector('.pin-ping');
            if (ping) {
                if (isTarget) {
                    gsap.fromTo(ping,
                        { scale: 1, opacity: 0.8 },
                        { scale: 3, opacity: 0, duration: 1.5, repeat: -1, ease: "sine.out" }
                    );
                } else {
                    gsap.killTweensOf(ping);
                    gsap.set(ping, { opacity: 0 });
                }
            }
        });

    }, { scope: sectionRef, dependencies: [activeClinic] });

    // ─── AUTO-TOUR (Virtual Tour) ───
    useEffect(() => {
        if (!isAutoPlay) return;

        autoPlayRef.current = setInterval(() => {
            setActiveClinic(current => {
                const currentIndex = clinics.findIndex(c => c.id === current.id);
                const nextIndex = (currentIndex + 1) % clinics.length;
                return clinics[nextIndex];
            });
        }, 5000);

        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isAutoPlay]);

    const handleManualSelect = (clinic: Clinic) => {
        setIsAutoPlay(false);
        setActiveClinic(clinic);
    };

    const openMapModal = useCallback((clinic: Clinic) => {
        setMapModalClinic(clinic);
        document.body.style.overflow = "hidden";
    }, []);

    const closeMapModal = useCallback(() => {
        setMapModalClinic(null);
        document.body.style.overflow = "";
    }, []);

    // Close modal on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMapModal();
        };
        if (mapModalClinic) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [mapModalClinic, closeMapModal]);

    const getGoogleMapsQuery = (clinic: Clinic) =>
        encodeURIComponent(clinic.name + " " + clinic.city);

    const getEmbedUrl = (clinic: Clinic) =>
        `https://maps.google.com/maps?q=${getGoogleMapsQuery(clinic)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    const getDirectionsUrl = (clinic: Clinic) =>
        `https://www.google.com/maps/search/?api=1&query=${getGoogleMapsQuery(clinic)}`;

    if (!isClient) return null;

    return (
        <>
        <section ref={sectionRef} id="unidades" className="relative bg-[#ebebeb] py-24 lg:py-32 overflow-hidden flex items-center min-h-screen">
            {/* Background design accents similar to image */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#004731] via-hemo-red to-hemo-lime" />
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/20 rounded-bl-[100px] blur-3xl mix-blend-overlay pointer-events-none" />

            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-10 xl:gap-20">

                {/* ════════════════════════════════════════════════ */}
                {/* LEFT: INTERACTIVE CIRCULAR MAP                  */}
                {/* ════════════════════════════════════════════════ */}
                <div className="w-full lg:w-[45%] flex justify-center lg:justify-start relative">

                    <div className="w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[650px] xl:h-[650px] rounded-full border-[10px] lg:border-[16px] border-[#004731] shadow-2xl relative overflow-hidden bg-[#d0c9bb] lg:-ml-12 shrink-0">
                        {/* Container that moves (Pan) */}
                        <div
                            ref={mapInnerRef}
                            className="absolute inset-0 w-[200%] h-[200%] left-[-50%] top-[-50%] will-change-transform"
                        >
                            {/* SVG REGIONAL MAP BACKGROUND */}
                            <MaranhaoRegionMap />

                            {/* PINS RENDERING */}
                            {clinics.map((clinic, i) => (
                                <button
                                    key={clinic.id}
                                    ref={el => { pinsRef.current[i] = el; }}
                                    onClick={() => handleManualSelect(clinic)}
                                    className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                    style={{
                                        left: `${clinic.coords.x}%`,
                                        top: `${clinic.coords.y}%`
                                    }}
                                    title={clinic.name}
                                >
                                    <div className="pin-ping absolute w-full h-full bg-hemo-red rounded-full opacity-0 pointer-events-none" />
                                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#004731] text-[#004731] relative z-10">
                                        {clinic.type === 'Própria' ? (
                                            <MapPin size={16} className="text-hemo-red" fill="currentColor" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border-[3px] border-hemo-red" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* PREVIEW FLOATING CARD */}
                        <div
                            ref={cardRef}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px] bg-white rounded-3xl p-3 flex gap-4 items-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] z-50 pointer-events-auto"
                        >
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                                <Image
                                    src={activeClinic.photo}
                                    alt={activeClinic.name}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <span className={`text-[10px] uppercase font-bold tracking-wider w-fit px-2 py-0.5 rounded-md mb-1 ${activeClinic.type === 'Própria' ? 'bg-[#004731] text-white' : 'bg-hemo-red/10 text-hemo-red'}`}>
                                    {activeClinic.type}
                                </span>
                                <h4 className="font-bold text-[#004731] text-sm leading-tight mb-1">{activeClinic.name}</h4>
                                <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mb-2">
                                    <MapPin size={10} /> {activeClinic.city}
                                </p>
                                <button
                                    onClick={() => openMapModal(activeClinic)}
                                    className="text-[10px] text-white bg-hemo-red hover:bg-hemo-red-dark transition-colors px-3 py-1.5 rounded-full font-bold flex items-center justify-center gap-1 shadow-md w-full cursor-pointer"
                                >
                                    <Navigation size={10} /> Ver Rotas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ════════════════════════════════════════════════ */}
                {/* RIGHT: CONTENT & GRID CONTROL                   */}
                {/* ════════════════════════════════════════════════ */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Map size={40} className="text-[#004731] shrink-0" />
                        <div>
                            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#004731] tracking-tight">
                                Unidades de Coleta
                            </h2>
                            <div className="h-1 w-full bg-gradient-to-r from-hemo-red to-transparent mt-2 rounded-full" />
                        </div>
                    </div>

                    <div className="inline-flex items-center bg-[#004731] text-white px-6 py-2 rounded-lg font-bold w-fit mb-8 shadow-lg shadow-[#004731]/30">
                        Clínicas Parceiras
                    </div>

                    {/* CLINICS GRID (Scrollable) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-hemo-red/20 scrollbar-track-transparent pb-10">
                        {clinics.map((clinic) => {
                            const isActive = clinic.id === activeClinic.id;

                            return (
                                <button
                                    key={clinic.id}
                                    onClick={() => handleManualSelect(clinic)}
                                    className={`flex items-center gap-3 text-left group transition-all duration-300 p-2 rounded-xl
                                        ${isActive ? 'bg-white shadow-md scale-105' : 'hover:bg-black/5'}
                                    `}
                                >
                                    <div className="relative w-8 h-10 shrink-0">
                                        <Image
                                            src="/images/iconePC.png"
                                            alt="Icone"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-sm leading-tight transition-colors ${isActive ? 'text-[#004731]' : 'text-[#004731] group-hover:text-hemo-red'}`}>
                                            {clinic.name}
                                        </h4>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-hemo-red' : 'text-gray-400'}`}>
                                                {clinic.city}
                                            </span>
                                            {isActive && <div className="w-1 h-1 rounded-full bg-hemo-red ml-1" />}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>

            {/* ════════════════════════════════════════════════ */}
            {/* GOOGLE MAPS MODAL                              */}
            {/* ════════════════════════════════════════════════ */}
            {mapModalClinic && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Mapa - ${mapModalClinic.name}`}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
                        onClick={closeMapModal}
                    />

                    {/* Modal Container */}
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease]"
                        style={{ maxHeight: "90vh" }}
                    >
                        {/* ─── Header ─── */}
                        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-hemo-red/10 flex items-center justify-center shrink-0">
                                    <MapPin size={20} className="text-hemo-red" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-[#004731] text-lg leading-tight truncate">
                                        {mapModalClinic.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium truncate">
                                        {mapModalClinic.address} — {mapModalClinic.city}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={closeMapModal}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                                aria-label="Fechar mapa"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>

                        {/* ─── Map iframe ─── */}
                        <div className="relative w-full" style={{ height: "min(60vh, 480px)" }}>
                            <iframe
                                src={getEmbedUrl(mapModalClinic)}
                                className="absolute inset-0 w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                title={`Mapa de ${mapModalClinic.name}`}
                            />
                        </div>

                        {/* ─── Footer ─── */}
                        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                            <span className="text-xs text-gray-400 font-medium hidden sm:block">
                                {mapModalClinic.type === 'Própria' ? 'Unidade Própria' : 'Clínica Parceira'}
                            </span>
                            <div className="flex items-center gap-3 ml-auto">
                                <a
                                    href={getDirectionsUrl(mapModalClinic)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-hemo-red hover:bg-hemo-red-dark text-white text-sm font-bold rounded-full transition-colors shadow-md shadow-hemo-red/20"
                                >
                                    <ExternalLink size={14} />
                                    Abrir no Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

