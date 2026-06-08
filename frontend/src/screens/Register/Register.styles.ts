import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    keyboard: {
      flex: 1,
      backgroundColor: t.bg,
    },
    scroll: {
      flexGrow: 1,
    },

    // Header
    header: {
      height: 260,
    },
    headerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 31, 91, 0.4)",
    },
    headerContent: {
      flex: 1,
      justifyContent: "flex-end",
      padding: space[6],
      gap: space[2],
    },
    headerTitle: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.displayLg,
      color: "#FFFFFF",
      textTransform: "uppercase",
      letterSpacing: -1,
    },
    headerSubtitle: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.body,
      color: "rgba(255, 255, 255, 0.85)",
      lineHeight: 24,
      marginBottom:24,
    },

    // Form
    form: {
      flex: 1,
      backgroundColor: t.bgElev,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -24,
      padding: space[6],
      gap: space[5],
    },
    fields: {
      gap: space[4],
    },

    // Error
    errorText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.bodySm,
      color: t.semantic.loss,
      textAlign: "center",
    },

    // Footer
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: space[2],
      paddingBottom: space[4],
    },
    footerText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.bodyLg,
      color: t.textSecondary,
    },
    footerLink: {
      fontFamily: font.notoBold,
      fontSize: fontSize.bodyLg,
      color: t.secondary,
    },
  });
}
