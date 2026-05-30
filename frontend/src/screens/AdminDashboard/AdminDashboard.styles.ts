import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },

  // Header
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  header__title: {
    color: colors.background,
    fontSize: typography.lg,
    fontFamily: typography.headline,
  },
  header__subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: typography.xs,
    fontFamily: typography.regular,
    marginTop: 2,
  },
  header__logout: {
    padding: spacing.xs,
  },

  // Tabs principales
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tab__active: {
    borderBottomColor: colors.secondary,
  },
  tab__label: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: "rgba(255,255,255,0.5)",
  },
  tab__label_active: {
    color: colors.background,
    fontFamily: typography.semiBold,
  },

  // Contenido
  content: {
    flex: 1,
  },
});