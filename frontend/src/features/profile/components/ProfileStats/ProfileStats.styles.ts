import { StyleSheet } from "react-native";
import { colors, spacing } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral100,
  },
});