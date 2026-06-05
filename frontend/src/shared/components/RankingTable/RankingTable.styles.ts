import { StyleSheet } from 'react-native'
import { font, fontSize, space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: t.bgElev,
      borderRadius:    16,
      overflow:        'hidden',
      borderWidth:     1,
      borderColor:     t.border,
    },
    header: {
      flexDirection:     'row',
      paddingVertical:   space[3],
      paddingHorizontal: space[4],
      borderBottomWidth: 1,
      borderBottomColor: t.border,
      gap:               space[3],
    },
    col: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      fontWeight:    '700',
      letterSpacing: 1.28,
      color:         t.textSecondary,
      textTransform: 'uppercase',
      textAlign:     'right',
      width:         24,
    },
    col_user: {
      flex:      1,
      textAlign: 'left',
      width:     undefined, 
    },
    col_pts: {
      width:     40,         
      textAlign: 'right',
    },
  })
}