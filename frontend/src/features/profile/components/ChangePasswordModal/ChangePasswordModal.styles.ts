import { StyleSheet } from "react-native";
import { font, fontSize, space, radius } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center",
      padding: space[5],
    },
    card: {
      backgroundColor: t.bgElev,
      borderRadius: radius.xl,
      padding: space[6],
      width: "100%",
      gap: space[5],
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    title: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h1,
      color: t.textPrimary,
      textTransform: "uppercase",
      letterSpacing: -0.56,
      flex: 1,
    },
    closeBtn: {
      padding: space[1],
    },
    fields: {
      gap: space[4],
    },
    errorText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.bodySm,
      color: t.semantic.loss,
      textAlign: "center",
    },
    successText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.bodySm,
      color: t.semantic.win,
      textAlign: "center",
    },
    footer: {
      flexDirection: "row",
      gap: space[3],
    },
    cancelBtn: {
      flex: 1,
      height: 48,
      borderRadius: radius.full,
      borderWidth: 1.5,
      borderColor: t.border,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelText: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: t.textSecondary,
      letterSpacing: 0.6,
    },
    saveBtn: {
      flex: 1,
      height: 48,
      borderRadius: radius.full,
      backgroundColor: t.primary,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: space[2],
    },
    saveBtn_disabled: {
      opacity: 0.5,
    },
    saveText: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: "#FFFFFF",
      letterSpacing: 0.6,
    },
  });
}
