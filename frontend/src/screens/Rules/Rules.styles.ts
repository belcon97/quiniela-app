import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Bloque
  rules: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Scroll
  rules__scroll: {
    paddingBottom: spacing.xl,
  },

  // Header
  rules__header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  rules__title: {
    fontSize: typography.xxl,
    fontFamily: typography.headline,
    color: colors.text,
    lineHeight: 40,
  },
  rules__subtitle: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.secondary,
    letterSpacing: 1,
    marginTop: spacing.xs,
  },

  // Secciones
  rules__section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  rules__sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  rules__sectionTitle: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.text,
  },
  rules__sectionDivider: {
    height: 3,
    width: 32,
    backgroundColor: colors.secondary,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  rules__body: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.text,
    lineHeight: 22,
  },

  // Cards normales
  rules__card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  rules__cardContent: {
    flex: 1,
  },
  rules__cardTitle: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.text,
    marginBottom: 2,
  },
  rules__cardDesc: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
    lineHeight: 18,
  },

  // Badges
  rules__badge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  rules__badge__yellow: {
    backgroundColor: "#FEF9C3",
  },
  rules__badge__green: {
    backgroundColor: "#DCFCE7",
  },
  rules__badgeText: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    textAlign: "center",
  },
  rules__badgeText__yellow: {
    color: "#854D0E",
  },
  rules__badgeText__green: {
    color: "#166534",
  },

  // Card Comodin
  rules__card__wildcard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  rules__wildcardBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  rules__wildcardBadgeText: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.background,
  },
  rules__wildcardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  rules__wildcardTitle: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.background,
  },
  rules__wildcardChip: {
    backgroundColor: "rgba(0, 166, 81, 0.3)",
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  rules__wildcardChipText: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.secondary,
  },
  rules__wildcardDesc: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 20,
  },

  // Empates
  rules__empates: {
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary,
    paddingLeft: spacing.md,
    paddingVertical: spacing.sm,
  },
  rules__empatesLabel: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  rules__empatesText: {
    fontSize: typography.md,
    fontFamily: typography.regular,
    color: colors.text,
    lineHeight: 24,
  },

  // Advertencia
  rules__warning: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    backgroundColor: "rgba(237, 28, 36, 0.08)",
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  rules__warningText: {
    flex: 1,
    fontSize: typography.xs,
    fontFamily: typography.medium,
    color: colors.tertiary,
    lineHeight: 18,
    fontStyle: "italic",
  },
});