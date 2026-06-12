export function formatMatchDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.toLocaleString("es", { month: "short" });
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} · ${hours}:${mins}`;
}

// Devuelve clave YYYY-MM-DD (día sin hora) para agrupar
export function getDateKey(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Label tipo "HOY · 20 JUN" / "MAÑANA · 21 JUN" / "DOM · 19 JUN"
export function formatDateLabel(isoDate: string): string {
  const date = new Date(isoDate);
  const today = new Date();

  // Normalizamos a medianoche para comparar solo el día
  const startOf = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const diffDays = Math.round(
    (startOf(date) - startOf(today)) / (1000 * 60 * 60 * 24),
  );

  const day = date.getDate();
  const month = date.toLocaleString("es", { month: "short" }).toUpperCase();

  let prefix: string;
  if (diffDays === 0) prefix = "HOY";
  else if (diffDays === 1) prefix = "MAÑANA";
  else if (diffDays === -1) prefix = "AYER";
  else prefix = date.toLocaleString("es", { weekday: "short" }).toUpperCase();

  return `${prefix} · ${day} ${month}`;
}

export function formatMatchTime(isoDate: string): string {
  const date = new Date(isoDate);
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${mins}`;
}