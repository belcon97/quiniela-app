export function formatPosition(position: number | null): string {
  if (position === null) return "--";
  return position.toString().padStart(2, "0");
}