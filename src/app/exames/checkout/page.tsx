"use client";

import { useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/components/providers/CartProvider";
import { getCartTotal, getCartCount, generateProtocol, buildWhatsAppMessage, buildWhatsAppUrl } from "@/store/cartStore";
import { formatPrice } from "@/data/exams";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  User,
  MapPin,
  CreditCard,
  CheckCircle2,
  ShoppingBag,
  Phone,
  Upload,
  Banknote,
  Smartphone,
  Building2,
  Home,
  Truck,
  X,
  Trash2,
  Minus,
  Plus,
  MessageCircle,
  Copy,
  FileText,
} from "lucide-react";

const STEPS = [
  { icon: ShoppingBag, label: "Carrinho" },
  { icon: User, label: "Identificação" },
  { icon: MapPin, label: "Localização" },
  { icon: CreditCard, label: "Pagamento" },
  { icon: CheckCircle2, label: "Confirmação" },
];

export default function CheckoutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useCart();
  const [step, setStep] = useState(0);
  const total = getCartTotal(state.items);
  const count = getCartCount(state.items);

  // --- CEP lookup ---
  const [cepLoading, setCepLoading] = useState(false);
  const lookupCep = useCallback(
    async (cep: string) => {
      const cleaned = cep.replace(/\D/g, "");
      if (cleaned.length !== 8) return;
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
        const data = await res.json();
        if (!data.erro) {
          dispatch({
            type: "SET_LOCATION",
            location: {
              cep: cleaned,
              street: data.logradouro || "",
              neighborhood: data.bairro || "",
              city: data.localidade || "",
              state: data.uf || "",
            },
          });
        }
      } catch { /* silent */ }
      finally { setCepLoading(false); }
    },
    [dispatch]
  );

  // --- File upload ---
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({
          type: "SET_LOCATION",
          location: {
            guiaFile: reader.result as string,
            guiaFileName: file.name,
          },
        });
      };
      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  // --- Navigation ---
  const nextStep = useCallback(() => {
    if (step === 4) return;
    if (step === 3) {
      const protocol = generateProtocol();
      dispatch({ type: "SET_PROTOCOL", protocol });
    }
    setStep((s) => Math.min(s + 1, 4));
  }, [step, dispatch]);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  useGSAP(
    () => {
      if (!pageRef.current) return;
      gsap.fromTo(
        ".step-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    },
    { scope: pageRef, dependencies: [step] }
  );

  // Validation
  const canProceed = useCallback(() => {
    if (step === 0) return state.items.length > 0;
    if (step === 1) return state.customer.name.trim() !== "" && state.customer.phone.trim() !== "";
    if (step === 2) return state.location.unit !== "" as never;
    if (step === 3) return state.payment.method !== "" as never;
    return false;
  }, [step, state]);

  if (count === 0 && step < 4) {
    return (
      <>
        <Header />
        <main className="bg-hemo-dark min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <ShoppingBag size={40} className="text-white/20" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-3">
            Carrinho vazio
          </h1>
          <p className="text-white/40 mb-6">Adicione exames para continuar</p>
          <Link
            href="/exames"
            className="px-8 py-4 bg-hemo-red text-white font-bold rounded-full hover:bg-hemo-red-dark transition-colors"
          >
            Ver Exames
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main ref={pageRef} className="bg-hemo-dark min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Progress steps */}
          {step < 4 && (
            <div className="flex items-center justify-between mb-12 pt-6">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-hemo-red text-white shadow-lg shadow-hemo-red/40 scale-110"
                            : isDone
                            ? "bg-hemo-lime/20 text-hemo-lime"
                            : "bg-white/5 text-white/30"
                        }`}
                      >
                        {isDone ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                      </div>
                      <span
                        className={`text-xs font-semibold hidden sm:block ${
                          isActive ? "text-white" : isDone ? "text-hemo-lime/70" : "text-white/25"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-px mx-3 transition-colors duration-300 ${
                          isDone ? "bg-hemo-lime/30" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Step 0: Cart Review */}
          {step === 0 && (
            <div className="step-content space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-6">
                Revise seu Carrinho
              </h2>
              {state.items.map((item) => (
                <div
                  key={item.exam.slug}
                  className="bg-surface-light/50 rounded-2xl p-6 border border-white/5"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.exam.image} alt={item.exam.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.exam.name}</h3>
                      <p className="text-hemo-lime text-xs mt-0.5">{item.exam.category}</p>
                      <p className="text-white font-bold mt-1">{formatPrice(item.exam.price)}</p>
                    </div>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", slug: item.exam.slug })}
                      className="text-white/30 hover:text-hemo-red transition-colors self-start"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QUANTITY", slug: item.exam.slug, quantity: item.quantity - 1 })}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QUANTITY", slug: item.exam.slug, quantity: item.quantity + 1 })}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-white font-bold">{formatPrice(item.exam.price * item.quantity)}</span>
                  </div>

                  {/* Third party toggle */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${item.forThirdParty ? "bg-hemo-lime" : "bg-white/15"}`}
                        onClick={() => dispatch({ type: "TOGGLE_THIRD_PARTY", slug: item.exam.slug, value: !item.forThirdParty })}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${item.forThirdParty ? "translate-x-5" : "translate-x-0.5"}`} />
                      </div>
                      <span className="text-white/60 text-sm">Este exame é para outra pessoa</span>
                    </label>
                    {item.forThirdParty && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Nome completo"
                          value={item.thirdPartyName || ""}
                          onChange={(e) => dispatch({ type: "SET_THIRD_PARTY_INFO", slug: item.exam.slug, name: e.target.value, cpf: item.thirdPartyCpf || "", relation: item.thirdPartyRelation || "" })}
                          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40"
                        />
                        <input
                          type="text"
                          placeholder="CPF"
                          value={item.thirdPartyCpf || ""}
                          onChange={(e) => dispatch({ type: "SET_THIRD_PARTY_INFO", slug: item.exam.slug, name: item.thirdPartyName || "", cpf: e.target.value, relation: item.thirdPartyRelation || "" })}
                          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40"
                        />
                        <input
                          type="text"
                          placeholder="Parentesco"
                          value={item.thirdPartyRelation || ""}
                          onChange={(e) => dispatch({ type: "SET_THIRD_PARTY_INFO", slug: item.exam.slug, name: item.thirdPartyName || "", cpf: item.thirdPartyCpf || "", relation: e.target.value })}
                          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="bg-surface-light/50 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Total</span>
                  <span className="text-white font-bold text-2xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Identification */}
          {step === 1 && (
            <div className="step-content">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-2">
                Seus Dados
              </h2>
              <p className="text-white/40 text-sm mb-8">Precisamos de poucos dados para prosseguir</p>

              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    value={state.customer.name}
                    onChange={(e) => dispatch({ type: "SET_CUSTOMER", customer: { name: e.target.value } })}
                    placeholder="Seu nome completo"
                    className="w-full px-5 py-4 bg-surface-light/50 border border-white/10 rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                    Telefone (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="tel"
                      value={state.customer.phone}
                      onChange={(e) => dispatch({ type: "SET_CUSTOMER", customer: { phone: e.target.value } })}
                      placeholder="(99) 99999-9999"
                      className="w-full pl-12 pr-5 py-4 bg-surface-light/50 border border-white/10 rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={state.customer.cpf}
                    onChange={(e) => dispatch({ type: "SET_CUSTOMER", customer: { cpf: e.target.value } })}
                    placeholder="000.000.000-00"
                    className="w-full px-5 py-4 bg-surface-light/50 border border-white/10 rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="step-content">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-2">
                Localização e Unidade
              </h2>
              <p className="text-white/40 text-sm mb-8">Escolha como deseja ser atendido</p>

              {/* Unit selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { key: "bacabal" as const, icon: Building2, label: "Matriz Bacabal", desc: "R. Magalhães de Almeida, 469" },
                  { key: "satubinha" as const, icon: Home, label: "Satubinha", desc: "Unidade Satubinha" },
                  { key: "domiciliar" as const, icon: Truck, label: "Coleta Domiciliar", desc: "Coletamos em sua casa" },
                ].map((unit) => {
                  const UIcon = unit.icon;
                  const isActive = state.location.unit === unit.key;
                  return (
                    <button
                      key={unit.key}
                      onClick={() => dispatch({ type: "SET_LOCATION", location: { unit: unit.key } })}
                      className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                        isActive
                          ? "bg-hemo-green/20 border-hemo-lime/40 shadow-lg"
                          : "bg-surface-light/50 border-white/5 hover:border-white/15"
                      }`}
                    >
                      <UIcon size={24} className={isActive ? "text-hemo-lime mb-3" : "text-white/30 mb-3"} />
                      <p className={`font-semibold text-sm ${isActive ? "text-white" : "text-white/60"}`}>{unit.label}</p>
                      <p className="text-white/30 text-xs mt-1">{unit.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* CEP when domiciliar */}
              {state.location.unit === "domiciliar" && (
                <div className="space-y-4 max-w-lg mb-8">
                  <div>
                    <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                      CEP
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={state.location.cep}
                        onChange={(e) => {
                          dispatch({ type: "SET_LOCATION", location: { cep: e.target.value } });
                          if (e.target.value.replace(/\D/g, "").length === 8) {
                            lookupCep(e.target.value);
                          }
                        }}
                        placeholder="00000-000"
                        className="w-full px-5 py-4 bg-surface-light/50 border border-white/10 rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40 transition-colors"
                      />
                      {cepLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-hemo-lime/30 border-t-hemo-lime rounded-full animate-spin" />
                      )}
                    </div>
                  </div>
                  {state.location.street && (
                    <>
                      <input
                        type="text"
                        value={state.location.street}
                        onChange={(e) => dispatch({ type: "SET_LOCATION", location: { street: e.target.value } })}
                        placeholder="Rua"
                        className="w-full px-5 py-4 bg-surface-light/50 border border-white/10 rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={state.location.neighborhood}
                          readOnly
                          className="px-5 py-4 bg-surface-light/30 border border-white/5 rounded-2xl text-white/60 text-sm"
                        />
                        <input
                          type="text"
                          value={`${state.location.city} - ${state.location.state}`}
                          readOnly
                          className="px-5 py-4 bg-surface-light/30 border border-white/5 rounded-2xl text-white/60 text-sm"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Guia upload */}
              <div className="max-w-lg">
                <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                  Guia Médica (opcional)
                </label>
                <div className="relative">
                  {state.location.guiaFileName ? (
                    <div className="flex items-center gap-3 px-5 py-4 bg-hemo-green/10 border border-hemo-lime/20 rounded-2xl">
                      <FileText size={20} className="text-hemo-lime" />
                      <span className="text-white text-sm flex-1 truncate">{state.location.guiaFileName}</span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "SET_LOCATION",
                            location: { guiaFile: undefined, guiaFileName: undefined },
                          })
                        }
                        className="text-white/40 hover:text-hemo-red"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-3 px-5 py-8 bg-surface-light/50 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-hemo-lime/30 transition-colors text-center justify-center">
                      <Upload size={20} className="text-white/30" />
                      <span className="text-white/40 text-sm">Arraste ou clique para anexar</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="step-content">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-2">
                Forma de Pagamento
              </h2>
              <p className="text-white/40 text-sm mb-8">Escolha como deseja pagar</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { key: "credit" as const, icon: CreditCard, label: "Cartão de Crédito", desc: "Visa, Master, Elo" },
                  { key: "pix" as const, icon: Smartphone, label: "Pix", desc: "Pagamento instantâneo" },
                  { key: "cash" as const, icon: Banknote, label: "Dinheiro", desc: "Pagamento em espécie" },
                ].map((method) => {
                  const MIcon = method.icon;
                  const isActive = state.payment.method === method.key;
                  return (
                    <button
                      key={method.key}
                      onClick={() => dispatch({ type: "SET_PAYMENT", payment: { method: method.key } })}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                        isActive
                          ? "bg-hemo-green/20 border-hemo-lime/40 shadow-lg"
                          : "bg-surface-light/50 border-white/5 hover:border-white/15"
                      }`}
                    >
                      <MIcon size={28} className={isActive ? "text-hemo-lime mb-3" : "text-white/30 mb-3"} />
                      <p className={`font-semibold ${isActive ? "text-white" : "text-white/60"}`}>{method.label}</p>
                      <p className="text-white/30 text-xs mt-1">{method.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Conditional: Pix QR */}
              {state.payment.method === "pix" && (
                <div className="bg-surface-light/50 rounded-2xl p-6 border border-white/5 max-w-sm">
                  <p className="text-white/50 text-sm mb-4">O QR Code será gerado após confirmação do pedido.</p>
                  <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Smartphone size={40} className="text-hemo-dark mx-auto mb-2" />
                      <p className="text-hemo-dark text-xs font-medium">QR Code Pix</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Conditional: Cash change */}
              {state.payment.method === "cash" && (
                <div className="max-w-sm">
                  <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                    Vai precisar de troco para quanto?
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">R$</span>
                    <input
                      type="number"
                      value={state.payment.changeFor || ""}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_PAYMENT",
                          payment: { changeFor: e.target.value ? parseFloat(e.target.value) : undefined },
                        })
                      }
                      placeholder="0,00"
                      className="w-full pl-12 pr-5 py-4 bg-surface-light/50 border border-white/10 rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-hemo-lime/40"
                    />
                  </div>
                  <p className="text-white/30 text-xs mt-2">Deixe em branco se não precisar de troco</p>
                </div>
              )}

              {/* Order summary */}
              <div className="bg-surface-light/50 rounded-2xl p-6 border border-white/5 mt-8">
                <h3 className="text-white font-semibold mb-4">Resumo do Pedido</h3>
                {state.items.map((item) => (
                  <div key={item.exam.slug} className="flex justify-between text-sm text-white/60 mb-2">
                    <span>{item.exam.name} x{item.quantity}</span>
                    <span>{formatPrice(item.exam.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-white/5 mt-4 pt-4 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold text-xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="step-content text-center py-10">
              <div className="w-24 h-24 rounded-full bg-hemo-lime/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-hemo-lime" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-3">
                Pedido Realizado!
              </h2>
              <p className="text-white/50 mb-2">Seu protocolo:</p>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-surface-light/50 rounded-2xl border border-hemo-lime/20 mb-8">
                <span className="font-mono text-hemo-lime font-bold text-xl tracking-wider">
                  {state.protocol}
                </span>
                <button
                  onClick={() => navigator.clipboard?.writeText(state.protocol)}
                  className="text-white/30 hover:text-white transition-colors"
                  aria-label="Copiar protocolo"
                >
                  <Copy size={18} />
                </button>
              </div>

              <p className="text-white/40 text-sm max-w-md mx-auto mb-8">
                Envie o pedido para nosso WhatsApp para confirmar o agendamento e
                receber orientações sobre o preparo.
              </p>

              <a
                href={buildWhatsAppUrl(buildWhatsAppMessage(state))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors shadow-xl shadow-green-600/30 text-lg mb-6"
              >
                <MessageCircle size={24} />
                Enviar Pedido no WhatsApp
              </a>

              <div className="flex justify-center gap-4 mt-4">
                <Link
                  href="/"
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                  className="px-6 py-3 bg-white/5 text-white/60 font-semibold rounded-full hover:bg-white/10 transition-colors border border-white/10 text-sm"
                >
                  Voltar ao Início
                </Link>
                <Link
                  href="/exames"
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                  className="px-6 py-3 bg-white/5 text-white/60 font-semibold rounded-full hover:bg-white/10 transition-colors border border-white/10 text-sm"
                >
                  Comprar Mais Exames
                </Link>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white/60 font-semibold rounded-full hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
              >
                <ArrowLeft size={18} />
                Voltar
              </button>
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3.5 bg-hemo-red text-white font-bold rounded-full hover:bg-hemo-red-dark transition-colors shadow-lg shadow-hemo-red/30 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === 3 ? "Finalizar Pedido" : "Continuar"}
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
