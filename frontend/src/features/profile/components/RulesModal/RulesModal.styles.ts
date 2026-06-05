import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    overlay: {
      flex:            1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent:  'flex-end',
    },
    modal: {
      backgroundColor:      t.bgElev,
      borderTopLeftRadius:  radius['2xl'],
      borderTopRightRadius: radius['2xl'],
      padding:              space[5],
      gap:                  space[4],
      paddingBottom:        space[8],
    },

    // Progress bar
    progressRow: {
      flexDirection: 'row',
      gap:           space[2],
    },
    progressSegment: {
      flex:            1,
      height:          3,
      borderRadius:    radius.full,
      backgroundColor: t.border,
    },
    progressSegment_active: {
      backgroundColor: t.secondary,
    },

    // Step label
    stepLabel: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         t.secondary,
      letterSpacing: 1.28,
      textTransform: 'uppercase',
    },

    // Visual
    visual: {
      backgroundColor: t.bgSunken,
      borderRadius:    radius.lg,
      alignItems:      'center',
      justifyContent:  'center',
      paddingVertical: space[8],
    },
    badge: {
      width:          80,
      height:         80,
      borderRadius:   radius.full,
      alignItems:     'center',
      justifyContent: 'center',
    },
    badgeText: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.h3,
      textAlign:  'center',
      lineHeight: 20,
    },

    // Content
    title: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.h1,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      letterSpacing: -0.56,
    },
    description: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.body,
      color:      t.textSecondary,
      lineHeight: 24,
    },

    // Footer
    footer: {
      flexDirection: 'row',
      gap:           space[3],
    },
    backBtn: {
      flex:           1,
      height:         48,
      borderRadius:   radius.full,
      borderWidth:    1.5,
      borderColor:    t.border,
      alignItems:     'center',
      justifyContent: 'center',
      flexDirection:  'row',
      gap:            space[2],
    },
    backText: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textSecondary,
      letterSpacing: 0.6,
    },
    nextBtn: {
      flex:            1,
      height:          48,
      borderRadius:    radius.full,
      backgroundColor: t.primary,
      alignItems:      'center',
      justifyContent:  'center',
      flexDirection:   'row',
      gap:             space[2],
    },
    nextText: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.primaryContrast,
      letterSpacing: 0.6,
    },
  })
}