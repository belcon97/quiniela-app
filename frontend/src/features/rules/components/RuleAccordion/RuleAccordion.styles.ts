import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: t.bgElev,
      borderRadius:    radius.lg,
      borderWidth:     1,
      borderColor:     t.border,
      overflow:        'hidden',
    },

    // Header 
    header: {
      flexDirection:     'row',
      alignItems:        'center',
      gap:               space[3],
      padding:           space[4],
    },

    iconWrapper: {
      width:           40,
      height:          40,
      borderRadius:    radius.md,
      backgroundColor: t.bgSunken,
      alignItems:      'center',
      justifyContent:  'center',
    },

    title: {
      flex:          1,
      fontFamily: font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },

    description: {
      fontFamily:        font.notoRegular,
      fontSize:          fontSize.body,
      color:             t.textSecondary,
      lineHeight:        24,
      paddingHorizontal: space[4],
      paddingBottom:     space[4],
    },
  })
}