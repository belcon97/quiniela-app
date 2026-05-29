import { StyleSheet, Dimensions } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral100,
    borderRadius: radius.lg,
    padding: spacing.md,
    width: width * 0.85,
    height: 170,
    justifyContent: "space-between",
  },

  card__header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  card__stadium: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card__teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card__team: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  card__flag: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    overflow: "hidden",
    backgroundColor: colors.neutral200,
  },
  card__teamName: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.text,
    textAlign: "center",
  },
  card__vs: {
    fontSize: typography.xl,
    fontFamily: typography.bold,
    color: colors.neutral400,
    paddingHorizontal: spacing.xl,
  },
  card__date: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textMuted,
    textAlign: "center",
  },
});