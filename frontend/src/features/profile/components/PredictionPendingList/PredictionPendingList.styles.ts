import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  predictionPendingList: {
    gap: spacing.xs,
    minHeight: 200,
  },

  // Empty
  predictionPendingList__empty: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  predictionPendingList__emptyText: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    textAlign: "center",
  },
});