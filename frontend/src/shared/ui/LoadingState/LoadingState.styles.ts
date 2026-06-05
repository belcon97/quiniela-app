import { StyleSheet } from 'react-native'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex:            1,
      alignItems:      'center',
      justifyContent:  'center',
      backgroundColor: t.bg,
    },
  })
}