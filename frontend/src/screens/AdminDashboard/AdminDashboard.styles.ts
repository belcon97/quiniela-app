import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

const TEXT_ON_IMAGE = "#FFFFFF";
const TEXT_ON_IMAGE_MUTED = "rgba(255, 255, 255, 0.7)";
const PRIMARY_DARK = "rgba(0, 31, 91, 0.85)";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: t.bg,
    },

    // Header
    header: {
      height: 140,
    },
    headerWeb: {
      backgroundColor: PRIMARY_DARK,
    },
    headerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 31, 91, 0.6)",
    },
    headerRow: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingHorizontal: space[5],
      paddingBottom: space[3],
    },
    headerText: {
      gap: space[1],
    },
    headerTitle: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h1,
      color: TEXT_ON_IMAGE,
      textTransform: "uppercase",
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: TEXT_ON_IMAGE_MUTED,
    },

    // Main tabs
    mainTabs: {
      flexDirection: "row",
      backgroundColor: PRIMARY_DARK,
    },
    mainTab: {
      flex: 1,
      paddingVertical: space[3],
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    mainTab_active: {
      borderBottomColor: TEXT_ON_IMAGE,
    },
    mainTabText: {
      fontFamily: font.notoBold,
      fontSize: fontSize.caption,
      color: TEXT_ON_IMAGE_MUTED,
      letterSpacing: 0.5,
    },
    mainTabText_active: {
      color: TEXT_ON_IMAGE,
    },

    // Content
    content: {
      flex: 1,
      overflow: "hidden",
    },
  });
}
