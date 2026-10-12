import Link from "next/link";
import { useState } from "react";
import BookCover from "@/components/BookCover";
import Layout from "@/components/Layout";
import { getBook } from "@/lib/books";
import { FREE_SHIPPING, money, totals } from "@/lib/utils";
import { useHydrated } from "@/hooks/useHydrated";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const hydrated = useHydrated();
  const { items, promo, setQty, remove, clear, applyPromo } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  if (!hydrated) return <Layout title="Cart" path="/cart" noindex><h1>Your cart</h1><p className="muted">Loading...</p></Layout>;
  const t = totals(items, promo);

  return (
    <Layout title="Cart" path="/cart" noindex>
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <div className="empty"><p>Your cart is empty.</p><Link href="/books" className="btn">Browse books</Link></div>
      ) : (
        <div className="cart">
          <div>
            {items.map((i) => {
              const b = getBook(i.slug);
              if (!b) return null;
              return (
                <div key={i.slug} className="cart-row card">
                  <Link href={`/books/${b.slug}`}><BookCover book={b} size="sm" /></Link>
                  <div className="grow"><Link href={`/books/${b.slug}`}><b>{b.title}</b></Link><p className="muted small">{b.author}</p><p>{money(b.price)}</p></div>
                  <div className="qty">
                    <button onClick={() => setQty(i.slug, i.qty - 1)} aria-label="Decrease">−</button><span>{i.qty}</span><button onClick={() => setQty(i.slug, i.qty + 1)} aria-label="Increase">+</button>
                  </div>
                  <b className="line">{money(b.price * i.qty)}</b>
                  <button className="icon" onClick={() => remove(i.slug)} aria-label="Remove">✕</button>
                </div>
              );
            })}
            <button className="link danger" onClick={clear}>Clear cart</button>
          </div>
          <aside className="card summary">
            <h3>Order summary</h3>
            <div className="line-row"><span>Subtotal</span><span>{money(t.sub)}</span></div>
            {t.discount > 0 && <div className="line-row ok"><span>Promo {promo}</span><span>−{money(t.discount)}</span></div>}
            <div className="line-row"><span>Shipping</span><span>{t.shipping === 0 ? "Free" : money(t.shipping)}</span></div>
            {t.shipping > 0 && <p className="muted small">Add {money(FREE_SHIPPING - (t.sub - t.discount))} more for free shipping.</p>}
            <div className="line-row total"><span>Total</span><span>{money(t.total)}</span></div>
            {!promo && (
              <form className="promo" onSubmit={(e) => { e.preventDefault(); setMsg(applyPromo(code) ? "Promo applied!" : "Invalid code."); }}>
                <input className="input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" aria-label="Promo code" />
                <button className="btn btn-ghost">Apply</button>
              </form>
            )}
            {msg && <p className="small muted">{msg}</p>}
            <Link href="/checkout" className="btn btn-lg block">Checkout</Link>
          </aside>
        </div>
      )}
    </Layout>
  );
}
