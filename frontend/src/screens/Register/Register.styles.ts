import { StyleSheet } from "react-native";
import { colors, typography, spacing } from "@/styles/theme";

export const styles = StyleSheet.create({
  register__keyboard: {
    flex: 1,
    backgroundColor: colors.background,
  },
  register__scroll: {
    flexGrow: 1,
  },
  register: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    gap: spacing.xl,
  },

  // Header
  register__header: {
    gap: spacing.sm,
  },
  register__title: {
    fontFamily: typography.headline,
    fontSize: typography.xl,
    color: colors.text,
  },
  register__subtitle: {
    fontFamily: typography.subheadline,
    fontSize: typography.md,
    color: colors.textMuted,
  },

  // Form
  register__form: {
    gap: spacing.lg,
  },
  register__field: {
    gap: spacing.sm,
  },
  register__label: {
    fontFamily: typography.medium,
    fontSize: typography.sm,
    color: colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginLeft: spacing.sm,
  },
  register__error: {
    fontFamily: typography.regular,
    fontSize: typography.xs,
    color: colors.error,
    marginLeft: spacing.sm,
  },

  // Footer
  register__footer: {
    alignItems: "center",
    paddingBottom: spacing.xl,
  },
  register__footer_text: {
    fontFamily: typography.regular,
    fontSize: typography.sm,
    color: colors.textMuted,
  },
  register__footer_link: {
    fontFamily: typography.medium,
    fontSize: typography.sm,
    color: colors.secondary,
    textDecorationLine: "underline",
  },
});
