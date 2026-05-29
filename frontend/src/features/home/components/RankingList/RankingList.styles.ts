import { StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  rankingList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },

  rankingList__header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  rankingList__titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rankingList__title: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.text,
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

  rankingList__container: {
    backgroundColor: colors.neutral100,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  rankingList__columns: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  rankingList__column: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
  },
  rankingList__column__user: {
    flex: 1,
    paddingLeft: 36 + spacing.sm,
  },

  rankingList__empty: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});