import { StyleSheet, Dimensions } from "react-native";
import { font, fontSize, space, radius } from "@/theme";
import type { Theme } from "@/theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    // Overlay
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },

    // Sheet
    sheet: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: t.bgElev,
      borderTopLeftRadius: radius["2xl"],
      borderTopRightRadius: radius["2xl"],
      maxHeight: SCREEN_HEIGHT * 0.75,
      paddingBottom: space[8],
    },

    // Handle
    handle: {
      width: 42,
      height: 4,
      borderRadius: radius.full,
      backgroundColor: t.borderStrong,
      alignSelf: "center",
      marginTop: space[3],
      marginBottom: space[2],
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: space[5],
      paddingVertical: space[4],
    },
    headerText: {
      flex: 1,
      gap:  space[1],
    },
    subtitle: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.bodySm,
      color:      t.primary,
    },
    title: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h2,
      color: t.textPrimary,
      textTransform: "uppercase",
      letterSpacing: -0.56,
    },
    closeBtn: {
      padding: space[1],
    },
  });
}
