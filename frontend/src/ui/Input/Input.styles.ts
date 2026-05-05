import { StyleSheet } from "react-native";
import { colors, typography, spacing, radius } from "@/styles/theme";

export const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: "transparent",
  },
  input_error: {
    borderColor: colors.error,
  },
  input__icon: {
    marginRight: spacing.sm,
  },
  input__field: {
    flex: 1,
    fontFamily: typography.regular,
    fontSize: typography.md,
    color: colors.text,
    paddingVertical: spacing.md,
    outlineStyle: "solid",
    outlineColor: "transparent",
  },
  input__eye: {
    paddingLeft: spacing.sm,
  },
});
