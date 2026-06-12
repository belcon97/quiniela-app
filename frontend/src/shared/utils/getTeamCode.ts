import { WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";

export function getTeamCode(teamName: string): string {
  const country = WORLD_CUP_COUNTRIES.find(
    (c) => c.label.toLowerCase() === teamName.toLowerCase(),
  );
  // Fallback: primeras 3 letras en mayúscula si no se encuentra
  return country?.code ?? teamName.slice(0, 3).toUpperCase();
}