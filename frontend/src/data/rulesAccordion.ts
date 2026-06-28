// Types
import type { RuleAccordionItem } from "@/features/rules/types/rules.types";

export const RULES_ACCORDION: RuleAccordionItem[] = [
  {
    id: "1",
    icon: "sliders",
    title: "EMPATES EN EL RANKING",
    description:
      "En caso de empate entre dos o más participantes, los premios se suman y se dividen en partes iguales entre los empatados. \n\n Ejemplo: Si quedan dos empatados en el primer lugar se suma el premio del primero y segundo y se divide entre ellos dos y el premio del tercer lugar quedaría para el 2do en la lista.",
  },
  {
    id: "2",
    icon: "shield",
    title: "FASE ELIMINATORIA",
    description:
      "A partir de dieciseisavos, el resultado válido incluye el tiempo extra. Si el partido continúa empatado, se considera empate — los penales no cuentan.",
  },
  {
    id: "3",
    icon: "clock",
    title: "CIERRE DE PRONÓSTICOS",
    description:
      "Los pronósticos se cierran automáticamente al inicio de cada partido. No podrás modificar tu predicción una vez comenzado el juego.",
  },
  {
    id: "4",
    icon: "star",
    title: "GOLEADOR DEL TORNEO",
    description:
      " El goleador lo deben colocar de forma obligatoria antes del primer partido el cual no tendrá cambio luego de ser seleccionado, nosotros colocamos algunas opciones si desean colocar alguno que no este nos avisan por privado y lo agregamos. Al finalizar el mundial sabremos el máximo goleador los que lo lleguen acertar tendrá una sumatoria de 3 puntos.",
  },
];
