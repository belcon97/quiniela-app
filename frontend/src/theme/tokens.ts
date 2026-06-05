export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  "2xl": 28,
  full: 9999,
} as const;

export const font = {
  // Archivo
  archivoBold: "Archivo_700Bold",
  archiveBlack: "Archivo_900Black",

  // Noto Sans
  notoRegular: "NotoSans_400Regular",
  notoMedium: "NotoSans_500Medium",
  notoSemibold: "NotoSans_600SemiBold",
  notoBold: "NotoSans_700Bold",
} as const;

export const fontSize = {
  // Display — para scores, numeros grandes, titulos hero
  displayXl: 56,
  displayLg: 40,
  displayMd: 31,

  // Headings — titulos de seccion y card
  h1: 26,
  h2: 22,
  h3: 18,

  // Body — texto corriente
  bodyLg: 18,
  body: 16,
  bodySm: 14,

  // Pequeños — labels, badges, tabs
  caption: 12,
  micro: 11,
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  black: "900",
} as const;

export const tracking = {
  display: -0.56,
  label: 1.28,
  micro: 2.24,
} as const;

//   lineHeight = fontSize × lineHeightMultiplier.tight
export const lineHeightMultiplier = {
  tight: 0.94,
  snug: 1.06,
  normal: 1.5,
} as const;

export const duration = {
  fast: 120,
  base: 220,
  slow: 420,
} as const;

export const palette = {
  navy: "#001F5B",
  red: "#ED1C24",
  green: "#00A651",
  sky: "#1B9DE0",
  gold: "#FFC20E",
  orange: "#FF6A13",
  magenta: "#E5007E",
  teal: "#00B3A4",
  purple: "#7B2FB5",
} as const;
