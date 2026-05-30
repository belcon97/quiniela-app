import { StyleSheet, Platform } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
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

  // Success
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

  // Avatar
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar__text: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.background,
  },

  // Info
  card__text: {
    flex: 1,
    gap: 2,
  },
  card__name: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.text,
  },
  card__username: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },

  // Badge rol
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  badge__admin: {
    backgroundColor: "#EFF6FF",
  },
  badge__user: {
    backgroundColor: colors.neutral100,
  },
  badge__text: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
  },
  badge__text_admin: {
    color: colors.primary,
  },
  badge__text_user: {
    color: colors.textMuted,
  },

  // Meta
  card__meta: {
    gap: spacing.xs,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  meta__text: {
    fontSize: typography.xs,
    color: colors.textMuted,
    fontFamily: typography.regular,
  },

  // Delete button
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
  },
  deleteBtn__text: {
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
  modal__title: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.text,
  },
  modal__subtitle: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    lineHeight: 22,
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
  modal__deleteBtn: {
    flex: 2,
    backgroundColor: colors.error,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  modal__deleteText: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.background,
  },
});