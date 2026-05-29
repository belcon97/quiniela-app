import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Bloque
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral200,
  },

  // Teams
  card__teams: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  card__team: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  card__flag: {
    width: 36,
    height: 36,
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

  // Inputs
  card__inputs: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  card__input: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.neutral100,
    textAlign: "center",
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.text,
  },
  card__input__filled: {
    backgroundColor: colors.primary,
    color: colors.background,
  },
  card__separator: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.neutral400,
  },

  // Meta
  card__meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  card__metaText: {
    fontSize: typography.xs,
    fontFamily: typography.regular,
    color: colors.textPlaceholder,
  },

  // Wildcard
  card__wildcard: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginTop: spacing.xs,
  },
  card__wildcard__active: {
    borderColor: colors.secondary,
    backgroundColor: "rgba(0, 166, 81, 0.08)",
  },
  card__wildcard__disabled: {
    opacity: 0.4,
  },
  card__wildcardText: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
  },
  card__wildcardText__active: {
    color: colors.secondary,
  },

  // Penalty
  card__penalty: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  card__penaltyLabel: {
    fontSize: typography.xs,
    fontFamily: typography.medium,
    color: colors.textMuted,
    textAlign: "center",
  },
  card__penaltyBtns: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  card__penaltyBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.neutral200,
    alignItems: "center",
  },
  card__penaltyBtn__active: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  card__penaltyBtnText: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
  },
  card__penaltyBtnText__active: {
    color: colors.background,
  },
});