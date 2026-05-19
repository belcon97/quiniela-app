import type { SelectOption } from "@/ui/Select/Select.types";

export const WORLD_CUP_COUNTRIES: SelectOption[] = [
  // Anfitriones
  { label: "Canadá", value: "canada", icon: "https://flagcdn.com/w80/ca.png" },
  {
    label: "Estados Unidos",
    value: "usa",
    icon: "https://flagcdn.com/w80/us.png",
  },
  { label: "México", value: "mexico", icon: "https://flagcdn.com/w80/mx.png" },

  // CONMEBOL
  {
    label: "Argentina",
    value: "argentina",
    icon: "https://flagcdn.com/w80/ar.png",
  },
  { label: "Brasil", value: "brasil", icon: "https://flagcdn.com/w80/br.png" },
  {
    label: "Colombia",
    value: "colombia",
    icon: "https://flagcdn.com/w80/co.png",
  },
  {
    label: "Ecuador",
    value: "ecuador",
    icon: "https://flagcdn.com/w80/ec.png",
  },
  {
    label: "Paraguay",
    value: "paraguay",
    icon: "https://flagcdn.com/w80/py.png",
  },
  {
    label: "Uruguay",
    value: "uruguay",
    icon: "https://flagcdn.com/w80/uy.png",
  },

  // UEFA
  {
    label: "Alemania",
    value: "alemania",
    icon: "https://flagcdn.com/w80/de.png",
  },
  {
    label: "Austria",
    value: "austria",
    icon: "https://flagcdn.com/w80/at.png",
  },
  {
    label: "Bélgica",
    value: "belgica",
    icon: "https://flagcdn.com/w80/be.png",
  },
  {
    label: "Bosnia y Herzegovina",
    value: "bosnia",
    icon: "https://flagcdn.com/w80/ba.png",
  },
  {
    label: "Croacia",
    value: "croacia",
    icon: "https://flagcdn.com/w80/hr.png",
  },
  {
    label: "Escocia",
    value: "escocia",
    icon: "https://flagcdn.com/w80/gb-sct.png",
  },
  { label: "España", value: "espana", icon: "https://flagcdn.com/w80/es.png" },
  {
    label: "Francia",
    value: "francia",
    icon: "https://flagcdn.com/w80/fr.png",
  },
  {
    label: "Inglaterra",
    value: "inglaterra",
    icon: "https://flagcdn.com/w80/gb-eng.png",
  },
  {
    label: "Noruega",
    value: "noruega",
    icon: "https://flagcdn.com/w80/no.png",
  },
  {
    label: "Países Bajos",
    value: "paises_bajos",
    icon: "https://flagcdn.com/w80/nl.png",
  },
  {
    label: "Portugal",
    value: "portugal",
    icon: "https://flagcdn.com/w80/pt.png",
  },
  {
    label: "República Checa",
    value: "republica_checa",
    icon: "https://flagcdn.com/w80/cz.png",
  },
  { label: "Suecia", value: "suecia", icon: "https://flagcdn.com/w80/se.png" },
  { label: "Suiza", value: "suiza", icon: "https://flagcdn.com/w80/ch.png" },
  {
    label: "Turquía",
    value: "turquia",
    icon: "https://flagcdn.com/w80/tr.png",
  },

  // CAF - África
  {
    label: "Argelia",
    value: "argelia",
    icon: "https://flagcdn.com/w80/dz.png",
  },
  {
    label: "Cabo Verde",
    value: "cabo_verde",
    icon: "https://flagcdn.com/w80/cv.png",
  },
  {
    label: "Costa de Marfil",
    value: "costa_de_marfil",
    icon: "https://flagcdn.com/w80/ci.png",
  },
  { label: "Egipto", value: "egipto", icon: "https://flagcdn.com/w80/eg.png" },
  { label: "Ghana", value: "ghana", icon: "https://flagcdn.com/w80/gh.png" },
  {
    label: "Marruecos",
    value: "marruecos",
    icon: "https://flagcdn.com/w80/ma.png",
  },
  {
    label: "Senegal",
    value: "senegal",
    icon: "https://flagcdn.com/w80/sn.png",
  },
  {
    label: "Sudáfrica",
    value: "sudafrica",
    icon: "https://flagcdn.com/w80/za.png",
  },
  { label: "Túnez", value: "tunez", icon: "https://flagcdn.com/w80/tn.png" },

  // AFC - Asia
  {
    label: "Arabia Saudita",
    value: "arabia_saudita",
    icon: "https://flagcdn.com/w80/sa.png",
  },
  {
    label: "Australia",
    value: "australia",
    icon: "https://flagcdn.com/w80/au.png",
  },
  {
    label: "Corea del Sur",
    value: "corea_del_sur",
    icon: "https://flagcdn.com/w80/kr.png",
  },
  { label: "Irán", value: "iran", icon: "https://flagcdn.com/w80/ir.png" },
  { label: "Japón", value: "japon", icon: "https://flagcdn.com/w80/jp.png" },
  {
    label: "Jordania",
    value: "jordania",
    icon: "https://flagcdn.com/w80/jo.png",
  },
  { label: "Qatar", value: "qatar", icon: "https://flagcdn.com/w80/qa.png" },
  {
    label: "Uzbekistán",
    value: "uzbekistan",
    icon: "https://flagcdn.com/w80/uz.png",
  },

  // CONCACAF
  {
    label: "Curazao",
    value: "curazao",
    icon: "https://flagcdn.com/w80/cw.png",
  },
  { label: "Haití", value: "haiti", icon: "https://flagcdn.com/w80/ht.png" },
  {
    label: "Jamaica",
    value: "jamaica",
    icon: "https://flagcdn.com/w80/jm.png",
  },
  { label: "Panamá", value: "panama", icon: "https://flagcdn.com/w80/pa.png" },
  {
    label: "Surinam",
    value: "surinam",
    icon: "https://flagcdn.com/w80/sr.png",
  },

  // OFC
  {
    label: "Nueva Zelanda",
    value: "nueva_zelanda",
    icon: "https://flagcdn.com/w80/nz.png",
  },
];

export const WORLD_CUP_PHASES: SelectOption[] = [
  { label: "Grupo A", value: "Grupo A" },
  { label: "Grupo B", value: "Grupo B" },
  { label: "Grupo C", value: "Grupo C" },
  { label: "Grupo D", value: "Grupo D" },
  { label: "Grupo E", value: "Grupo E" },
  { label: "Grupo F", value: "Grupo F" },
  { label: "Grupo G", value: "Grupo G" },
  { label: "Grupo H", value: "Grupo H" },
  { label: "Grupo I", value: "Grupo I" },
  { label: "Grupo J", value: "Grupo J" },
  { label: "Grupo K", value: "Grupo K" },
  { label: "Grupo L", value: "Grupo L" },
  { label: "Dieciseisavos", value: "Dieciseisavos" },
  { label: "Octavos", value: "Octavos" },
  { label: "Cuartos", value: "Cuartos" },
  { label: "Semifinal", value: "Semifinal" },
  { label: "Final", value: "Final" },
];
