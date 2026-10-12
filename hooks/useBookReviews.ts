import { avg, type Book, type Review } from "@/lib/books";
import { useReviews } from "@/store/reviews";
import { useHydrated } from "./useHydrated";

export function useBookReviews(book: Book): { reviews: Review[]; average: number } {
  const added = useReviews((s) => s.added[book.slug]);
  const hydrated = useHydrated();
  const reviews = hydrated && added ? [...added, ...book.reviews] : book.reviews;
  return { reviews, average: avg(reviews) };
}
