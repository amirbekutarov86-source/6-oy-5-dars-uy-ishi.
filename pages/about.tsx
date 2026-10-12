import Layout from "@/components/Layout";

const stats = [["12k+", "Happy readers"], ["3,500", "Titles in stock"], ["48h", "Average delivery"], ["4.8★", "Average rating"]];
const values = [
  ["Curated, not crowded", "We stock books we would recommend to a friend, not everything under the sun."],
  ["Fair prices", "Honest pricing, regular sales and a 10% welcome code for every new reader."],
  ["Readers first", "Real reviews from real readers help you choose with confidence."],
];

export default function About() {
  return (
    <Layout title="About us" description="Learn about Bookly: a small, reader-first bookstore with curated titles, fair prices and fast delivery." path="/about">
      <h1>About Bookly</h1>
      <p className="lead">Bookly started with a simple idea: finding a great book should feel as good as reading one.</p>
      <div className="stats">{stats.map(([n, l]) => <div key={l} className="card stat"><b>{n}</b><span className="muted">{l}</span></div>)}</div>
      <h2>What we believe</h2>
      <div className="grid-3">{values.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p className="muted">{d}</p></div>)}</div>
    </Layout>
  );
}
