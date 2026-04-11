import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "../../styles/theme";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.secondary,
    fontFamily: "Inter_400Regular",
    marginBottom: spacing.xl,
  },
  registerText: {
    marginTop: spacing.md,
    textAlign: "left",
    color: colors.secondary,
    fontFamily: "Inter_400Regular",
  },
  link: {
    color: colors.primary,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
    textDecorationLine: "underline",
  },
  form: {
    marginBottom: spacing.lg,
  },
});
