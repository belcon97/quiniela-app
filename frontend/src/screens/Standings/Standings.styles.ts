import { StyleSheet } from "react-native";
import { space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: t.bg,
    },
    tabs: {
      paddingHorizontal: space[5],
      paddingVertical: space[3],
      borderBottomWidth: 1,
      borderBottomColor: t.border,
    },
    content: {
      padding: space[5],
      gap: space[4],
      paddingBottom: space[10],
    },
  });
}
