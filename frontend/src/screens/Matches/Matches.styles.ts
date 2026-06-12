// React Native
import { StyleSheet } from "react-native";

// Internos
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: space[4],
      paddingVertical: space[4],
      gap: space[3],
      paddingBottom: space[10],
    },

    // Locked overlay
    locked: {
      padding: space[5],
      alignItems: "center",
      gap: space[3],
    },
    lockedText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.bodySm,
      color: t.textSecondary,
      textAlign: "center",
    },
  });
}
