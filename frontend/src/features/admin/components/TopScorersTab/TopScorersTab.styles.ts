import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      padding: space[4],
      gap: space[4],
      paddingBottom: space[10],
    },
    formSection: {
      gap: space[3],
    },
    formTitle: {
      fontFamily: font.notoBold,
      fontSize: fontSize.bodySm,
      color: t.textSecondary,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    feedbackText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.bodySm,
      textAlign: "center",
    },
    feedbackText_error: {
      color: t.semantic.loss,
    },
    feedbackText_success: {
      color: t.semantic.win,
    },
  });
}
