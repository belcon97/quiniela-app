import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "./theme";

export const buttonStyles = StyleSheet.create({
  base: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.neutral },
  outlined: { borderWidth: 1, borderColor: colors.primary },

  baseText: {
    fontSize: typography.label,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
  primaryText: { color: colors.white },
  secondaryText: { color: colors.primary },
  outlinedText: { color: colors.primary },
});

export const inputStyles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: {
    fontSize: typography.label,
    fontWeight: "bold",
    marginBottom: spacing.sm,
    color: colors.primary,
    fontFamily: "Inter_500Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  error: {
    fontSize: typography.small,
    color: colors.error,
    fontFamily: "Inter_400Regular",
    marginTop: spacing.xs,
  },
  // variante form
  form: {
    backgroundColor: colors.neutral,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.body,
    color: colors.primary,
    fontFamily: "Inter_400Regular",
  },
  // variante search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
  },
  search: {
    flex: 1,
    padding: spacing.md,
    fontSize: typography.body,
    color: colors.primary,
    fontFamily: "Inter_400Regular",
  },
});
