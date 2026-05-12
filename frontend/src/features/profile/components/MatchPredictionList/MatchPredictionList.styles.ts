import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Group
  matchPredictionList__group: {
    marginBottom: spacing.lg,
  },
  matchPredictionList__groupTitle: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
  },

  // Card
  matchPredictionList__card: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral200,
  },
  matchPredictionList__card_teams: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  matchPredictionList__team: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  matchPredictionList__flag: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
  },
  matchPredictionList__teamName: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.text,
    textAlign: "center",
  },

  // Score inputs
  matchPredictionList__inputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  matchPredictionList__input: {
    width: 56,
    height: 56,
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    textAlign: "center",
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.neutral200,
  },
  matchPredictionList__input_filled: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  matchPredictionList__separator: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.textPlaceholder,
  },

  // Meta
  matchPredictionList__meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  matchPredictionList__metaText: {
    fontSize: typography.xs,
    color: colors.textPlaceholder,
    fontFamily: typography.regular,
  },

  // Footer
  matchPredictionList__footer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  matchPredictionList__empty: {
    alignItems: "center",
    padding: spacing.xl,
    gap: spacing.sm,
  },
  matchPredictionList__emptyText: {
    fontSize: typography.sm,
    color: colors.textPlaceholder,
    fontFamily: typography.regular,
    textAlign: "center",
  },
});
