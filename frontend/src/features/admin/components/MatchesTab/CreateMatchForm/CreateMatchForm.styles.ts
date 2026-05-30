import { StyleSheet } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
  },

  // Secciones
  sectionTitle: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  // Date picker
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: "transparent",
  },
  datePicker__error: {
    borderColor: colors.error,
  },
  dateText: {
    fontSize: typography.md,
    fontFamily: typography.regular,
    color: colors.text,
  },
  datePlaceholder: {
    fontSize: typography.md,
    fontFamily: typography.regular,
    color: colors.textPlaceholder,
  },

  // Error
  errorText: {
    fontSize: typography.xs,
    color: colors.error,
    fontFamily: typography.regular,
    marginTop: spacing.xs,
  },

  // Success
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#DCFCE7",
    borderRadius: radius.md,
    padding: spacing.md,
  },
  successBanner__text: {
    color: colors.secondary,
    fontSize: typography.sm,
    fontFamily: typography.medium,
    flex: 1,
  },
});