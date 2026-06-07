import { StyleSheet } from 'react-native'
import { space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    scroll: {
      flex:            1,
      backgroundColor: t.bg,
    },
    content: {
      gap:           space[5],
      padding:       space[5],
      paddingBottom: space[10],
    },
  })
}