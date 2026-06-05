import { StyleSheet } from 'react-native'
import { font, fontSize, space } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    content: {
      paddingHorizontal: space[5],
      paddingBottom:     space[5],
      gap:               space[5],
      alignItems:        'center',
    },

    // Input grande
    input: {
      width:             120,
      height:            120,
      backgroundColor:   t.bgSunken,
      borderWidth:       2,
      borderColor:       t.borderStrong,
      borderRadius:      16,
      fontFamily:        font.archiveBlack,
      fontSize:          72,
      color:             t.textPrimary,
      textAlign:         'center',
      textAlignVertical: 'center',
      padding:           0,
    },
    input_filled: {
      borderColor: t.primary,
      color:       t.primary,
    },

    // Helper text
    helperText: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         t.textSecondary,
      letterSpacing: 1.28,
      textTransform: 'uppercase',
    },

    // Footer
    footer: {
      flexDirection: 'row',
      gap:           space[3],
      width:         '100%',
    },
    cancelBtn: {
      flex:           1,
      height:         48,
      borderRadius:   9999,
      borderWidth:    1.5,
      borderColor:    t.border,
      alignItems:     'center',
      justifyContent: 'center',
    },
    cancelText: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textSecondary,
      letterSpacing: 0.6,
    },
    saveBtn: {
      flex:            1,
      height:          48,
      borderRadius:    9999,
      backgroundColor: t.secondary,
      alignItems:      'center',
      justifyContent:  'center',
      flexDirection:   'row',
      gap:             space[2],
    },
    saveText: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.secondaryContrast,
      letterSpacing: 0.6,
    },
  })
}