import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  home__banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#DCFCE7",
    borderRadius: radius.md,
    padding: spacing.md,
    margin: spacing.md,
  },
  home__bannerText: {
    color: colors.secondary,
    fontFamily: typography.medium,
    fontSize: typography.sm,
    flex: 1,
  },
});
