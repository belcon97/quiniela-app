import { StyleSheet } from 'react-native'
import { font, fontSize, space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    list: {
      paddingHorizontal: space[5],
      paddingBottom:     space[8],
    },
    row: {
      flexDirection:     'row',
      alignItems:        'center',
      justifyContent:    'space-between',
      paddingVertical:   space[4],
      borderBottomWidth: 1,
      borderBottomColor: t.borderFaint,
    },
    label: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.body,
      color:      t.textPrimary,
    },
    label_selected: {
      fontFamily: font.notoBold,
      color:      t.primary,
    },
    check: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.body,
      color:      t.primary,
    },
  })
}