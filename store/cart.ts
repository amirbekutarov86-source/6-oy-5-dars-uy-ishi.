import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PROMO_CODE } from "@/lib/utils";

type Item = { slug: string; qty: number };
type CartState = {
  items: Item[];
  promo: string | null;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      promo: null,
      add: (slug, qty = 1) => set((s) => ({
        items: s.items.some((i) => i.slug === slug)
          ? s.items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(i.qty + qty, 20) } : i))
          : [...s.items, { slug, qty }],
      })),
      setQty: (slug, qty) => set((s) => ({
        items: qty <= 0 ? s.items.filter((i) => i.slug !== slug) : s.items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 20) } : i)),
      })),
      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      clear: () => set({ items: [], promo: null }),
      applyPromo: (code) => {
        const ok = code.trim().toUpperCase() === PROMO_CODE;
        if (ok) set({ promo: PROMO_CODE });
        return ok;
      },
    }),
    { name: "bookly-cart" },
  ),
);
