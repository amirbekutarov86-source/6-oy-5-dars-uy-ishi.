import Link from "next/link";
import { useState } from "react";
import BookCover from "./BookCover";
import Rating from "./Rating";
import type { Book } from "@/lib/books";
import { money } from "@/lib/utils";
import { useBookReviews } from "@/hooks/useBookReviews";
import { useHydrated } from "@/hooks/useHydrated";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";

export default function BookCard({ book }: { book: Book }) {
  const hydrated = useHydrated();
  const add = useCart((s) => s.add);
  const liked = useWishlist((s) => s.slugs.includes(book.slug));
  const toggle = useWishlist((s) => s.toggle);
  const { reviews, average } = useBookReviews(book);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(book.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="book-card">
      <button className={hydrated && liked ? "heart on" : "heart"} onClick={() => toggle(book.slug)} aria-label="Toggle wishlist">♥</button>
      {book.oldPrice && <span className="badge sale">Sale</span>}
      {!book.oldPrice && book.isNew && <span className="badge">New</span>}
      <Link href={`/books/${book.slug}`} className="cover-link"><BookCover book={book} /></Link>
      <div className="book-info">
        <Link href={`/books/${book.slug}`}><h3>{book.title}</h3></Link>
        <p className="muted small">{book.author}</p>
        <Rating value={average} count={reviews.length} />
        <div className="price-row">
          <span className="price">{money(book.price)}</span>
          {book.oldPrice && <span className="old">{money(book.oldPrice)}</span>}
        </div>
        <button className={added ? "btn btn-ok" : "btn"} onClick={onAdd}>{added ? "Added ✓" : "Add to cart"}</button>
      </div>
    </article>
  );
}
