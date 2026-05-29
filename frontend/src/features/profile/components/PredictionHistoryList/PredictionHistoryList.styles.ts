import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  predictionHistoryList: {
    paddingVertical: spacing.sm,
  },

  predictionHistoryList__empty: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  predictionHistoryList__emptyText: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    textAlign: "center",
  },
});