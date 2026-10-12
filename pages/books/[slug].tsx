import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import BookCard from "@/components/BookCard";
import BookCover from "@/components/BookCover";
import Layout from "@/components/Layout";
import Rating from "@/components/Rating";
import Reviews from "@/components/Reviews";
import { avg, books, getBook, type Book } from "@/lib/books";
import { money } from "@/lib/utils";
import { absoluteUrl } from "@/lib/seo";
import { useBookReviews } from "@/hooks/useBookReviews";
import { useHydrated } from "@/hooks/useHydrated";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";

type Props = { book: Book; related: Book[] };

export const getStaticPaths: GetStaticPaths = async () => ({ paths: books.map((b) => ({ params: { slug: b.slug } })), fallback: false });

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const book = getBook(String(params?.slug));
  if (!book) return { notFound: true };
  const related = books.filter((b) => b.category === book.category && b.slug !== book.slug).slice(0, 3);
  return { props: { book, related } };
};

export default function ProductPage({ book, related }: Props) {
  const hydrated = useHydrated();
  const add = useCart((s) => s.add);
  const liked = useWishlist((s) => s.slugs.includes(book.slug));
  const toggle = useWishlist((s) => s.toggle);
  const { reviews, average } = useBookReviews(book);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => { add(book.slug, qty); setAdded(true); setTimeout(() => setAdded(false), 1500); };

  const rating = avg(book.reviews);
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "Book", name: book.title, author: { "@type": "Person", name: book.author },
      numberOfPages: book.pages, datePublished: String(book.year), genre: book.category, description: book.description, url: absoluteUrl(`/books/${book.slug}`),
      ...(book.reviews.length > 0 && { aggregateRating: { "@type": "AggregateRating", ratingValue: rating.toFixed(1), reviewCount: book.reviews.length } }),
      offers: { "@type": "Offer", price: book.price.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", url: absoluteUrl(`/books/${book.slug}`) },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Books", item: absoluteUrl("/books") },
        { "@type": "ListItem", position: 3, name: book.title, item: absoluteUrl(`/books/${book.slug}`) },
      ],
    },
  ];

  return (
    <Layout title={`${book.title} by ${book.author}`} description={`${book.title} by ${book.author}. ${book.description}`} path={`/books/${book.slug}`} type="product" jsonLd={jsonLd}>
      <p className="muted small"><Link href="/books">Books</Link> / {book.category} / {book.title}</p>
      <section className="product">
        <BookCover book={book} size="lg" />
        <div>
          <h1>{book.title}</h1>
          <p className="muted">by {book.author}</p>
          <Rating value={average} count={reviews.length} />
          <div className="price-row big"><span className="price">{money(book.price)}</span>{book.oldPrice && <span className="old">{money(book.oldPrice)}</span>}</div>
          <p>{book.description}</p>
          <div className="buy">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase">+</button>
            </div>
            <button className={added ? "btn btn-ok btn-lg" : "btn btn-lg"} onClick={onAdd}>{added ? "Added to cart ✓" : "Add to cart"}</button>
            <button className={hydrated && liked ? "btn btn-ghost btn-lg liked" : "btn btn-ghost btn-lg"} onClick={() => toggle(book.slug)}>{hydrated && liked ? "♥ In wishlist" : "♡ Wishlist"}</button>
          </div>
          <table className="details">
            <tbody>
              <tr><th>Category</th><td>{book.category}</td></tr>
              <tr><th>Pages</th><td>{book.pages}</td></tr>
              <tr><th>First published</th><td>{book.year}</td></tr>
              <tr><th>Shipping</th><td>Free over $50</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <Reviews book={book} />
      {related.length > 0 && (<section><h2>You may also like</h2><div className="grid">{related.map((b) => <BookCard key={b.slug} book={b} />)}</div></section>)}
    </Layout>
  );
}
