import { StyleSheet } from "react-native";
import { font, fontSize, space, radius } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: space[3],
      padding: space[4],
      borderBottomWidth: 1,
      borderBottomColor: t.border,
    },
    tab: {
      paddingVertical: space[2],
      paddingHorizontal: space[4],
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: t.border,
    },
    tab_active: {
      backgroundColor: t.primary,
      borderColor: t.primary,
    },
    tabText: {
      fontFamily: font.notoBold,
      fontSize: fontSize.caption,
      color: t.textSecondary,
      letterSpacing: 0.5,
    },
    tabText_active: {
      color: t.primaryContrast,
    },
  });
}
