import { StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },

  // Empty
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    textAlign: "center",
  },

  // Fase
  phase: {
    gap: spacing.sm,
  },
  phase__title: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  phase__matches: {
    gap: spacing.sm,
  },

  // Card partido
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  card__meta: {
    flexDirection: "row",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  card__metaText: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: "rgba(255,255,255,0.5)",
  },

  // Equipo
  card__team: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
    opacity: 0.6,
  },
  card__team__winner: {
    opacity: 1,
  },
  card__teamInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
  },
  card__flag: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
  },
  card__teamName: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.background,
  },

  // Score
  card__score: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: "rgba(255,255,255,0.6)",
    minWidth: 20,
    textAlign: "right",
  },
  card__score__winner: {
    color: colors.background,
  },

  // Pendiente
  card__pending: {
    marginTop: spacing.xs,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  card__pendingText: {
    fontSize: typography.xs,
    fontFamily: typography.medium,
    color: "rgba(255,255,255,0.6)",
  },
});