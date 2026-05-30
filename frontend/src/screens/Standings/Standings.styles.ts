import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  header__title: {
    fontSize: typography.xxl,
    fontFamily: typography.headline,
    color: colors.text,
    lineHeight: 38,
  },
  header__subtitle: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.secondary,
    letterSpacing: 1,
    marginTop: spacing.xs,
  },
});