import { StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    maxHeight: "80%",
  },

  // Header
  header: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.lg,
    fontFamily: typography.headline,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    lineHeight: 20,
  },

  // Lista
  list: {
    flexGrow: 0,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  option__active: {
    backgroundColor: colors.neutral100,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  flag: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
  },
  option__label: {
    flex: 1,
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.text,
  },
  option__label_active: {
    color: colors.primary,
    fontFamily: typography.semiBold,
  },
  option__code: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
  },

  // Error
  error: {
    fontSize: typography.xs,
    color: colors.error,
    fontFamily: typography.regular,
    marginTop: spacing.xs,
  },

  // Botones
  buttons: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  skipBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  skipBtn__text: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
  },
  saveBtn: {
    flex: 2,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  saveBtn__disabled: {
    opacity: 0.4,
  },
  saveBtn__text: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.background,
  },
});