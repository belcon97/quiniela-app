import { StyleSheet } from 'react-native'
import { font, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    input: {
      width:             76,
      height:            84,
      backgroundColor:   t.bgSunken,
      borderWidth:       2,
      borderColor:       t.borderStrong,
      borderRadius:      radius.md,
      fontFamily:        font.archiveBlack,
      fontSize:          52,
      color:             t.textPrimary,
      textAlign:         'center',
      textAlignVertical: 'center',
      padding:           0,
    },
    input_filled: {
      borderColor: t.primary,
      color:       t.primary,
    },
  })
}