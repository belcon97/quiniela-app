import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: t.border,
      backgroundColor: t.bgElev,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: space[3],
      paddingBottom: space[2],
      gap: 2,
    },
    label_active: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: t.primary,
    },
    label_inactive: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.micro,
      color: t.textSecondary,
    },
  });
}
