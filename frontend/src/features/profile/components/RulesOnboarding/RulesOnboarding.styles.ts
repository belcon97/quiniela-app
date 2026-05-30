import { StyleSheet, Dimensions } from "react-native";
import { colors, spacing, typography, radius } from "@/styles/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },

  // Indicadores de progreso
  indicators: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  indicator: {
    flex: 1,
    height: 3,
    backgroundColor: colors.neutral200,
    borderRadius: radius.full,
  },
  indicator__active: {
    backgroundColor: colors.secondary,
  },
  indicator__done: {
    backgroundColor: colors.secondary,
    opacity: 0.4,
  },

  // Step label
  step: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.secondary,
    letterSpacing: 1,
  },

  // Badge
  badgeContainer: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    backgroundColor: colors.neutral100,
    borderRadius: radius.lg,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  badge__text: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    textAlign: "center",
  },

  // Contenido
  title: {
    fontSize: typography.xl,
    fontFamily: typography.headline,
    color: colors.text,
  },
  description: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    lineHeight: 22,
  },

  // Botón
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  button__text: {
    fontSize: typography.md,
    fontFamily: typography.semiBold,
    color: colors.background,
  },buttons: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  button__flex: {
    flex: 1,
  },
  button__back: {
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  button__backText: {
    fontSize: typography.md,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
  },
});