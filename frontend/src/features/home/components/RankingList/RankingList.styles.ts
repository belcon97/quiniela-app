import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  rankingList__header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  rankingList__title: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  rankingList__seeAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  rankingList__seeAllText: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
});
