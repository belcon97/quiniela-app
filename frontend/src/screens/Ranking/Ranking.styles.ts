import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: t.bg,
    },
    content: {
      padding: space[5],
      gap: space[4],
      paddingBottom: space[10],
    },

    // Podio
    podium: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: space[4],
      paddingVertical: space[4],
    },

    // Clasificación
    sectionLabel: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: t.textSecondary,
      letterSpacing: 1.28,
    },
    list: {
      gap: space[3],
    },
  });
}
