import { StyleSheet, Dimensions } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md,
    width: width * 0.65,
    height: 170,
    justifyContent: "space-between",
  },
  stadium: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "right",
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  team: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  flag: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
  },
  teamName: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.background,
    textAlign: "center",
  },
  vs: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: "rgba(255,255,255,0.4)",
    paddingHorizontal: spacing.sm,
  },
  date: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  },
});
