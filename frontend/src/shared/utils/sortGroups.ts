// Orden de las fases — grupos primero, luego eliminatorias
const PHASE_ORDER: Record<string, number> = {
  "Grupo A": 0,
  "Grupo B": 1,
  "Grupo C": 2,
  "Grupo D": 3,
  "Grupo E": 4,
  "Grupo F": 5,
  "Grupo G": 6,
  "Grupo H": 7,
  "Grupo I": 8,
  "Grupo J": 9,
  "Grupo K": 10,
  "Grupo L": 11,
  Dieciseisavos: 12,
  Octavos: 13,
  Cuartos: 14,
  Semifinal: 15,
  Final: 16,
};

export function sortGroups(groups: string[]): string[] {
  return [...groups].sort((a, b) => {
    const orderA = PHASE_ORDER[a] ?? 99;
    const orderB = PHASE_ORDER[b] ?? 99;
    return orderA - orderB;
  });
}
