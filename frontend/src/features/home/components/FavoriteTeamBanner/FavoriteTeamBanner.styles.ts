import { StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    gap: spacing.xs,
  },
  banner__header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  banner__label: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.secondary,
    letterSpacing: 1,
  },
  banner__countdown: {
    fontSize: typography.xl,
    fontFamily: typography.headline,
    color: colors.background,
  },
  banner__subtitle: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: "rgba(255,255,255,0.7)",
  },
});