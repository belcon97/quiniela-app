import { StyleSheet } from 'react-native'
import { font, fontSize, radius, type Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    flag: {
      borderRadius:  radius.full,
      overflow:      'hidden',
      borderWidth:   1.5,
      borderColor:   t.border,
    },
    sm: { width: 26, height: 26 },
    md: { width: 34, height: 34 },
    lg: { width: 52, height: 52 },
    image: {
      width:  '100%',
      height: '100%',
    },
    
    fallback: {
      width:           '100%',
      height:          '100%',
      backgroundColor: t.bgOverlay2,
      alignItems:      'center',
      justifyContent:  'center',
    },
    fallbackText: {
      fontFamily: font.archivoBold,
      fontSize:   fontSize.micro,
      color:      t.textSecondary,
    },
  })
}