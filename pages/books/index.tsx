import { useRouter } from "next/router";
import BookCard from "@/components/BookCard";
import Layout from "@/components/Layout";
import { avg, books, categories } from "@/lib/books";

const sorts = [
  { v: "featured", l: "Featured" }, { v: "price-asc", l: "Price: low to high" }, { v: "price-desc", l: "Price: high to low" },
  { v: "rating", l: "Top rated" }, { v: "title", l: "Title A-Z" },
];

export default function Catalog() {
  const router = useRouter();
  const get = (k: string, d = "") => { const v = router.query[k]; return typeof v === "string" ? v : d; };
  const q = get("q"), category = get("category"), sort = get("sort", "featured"), max = Number(get("max", "40"));

  const set = (k: string, v: string) => {
    const query: Record<string, string> = {};
    Object.entries({ ...router.query, [k]: v }).forEach(([key, val]) => { if (typeof val === "string" && val) query[key] = val; });
    router.replace({ pathname: "/books", query }, undefined, { shallow: true, scroll: false });
  };

  const needle = q.toLowerCase();
  const list = books
    .filter((b) => (!category || b.category === category) && b.price <= max && (!needle || `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(needle)))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return avg(b.reviews) - avg(a.reviews);
      if (sort === "title") return a.title.localeCompare(b.title);
      return Number(!!b.bestseller) - Number(!!a.bestseller);
    });

  return (
    <Layout title={category ? `${category} books` : "All books"} description={category ? `Browse ${category.toLowerCase()} books at Bookly. Filter by price and rating, with free shipping on orders over $50.` : "Browse every book in the Bookly store. Search by title or author and filter by category, price and rating."} path="/books">
      <h1>All books</h1>
      <div className="catalog">
        <aside className="filters card">
          <label className="lbl">Search</label>
          <input className="input" type="search" value={q} onChange={(e) => set("q", e.target.value)} placeholder="Title or author" />
          <label className="lbl">Category</label>
          <div className="chips">
            <button className={!category ? "chip on" : "chip"} onClick={() => set("category", "")}>All</button>
            {categories.map((c) => <button key={c} className={category === c ? "chip on" : "chip"} onClick={() => set("category", c)}>{c}</button>)}
          </div>
          <label className="lbl">Max price: ${max}</label>
          <input type="range" min={10} max={40} step={1} value={max} onChange={(e) => set("max", e.target.value)} />
          <label className="lbl">Sort by</label>
          <select className="input" value={sort} onChange={(e) => set("sort", e.target.value)}>
            {sorts.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
          </select>
          <button className="btn btn-ghost" onClick={() => router.replace("/books", undefined, { shallow: true })}>Reset filters</button>
        </aside>
        <div>
          <p className="muted">{list.length} {list.length === 1 ? "book" : "books"} found</p>
          {list.length === 0 ? <div className="empty">No books match your filters.</div> : <div className="grid">{list.map((b) => <BookCard key={b.slug} book={b} />)}</div>}
        </div>
      </div>
    </Layout>
  );
}
