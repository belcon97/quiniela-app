import { StyleSheet } from "react-native";
import { radius, space, fontSize, fontWeight, font } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.full,
      borderWidth: 2,
      borderColor: "transparent",
      gap: space[2],
    },

    // Size
    sm: {
      paddingVertical: space[2],
      paddingHorizontal: space[4],
      minHeight: 36,
    },
    md: {
      paddingVertical: 14,
      paddingHorizontal: space[6],
      minHeight: 48,
    },
    lg: {
      paddingVertical: 18,
      paddingHorizontal: space[8],
      minHeight: 56,
    },

    // Variants
    primary: {
      backgroundColor: t.primary,
      borderColor: t.primary,
    },
    secondary: {
      backgroundColor: t.secondary,
      borderColor: t.secondary,
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: t.borderStrong,
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    danger: {
      backgroundColor: t.semantic.loss,
      borderColor: t.semantic.loss,
    },

    // States
    pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
    disabled: { opacity: 0.4 },
    fullWidth: { width: "100%" },

    // Text — variant
    text_primary: { color: t.primaryContrast },
    text_secondary: { color: t.secondaryContrast },
    text_outline: { color: t.textPrimary },
    text_ghost: { color: t.textSecondary },
    text_danger: { color: "#FFFFFF" },

    // Text — size
    text_sm: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.caption,
      fontWeight: fontWeight.bold,
      letterSpacing: 0.6,
    },
    text_md: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      fontWeight: fontWeight.bold,
      letterSpacing: 0.6,
    },
    text_lg: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.body,
      fontWeight: fontWeight.bold,
      letterSpacing: 0.6,
    },
  });
}
