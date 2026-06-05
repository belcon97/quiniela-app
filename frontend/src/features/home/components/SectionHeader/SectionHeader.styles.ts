import { StyleSheet } from 'react-native'
import { font, fontSize, space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'space-between',
    },
    left: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[2],
    },
    title: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.h2,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      letterSpacing: -0.56,
    },
    viewMore: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.bodySm,
      color:      t.primary,
      letterSpacing: 0.3,
    },
  })
}