// Types
import type { RuleAccordionItem } from "@/features/rules/types/rules.types";

export const RULES_ACCORDION: RuleAccordionItem[] = [
  {
    id: "1",
    icon: "sliders",
    title: "EMPATES EN EL RANKING",
    description:
      "En caso de empate entre dos o más participantes, los premios se suman y se dividen en partes iguales entre los empatados.",
  },
  {
    id: "2",
    icon: "shield",
    title: "FASE ELIMINATORIA",
    description:
      "A partir de cuartos de final, el resultado válido incluye el tiempo extra. Si el partido continúa empatado, se considera empate — los penales no cuentan.",
  },
  {
    id: "3",
    icon: "clock",
    title: "CIERRE DE PRONÓSTICOS",
    description:
      "Los pronósticos se cierran automáticamente al inicio de cada partido. No podrás modificar tu predicción una vez comenzado el juego.",
  },
];
