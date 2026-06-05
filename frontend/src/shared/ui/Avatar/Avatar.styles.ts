import { StyleSheet } from 'react-native'
import { font, fontSize, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    sm: {
      width:  32,
      height: 32,
    },
    md: {
      width:  44,
      height: 44,
    },
    lg: {
      width:  64,
      height: 64,
    },

    // Base
    container: {
      borderRadius:   radius.full,
      backgroundColor: t.primary,
      alignItems:     'center',
      justifyContent: 'center',
      overflow:       'hidden',
    },

    // Imagen
    image: {
      width:  '100%',
      height: '100%',
    },

    // Initials
    initials_sm: {
      fontFamily: font.archivoBold,
      fontSize:   fontSize.caption,
      color:      '#FFFFFF',
    },
    initials_md: {
      fontFamily: font.archivoBold,
      fontSize:   fontSize.body,
      color:      '#FFFFFF',
    },
    initials_lg: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.h3,
      color:      '#FFFFFF',
    },
  })
}