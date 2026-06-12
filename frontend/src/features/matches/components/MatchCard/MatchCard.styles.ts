import { StyleSheet } from "react-native";
import { font, fontSize, space, radius, palette } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: t.bgElev,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      overflow: "hidden",
      marginBottom: space[3],
    },
    card_wildcard: {
      borderLeftWidth: 4,
      borderLeftColor: palette.purple,
      borderTopWidth: 4,
      borderTopColor: palette.purple,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: space[4],
      gap: space[3],
    },

    // Status
    status: {
      width: 52,
      alignItems: "flex-start",
    },
    statusTime: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h3,
      color: t.textPrimary,
    },
    statusUnit: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.micro,
      color: t.textSecondary,
      letterSpacing: 0.5,
    },
    statusFinal: {
      fontFamily: font.notoBold,
      fontSize: fontSize.caption,
      color: t.textSecondary,
    },
    statusFinalTime: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.micro,
      color: t.textSecondary,
    },

    // Teams (apilados)
    teams: {
      flex: 1,
      gap: space[2],
    },
    teamRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[2],
    },
    teamName: {
      flex: 1,
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: t.textPrimary,
    },
    teamScore: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h3,
      color: t.textPrimary,
      minWidth: 20,
      textAlign: "center",
    },

    // Right
    right: {
      alignItems: "flex-end",
      gap: space[2],
    },
    groupBadge: {
      backgroundColor: t.bgOverlay2,
      paddingVertical: 5,
      paddingHorizontal: space[2],
      borderRadius: radius.xs,
    },
    groupBadgeText: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: t.textSecondary,
      letterSpacing: 0.5,
    },
    pickBadge: {
      backgroundColor: t.primarySoft,
      paddingVertical: 5,
      paddingHorizontal: space[2],
      borderRadius: radius.xs,
    },
    pickBadgeText: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: t.primary,
      letterSpacing: 0.5,
    },

    // Comodín
    wildcardRow: {
      paddingHorizontal: space[4],
      paddingBottom: space[2],
    },
    wildcardText: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: palette.purple,
      letterSpacing: 0.5,
    },

    // Expanded
    expanded: {
      borderTopWidth: 1,
      borderTopColor: t.borderFaint,
    },
  });
}
