import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Review } from "@/lib/books";

type ReviewState = {
  added: Record<string, Review[]>;
  addReview: (slug: string, r: Omit<Review, "id" | "date">) => void;
};

export const useReviews = create<ReviewState>()(
  persist(
    (set) => ({
      added: {},
      addReview: (slug, r) => set((s) => ({
        added: {
          ...s.added,
          [slug]: [{ ...r, id: Date.now().toString(36), date: new Date().toISOString().slice(0, 10) }, ...(s.added[slug] ?? [])],
        },
      })),
    }),
    { name: "bookly-reviews" },
  ),
);
