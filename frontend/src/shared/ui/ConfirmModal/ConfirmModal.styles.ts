import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    overlay: {
      flex:            1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent:  'center',
      alignItems:      'center',
      padding:         space[5],
    },
    card: {
      backgroundColor: t.bgElev,
      borderRadius:    radius.xl,
      padding:         space[6],
      width:           '100%',
      gap:             space[4],
    },
    header: {
      flexDirection:  'row',
      alignItems:     'flex-start',
      justifyContent: 'space-between',
      gap:            space[3],
    },
    title: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.h1,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      letterSpacing: -0.56,
      flex:          1,
    },
    closeBtn: {
      padding: space[1],
    },
    subtitle: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.body,
      color:      t.textSecondary,
      lineHeight: 24,
    },
    footer: {
      flexDirection: 'row',
      gap:           space[3],
    },
    cancelBtn: {
      flex:           1,
      height:         48,
      borderRadius:   radius.full,
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
    confirmBtn: {
      flex:            1,
      height:          48,
      borderRadius:    radius.full,
      backgroundColor: t.semantic.loss,
      alignItems:      'center',
      justifyContent:  'center',
      flexDirection:   'row',
      gap:             space[2],
    },
    confirmText: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         '#FFFFFF',
      letterSpacing: 0.6,
    },
  })
}