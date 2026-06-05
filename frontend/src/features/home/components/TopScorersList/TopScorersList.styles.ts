import { StyleSheet } from "react-native";
import { space, radius } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      gap: space[3],
    },
    list: {
      backgroundColor: t.bgElev,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      paddingHorizontal: space[4],
    },
  });
}
