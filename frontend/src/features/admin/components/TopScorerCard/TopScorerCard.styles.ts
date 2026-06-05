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
      padding:         space[4],
      gap:             space[4],
    },

    top: {
      flexDirection:  'row',
      alignItems:     'center',
      gap:            space[3],
    },
    info: {
      flex: 1,
      gap:  2,
    },
    name: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textPrimary,
      textTransform: 'uppercase',
    },
    team: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },
    goals: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.bodyLg,
      color:      t.textPrimary,
    },
    goalsLabel: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },
    goalsSection: {
      alignItems: 'flex-end',
      gap:        2,
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