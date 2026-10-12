import Link from "next/link";
import { useState, type FormEvent } from "react";
import BookCard from "@/components/BookCard";
import Layout from "@/components/Layout";
import { books, categories } from "@/lib/books";
import { DEFAULT_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

const homeJsonLd = [
  { "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/"), logo: absoluteUrl("/favicon.svg") },
  { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: absoluteUrl("/"), description: DEFAULT_DESCRIPTION,
    potentialAction: { "@type": "SearchAction", target: absoluteUrl("/books?q={search_term_string}"), "query-input": "required name=search_term_string" } },
];

const perks = [
  { icon: "🚚", title: "Free shipping", text: "On orders over $50" },
  { icon: "↩️", title: "30-day returns", text: "No questions asked" },
  { icon: "🔒", title: "Secure checkout", text: "Your data stays safe" },
  { icon: "🎁", title: "Code BOOKS10", text: "10% off your order" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const subscribe = (e: FormEvent) => { e.preventDefault(); if (email.includes("@")) setDone(true); };

  return (
    <Layout path="/" jsonLd={homeJsonLd}>
      <section className="hero">
        <div>
          <span className="eyebrow">New season picks</span>
          <h1>Find your next favourite book</h1>
          <p className="lead">From timeless fiction to the best business and technology reads. Hand-picked, fairly priced and delivered fast.</p>
          <div className="hero-cta">
            <Link href="/books" className="btn btn-lg">Browse books</Link>
            <Link href="/about" className="btn btn-ghost btn-lg">Our story</Link>
          </div>
        </div>
        <div className="hero-stack" aria-hidden="true">
          {books.slice(0, 3).map((b, i) => (
            <div key={b.slug} className={`hero-book hb${i}`} style={{ background: `linear-gradient(145deg, hsl(${b.hue} 65% 52%), hsl(${b.hue + 35} 60% 22%))` }}>{b.title}</div>
          ))}
        </div>
      </section>

      <section className="perks">
        {perks.map((p) => (
          <div key={p.title} className="perk"><span className="perk-i">{p.icon}</span><div><b>{p.title}</b><p className="muted small">{p.text}</p></div></div>
        ))}
      </section>

      <section>
        <h2>Shop by category</h2>
        <div className="cats">
          {categories.map((c) => <Link key={c} href={`/books?category=${encodeURIComponent(c)}`} className="cat">{c}</Link>)}
        </div>
      </section>

      <section>
        <div className="sec-head"><h2>Bestsellers</h2><Link href="/books" className="link">View all →</Link></div>
        <div className="grid">{books.filter((b) => b.bestseller).map((b) => <BookCard key={b.slug} book={b} />)}</div>
      </section>

      <section>
        <h2>New arrivals</h2>
        <div className="grid">{books.filter((b) => b.isNew).map((b) => <BookCard key={b.slug} book={b} />)}</div>
      </section>

      <section className="news card">
        <h2>Get 10% off your first order</h2>
        <p className="muted">Join our newsletter and receive reading lists and the code BOOKS10.</p>
        {done ? <p className="ok">Thank you! Check your inbox. 🎉</p> : (
          <form onSubmit={subscribe} className="news-form">
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email" required />
            <button className="btn">Subscribe</button>
          </form>
        )}
      </section>
    </Layout>
  );
}
