import { StyleSheet } from "react-native";
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

  // Content
  content: {
    flex: 1,
  },
});