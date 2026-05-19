import { StyleSheet, Platform } from "react-native";
import { colors, spacing, radius, typography } from "@/styles/theme";

export const styles = StyleSheet.create({
  // Screen
  adminMatches: {
    flex: 1,
    backgroundColor: colors.background,
  },
  adminMatches__content: {
    flex: 1,
  },

  // Header
  adminMatches__header: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "ios" ? 56 : 40,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  adminMatches__title: {
    color: colors.background,
    fontSize: typography.lg,
    fontFamily: typography.headline,
  },
  adminMatches__subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: typography.xs,
    fontFamily: typography.regular,
    marginTop: 2,
  },

  // Tabs
  adminMatches__tabs: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
  },
  adminMatches__tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  adminMatches__tab_active: {
    borderBottomColor: colors.secondary,
  },
  adminMatches__tabText: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: "rgba(255,255,255,0.5)",
  },
  adminMatches__tabText_active: {
    color: colors.background,
    fontFamily: typography.semiBold,
  },

  // Content
  adminMatches__scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },

  // Section
  adminMatches__section: {
    marginBottom: spacing.md,
  },
  adminMatches__sectionTitle: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },

  // Field
  adminMatches__field: {
    marginBottom: spacing.sm,
  },
  adminMatches__label: {
    fontSize: typography.sm,
    fontFamily: typography.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  adminMatches__input: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.text,
    borderWidth: 1,
    borderColor: "transparent",
  },
  adminMatches__input_error: {
    borderColor: colors.error,
  },
  adminMatches__errorText: {
    fontSize: typography.xs,
    color: colors.error,
    fontFamily: typography.regular,
    marginTop: spacing.xs,
  },

  // Banners
  adminMatches__successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#DCFCE7",
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  adminMatches__successBanner_text: {
    color: colors.secondary,
    fontSize: typography.sm,
    fontFamily: typography.medium,
    flex: 1,
  },

  // Card
  adminMatches__card: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral200,
  },
  adminMatches__card_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  adminMatches__card_group: {
    fontSize: typography.xs,
    fontFamily: typography.bold,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  adminMatches__badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  adminMatches__badge_pending: {
    backgroundColor: "#FEF9C3",
  },
  adminMatches__badge_completed: {
    backgroundColor: "#DCFCE7",
  },
  adminMatches__badgeText: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
  },
  adminMatches__badgeText_pending: {
    color: "#854D0E",
  },
  adminMatches__badgeText_completed: {
    color: "#166534",
  },
  adminMatches__card_teams: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  adminMatches__team: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  adminMatches__flag: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  adminMatches__flagPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.neutral200,
  },
  adminMatches__teamName: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.text,
    textAlign: "center",
  },
  adminMatches__score: {
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  adminMatches__scoreText: {
    fontSize: typography.lg,
    fontFamily: typography.bold,
    color: colors.primary,
  },
  adminMatches__vs: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.textPlaceholder,
  },
  adminMatches__card_footer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  adminMatches__meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  adminMatches__metaText: {
    fontSize: typography.xs,
    color: colors.textPlaceholder,
    fontFamily: typography.regular,
  },
  adminMatches__updateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
  },
  adminMatches__updateBtn_completed: {
    borderColor: colors.neutral200,
  },
  adminMatches__updateBtn_text: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
  adminMatches__updateBtn_text_completed: {
    color: colors.textMuted,
  },

  // Empty
  adminMatches__empty: {
    alignItems: "center",
    paddingTop: spacing.xxl,
    gap: spacing.sm,
  },
  adminMatches__emptyText: {
    fontSize: typography.sm,
    color: colors.textPlaceholder,
    fontFamily: typography.regular,
  },

  // Modal
  adminMatches__modal_overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  adminMatches__modal: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: Platform.OS === "ios" ? spacing.xxl : spacing.lg,
  },
  adminMatches__modal_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  adminMatches__modal_title: {
    fontSize: typography.md,
    fontFamily: typography.bold,
    color: colors.text,
  },
  adminMatches__modal_subtitle: {
    fontSize: typography.sm,
    fontFamily: typography.regular,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  adminMatches__modal_scores: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  adminMatches__modal_scoreField: {
    alignItems: "center",
    gap: spacing.sm,
  },
  adminMatches__modal_scoreLabel: {
    fontSize: typography.xs,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  adminMatches__modal_scoreInput: {
    width: 72,
    height: 72,
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    textAlign: "center",
    fontSize: typography.xl,
    fontFamily: typography.bold,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.neutral200,
  },
  adminMatches__modal_separator: {
    fontSize: typography.xl,
    fontFamily: typography.bold,
    color: colors.textPlaceholder,
    marginTop: spacing.lg,
  },
  adminMatches__modal_error: {
    fontSize: typography.sm,
    color: colors.error,
    fontFamily: typography.regular,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  adminMatches__modal_actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  adminMatches__modal_cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  adminMatches__modal_cancelText: {
    fontSize: typography.sm,
    fontFamily: typography.semiBold,
    color: colors.textMuted,
  },
  adminMatches__modal_saveBtn: {
    flex: 2,
    backgroundColor: colors.secondary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xs,
  },
  adminMatches__modal_saveText: {
    fontSize: typography.sm,
    fontFamily: typography.bold,
    color: colors.background,
  },
});
