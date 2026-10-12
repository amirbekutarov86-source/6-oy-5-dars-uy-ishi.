import { useState, type FormEvent } from "react";
import Rating from "./Rating";
import type { Book } from "@/lib/books";
import { useBookReviews } from "@/hooks/useBookReviews";
import { useReviews } from "@/store/reviews";

export default function Reviews({ book }: { book: Book }) {
  const { reviews, average } = useBookReviews(book);
  const addReview = useReviews((s) => s.addReview);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || text.trim().length < 5) { setError("Please enter your name and a review of at least 5 characters."); return; }
    addReview(book.slug, { name: name.trim(), rating, text: text.trim() });
    setName(""); setText(""); setRating(5); setError("");
  };

  return (
    <section className="reviews">
      <h2>Reviews <span className="muted">({reviews.length})</span></h2>
      <p><Rating value={average} /></p>
      <div className="review-grid">
        <div>
          {reviews.map((r) => (
            <div key={r.id} className="review">
              <div className="review-top"><b>{r.name}</b><span className="muted small">{r.date}</span></div>
              <span className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="card form">
          <h3>Write a review</h3>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={40} />
          <select className="input" value={rating} onChange={(e) => setRating(Number(e.target.value))} aria-label="Rating">
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)} ({n})</option>)}
          </select>
          <textarea className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="What did you think?" rows={4} maxLength={500} />
          {error && <p className="error">{error}</p>}
          <button className="btn">Submit review</button>
        </form>
      </div>
    </section>
  );
}
