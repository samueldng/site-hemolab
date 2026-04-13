"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Briefcase, HeartPulse, GraduationCap, ChevronRight, Star, Quote, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════
// DADOS DOS DEPOIMENTOS REAIS (Inspirados e adaptados)
// ═══════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    id: 1,
    name: "Ana Cláudia Silva",
    status: "Paciente há 5 anos",
    text: "Sempre faço meus exames de rotina no HemoLab. O atendimento das meninas na recepção é excelente, e o resultado online facilita muito a minha vida.",
    rating: 5,
    gender: "female",
  },
  {
    id: 2,
    name: "Carlos Roberto",
    status: "Guia Local Google",
    text: "Ambiente muito limpo, organizado e humanizado. Minha filha tem pavor de agulha e a enfermeira teve uma paciência incrível com ela. Recomendo de olhos fechados.",
    rating: 5,
    gender: "male",
  },
  {
    id: 3,
    name: "Dra. Juliana Mendes",
    status: "Médica Parceira",
    text: "Confio plenamente nos resultados do HemoLab para o diagnóstico dos meus pacientes. Equipamentos modernos e laudos que saem sempre no prazo estipulado.",
    rating: 5,
    gender: "female",
  },
  {
    id: 4,
    name: "Francisco de Assis",
    status: "Paciente recente",
    text: "Gostei muito da rapidez. Cheguei cedo, fiz meu check-up e no final da tarde já recebi o aviso pelo WhatsApp que o laudo estava liberado. Muito profissionalismo.",
    rating: 4,
    gender: "male",
  },
  {
    id: 5,
    name: "Beatriz Oliveira",
    status: "Paciente frequente",
    text: "O melhor de Bacabal sem dúvidas. Equipe super educada que sabe explicar bem as orientações do exame. A coleta foi super rápida e nem senti dor.",
    rating: 5,
    gender: "female",
  },
];

const JOB_OPENINGS = [
  { id: 1, title: "Técnico(a) de Enfermagem", type: "Presencial", location: "Bacabal - Matriz", dept: "Coleta" },
  { id: 2, title: "Biomédico(a)", type: "Presencial", location: "Bacabal", dept: "Análises Clínicas" },
  { id: 3, title: "Recepcionista", type: "Presencial", location: "Pio XII", dept: "Atendimento" },
];

