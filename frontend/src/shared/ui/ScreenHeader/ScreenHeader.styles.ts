import { StyleSheet } from 'react-native'
import { font, fontSize, space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      overflow:     'hidden',
      borderRadius: 16,
    },
    bg: {
      padding: space[6],
      gap:     space[2],
    },
  
    
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 31, 91, 0.55)',
    },
    title: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.displayLg,
      color:         '#FFFFFF',
      letterSpacing: -0.56,
      textTransform: 'uppercase',
      lineHeight:    fontSize.displayLg * 0.94,
    },
    subtitle: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.bodySm,
      color:         t.secondary,
      letterSpacing: 1.28,
      textTransform: 'uppercase',
    },
  })
}