import { StyleSheet } from "react-native";
import { font, fontSize, space, radius } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    // Scroll
    scroll: {
      flex: 1,
    },
    scrollContent: {
      padding: space[4],
      gap: space[4],
      paddingBottom: space[10],
    },
    // Form
    formTitle: {
      fontFamily: font.notoBold,
      fontSize: fontSize.bodySm,
      color: t.textSecondary,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    formSection: {
      gap: space[3],
    },
    formRow: {
      flexDirection: "row",
      gap: space[3],
    },
    formRowItem: {
      flex: 1,
    },
    // Chips
    chips: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: space[2],
    },
    // Fecha/hora mobile
    dateField: {
      backgroundColor: t.bgElev,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: radius.md,
      paddingVertical: space[3],
      paddingHorizontal: space[4],
    },
    dateFieldText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.body,
      color: t.textPrimary,
    },
    // Feedback
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
