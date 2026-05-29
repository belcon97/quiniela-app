import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "center",
  },

  list: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  empty: {
    fontSize: typography.sm,
    color: colors.neutral900,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
});