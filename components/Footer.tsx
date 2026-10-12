import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-in">
        <div>
          <p className="logo">📚 Bookly</p>
          <p className="muted small">Hand-picked books, delivered to your door.</p>
        </div>
        <div>
          <p className="foot-h">Shop</p>
          <Link href="/books">All books</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Cart</Link>
        </div>
        <div>
          <p className="foot-h">Company</p>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <p className="copy muted small">© {new Date().getFullYear()} Bookly. All rights reserved.</p>
    </footer>
  );
}
