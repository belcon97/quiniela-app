import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection:   'row',
      alignItems:      'center',
      backgroundColor: t.bgElev,
      borderRadius:    radius.lg,
      borderWidth:     1,
      borderColor:     t.border,
      padding:         space[3],
      gap:             space[3],
    },

    // 
    position: {
      fontFamily: font.archivoBold,
      fontSize:   fontSize.bodySm,
      color:      t.textSecondary,
      width:      24,
      textAlign:  'center',
    },

    // Info
    info: {
      flex: 1,
      gap:  2,
    },
    name: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textPrimary,
      textTransform: 'uppercase',
    },
    username: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },

    // 
    movement: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           2,
      width:         40,
    },
    movement_up: {
      color: t.semantic.win,
    },
    movement_down: {
      color: t.semantic.loss,
    },
    movement_none: {
      color: t.textSecondary,
    },
    movementText: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.caption,
    },

    // 
    points: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.bodyLg,
      color:      t.textPrimary,
      minWidth:   40,
      textAlign:  'right',
    },
  })
}