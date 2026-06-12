// React Native
import { StyleSheet } from "react-native";

// Internos
import { space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      gap: space[3],
      paddingTop: space[4],
      borderBottomWidth: 1,
      borderBottomColor: t.border,
      paddingBottom: space[3],
    },
    filters: {
      flexDirection: "row",
      gap: space[2],
      paddingHorizontal: space[4],
    },
    groups: {
      flexDirection: "row",
      gap: space[2],
      paddingHorizontal: space[4],
    },
  });
}
