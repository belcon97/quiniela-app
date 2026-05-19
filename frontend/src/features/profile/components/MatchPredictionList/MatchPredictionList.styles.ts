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

  matchPredictionList__wildcard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    alignSelf: "center",
  },
  matchPredictionList__wildcard_active: {
    borderColor: "#5B21B6",
    backgroundColor: "#EDE9FE",
  },
  matchPredictionList__wildcard_disabled: {
    opacity: 0.4,
  },
  matchPredictionList__wildcardText: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
  },
  matchPredictionList__wildcardText_active: {
    color: "#5B21B6",
  },
  matchPredictionList__penalty: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  matchPredictionList__penaltyLabel: {
    fontSize: typography.xs,
    fontFamily: typography.medium,
    color: colors.textMuted,
    textAlign: "center",
  },
  matchPredictionList__penaltyBtns: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  matchPredictionList__penaltyBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.neutral200,
    alignItems: "center",
  },
  matchPredictionList__penaltyBtn_active: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  matchPredictionList__penaltyBtnText: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
  },
  matchPredictionList__penaltyBtnText_active: {
    color: colors.background,
  },
});
