import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { Product } from "@/data/products";

interface CartItem { productId: string; qty: number }

interface StoreContextValue {
  cart: CartItem[];
  favorites: Set<string>;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  cartCount: number;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const addToCart = (productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === productId);
      if (existing) return prev.map((c) => c.productId === productId ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { productId, qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId); else next.add(productId);
      return next;
    });
  };

  const cartCount = useMemo(() => cart.reduce((sum, c) => sum + c.qty, 0), [cart]);

  const value = useMemo(() => ({ cart, favorites, addToCart, removeFromCart, toggleFavorite, cartCount }), [cart, favorites]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
