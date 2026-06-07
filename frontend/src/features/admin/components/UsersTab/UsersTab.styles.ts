import { StyleSheet } from 'react-native'
import { font, fontSize, space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection:     'row',
      justifyContent:    'space-between',
      alignItems:        'center',
      paddingHorizontal: space[5],
      paddingVertical:   space[4],
      borderBottomWidth: 1,
      borderBottomColor: t.border,
    },
    headerTitle: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         t.textSecondary,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    headerCount: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      padding:       space[4],
      gap:           space[3],
      paddingBottom: space[10],
    },
  })
}