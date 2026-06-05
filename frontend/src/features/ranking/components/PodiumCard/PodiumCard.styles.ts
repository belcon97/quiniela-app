import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    card: {
      alignItems: 'center',
      gap:        space[2],
      flex:       1,
    },
    card_first: {
      transform: [{ scale: 1.08 }],
    },

    // Medal
    medal: {
      width:          28,
      height:         28,
      borderRadius:   radius.full,
      alignItems:     'center',
      justifyContent: 'center',
      marginBottom:   -space[2],
      zIndex:         1,
    },
    medalText: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.caption,
      color:      '#FFFFFF',
    },

    // Flag wrapper
    flagWrapper: {
      width:          64,
      height:         64,
      borderRadius:   radius.full,
      borderWidth:    3,
      alignItems:     'center',
      justifyContent: 'center',
      overflow:       'hidden',
    },

    // Info
    name: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.caption,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      textAlign:     'center',
    },
    points: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.h2,
      color:      t.textPrimary,
      textAlign:  'center',
    },
    pointsLabel: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         t.textSecondary,
      letterSpacing: 1,
      textAlign:     'center',
    },
  })
}