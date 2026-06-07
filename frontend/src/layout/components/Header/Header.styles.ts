import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: space[5],
      paddingBottom: space[3],
      paddingTop: space[2],
      backgroundColor: t.bgElev,
    },
    title: {
      position: "absolute",
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: font.archivoBold,
      fontSize: fontSize.body,
      color: t.textPrimary,
      pointerEvents: "none",
    },
    profileBtn: {
      marginLeft: "auto",
    },
  });
}
