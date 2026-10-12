import Link from "next/link";
import { useState, type FormEvent } from "react";
import Layout from "@/components/Layout";
import { getBook } from "@/lib/books";
import { money, totals } from "@/lib/utils";
import { useHydrated } from "@/hooks/useHydrated";
import { useCart } from "@/store/cart";

const empty = { name: "", email: "", phone: "", address: "", city: "", payment: "card" };

export default function CheckoutPage() {
  const hydrated = useHydrated();
  const { items, promo, clear } = useCart();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);

  const field = (k: keyof typeof empty) => ({ value: form[k], onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value })) });

  if (order) {
    return (
      <Layout title="Order confirmed" path="/checkout" noindex>
        <div className="empty"><div className="big-icon">🎉</div><h1>Thank you for your order!</h1>
          <p>Order <b>#{order.id}</b> for {money(order.total)} has been placed. A confirmation was sent to {form.email}.</p>
          <Link href="/books" className="btn">Continue shopping</Link></div>
      </Layout>
    );
  }
  if (!hydrated) return <Layout title="Checkout" path="/checkout" noindex><h1>Checkout</h1></Layout>;
  if (items.length === 0) return <Layout title="Checkout" path="/checkout" noindex><div className="empty"><p>Your cart is empty.</p><Link href="/books" className="btn">Browse books</Link></div></Layout>;

  const t = totals(items, promo);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (form.name.trim().length < 2) er.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email.";
    if (form.phone.replace(/\D/g, "").length < 7) er.phone = "Enter a valid phone number.";
    if (form.address.trim().length < 5) er.address = "Enter your address.";
    if (!form.city.trim()) er.city = "Enter your city.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setOrder({ id: Math.random().toString(36).slice(2, 8).toUpperCase(), total: t.total });
    clear();
  };

  return (
    <Layout title="Checkout" path="/checkout" noindex>
      <h1>Checkout</h1>
      <form className="cart" onSubmit={submit} noValidate>
        <div className="card form">
          <h3>Delivery details</h3>
          {(["name", "email", "phone", "address", "city"] as const).map((k) => (
            <div key={k}>
              <input className="input" placeholder={k[0].toUpperCase() + k.slice(1)} aria-label={k} {...field(k)} />
              {errors[k] && <p className="error">{errors[k]}</p>}
            </div>
          ))}
          <select className="input" aria-label="Payment" {...field("payment")}><option value="card">Pay by card</option><option value="cash">Cash on delivery</option></select>
        </div>
        <aside className="card summary">
          <h3>Your order</h3>
          {items.map((i) => { const b = getBook(i.slug); return b ? <div key={i.slug} className="line-row small"><span>{b.title} × {i.qty}</span><span>{money(b.price * i.qty)}</span></div> : null; })}
          <hr />
          <div className="line-row"><span>Shipping</span><span>{t.shipping === 0 ? "Free" : money(t.shipping)}</span></div>
          {t.discount > 0 && <div className="line-row ok"><span>Discount</span><span>−{money(t.discount)}</span></div>}
          <div className="line-row total"><span>Total</span><span>{money(t.total)}</span></div>
          <button className="btn btn-lg block">Place order</button>
          <p className="muted small">Demo store: no real payment is taken.</p>
        </aside>
      </form>
    </Layout>
  );
}
