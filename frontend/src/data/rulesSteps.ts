// Styles
import { palette } from '@/theme'
// Types
import type { RuleStep } from "@/features/rules/types/rules.types";

export const RULES_STEPS: RuleStep[] = [
  {
    id: 1,
    badge: "+1\nPT",
    badgeColor: 'rgba(255, 194, 14, 0.18)',
    badgeTextColor: palette.gold,
    title: "PUNTUACIÓN BÁSICA",
    description:
      "Ganás +1 PT por acertar el ganador del partido o el empate, sin necesidad de acertar el marcador exacto.",
  },
  {
    id: 2,
    badge: "+3\nPTS",
    badgeColor: "rgba(74, 222, 128, 0.16)",
    badgeTextColor: "#4ade80",
    title: "RESULTADO EXACTO",
    description: "Ganás +3 PTS por acertar el marcador exacto del partido.",
  },
  {
    id: 3,
    badge: "×2",
    badgeColor: "rgba(123, 47, 181, 0.15)",
    badgeTextColor: palette.purple,
    title: "COMODÍN",
    description:
      "Podés usar el comodín una sola vez durante todo el torneo. Duplica los puntos obtenidos en ese partido.",
  },
  {
    id: 4,
    badge: "+3\nPTS",
    badgeColor: "#DCFCE7",
    badgeTextColor: "#166534",
    title: "GOLEADOR DEL TORNEO",
    description:
      "Si acertás el goleador del torneo al inicio del Prode, sumás 3 puntos adicionales.",
  },
  {
    id: 5,
    badge: "⚖️",
    badgeColor: "rgba(177, 170, 170, 0.1)",
    badgeTextColor: "#9AA1AD",
    title: "EMPATES Y FASE ELIMINATORIA",
    description:
      "En caso de empate en el ranking, los premios se dividen en partes iguales.\n\nA partir de cuartos de final, el resultado válido incluye el tiempo extra. Si el partido continúa empatado, se considera empate — los penales no cuentan.",
  },
];
