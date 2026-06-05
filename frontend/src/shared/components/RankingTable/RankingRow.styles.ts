import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection:     'row',
      alignItems:        'center',
      paddingVertical:   space[3],
      paddingHorizontal: space[4],
      gap:               space[3],
      borderBottomWidth: 1,
      borderBottomColor: t.borderFaint,
    },
    row_me: {
      backgroundColor: t.primarySoft,
      borderLeftWidth: 3,
      borderLeftColor: t.primary,
    },

    // Position
    pos: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.body,
      color:      t.textSecondary,
      width:      24,
      textAlign:  'center',
    },
    pos_me: {
      color: t.primary,
    },

    // Info
    info: {
      flex: 1,
      gap:  space[1],
    },
    nameRow: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[2],
    },
    name: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textPrimary,
      textTransform: 'uppercase',
    },
    name_me: {
      color: t.primary,
    },
    username: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },

    // Badge me
    badge_me: {
      backgroundColor: t.primary,
      borderRadius:    radius.full,
      paddingVertical:   2,
      paddingHorizontal: space[2],
    },
    text_me: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         t.primaryContrast,
      letterSpacing: 1,
    },

    // Mov
    move: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.micro,
    },
    move_up:   { color: t.semantic.win },
    move_down: { color: t.semantic.loss },

    // Points
    pts: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.bodyLg,
      color:      t.textPrimary,
      minWidth:   40,
      textAlign:  'right',
    },
    pts_me: {
      color: t.primary,
    },
  })
}