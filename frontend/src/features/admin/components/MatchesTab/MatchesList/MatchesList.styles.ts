import { StyleSheet, Platform } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
  },

  // Estados vacío y cargando
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing.xxl,
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.textPlaceholder,
    fontFamily: typography.regular,
  },

  // Card
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral200,
    gap: spacing.sm,
  },
  card__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card__group: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Badge
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  badge__pending: {
    backgroundColor: "#FEF9C3",
  },
  badge__completed: {
    backgroundColor: "#DCFCE7",
  },
  badge__text: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
  },
  badge__text_pending: {
    color: "#854D0E",
  },
  badge__text_completed: {
    color: "#166534",
  },

  // Equipos
  card__teams: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  team: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
  },
  teamName: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.text,
    textAlign: "center",
  },
  score: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.primary,
    paddingHorizontal: spacing.sm,
  },

  // Fecha
  date: {
    fontSize: typography.xs,
    color: colors.textMuted,
    fontFamily: typography.regular,
    textAlign: "center",
  },

  // Acciones
  card__actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
  },
  actionBtn__danger: {
    borderColor: colors.error,
  },
  actionBtn__text: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
  actionBtn__text_danger: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.error,
  },

  // Modal
  modal__overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: Platform.OS === "ios" ? spacing.xxl : spacing.lg,
    gap: spacing.md,
  },
  modal__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modal__title: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.text,
  },
  modal__subtitle: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },
  modal__scores: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  modal__scoreField: {
    alignItems: "center",
    gap: spacing.xs,
    flex: 1,
  },
  modal__scoreLabel: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  modal__separator: {
    fontSize: typography.xl,
    fontFamily: typography.bold,
    color: colors.textPlaceholder,
  },
  modal__actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  modal__cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  modal__cancelText: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
  },
  modal__saveBtn: {
    flex: 2,
    backgroundColor: colors.secondary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  modal__saveBtn_danger: {
    backgroundColor: colors.error,
  },
  modal__saveText: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.background,
  },
});