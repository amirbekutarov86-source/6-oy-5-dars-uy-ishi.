import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishState = { slugs: string[]; toggle: (slug: string) => void };

export const useWishlist = create<WishState>()(
  persist(
    (set) => ({
      slugs: [],
      toggle: (slug) => set((s) => ({ slugs: s.slugs.includes(slug) ? s.slugs.filter((x) => x !== slug) : [...s.slugs, slug] })),
    }),
    { name: "bookly-wishlist" },
  ),
);
