import type { BadgeVariant } from "@/shared/types";

export function getBadgeFromPoints(points: number | null): BadgeVariant {
  if (points === null) return "soon";
  if (points === 3 || points === 6) return "win";
  if (points === 1 || points === 2) return "partial";
  if (points === 0) return "loss";
  return "final";
}
