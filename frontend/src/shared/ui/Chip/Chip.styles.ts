import { StyleSheet } from 'react-native'
import { radius, space, fontSize, font } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    chip: {
      flexDirection:     'row',
      alignItems:        'center',
      paddingVertical:   space[2],
      paddingHorizontal: space[4],
      borderRadius:      radius.full,
      borderWidth:       1.5,
      borderColor:       t.border,
      backgroundColor:   t.bgOverlay2,
    },
    chip_active: {
      borderColor:     t.primary,
      backgroundColor: t.primarySoft,
    },
    label: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.bodySm,
      color:      t.textSecondary,
    },
    label_active: {
      color: t.primary,
    },
  })
}