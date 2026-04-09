"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from "react";
import {
  cartReducer,
  initialCartState,
  type CartState,
  type CartAction,
} from "@/store/cartStore";

type CartContextType = {
  state: CartState;
  dispatch: Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "hemolab-cart";

function loadState(): CartState {
  if (typeof window === "undefined") return initialCartState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialCartState;
    const parsed = JSON.parse(raw);
    return { ...initialCartState, ...parsed, drawerOpen: false, step: 0 };
  } catch {
    return initialCartState;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, loadState);

  useEffect(() => {
    const toSave = { ...state, drawerOpen: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
