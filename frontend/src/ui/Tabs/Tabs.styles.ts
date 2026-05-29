import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },

  tabs__bar: {
    flexDirection: "row",
    backgroundColor: colors.neutral100,
    borderRadius: radius.full,
    padding: spacing.xs,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  tabs__tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    alignItems: "center",
  },
  tabs__tab__active: {
    backgroundColor: colors.background,
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tabs__label: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.textMuted,
  },
  tabs__label__active: {
    fontFamily: typography.semiBold,
    color: colors.text,
  },
  tabs__content: {
    flex: 1,
  },
});