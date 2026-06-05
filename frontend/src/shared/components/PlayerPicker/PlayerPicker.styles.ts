import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    // Subtitle
    subtitle: {
      fontFamily:        font.notoRegular,
      fontSize:          fontSize.bodySm,
      color:             t.textSecondary,
      paddingHorizontal: space[5],
      paddingBottom:     space[2],
    },

    // List
    list: {
      paddingHorizontal: space[5],
    },

    
    row: {
      flexDirection:     'row',
      alignItems:        'center',
      paddingVertical:   space[3],
      paddingHorizontal: space[3],
      gap:               space[3],
      borderWidth:       1.5,
      borderColor:       'transparent',
      borderRadius:      radius.md,
      marginBottom:      space[1],
    },
    row_selected: {
      borderColor:     t.primary,
      backgroundColor: t.primarySoft,
    },

    // Info
    info: {
      flex: 1,
      gap:  2,
    },
    name: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.body,
      color:      t.textPrimary,
    },
    name_selected: {
      color: t.primary,
    },
    team: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },

    // Footer
    footer: {
      flexDirection:     'row',
      gap:               space[3],
      paddingHorizontal: space[5],
      paddingTop:        space[4],
      paddingBottom:     space[2],
    },
    skipBtn: {
      flex:           1,
      height:         48,
      borderRadius:   radius.full,
      borderWidth:    1.5,
      borderColor:    t.border,
      alignItems:     'center',
      justifyContent: 'center',
    },
    skipText: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.bodySm,
      color:      t.textSecondary,
    },
    confirmBtn: {
      flex:            1,
      height:          48,
      borderRadius:    radius.full,
      backgroundColor: t.primary,
      alignItems:      'center',
      justifyContent:  'center',
    },
    confirmBtn_disabled: {
      backgroundColor: t.borderStrong,
    },
    confirmText: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.primaryContrast,
      letterSpacing: 0.6,
    },
  })
}