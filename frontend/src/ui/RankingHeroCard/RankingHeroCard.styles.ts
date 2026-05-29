import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Bloque
  heroCard: {
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

  // Elementos
  heroCard__trophy: {
    alignSelf: "flex-end",
    marginBottom: spacing.sm,
  },
  heroCard__position: {
    fontSize: typography.xxl,
    fontFamily: typography.headline,
    color: colors.background,
    marginTop: spacing.sm,
  },
  heroCard__username: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.background,
  },
  heroCard__name: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: "rgba(255,255,255,0.6)",
    marginBottom: spacing.sm,
  },
  heroCard__badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 166, 81, 0.2)",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  heroCard__badgeText: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.secondary,
  },
});