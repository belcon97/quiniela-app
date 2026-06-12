import type { Match } from "@/shared/types";
import { getDateKey } from "./formatDate";

// Agrupa matches por día y devuelve los grupos ordenados cronológicamente
export function groupByDate(
  matches: Match[],
): { date: string; matches: Match[] }[] {
  const map = matches.reduce(
    (acc, match) => {
      const key = getDateKey(match.date);
      if (!acc[key]) acc[key] = [];
      acc[key].push(match);
      return acc;
    },
    {} as Record<string, Match[]>,
  );

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b)) // YYYY-MM-DD ordena bien como string
    .map(([, group]) => ({
      // usamos la fecha del primer match para el label
      date: group[0].date,
      matches: group.sort(
        (m1, m2) => new Date(m1.date).getTime() - new Date(m2.date).getTime(),
      ),
    }));
}
