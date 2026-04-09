"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { EXAMS, FEATURED_EXAMS, formatPrice } from "@/data/exams";
import { useCart } from "@/components/providers/CartProvider";
import MagneticButton from "@/components/ui/MagneticButton";
import {
  ShoppingCart,
  ArrowRight,
  Clock,
  Search,
  Sparkles,
  Filter,
} from "lucide-react";
import { useState, useMemo } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ExamesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(EXAMS.map((e) => e.category)));
    return ["Todos", ...cats];
  }, []);

  const filtered = useMemo(() => {
    return EXAMS.filter((exam) => {
      const matchSearch =
        exam.name.toLowerCase().includes(search.toLowerCase()) ||
        exam.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "Todos" || exam.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  useGSAP(
    () => {
      const s = sectionRef.current;
      if (!s) return;

      gsap.fromTo(
        s.querySelectorAll(".page-title"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        s.querySelectorAll(".exam-list-card"),
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    },
    { scope: sectionRef, dependencies: [filtered] }
  );

  const handleAddToCart = useCallback(
    (slug: string) => {
      const exam = EXAMS.find((e) => e.slug === slug);
      if (!exam) return;
      dispatch({ type: "ADD_ITEM", exam });
      dispatch({ type: "OPEN_DRAWER" });
    },
    [dispatch]
  );

  return (
    <>
      <Header />
      <main ref={sectionRef} className="bg-hemo-dark min-h-screen pt-28 pb-20">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <span className="page-title inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hemo-red/10 border border-hemo-red/20 text-sm text-hemo-red font-semibold mb-4">
            <Sparkles size={14} />
            Loja de Exames
          </span>
          <h1 className="page-title font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos <span className="text-gradient-brand">Exames</span>
          </h1>
          <p className="page-title text-white/50 text-lg max-w-xl">
            Escolha seus exames, adicione ao carrinho e finalize em minutos.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="text"
                placeholder="Buscar exame..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-surface-light/50 border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-hemo-lime/40 transition-colors"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-white/30" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    category === cat
                      ? "bg-hemo-lime text-hemo-dark"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">
                Nenhum exame encontrado para &quot;{search}&quot;
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((exam) => (
                <div
                  key={exam.slug}
                  className="exam-list-card group bg-surface-light/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={exam.image}
                      alt={exam.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {exam.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-hemo-red text-white text-xs font-bold rounded-full shadow-lg">
                        {exam.badge}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-xs">
                      <Clock size={12} className="text-hemo-lime" />
                      Resultado em {exam.productionTime}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-hemo-lime/70 text-xs font-semibold uppercase tracking-wider">
                      {exam.category}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mt-1 mb-2">
                      {exam.name}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-4">
                      {exam.description}
                    </p>

                    {/* Price + CTA */}
                    <div className="flex items-end justify-between">
                      <div>
                        {exam.oldPrice && (
                          <span className="text-white/30 text-xs line-through block">
                            {formatPrice(exam.oldPrice)}
                          </span>
                        )}
                        <span className="text-white font-bold text-xl">
                          {formatPrice(exam.price)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(exam.slug)}
                          className="p-3 bg-hemo-red text-white rounded-full hover:bg-hemo-red-dark transition-colors shadow-lg shadow-hemo-red/20"
                          aria-label={`Comprar ${exam.name}`}
                        >
                          <ShoppingCart size={18} />
                        </button>
                        <Link
                          href={`/exames/${exam.slug}`}
                          className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                          aria-label={`Detalhes ${exam.name}`}
                        >
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
