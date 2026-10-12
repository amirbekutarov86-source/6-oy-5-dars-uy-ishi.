import type { GetServerSideProps } from "next";
import { absoluteUrl } from "@/lib/seo";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = ["User-agent: *", "Allow: /", "Disallow: /cart", "Disallow: /checkout", "Disallow: /wishlist", "", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, ""].join("\n");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
