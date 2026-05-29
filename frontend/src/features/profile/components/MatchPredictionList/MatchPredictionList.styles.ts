import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Bloque
  matchPredictionList: {
    paddingVertical: spacing.md,
  },

  // Header
  matchPredictionList__header: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  matchPredictionList__title: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // Grupos
  matchPredictionList__groups: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  matchPredictionList__groupBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  matchPredictionList__groupBtn__active: {
    backgroundColor: colors.primary,
  },
  matchPredictionList__groupLabel: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.textMuted,
  },
  matchPredictionList__groupLabel__active: {
    color: colors.background,
    fontFamily: typography.semiBold,
  },

  // Cards
  matchPredictionList__cards: {
    paddingHorizontal: spacing.md,
  },

  // Footer
  matchPredictionList__footer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },

  // Empty
  matchPredictionList__empty: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  matchPredictionList__emptyText: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.textMuted,
    textAlign: "center",
  },
});