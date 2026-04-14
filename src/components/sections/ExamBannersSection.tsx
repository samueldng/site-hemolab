"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_EXAMS, formatPrice } from "@/data/exams";
import { useCart } from "@/components/providers/CartProvider";
import MagneticButton from "../ui/MagneticButton";
import {
  Clock,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CARD_ICONS = [Sparkles, Zap, Shield];

export default function ExamBannersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useCart();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".hscroll-panel", track);
        if (!panels.length) return;

        const totalScroll = track.scrollWidth - window.innerWidth;

        // ─── Master horizontal tween (pinned) ───
        const scrollTween = gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: true,
            end: () => `+=${totalScroll * 1.2}`,
            invalidateOnRefresh: true,
          },
        });

        // ─── Title entrance ───
        const titles = section.querySelectorAll(".hs-title");
        if (titles.length) {
          gsap.fromTo(
            titles,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
        }

        // ─── Per-panel reveal animations linked to main scrollTween ───
        panels.forEach((panel, i) => {
          if (i === 0) return; // Title panel, no images

          const mask = panel.querySelector(".panel-mask");
          const img = panel.querySelector(".panel-image");
          const content = panel.querySelector(".panel-content");
          const details = panel.querySelectorAll(".panel-detail");

          // Image mask reveal
          if (mask) {
            gsap.fromTo(
              mask,
              { scaleX: 1 },
              {
                scaleX: 0,
                ease: "power3.inOut",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 80%",
                  end: "left 30%",
                  scrub: true,
                },
              }
            );
          }

          // Image — scale down from zoomed
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.5 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 90%",
                  end: "left 10%",
                  scrub: true,
                },
              }
            );
          }

          // Content — slides in from right
          if (content) {
            gsap.fromTo(
              content,
              { x: 100, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 60%",
                  end: "left 20%",
                  scrub: true,
                },
              }
            );
          }

          // Detail items — stagger from below
          if (details.length) {
            gsap.fromTo(
              details,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 50%",
                  end: "left 10%",
                  scrub: true,
                },
              }
            );
          }
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".hscroll-panel", track);
        panels.forEach((panel) => {
          const elements = panel.querySelectorAll(".hs-title, .panel-detail");
          const mask = panel.querySelector(".panel-mask");

          if (mask) {
            gsap.to(mask, {
              scaleX: 0,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: panel,
                start: "top 70%",
              }
            });
          }

          if (elements.length) {
            gsap.fromTo(
              elements,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 80%",
                }
              }
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent, examSlug: string) => {
      e.preventDefault();
      e.stopPropagation();
      const exam = FEATURED_EXAMS.find((ex) => ex.slug === examSlug);
      if (!exam) return;
      dispatch({ type: "ADD_ITEM", exam });
      dispatch({ type: "OPEN_DRAWER" });

      const btn = e.currentTarget as HTMLElement;
      gsap.fromTo(
        btn,
        { scale: 0.85 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
      );
    },
    [dispatch]
  );

  return (
    <section
      ref={sectionRef}
      id="exames-destaque"
      className="relative dark:bg-hemo-dark bg-[#F8F6F0] overflow-hidden"
    >
      {/* ═══ HORIZONTAL SCROLL TRACK ═══ */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row items-center lg:items-stretch lg:min-h-screen will-change-transform w-full lg:w-max"
      >
        {/* ─── FIRST PANEL: Intro / Title ─── */}
        <div className="hscroll-panel lg:flex-shrink-0 w-full lg:w-screen min-h-screen py-24 lg:py-0 flex items-center justify-center relative">
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(164,205,57,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(164,205,57,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-hemo-red/6 blur-[120px]" />
          <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full bg-hemo-lime/8 blur-[100px]" />

          <div className="relative z-10 text-center px-8 max-w-3xl">
            <span className="hs-title inline-flex items-center gap-2 px-5 py-2 rounded-full bg-hemo-red/10 border border-hemo-red/20 text-sm text-hemo-red font-semibold mb-8">
              <Sparkles size={16} />
              Compre Online — Rápido e Fácil
            </span>
            <h2 className="hs-title font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[3.5rem] xl:text-7xl font-bold dark:text-white text-hemo-dark mb-4 xl:mb-8 leading-tight">
              Exames em{" "}
              <span className="text-gradient-brand">Destaque</span>
            </h2>
            <p className="hs-title text-xl dark:text-white/50 text-hemo-dark/60 max-w-xl mx-auto mb-12">
              Deslize para descobrir nossos exames. Selecione, compre e finalize em minutos.
            </p>
            <div className="hs-title flex items-center justify-center gap-3 text-hemo-lime/60">
              <div className="w-16 h-px bg-hemo-lime/30" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Continue rolando
              </span>
              <ArrowRight size={18} className="animate-pulse" />
              <div className="w-16 h-px bg-hemo-lime/30" />
            </div>
          </div>
        </div>

        {/* ─── EXAM PANELS ─── */}
        {FEATURED_EXAMS.map((exam, i) => {
          const Icon = CARD_ICONS[i] || Sparkles;
          return (
            <div
              key={exam.slug}
              className="hscroll-panel lg:flex-shrink-0 w-full lg:w-screen min-h-screen py-24 lg:py-0 flex items-center relative overflow-hidden"
            >
              {/* ── Full-bleed BG with mask effect ── */}
              <div className="absolute inset-0">
                {/* Dark mask that slides away via GSAP */}
                <div
                  className="panel-mask absolute inset-0 dark:bg-hemo-dark bg-[#F8F6F0] z-10"
                  style={{ transformOrigin: "right center" }}
                />
                {/* Actual image */}
                <div className="panel-image absolute inset-0">
                  <Image
                    src={exam.image}
                    alt={exam.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                {/* Reading overlays */}
                <div className="absolute inset-0 bg-gradient-to-r dark:from-hemo-dark dark:via-hemo-dark/75 dark:to-transparent from-[#F8F6F0] via-[#F8F6F0]/90 to-transparent z-20" />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-hemo-dark/50 dark:to-transparent from-[#F8F6F0]/80 to-transparent z-20" />
              </div>

              {/* ── Content (left side) ── */}
              <div className="panel-content relative z-30 max-w-2xl px-6 md:px-12 lg:px-28 mt-8 lg:mt-10 xl:mt-16">
                {/* Badge */}
                {exam.badge && (
                  <div className="panel-detail mb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hemo-red text-white text-xs md:text-sm font-bold shadow-lg shadow-hemo-red/30">
                      <Icon size={14} />
                      {exam.badge}
                    </span>
                  </div>
                )}

                {/* Category */}
                <span className="panel-detail block text-hemo-lime text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-2">
                  {exam.category}
                </span>

                {/* Name */}
                <h3 className="panel-detail font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[3.5rem] font-bold dark:text-white text-hemo-dark mb-3 xl:mb-4 leading-tight">
                  {exam.name}
                </h3>

                {/* Description */}
                <p className="panel-detail dark:text-white/60 text-hemo-dark/70 text-sm md:text-base leading-relaxed mb-5 max-w-lg">
                  {exam.description}
                </p>

                {/* Price + Time */}
                <div className="panel-detail flex items-center gap-5 mb-5">
                  <div>
                    {exam.oldPrice && (
                      <span className="block dark:text-white/30 text-hemo-dark/40 text-xs line-through mb-0.5">
                        {formatPrice(exam.oldPrice)}
                      </span>
                    )}
                    <span className="text-3xl lg:text-3xl xl:text-4xl font-bold dark:text-white text-hemo-dark">
                      {formatPrice(exam.price)}
                    </span>
                  </div>
                  <div className="h-10 w-px dark:bg-white/10 bg-hemo-dark/20" />
                  <div className="flex items-center gap-2 dark:text-white/50 text-hemo-dark/60 text-xs md:text-sm">
                    <Clock size={16} className="text-hemo-lime" />
                    <span>
                      Resultado em<br />
                      <strong className="dark:text-white text-hemo-dark block leading-tight">{exam.productionTime}</strong>
                    </span>
                  </div>
                </div>

                {/* Includes preview */}
                <div className="panel-detail flex flex-wrap gap-2 mb-6">
                  {exam.includes.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 dark:bg-white/5 dark:border-white/10 dark:text-white/60 bg-white border tracking-tight border-hemo-dark/10 text-hemo-dark/80 rounded-full text-[11px] md:text-xs"
                    >
                      {item}
                    </span>
                  ))}
                  {exam.includes.length > 4 && (
                    <span className="px-2.5 py-1 bg-hemo-lime/10 border border-hemo-lime/20 rounded-full text-hemo-lime text-[11px] md:text-xs font-semibold">
                      +{exam.includes.length - 4} mais
                    </span>
                  )}
                </div>

                {/* CTAs */}
                <div className="panel-detail flex flex-wrap gap-3">
                  <button
                    onClick={(e) => handleAddToCart(e, exam.slug)}
                    className="px-6 py-3 bg-hemo-red text-white font-bold rounded-full flex items-center gap-2 hover:bg-hemo-red-dark transition-all duration-300 shadow-lg shadow-hemo-red/30 text-sm group"
                  >
                    <ShoppingCart size={18} />
                    Comprar Exame
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                  <Link
                    href={`/exames/${exam.slug}`}
                    className="px-6 py-3 dark:bg-white/10 backdrop-blur-sm bg-hemo-dark/5 dark:text-white text-hemo-dark font-semibold rounded-full flex items-center gap-2 dark:hover:bg-white/20 hover:bg-hemo-dark/10 transition-all duration-300 border dark:border-white/10 border-hemo-dark/10 text-sm"
                  >
                    Detalhes
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* ── Right side decoration ── */}
              <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4">
                <span className="text-[140px] font-[family-name:var(--font-display)] font-black dark:text-white/[0.04] text-hemo-dark/[0.04] leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-px h-24 bg-gradient-to-b from-hemo-lime/30 to-transparent" />
                <span className="dark:text-white/20 text-hemo-dark/40 text-xs uppercase tracking-widest font-semibold [writing-mode:vertical-rl]">
                  {exam.shortName}
                </span>
              </div>

              {/* ── Bottom progress ── */}
              <div className="absolute bottom-10 left-12 md:left-20 lg:left-28 z-30 flex items-center gap-4">
                {FEATURED_EXAMS.map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`transition-all duration-500 rounded-full ${dotIdx === i
                      ? "w-10 h-2.5 bg-hemo-red shadow-lg shadow-hemo-red/50"
                      : "w-2.5 h-2.5 dark:bg-white/20 bg-hemo-dark/20"
                      }`}
                  />
                ))}
                <span className="dark:text-white/30 text-hemo-dark/50 text-xs ml-4 font-semibold">
                  {String(i + 1).padStart(2, "0")} / {String(FEATURED_EXAMS.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
