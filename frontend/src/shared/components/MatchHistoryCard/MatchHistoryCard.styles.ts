import { StyleSheet } from "react-native";
import { font, fontSize, space, radius, palette } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: t.bgElev,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: t.border,
      padding: space[4],
      gap: space[3],
    },

    card_win: { borderLeftWidth: 4, borderLeftColor: t.semantic.win },
    card_partial: { borderLeftWidth: 4, borderLeftColor: t.semantic.draw },
    card_loss: { borderLeftWidth: 4, borderLeftColor: t.semantic.loss },
    card_soon: { borderLeftWidth: 4, borderLeftColor: t.primary },
    card_wildcardWin: {
      borderLeftWidth: 4,
      borderLeftColor: palette.purple,
      borderTopWidth: 4,
      borderTopColor: palette.purple,
    },
    card_wildcardPartial: {
      borderLeftWidth: 4,
      borderLeftColor: palette.purple,
      borderTopWidth: 4,
      borderTopColor: palette.purple,
    },

    flags: {
      position: "relative",
      width: 44,
      height: 34,
    },
    flag1: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    flag2: {
      position: "absolute",
      bottom: 0,
      right: 0,
    },

    info: {
      flex: 1,
      gap: space[1],
    },
    teams: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: t.textPrimary,
    },
    meta: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: t.textSecondary,
    },
    wildcardLabel: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: palette.purple,
      letterSpacing: 0.5,
    },
  });
}
