import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    gap: spacing.md,
  },

  row__active: {
    backgroundColor: colors.background,
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  row__position: {
    width: 28,
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.neutral400,
  },
  row__position__first: {
    color: colors.secondary,
    fontFamily: typography.bold,
  },
  row__info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  row__userInfo: {
    flex: 1,
  },
  row__name: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.text,
  },
  row__username: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  row__points: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.text,
  },
  row__position__active: {
    color: colors.primary,
    fontFamily: typography.bold,
  },
  row__name__active: {
    color: colors.primary,
  },
  row__username__active: {
    color: colors.primary,
    opacity: 0.7,
  },
  row__points__active: {
    color: colors.primary,
  },
});