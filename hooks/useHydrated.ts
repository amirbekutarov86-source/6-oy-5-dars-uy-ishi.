import { useEffect, useState } from "react";

/** true only after the first client render, so persisted store data never causes a hydration mismatch */
export function useHydrated(): boolean {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
