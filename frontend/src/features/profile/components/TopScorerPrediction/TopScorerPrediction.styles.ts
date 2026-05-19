import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  topScorer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral200,
    padding: spacing.md,
  },

  // Header
  topScorer__header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  topScorer__title: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: "#854D0E",
  },
  topScorer__subtitle: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },

  // Opción
  topScorer__option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.neutral200,
    marginBottom: spacing.sm,
  },
  topScorer__option_active: {
    borderColor: colors.primary,
    backgroundColor: colors.neutral100,
  },
  topScorer__flag: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
  },
  topScorer__flagPlaceholder: {
    backgroundColor: colors.neutral200,
    alignItems: "center",
    justifyContent: "center",
  },
  topScorer__optionInfo: {
    flex: 1,
  },
  topScorer__optionName: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.text,
  },
  topScorer__optionTeam: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },

  // Custom input
  topScorer__customInput: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.neutral200,
    marginBottom: spacing.md,
  },

  // Saved state
  topScorer__saved: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: "#DCFCE7",
    borderRadius: radius.md,
    padding: spacing.md,
  },
  topScorer__savedInfo: {
    flex: 1,
  },
  topScorer__savedLabel: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },
  topScorer__savedName: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.text,
  },
  topScorer__savedPoints: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.secondary,
    marginTop: 2,
  },

  // Success banner
  topScorer__successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#DCFCE7",
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  topScorer__successText: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.secondary,
  },
});
