export const SITE_NAME = "Bookly";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const DEFAULT_DESCRIPTION =
  "Bookly is an online bookstore with hand-picked fiction, science, business, history and technology books, fair prices and fast delivery.";
export const DEFAULT_IMAGE = "/og-default.png";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** keeps meta descriptions inside the ~160 character window search engines show */
export function clip(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, max - 1).trimEnd()}…`;
}