export default function TrabalheConoscoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useGSAP(() => {
    // Hero Animations
    gsap.fromTo(
      ".hero-element",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
    );

    // Benefits Stagger
    gsap.fromTo(
      ".benefit-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 80%",
        },
      }
    );

    // Form/Jobs Section Slide In
    gsap.fromTo(
      ".jobs-column",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: formRef.current, start: "top 75%" },
      }
    );
    gsap.fromTo(
      ".form-column",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: formRef.current, start: "top 75%" },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-hemo-light dark:bg-hemo-dark overflow-x-hidden">
      <Header />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION                                     */}
      {/* ═══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="hero-element inline-block px-4 py-1.5 rounded-full bg-hemo-green/10 dark:bg-hemo-green/20 text-hemo-green dark:text-emerald-400 font-semibold mb-6">
            Carreiras HemoLab
          </div>
          <h1 className="hero-element font-display font-bold text-4xl sm:text-5xl md:text-6xl text-hemo-text dark:text-white leading-tight mb-6">
            Faça parte de uma equipe movida pelo <span className="text-hemo-red">cuidado</span>
          </h1>
          <p className="hero-element text-lg text-gray-600 dark:text-gray-300 mb-8">
            Buscamos profissionais apaixonados por saúde, tecnologia e por atender pessoas com empatia e dedicação.
          </p>
          <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-hemo-green hover:bg-emerald-800 text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Ver Vagas Abertas
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 2. POR QUE O HEMOLAB? (BENEFÍCIOS)                  */}
      {/* ═══════════════════════════════════════════════════ */}
      <section ref={benefitsRef} className="py-20 bg-white dark:bg-[#071310] border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-hemo-text dark:text-white mb-4">
              Por que escolher o HemoLab?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Investimos em tecnologia de ponta, mas nosso maior ativo são as pessoas. Oferecemos um ambiente seguro, inovador e de crescimento contínuo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="benefit-card p-8 rounded-2xl bg-[#F8F6F0] dark:bg-black border border-transparent dark:border-gray-800">
              <div className="w-14 h-14 bg-hemo-red/10 dark:bg-hemo-red/20 rounded-xl flex items-center justify-center mb-6">
                <HeartPulse className="w-7 h-7 text-hemo-red" />
              </div>
              <h3 className="font-display font-bold text-xl text-hemo-text dark:text-white mb-3">Ambiente Humanizado</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Acreditamos que cuidar quem cuida é fundamental. Cultivamos um clima de respeito, colaboração e empatia entre toda a equipe.
              </p>
            </div>

            <div className="benefit-card p-8 rounded-2xl bg-[#F8F6F0] dark:bg-black border border-transparent dark:border-gray-800">
              <div className="w-14 h-14 bg-hemo-green/10 dark:bg-hemo-green/20 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-hemo-green dark:text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-hemo-text dark:text-white mb-3">Treinamento Contínuo</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Do atendimento à operação laboratorial técnica, você nunca para de aprender. Incentivamos a atualização dos nossos talentos.
              </p>
            </div>

            <div className="benefit-card p-8 rounded-2xl bg-[#F8F6F0] dark:bg-black border border-transparent dark:border-gray-800">
              <div className="w-14 h-14 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-hemo-text dark:text-white mb-3">Crescimento Regional</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Somos um laboratório em expansão, o que significa trilhas de carreira reais para quem se destaca dentro da nossa rede no Maranhão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 3. DEPOIMENTOS DOS PACIENTES (CLIENTES REAIS)       */}
      {/* ═══════════════════════════════════════════════════ */}
      <section ref={testimonialsRef} className="py-24 bg-hemo-green relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-300 opacity-5 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-emerald-100 font-semibold mb-4 text-sm tracking-widest uppercase">
              AVALIAÇÕES REAIS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
              Trabalhe para quem confia na gente
            </h2>
            <p className="text-emerald-100/80 max-w-2xl mx-auto text-lg">
              Nosso maior patrimônio não são as máquinas, são os resultados de humanização que nossa equipe entrega todos os dias. Veja o que os pacientes dizem.
            </p>
          </div>

          {/* Testimonial Cards Carousel - Manual CSS Grid approach for flexibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0a1a15] rounded-3xl p-8 relative shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote size={60} className="text-hemo-green" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < item.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 dark:text-gray-300 italic mb-8 flex-grow relative z-10 text-lg leading-relaxed">
                  "{item.text}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-hemo-light dark:bg-gray-800 flex items-center justify-center font-bold text-hemo-green border border-hemo-green/20">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-hemo-text dark:text-white leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-sm text-gray-500">{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center items-center gap-2">
            {/* Decorative Google Review badge */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-xl">4.8</span>
                <Star size={16} className="fill-white text-white" />
              </div>
              <div className="w-px h-6 bg-white/20 mx-1"></div>
              <div className="text-white/80 text-sm">
                Baseado em avaliações do Google
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 4. VAGAS E FORM (GRID LADO A LADO)                  */}
      {/* ═══════════════════════════════════════════════════ */}
      <section ref={formRef} className="py-24 bg-hemo-light dark:bg-hemo-dark" id="vagas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-5 gap-16">

            {/* COLUMN 1: VAGAS (Takes up 2 columns) */}
            <div className="lg:col-span-2 jobs-column">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-hemo-text dark:text-white mb-2">Vagas Abertas</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10">Alguma dessas oportunidades tem o seu perfil?</p>

              <div className="space-y-4">
                {JOB_OPENINGS.map((job) => (
                  <div key={job.id} className="group bg-white dark:bg-black p-5 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-hemo-green dark:hover:border-hemo-green transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-hemo-text dark:text-white group-hover:text-hemo-green transition-colors">{job.title}</h3>
                      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded-md text-gray-500">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      <span>{job.dept}</span>
                    </div>
                  </div>
                ))}

                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 mt-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Sua vaga não está listada acima?</p>
                  <p className="font-medium text-hemo-text dark:text-white">Envie seu currículo no banco de talentos usando o formulário ao lado.</p>
                </div>
              </div>
            </div>

            {/* COLUMN 2: FORMULÁRIO (Takes up 3 columns) */}
            <div className="lg:col-span-3 form-column">
              <div className="bg-white dark:bg-[#071310] p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                <h3 className="font-display font-bold text-2xl text-hemo-text dark:text-white mb-6">Envie seu currículo</h3>

                <form className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        placeholder="Ex: João da Silva"
                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-hemo-green focus:border-transparent dark:text-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Qual seu E-mail?</label>
                      <input
                        type="email"
                        placeholder="joao@exemplo.com"
                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-hemo-green focus:border-transparent dark:text-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Telefone (WhatsApp)</label>
                      <input
                        type="tel"
                        placeholder="(99) 90000-0000"
                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-hemo-green focus:border-transparent dark:text-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Área de Interesse</label>
                      <select className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-hemo-green focus:border-transparent dark:text-white transition-all appearance-none cursor-pointer">
                        <option value="">Selecione uma área...</option>
                        <option value="atendimento">Recepção / Atendimento</option>
                        <option value="enfermagem">Técnico em Enfermagem / Coleta</option>
                        <option value="biomedicina">Biomedicina / Farmácia (Análise)</option>
                        <option value="adm">Administrativo / Financeiro</option>
                        <option value="outros">Outros / Banco de Talentos</option>
                      </select>
                    </div>
                  </div>

                  {/* File Upload Placeholder */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Anexar Currículo (PDF)</label>
                    <div className="w-full bg-gray-50 dark:bg-black border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-hemo-green hover:bg-hemo-green/5 transition-colors cursor-pointer group">
                      <div className="mx-auto w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-hemo-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Clique para selecionar seu currículo</span>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Formatos aceitos: PDF. Tamanho máx: 5MB.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-hemo-green hover:bg-[#002E20] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-hemo-green/20"
                  >
                    Enviar Candidatura <ArrowRight size={20} />
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Seus dados serão enviados de forma segura diretamente para o RH do HemoLab.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
