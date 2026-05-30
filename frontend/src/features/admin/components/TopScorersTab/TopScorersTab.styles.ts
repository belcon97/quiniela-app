import { StyleSheet, Platform } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Subtabs
  subtabs: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
    paddingHorizontal: spacing.md,
  },
  subtab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  subtab__active: {
    borderBottomColor: colors.primary,
  },
  subtab__label: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.textMuted,
  },
  subtab__label_active: {
    color: colors.primary,
    fontFamily: typography.semiBold,
  },

  // Scroll
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
  },

  // Sección
  section: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  label: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.text,
  },

  // Empty
  empty: {
    alignItems: "center",
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
  card__info: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
  },
  card__text: {
    flex: 1,
    gap: 2,
  },
  card__name: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.text,
  },
  card__team: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },
  card__right: {
    alignItems: "flex-end",
    gap: spacing.xs,
  },
  card__goals: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.primary,
  },

  // Badge ganador
  badge__winner: {
    backgroundColor: "#FEF9C3",
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badge__winner_text: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: "#854D0E",
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

  // Success banner
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#DCFCE7",
    borderRadius: radius.md,
    padding: spacing.md,
  },
  successBanner__text: {
    color: colors.secondary,
    fontSize: typography.sm,
    fontFamily: typography.medium,
    flex: 1,
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
  modal__saveText: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.background,
  },
});