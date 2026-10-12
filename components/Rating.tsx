export default function Rating({ value, count }: { value: number; count?: number }) {
  const full = Math.round(value);
  return (
    <span className="rating" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      <span className="stars">{"★".repeat(full)}{"☆".repeat(5 - full)}</span>
      <span className="muted small"> {value ? value.toFixed(1) : "–"}{count !== undefined ? ` (${count})` : ""}</span>
    </span>
  );
}
