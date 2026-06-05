import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: t.bgElev,
      borderRadius:    radius.lg,
      borderWidth:     1,
      borderColor:     t.border,
      padding:         space[5],
      gap:             space[4],
    },

    // Badge
    badge: {
      alignSelf:         'flex-start',
      paddingVertical:   4,
      paddingHorizontal: space[3],
      borderRadius:      radius.xs,
      backgroundColor:   t.semantic.drawSoft,
    },
    badge_final: {
      backgroundColor: t.bgSunken,
    },
    badgeText: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         t.semantic.draw,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    badgeText_final: {
      color: t.textSecondary,
    },

    // Match
    match: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'space-between',
    },
    team: {
      alignItems: 'center',
      gap:        space[2],
      flex:       1,
    },
    teamName: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      textAlign:     'center',
    },
    vs: {
      fontFamily:        font.archiveBlack,
      fontSize:          fontSize.h2,
      color:             t.textDisabled,
      paddingHorizontal: space[3],
    },

    // Date
    date: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
      textAlign:  'center',
    },

    // Actions
    actions: {
      flexDirection: 'row',
      gap:           space[3],
    },
    actionBtn: {
      flex: 1,
    },
  })
}