import { StyleSheet } from "react-native";
import { colors, typography, spacing, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Trigger
  select: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: "transparent",
    paddingVertical: spacing.md,
  },
  select_error: {
    borderColor: colors.error,
  },
  select_open: {
    borderColor: colors.primary,
  },
  select__icon: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    overflow: "hidden",
    marginRight: spacing.sm,
  },
  select__placeholder: {
    flex: 1,
    fontFamily: typography.regular,
    fontSize: typography.md,
    color: colors.textPlaceholder,
  },
  select__value: {
    flex: 1,
    fontFamily: typography.regular,
    fontSize: typography.md,
    color: colors.text,
  },
  select__chevron: {
    marginLeft: spacing.sm,
  },

  // Modal
  select__overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  select__sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    maxHeight: "70%",
    paddingTop: spacing.md,
  },
  select__sheetHeader: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  select__sheetTitle: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  // Search
  select__search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  select__searchInput: {
    flex: 1,
    fontFamily: typography.regular,
    fontSize: typography.sm,
    color: colors.text,
  },

  // Options
  select__option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  select__option_selected: {
    backgroundColor: colors.neutral100,
  },
  select__optionIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  select__optionLabel: {
    flex: 1,
    fontFamily: typography.regular,
    fontSize: typography.md,
    color: colors.text,
  },
  select__optionLabel_selected: {
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
  select__check: {
    marginLeft: "auto",
  },

  // Divider
  select__divider: {
    height: 1,
    backgroundColor: colors.neutral200,
    marginHorizontal: spacing.lg,
  },
});
