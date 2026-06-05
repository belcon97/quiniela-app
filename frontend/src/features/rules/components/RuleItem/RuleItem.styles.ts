import { StyleSheet } from 'react-native'
import { font, fontSize, space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap:           space[4],
      alignItems:    'flex-start',
    },

    
    badge: {
      width:          52,
      height:         52,
      borderRadius:   26,
      alignItems:     'center',
      justifyContent: 'center',
      flexShrink:     0,
    },
    badgeText: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.caption,
      textAlign:  'center',
      lineHeight: 14,
    },

    
    content: {
      flex: 1,
      gap:  space[1],
    },
    title: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.h3,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      letterSpacing: -0.3,
    },
    description: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.bodySm,
      color:      t.textSecondary,
      lineHeight: 22,
    },
  })
}