import { StyleSheet } from "react-native";
import { font, fontSize, space } from "@/theme";
import type { Theme } from "@/theme";

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: t.bg,
    },
    scroll: {
      flex: 1,
    },
    content: {
      gap: space[4],
      paddingBottom: space[10],
    },
    padded: {
      paddingHorizontal: space[5],
      gap: space[4],
    },

    // Section label
    sectionLabel: {
      fontFamily: font.notoBold,
      fontSize: fontSize.micro,
      color: t.textSecondary,
      letterSpacing: 1.28,
      textTransform: "uppercase",
    },

    // Tabs
    tabs: {
      paddingHorizontal: space[5],
    },

    // Change team button
    actionBtn: {
      marginHorizontal: space[5],
    },
    chips: {
      flexDirection: 'row',
      flexWrap:      'wrap',
      gap:           space[2],
    },
    overlay: {
      alignItems:      'center',
      gap:             space[4],
      paddingVertical: space[8],
      paddingHorizontal: space[6],
    },
    overlayTitle: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.h3,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      textAlign:     'center',
    },
    overlayText: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.body,
      color:      t.textSecondary,
      textAlign:  'center',
      lineHeight: 24,
    },
  });
}
