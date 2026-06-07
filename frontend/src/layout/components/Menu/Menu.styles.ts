import { StyleSheet, Dimensions } from "react-native";
import { font, fontSize, space, radius } from "@/theme";
import type { Theme } from "@/theme";

export const MENU_WIDTH = Dimensions.get("window").width * 0.75;

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 10,
    },
    panel: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: MENU_WIDTH,
      backgroundColor: t.bgElev,
      zIndex: 11,
      paddingHorizontal: space[6],
    },

    // User section
    userSection: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: space[5],
      borderBottomWidth: 1,
      borderBottomColor: t.borderFaint,
      marginBottom: space[5],
    },
    closeButton: {
      marginLeft: "auto",
    },

    // Nav items
    navItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[3],
      paddingVertical: space[4],
      borderRadius: radius.md,
      paddingHorizontal: space[2],
    },
    navItem_active: {
      backgroundColor: t.primarySoft,
    },
    navItem_text: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.body,
      color: t.textPrimary,
    },
    navItem_text_active: {
      fontFamily: font.notoBold,
      color: t.primary,
    },

    // Footer
    footer: {
      marginTop: "auto",
      paddingBottom: space[2],
    },
    logoutItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[3],
      paddingVertical: space[4],
    },
    logoutText: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.body,
      color: t.semantic.loss,
    },
  });
}
