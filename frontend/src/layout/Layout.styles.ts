import { StyleSheet } from "react-native";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: t.bg,
    },
    content_web: {
      flex: 1,
    },
    children: {
      flex: 1,
    },
  });
}
