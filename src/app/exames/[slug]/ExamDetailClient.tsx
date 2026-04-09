"use client";

import { useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getExamBySlug, formatPrice } from "@/data/exams";
import { useCart } from "@/components/providers/CartProvider";
import {
  ShoppingCart,
  ArrowLeft,
  Clock,
  AlertCircle,
  CheckCircle2,
  ListChecks,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function ExamDetailClient({ slug }: { slug: string }) {
  const exam = getExamBySlug(slug);
  const { dispatch } = useCart();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"features" | "includes" | "instructions">("features");
  const [addedFeedback, setAddedFeedback] = useState(false);

  useGSAP(
    () => {
      if (!pageRef.current) return;
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        ".detail-hero-image",
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      tl.fromTo(
        ".detail-info > *",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
        0.3
      );

      tl.fromTo(
        ".tab-content-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power3.out" },
        0.8
      );
    },
    { scope: pageRef, dependencies: [slug, activeTab] }
  );

  const handleAddToCart = useCallback(() => {
    if (!exam) return;
    dispatch({ type: "ADD_ITEM", exam });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
    dispatch({ type: "OPEN_DRAWER" });
  }, [exam, dispatch]);

  if (!exam) {
    return (
      <>
        <Header />
        <main className="bg-hemo-dark min-h-screen pt-32 pb-20 text-center">
          <p className="text-white/50 text-lg">Exame não encontrado</p>
          <Link
            href="/exames"
            className="inline-flex items-center gap-2 mt-4 text-hemo-lime hover:underline"
          >
            <ArrowLeft size={16} /> Voltar aos exames
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const tabData = {
    features: {
      icon: ListChecks,
      label: "Características",
      items: exam.features,
    },
    includes: {
      icon: CheckCircle2,
      label: "O que inclui",
      items: exam.includes,
    },
    instructions: {
      icon: AlertCircle,
      label: "Instruções",
      items: exam.instructions,
    },
  };

  return (
    <>
      <Header />
      <main ref={pageRef} className="bg-hemo-dark min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8 pt-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/exames" className="hover:text-white transition-colors">
              Exames
            </Link>
            <span>/</span>
            <span className="text-white/70">{exam.shortName}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <div className="detail-hero-image absolute inset-0">
                <Image
                  src={exam.image}
                  alt={exam.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {exam.badge && (
                <span className="absolute top-6 left-6 px-5 py-2 bg-hemo-red text-white text-sm font-bold rounded-full shadow-xl shadow-hemo-red/40">
                  {exam.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="detail-info">
              <span className="text-hemo-lime text-xs font-semibold uppercase tracking-widest">
                {exam.category}
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                {exam.name}
              </h1>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                {exam.description}
              </p>

              {/* Price */}
              <div className="bg-surface-light/50 rounded-2xl p-6 border border-white/5 mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  {exam.oldPrice && (
                    <span className="text-white/30 text-lg line-through">
                      {formatPrice(exam.oldPrice)}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-white">
                    {formatPrice(exam.price)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-hemo-lime" />
                    Resultado em {exam.productionTime}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText size={14} className="text-hemo-lime" />
                    Laudo digital
                  </div>
                </div>
              </div>

              {/* Add to cart */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 font-bold rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg text-lg ${
                    addedFeedback
                      ? "bg-hemo-lime text-hemo-dark shadow-hemo-lime/30"
                      : "bg-hemo-red text-white shadow-hemo-red/30 hover:bg-hemo-red-dark"
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <CheckCircle2 size={20} />
                      Adicionado!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Adicionar ao Carrinho
                    </>
                  )}
                </button>
                <Link
                  href="/exames/checkout"
                  className="py-4 px-6 bg-white/10 text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-white/20 transition-colors border border-white/10"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex gap-1 p-1 bg-surface-light/50 rounded-2xl mb-4">
                  {(Object.keys(tabData) as Array<keyof typeof tabData>).map((key) => {
                    const tab = tabData[key];
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          activeTab === key
                            ? "bg-hemo-green text-white shadow-lg"
                            : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        <TabIcon size={16} />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-surface-light/30 rounded-2xl p-6 border border-white/5">
                  <ul className="space-y-3">
                    {tabData[activeTab].items.map((item, i) => (
                      <li
                        key={i}
                        className="tab-content-item flex items-start gap-3 text-white/70 text-sm"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-hemo-lime shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
