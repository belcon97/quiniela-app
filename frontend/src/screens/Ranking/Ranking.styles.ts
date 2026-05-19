import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  ranking: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  ranking__header: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  ranking__title: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.background,
  },

  // List
  ranking__list: {
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xxl,
  },

  // My position banner
  ranking__myPosition: {
    backgroundColor: colors.neutral100,
    borderRadius: radius.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
    alignItems: "center",
  },
  ranking__myPositionText: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.primary,
  },

  // Empty
  ranking__empty: {
    alignItems: "center",
    paddingTop: spacing.xxl,
    gap: spacing.sm,
  },
  ranking__emptyText: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textPlaceholder,
  },
});
