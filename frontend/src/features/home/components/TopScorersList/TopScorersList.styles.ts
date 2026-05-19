import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  topScorers: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral200,
    padding: spacing.md,
  },

  // Header
  topScorers__header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  topScorers__title: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: "#854D0E",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Row
  topScorers__row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
  topScorers__medal: {
    fontSize: 18,
    width: 24,
    textAlign: "center",
  },
  topScorers__flag: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
  },
  topScorers__flagPlaceholder: {
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
  },
  topScorers__goals: {
    alignItems: "center",
  },
  topScorers__goalsCount: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.primary,
  },
  topScorers__goalsLabel: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },
});
