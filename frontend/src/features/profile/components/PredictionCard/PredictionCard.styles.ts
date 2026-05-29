import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Bloque
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    padding: spacing.sm,
    gap: spacing.sm,
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  // Elementos
  card__bar: {
    width: 4,
    alignSelf: "stretch",
    borderRadius: radius.sm,
  },
  card__flags: {
    gap: spacing.xs,
  },
  card__flag: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    overflow: "hidden",
    backgroundColor: colors.neutral200,
  },
  card__info: {
    flex: 1,
    gap: 2,
  },
  card__matchName: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.text,
  },
  card__scores: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },
  card__date: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textPlaceholder,
  },
  card__badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  card__badgeText: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.background,
  },

  // Modificadores — colores de puntos
  card__bar__green: {
    backgroundColor: colors.secondary,
  },
  card__bar__yellow: {
    backgroundColor: "#EAB308",
  },
  card__bar__red: {
    backgroundColor: colors.tertiary,
  },
});