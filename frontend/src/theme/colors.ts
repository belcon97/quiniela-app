// Son iguales en dark y light
export const semantic = {
  win: "#4ade80",
  winSoft: "rgba(74, 222, 128, 0.16)",
  draw: "#fbbf24",
  drawSoft: "rgba(251, 191, 36, 0.18)",
  loss: "#f87171",
  lossSoft: "rgba(248, 113, 113, 0.16)",
  live: "#ef4444",
} as const;

// Dark Mode
export const dark = {
  // Background
  bgSunken: "#161920", // inputs, areas recesadas
  bg: "#1C1F28", // fondo base
  bgElev: "#22263A", // cards, modales
  bgOverlay: "#292D3E", // superficies sobre cards
  bgOverlay2: "#30354C", // superficies sobre superficies

  // Text
  textPrimary: "#F7F8FA", // texto principal, headings
  textSecondary: "#9AA1AD", // labels, metadata, texto de apoyo
  textDisabled: "#5C6370", // placeholders, hints, desactivado

  // Border
  border: "#363C50", // bordes normales
  borderStrong: "#464D64", // inputs focus, dividers
  borderFaint: "#292D3E", // separadores muy sutiles

  primary: "#4A7AB5",
  primaryHover: "#3A6AA5",
  primaryContrast: "#FFFFFF",
  primarySoft: "rgba(74, 122, 181, 0.22)",

  secondary: "#00A651",
  secondaryHover: "#009046",
  secondaryContrast: "#FFFFFF",
  secondarySoft: "rgba(0, 166, 81, 0.22)",
};

// Light Mode
export const light = {
  // Background
  bgSunken: "#ECEDF2",
  bg: "#F5F6FA",
  bgElev: "#FFFFFF",
  bgOverlay: "#F0F1F6",
  bgOverlay2: "#E8E9EF",

  // Text
  textPrimary: "#1A1D2A",
  textSecondary: "#4E5568",
  textDisabled: "#8A919E",

  // Border
  border: "#E2E4ED",
  borderStrong: "#C8CBDA",
  borderFaint: "#ECEDF2",

  primary: "#001F5B",
  primaryHover: "#00164A",
  primaryContrast: "#FFFFFF",
  primarySoft: "rgba(0, 31, 91, 0.12)",

  secondary: "#00A651",
  secondaryHover: "#009046",
  secondaryContrast: "#FFFFFF",
  secondarySoft: "rgba(0, 166, 81, 0.12)",
};
