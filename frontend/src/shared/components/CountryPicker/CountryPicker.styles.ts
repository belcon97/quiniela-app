import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    // Search input
    searchWrapper: {
      paddingHorizontal: space[5],
      paddingBottom:     space[3],
    },
    searchRow: {
      flexDirection:   'row',
      alignItems:      'center',
      backgroundColor: t.bgSunken,
      borderRadius:    radius.md,
      borderWidth:     1.5,
      borderColor:     t.border,
      paddingHorizontal: space[3],
      gap:             space[2],
      height:          44,
    },
    searchInput: {
      flex:       1,
      fontFamily: font.notoRegular,
      fontSize:   fontSize.body,
      color:      t.textPrimary,
    },

    // List
    list: {
      paddingHorizontal: space[5],
    },

    // Row
    row: {
      flexDirection:  'row',
      alignItems:     'center',
      paddingVertical: space[4],
      gap:            space[3],
      borderBottomWidth: 1,
      borderBottomColor: t.borderFaint,
    },
    rowName: {
      flex:       1,
      fontFamily: font.notoRegular,
      fontSize:   fontSize.body,
      color:      t.textPrimary,
    },
    rowCode: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
      letterSpacing: 1,
    },
  })
}