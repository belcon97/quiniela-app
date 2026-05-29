import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Bloque
  ranking: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },

  // Loader
  ranking__loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Header
  ranking__header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  ranking__back: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  ranking__headerText: {
    gap: spacing.xs,
  },
  ranking__title: {
    fontSize: typography.xxl,
    fontFamily: typography.headline,
    color: colors.text,
    lineHeight: 38,
  },
  ranking__subtitle: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },

  // Lista
  ranking__list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },

  // Mi posicion
  ranking__myPosition: {
    backgroundColor: "rgba(0, 166, 81, 0.1)",
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  ranking__myPositionText: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.secondary,
  },

  // Empty
  ranking__empty: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  ranking__emptyText: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.neutral400,
  },
});