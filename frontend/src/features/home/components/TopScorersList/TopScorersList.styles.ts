import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  topScorers: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },

  // Header
  topScorers__header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  topScorers__title: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.text,
  },

  // list
  topScorers__container: {
    backgroundColor: colors.neutral100,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  // Row
  topScorers__row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  topScorers__position: {
    width: 28,
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.neutral400,
    textAlign: "center",
  },
  topScorers__flag: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    overflow: "hidden",
    backgroundColor: colors.neutral200,
  },
  topScorers__flag__placeholder: {
    backgroundColor: colors.neutral200,
  },
  topScorers__info: {
    flex: 1,
  },
  topScorers__name: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.text,
  },
  topScorers__team: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },

  // Goles
  topScorers__goals: {
    flexDirection: "row",
    gap:6,
    alignItems: "center",
  },
  topScorers__goals__count: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.primary,
  },
  topScorers__goals__label: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },
});