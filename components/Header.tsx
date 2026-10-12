import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";

const links = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const hydrated = useHydrated();
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useWishlist((s) => s.slugs.length);
  const [q, setQ] = useState("");

  const search = (e: FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/books?q=${encodeURIComponent(q.trim())}` : "/books");
  };

  return (
    <header className="header">
      <div className="container header-in">
        <Link href="/" className="logo">📚 Bookly</Link>
        <nav className="nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={router.pathname === l.href ? "nav-link on" : "nav-link"}>{l.label}</Link>
          ))}
        </nav>
        <form onSubmit={search} className="hsearch">
          <input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books..." aria-label="Search books" />
        </form>
        <div className="hactions">
          <Link href="/wishlist" className="hbtn" aria-label="Wishlist">♥{hydrated && wishCount > 0 && <span className="count">{wishCount}</span>}</Link>
          <Link href="/cart" className="hbtn" aria-label="Cart">🛒{hydrated && cartCount > 0 && <span className="count">{cartCount}</span>}</Link>
        </div>
      </div>
    </header>
  );
}
