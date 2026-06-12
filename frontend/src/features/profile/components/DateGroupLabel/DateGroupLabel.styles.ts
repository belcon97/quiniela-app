// React Native
import { StyleSheet } from "react-native";

// Internos
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: space[4],
      marginBottom: space[2],
    },
    date: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.caption,
      color: t.textPrimary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    count: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: t.textSecondary,
    },
  });
}
