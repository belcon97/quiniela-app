import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[3],
      paddingVertical: space[3],
      borderBottomWidth: 1,
      borderBottomColor: t.borderFaint,
    },

    position: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: t.textSecondary,
      width: 24,
      textAlign: "center",
    },

    // Info
    info: {
      flex: 1,
      gap: 2,
    },
    name: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: t.textPrimary,
      textTransform: "uppercase",
    },
    team: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: t.textSecondary,
    },

    // Goles
    goals: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.bodySm,
      color: t.textPrimary,
    },
    goalsLabel: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: t.textSecondary,
    },
    goalsSection: {
      alignItems: "flex-end",
      gap: 2,
    },
  });
}
