import type { Book } from "@/lib/books";

export default function BookCover({ book, size = "md" }: { book: Book; size?: "sm" | "md" | "lg" }) {
  return (
    <div className={`cover cover-${size}`} style={{ background: `linear-gradient(145deg, hsl(${book.hue} 65% 52%), hsl(${book.hue + 35} 60% 22%))` }} aria-hidden="true">
      <span className="cover-title">{book.title}</span>
      <span className="cover-author">{book.author.split(",")[0]}</span>
    </div>
  );
}
