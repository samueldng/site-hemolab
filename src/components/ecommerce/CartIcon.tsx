"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { getCartCount } from "@/store/cartStore";

export default function CartIcon() {
  const { state, dispatch } = useCart();
  const count = getCartCount(state.items);
  const badgeRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    dispatch({ type: "TOGGLE_DRAWER" });
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 1.4 },
        { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" }
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative p-2 dark:text-white text-hemo-dark hover:text-hemo-lime transition-colors duration-300"
      aria-label={`Carrinho com ${count} itens`}
      id="cart-icon-btn"
    >
      <ShoppingCart size={22} />
      {count > 0 && (
        <span
          ref={badgeRef}
          className="absolute -top-1 -right-1 w-5 h-5 bg-hemo-red text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-hemo-red/40 animate-pulse-glow"
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
