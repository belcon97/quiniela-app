import { StyleSheet } from "react-native";
import { font, fontSize, space, radius } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.bg,
      padding: space[5],
      gap: space[6],
    },

    // Header
    header: {
      gap: space[2],
    },
    title: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.h1,
      color: t.textPrimary,
      textTransform: "uppercase",
    },
    subtitle: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.body,
      color: t.textSecondary,
      lineHeight: 24,
    },

    // Lista
    list: {
      gap: space[3],
    },

    // Card de goleador
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[3],
      padding: space[4],
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      backgroundColor: t.bgElev,
    },
    card_selected: {
      borderColor: t.primary,
      backgroundColor: t.primarySoft,
    },
    cardInfo: {
      flex: 1,
      gap: 2,
    },
    cardName: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: t.textPrimary,
      textTransform: "uppercase",
    },
    cardTeam: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: t.textSecondary,
    },
    checkIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: t.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
