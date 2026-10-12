import { getBook } from "./books";

export const FREE_SHIPPING = 50;
export const SHIPPING = 4.99;
export const PROMO_CODE = "BOOKS10";
export const money = (n: number) => `$${n.toFixed(2)}`;

export function totals(items: { slug: string; qty: number }[], promo: string | null) {
  const sub = items.reduce((s, i) => s + (getBook(i.slug)?.price ?? 0) * i.qty, 0);
  const discount = promo === PROMO_CODE ? sub * 0.1 : 0;
  const after = sub - discount;
  const shipping = after === 0 || after >= FREE_SHIPPING ? 0 : SHIPPING;
  return { sub, discount, shipping, total: after + shipping };
}
