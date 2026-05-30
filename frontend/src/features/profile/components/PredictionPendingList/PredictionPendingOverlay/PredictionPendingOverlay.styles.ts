import { StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 200,
  },
  blur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
    maxWidth: 300,
  },
  title: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.text,
    textAlign: "center",
  },
  description: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xs,
  },
  button__text: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.background,
  },
});