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
  },
  emptyText: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },

  // Grupo
  group: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  group__title: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },

  // Tabla
  table__header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.neutral100,
  },
  table__row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
  },
  table__row__qualified: {
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary,
  },
  table__col: {
    width: 28,
    fontSize: typography.xs,
    fontFamily: typography.medium,
    color: colors.textMuted,
    textAlign: "center",
  },
  table__col__team: {
    flex: 1,
    textAlign: "left",
  },
  table__col__pts: {
    width: 32,
  },
  table__teamCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  table__position: {
    width: 16,
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
    textAlign: "center",
  },
  table__flag: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
  },
  table__teamName: {
    flex: 1,
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.text,
  },
  table__pts: {
    fontFamily: typography.bold,
    color: colors.primary,
  },
});