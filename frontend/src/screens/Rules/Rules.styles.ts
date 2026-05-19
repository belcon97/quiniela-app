import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  rules: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  rules__header: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  rules__title: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.background,
  },

  // Scroll
  rules__scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // Intro
  rules__intro: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },

  // Section
  rules__section: {
    marginBottom: spacing.lg,
  },
  rules__sectionTitle: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },

  // Card
  rules__card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    backgroundColor: colors.neutral100,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  rules__badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minWidth: 56,
    alignItems: "center",
  },
  rules__badgeText: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
  },
  rules__cardContent: {
    flex: 1,
    gap: spacing.xs,
  },
  rules__cardTitle: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.text,
  },
  rules__cardDesc: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    lineHeight: 20,
  },

  // Body text
  rules__body: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.text,
    lineHeight: 22,
  },
});
