import { StyleSheet } from "react-native";
import { colors, typography, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  avatar: {
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  avatar__small: {
    width: 28,
    height: 28,
  },
  avatar__medium: {
    width: 36,
    height: 36,
  },
  avatar__large: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  // Bandera
  avatar__flag: {
    borderRadius: radius.full,
  },

  // Texto
  avatar__text: {
    fontFamily: typography.bold,
    color: colors.background,
  },
  avatar__text__small: {
    fontSize: typography.xs,
  },
  avatar__text__medium: {
    fontSize: typography.xs,
  },
  avatar__text__large: {
    fontSize: typography.md,
  },
});