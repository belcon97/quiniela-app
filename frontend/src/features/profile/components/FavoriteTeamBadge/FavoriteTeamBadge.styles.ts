import { StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: colors.neutral100,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  flag: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
  },
  team: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.text,
  },
});