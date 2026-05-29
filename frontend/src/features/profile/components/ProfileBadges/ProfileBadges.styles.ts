import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Bloque
  profileBadges: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },

  // Comodin
  profileBadges__wildcard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 166, 81, 0.1)",
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  profileBadges__wildcardText: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.secondary,
    letterSpacing: 0.8,
  },

  // Goleador
  profileBadges__scorer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  profileBadges__scorerLabel: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  profileBadges__scorerName: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.text,
  },
});