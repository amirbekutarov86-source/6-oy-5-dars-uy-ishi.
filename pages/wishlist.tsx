import Link from "next/link";
import BookCard from "@/components/BookCard";
import Layout from "@/components/Layout";
import { books } from "@/lib/books";
import { useHydrated } from "@/hooks/useHydrated";
import { useWishlist } from "@/store/wishlist";

export default function WishlistPage() {
  const hydrated = useHydrated();
  const slugs = useWishlist((s) => s.slugs);
  const list = books.filter((b) => slugs.includes(b.slug));
  return (
    <Layout title="Wishlist" path="/wishlist" noindex>
      <h1>Your wishlist</h1>
      {!hydrated ? <p className="muted">Loading...</p> : list.length === 0 ? (
        <div className="empty"><p>No saved books yet. Tap the ♥ on any book.</p><Link href="/books" className="btn">Browse books</Link></div>
      ) : <div className="grid">{list.map((b) => <BookCard key={b.slug} book={b} />)}</div>}
    </Layout>
  );
}
