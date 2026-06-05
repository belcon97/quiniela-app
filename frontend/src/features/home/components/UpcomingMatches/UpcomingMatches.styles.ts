import { StyleSheet } from 'react-native'
import { space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(_t: Theme) {
  return StyleSheet.create({
    list: {
      gap: space[3],
    },
  })
}