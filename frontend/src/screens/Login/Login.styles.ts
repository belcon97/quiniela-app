import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/styles/theme";
export const styles = StyleSheet.create({
  login__keyboard: {
    flex: 1,
    backgroundColor: colors.background,
  },
  login__scroll: {
    flexGrow: 1,
  },
  login: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    gap: spacing.xl,
  },
  // Header
  login__header: {
    gap: spacing.sm,
  },
  login__title: {
    fontFamily: typography.headline,
    fontSize: typography.xxl,
    color: colors.text,
  },
  login__subtitle: {
    fontFamily: typography.subheadline,
    fontSize: typography.md,
    color: colors.textMuted,
  },
  // Form
  login__form: {
    gap: spacing.lg,
  },
  login__field: {
    gap: spacing.sm,
  },
  login__label: {
    fontFamily: typography.medium,
    fontSize: typography.sm,
    color: colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginLeft: spacing.sm,
  },
  login__error: {
    fontFamily: typography.regular,
    fontSize: typography.xs,
    color: colors.error,
    marginLeft: spacing.sm,
  },
  // Footer
  login__footer: {
    alignItems: "center",
    paddingBottom: spacing.xl,
  },
  login__footer_text: {
    fontFamily: typography.regular,
    fontSize: typography.sm,
    color: colors.textMuted,
  },
  login__footer_link: {
    fontFamily: typography.medium,
    fontSize: typography.sm,
    color: colors.secondary,
    textDecorationLine: "underline",
  },
});
