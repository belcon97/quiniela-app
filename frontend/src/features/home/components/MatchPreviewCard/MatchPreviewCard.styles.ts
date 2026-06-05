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

    // Match
    match: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'space-between',
      paddingHorizontal: space[4],
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

    // VS
    vs: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.h2,
      color:         t.textDisabled,
      textAlign:     'center',
      paddingHorizontal: space[3],
    },

    // Date
    date: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
      textAlign:  'center',
    },
  })
}