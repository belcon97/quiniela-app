import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection:  'row',
      alignItems:     'center',
      paddingVertical: space[3],
      borderBottomWidth: 1,
      borderBottomColor: t.borderFaint,
      gap:            space[2],
    },

    // Posición
    position: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
      width:      16,
      textAlign:  'center',
    },

    
    teamInfo: {
      flex:          1,
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[2],
    },
    teamName: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.caption,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      flex:          1,
    },

    // Badge FAV
    favBadge: {
      paddingVertical:   2,
      paddingHorizontal: space[2],
      borderRadius:      radius.full,
      backgroundColor:   t.secondary,
    },
    favText: {
      fontFamily:    font.notoBold,
      fontSize:      8,
      color:         t.secondaryContrast,
      letterSpacing: 0.5,
    },

    // Stats
    stats: {
      flexDirection: 'row',
      gap:           space[3],
    },
    stat: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
      width:      16,
      textAlign:  'center',
    },
    stat_pts: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.bodySm,
      color:      t.textPrimary,
      width:      20,
      textAlign:  'center',
    },
  })
}