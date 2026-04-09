"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useCart } from "@/components/providers/CartProvider";
import { getCartTotal, getCartCount } from "@/store/cartStore";
import { formatPrice } from "@/data/exams";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const { state, dispatch } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const count = getCartCount(state.items);
  const total = getCartTotal(state.items);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (state.drawerOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      if (itemsRef.current) {
        gsap.fromTo(
          itemsRef.current.children,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: "power3.out", delay: 0.2 }
        );
      }
    } else {
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          document.body.style.overflow = "";
          if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
        },
      });
    }
  }, [state.drawerOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] opacity-0 pointer-events-none"
        onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-hemo-dark border-l border-white/10 z-[70] flex flex-col translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-hemo-lime" />
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
              Carrinho
            </h3>
            {count > 0 && (
              <span className="px-2.5 py-0.5 bg-hemo-red/20 text-hemo-red text-xs font-bold rounded-full">
                {count} {count === 1 ? "item" : "itens"}
              </span>
            )}
          </div>
          <button
            onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-white/20" />
              </div>
              <p className="text-white/40 text-sm mb-2">Seu carrinho está vazio</p>
              <p className="text-white/25 text-xs">Adicione exames para começar</p>
              <Link
                href="/exames"
                onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
                className="mt-6 px-6 py-3 bg-hemo-red text-white text-sm font-semibold rounded-full hover:bg-hemo-red-dark transition-colors"
              >
                Ver Exames
              </Link>
            </div>
          ) : (
            <div ref={itemsRef} className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.exam.slug}
                  className="bg-surface-light/50 rounded-2xl p-4 border border-white/5"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.exam.image}
                        alt={item.exam.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm truncate">
                        {item.exam.name}
                      </h4>
                      <p className="text-hemo-lime text-xs mt-0.5">{item.exam.category}</p>
                      <p className="text-white font-bold text-sm mt-1">
                        {formatPrice(item.exam.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", slug: item.exam.slug })}
                      className="text-white/30 hover:text-hemo-red transition-colors self-start"
                      aria-label={`Remover ${item.exam.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            slug: item.exam.slug,
                            quantity: item.quantity - 1,
                          })
                        }
                        className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white font-semibold text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            slug: item.exam.slug,
                            quantity: item.quantity + 1,
                          })
                        }
                        className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-white font-bold text-sm">
                      {formatPrice(item.exam.price * item.quantity)}
                    </span>
                  </div>

                  {/* Third party toggle */}
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                          item.forThirdParty ? "bg-hemo-lime" : "bg-white/15"
                        }`}
                        onClick={() =>
                          dispatch({
                            type: "TOGGLE_THIRD_PARTY",
                            slug: item.exam.slug,
                            value: !item.forThirdParty,
                          })
                        }
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                            item.forThirdParty ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </div>
                      <span className="text-white/50 text-xs">Para outra pessoa</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Subtotal</span>
              <span className="text-white font-bold text-lg">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/exames/checkout"
              onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
              className="w-full py-4 bg-hemo-red text-white font-bold rounded-full flex items-center justify-center gap-2 hover:bg-hemo-red-dark transition-colors shadow-lg shadow-hemo-red/30 group"
            >
              Finalizar Pedido
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
