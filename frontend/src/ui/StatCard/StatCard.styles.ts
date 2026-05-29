import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  card__label: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    letterSpacing: 0.8,
    color: colors.textMuted,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
  },
  card__value: {
    fontSize: typography.xxl,
    fontFamily: typography.bold,
    color: colors.text,
  },
  card__value__highlight: {
    color: colors.secondary,
  },
});