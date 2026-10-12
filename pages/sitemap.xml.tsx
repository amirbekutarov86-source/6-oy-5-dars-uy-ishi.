import type { GetServerSideProps } from "next";
import { books } from "@/lib/books";
import { absoluteUrl } from "@/lib/seo";

const staticPages = [
  { path: "/", priority: "1.0", freq: "daily" },
  { path: "/books", priority: "0.9", freq: "daily" },
  { path: "/about", priority: "0.5", freq: "monthly" },
  { path: "/contact", priority: "0.5", freq: "monthly" },
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...staticPages.map((p) => ({ loc: absoluteUrl(p.path), freq: p.freq, priority: p.priority })),
    ...books.map((b) => ({ loc: absoluteUrl(`/books/${b.slug}`), freq: "weekly", priority: "0.8" })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
