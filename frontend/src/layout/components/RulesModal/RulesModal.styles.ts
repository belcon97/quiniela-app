import { StyleSheet } from "react-native";
import { colors, typography, spacing, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Bloque
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  // Elementos
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.text,
  },
  rule: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  rule__text: {
    flex: 1,
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral200,
  },

  // Bloque badge
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minWidth: 56,
    alignItems: "center",
  },
  badge__text: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
  },

  // Bloque fullRulesBtn
  fullRulesBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  fullRulesBtn__text: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
});