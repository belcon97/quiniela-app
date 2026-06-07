import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: t.bg,
    },
    content: {
      padding: space[5],
      gap: space[6],
      paddingBottom: space[10],
    },

    // Header
    header: {
      gap: space[2],
    },
    title: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.displayLg,
      color: t.textPrimary,
      textTransform: "uppercase",
      letterSpacing: -1,
    },
    subtitle: {
      fontFamily: font.notoBold,
      fontSize: fontSize.caption,
      color: t.secondary,
      letterSpacing: 1,
    },

    // Secciones
    section: {
      gap: space[4],
    },
    sectionLabel: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: t.textSecondary,
      letterSpacing: 1.28,
      textTransform: "uppercase",
    },
    list: {
      gap: space[4],
    },
  });
}
