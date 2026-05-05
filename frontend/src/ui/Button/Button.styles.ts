import { StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  button__base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  button__primary: {
    backgroundColor: colors.primary,
  },
  button__secondary: {
    backgroundColor: colors.secondary,
  },
  button__outlined: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
});

export const buttonTextStyles = StyleSheet.create({
  button__text_base: {
    fontFamily: typography.semiBold,
    fontSize: typography.md,
  },
  button__text_primary: {
    color: colors.background,
  },
  button__text_secondary: {
    color: colors.background,
  },
  button__text_outlined: {
    color: colors.primary,
  },
});
