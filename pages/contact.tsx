import { useState, type FormEvent } from "react";
import Layout from "@/components/Layout";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      setError("Please fill in all fields (message at least 10 characters)."); return;
    }
    setError(""); setSent(true);
  };

  return (
    <Layout title="Contact us" description="Questions about an order or a book recommendation? Get in touch with the Bookly team." path="/contact">
      <h1>Contact us</h1>
      <div className="contact">
        <div className="card"><h3>Visit or write</h3><p className="muted">12 Library Street<br />hello@bookly.example<br />Mon–Sat, 9:00–18:00</p></div>
        {sent ? <div className="card"><p className="ok">Thanks, {form.name}! We will reply within one business day.</p></div> : (
          <form onSubmit={submit} className="card form" noValidate>
            <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea className="input" rows={5} placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            {error && <p className="error">{error}</p>}
            <button className="btn">Send message</button>
          </form>
        )}
      </div>
    </Layout>
  );
}
