import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.bg,
      padding: space[5],
      gap: space[6],
    },
    header: {
      gap: space[2],
    },
    title: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h1,
      color: t.textPrimary,
      textTransform: "uppercase",
    },
    subtitle: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.body,
      color: t.textSecondary,
      lineHeight: 24,
    },
    errorText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.bodySm,
      color: t.semantic.loss,
      textAlign: "center",
    },
  });
}
