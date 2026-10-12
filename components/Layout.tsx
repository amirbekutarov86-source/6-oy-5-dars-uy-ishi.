import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Seo, { type SeoProps } from "./Seo";

type Props = SeoProps & { children: ReactNode };

export default function Layout({ children, ...seo }: Props) {
  return (
    <>
      <Seo {...seo} />
      <Header />
      <main className="container page">{children}</main>
      <Footer />
    </>
  );
}
