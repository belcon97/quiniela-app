// React Native
import { StyleSheet } from 'react-native'

// Internos
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: t.bgElev,
      borderRadius:    radius.lg,
      borderWidth:     1,
      borderColor:     t.border,
      padding:         space[5],
      gap:             space[4],
    },

    // Teams row
    teams: {
      flexDirection:  'row',
      alignItems:     'flex-end',
      justifyContent: 'space-between',
    },
    team: {
      alignItems: 'center',
      gap:        space[2],
      flex:       1,
    },
    teamName: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.caption,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      textAlign:     'center',
    },

    // Input
    input: {
      width:             76,
      height:            84,
      backgroundColor:   t.bgSunken,
      borderWidth:       2,
      borderColor:       t.borderStrong,
      borderRadius:      radius.md,
      fontFamily:        font.archiveBlack,
      fontSize:          52,
      color:             t.textPrimary,
      textAlign:         'center',       
      textAlignVertical: 'center',        
      padding:           0,       
    },
    input_filled: {
      borderColor: t.primary,
      color:       t.primary,
    },

    // Separator
    separator: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.displayMd,
      color:         t.textDisabled,
      paddingBottom: space[5],
      textAlign:     'center',
    },

    // Meta
    meta: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            space[2],
    },
    metaText: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },

    // Comodín
    wildcard: {
      alignSelf:         'center',
      paddingVertical:   space[2],
      paddingHorizontal: space[4],
      borderRadius:      radius.full,
      borderWidth:       1,
      borderColor:       t.border,
    },
    wildcard_active: {
      backgroundColor: t.secondary,
      borderColor:     t.secondary,
    },
    wildcardText: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textSecondary,
      letterSpacing: 0.6,
    },
    wildcardText_active: {
      color: t.secondaryContrast,
    },
  })
}