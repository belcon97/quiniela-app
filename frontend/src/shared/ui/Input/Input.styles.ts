import { StyleSheet } from 'react-native'
import { radius, space, fontSize, font } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    wrapper: {
      gap: space[2],
    },

    // Label
    label: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      fontWeight: "700",
      letterSpacing: 1.28,
      textTransform: "uppercase",
      color: t.textSecondary,
    },

    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: t.bgSunken,
      borderWidth: 1.5,
      borderColor: t.border,
      borderRadius: radius.md,
      paddingHorizontal: space[4],
      minHeight: 52,
    },

    inputRowFocused: {
      borderColor: t.primary,
      borderWidth: 1.5,
    },

    inputRowError: {
      borderColor: t.semantic.loss,
    },

    icon: {
      marginRight: space[3],
    },

    input: {
      flex: 1,
      fontFamily: font.notoRegular,
      fontSize: fontSize.body,
      color: t.textPrimary,
      paddingVertical: space[3],
    },

    trail: {
      marginLeft: space[3],
    },

    error: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: t.semantic.loss,
    },
  });
}
