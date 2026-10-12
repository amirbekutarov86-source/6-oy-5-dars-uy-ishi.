import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout title="Page not found" path="/404" noindex>
      <div className="empty"><div className="big-icon">📖</div><h1>Page not found</h1><p className="muted">This page seems to have been torn out.</p><Link href="/" className="btn">Back to home</Link></div>
    </Layout>
  );
}
