import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection:   'row',
      backgroundColor: t.bgSunken,
      borderRadius:    radius.full,
      padding:         space[1],
    },
    option: {
      flex:            1,
      paddingVertical: space[2],
      alignItems:      'center',
      justifyContent:  'center',
      borderRadius:    radius.full,
    },
    option_active: {
      backgroundColor: t.bgElev,
    },
    label: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    label_active: {
      color: t.textPrimary,
    },
  })
}