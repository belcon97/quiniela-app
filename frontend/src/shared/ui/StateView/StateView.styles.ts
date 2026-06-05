import { StyleSheet } from "react-native";
import { font, fontSize, space, radius } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: space[6],
      gap: space[4],
    },
    iconWrapper: {
      width: 72,
      height: 72,
      borderRadius: radius.full,
      backgroundColor: t.bgElev,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h2,
      color: t.textPrimary,
      textTransform: "uppercase",
      textAlign: "center",
      letterSpacing: -0.56,
    },
    message: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.body,
      color: t.textSecondary,
      textAlign: "center",
      lineHeight: 24,
    },
    retryBtn: {
      height: 48,
      paddingHorizontal: space[6],
      borderRadius: radius.full,
      backgroundColor: t.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    retryText: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: t.primaryContrast,
      letterSpacing: 0.6,
    },
  });
}
