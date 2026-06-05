import { StyleSheet } from "react-native";
import { space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(_t: Theme) {
  return StyleSheet.create({
    container: {
      gap: space[3],
    },
  });
}
