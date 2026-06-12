import { StyleSheet } from "react-native";
import { font, fontSize, space, radius, palette } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[3],
      paddingVertical: space[3],
      paddingHorizontal: space[4],
      borderBottomWidth: 1,
      borderBottomColor: t.borderFaint,
    },
    row_me: {
      backgroundColor: t.primarySoft,
    },

    // Info
    info: {
      flex: 1,
      gap: 2,
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: space[2],
    },
    name: {
      fontFamily: font.archivoBold,
      fontSize: fontSize.bodySm,
      color: t.textPrimary,
    },
    name_me: {
      color: t.primary,
    },
    username: {
      fontFamily: font.notoRegular,
      fontSize: fontSize.caption,
      color: t.textSecondary,
    },

    // Badge me
    badge_me: {
      backgroundColor: t.primary,
      borderRadius: radius.full,
      paddingVertical: 2,
      paddingHorizontal: space[2],
    },
    badge_meText: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: "#FFFFFF",
    },

    // Badge wildcard
    badge_wildcard: {
      backgroundColor: "rgba(123, 47, 181, 0.15)",
      borderRadius: radius.full,
      paddingVertical: 2,
      paddingHorizontal: space[2],
    },
    badge_wildcardText: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: palette.purple,
    },

    // Score
    score: {
      fontFamily: font.archiveBlack,
      fontSize: fontSize.body,
      color: t.textPrimary,
    },
  });
}
