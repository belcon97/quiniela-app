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
      padding:         space[4],
      gap:             space[4],
    },

    // Match row
    match: {
      flexDirection:  'row',
      alignItems:     'center',
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

    // Score inputs
    scoreRow: {
      flexDirection:     'row',
      alignItems:        'center',
      gap:               space[2],
      paddingHorizontal: space[2],
    },
    input: {
      width:           44,
      height:          44,
      borderRadius:    radius.md,
      borderWidth:     1,
      borderColor:     t.border,
      backgroundColor: t.bg,
      fontFamily:      font.archiveBlack,
      fontSize:        fontSize.h3,
      color:           t.textPrimary,
      textAlign:       'center',
    },
    input_filled: {
      borderColor:     t.primary,
      backgroundColor: t.primarySoft,
    },
    separator: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.h2,
      color:      t.textSecondary,
    },

    // Meta
    meta: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[2],
    },
    metaText: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },

    // Wildcard
    wildcardBtn: {
      flexDirection:     'row',
      alignItems:        'center',
      justifyContent:    'center',
      gap:               space[2],
      paddingVertical:   space[2],
      paddingHorizontal: space[4],
      borderRadius:      radius.full,
      borderWidth:       1,
      borderColor:       t.border,
      alignSelf:         'center',
    },
    wildcardBtn_active: {
      backgroundColor: t.primary,
      borderColor:     t.primary,
    },
    wildcardBtn_disabled: {
      opacity: 0.4,
    },
    wildcardText: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },
    wildcardText_active: {
      color: '#FFFFFF',
    },

    // Penales
    penalty: {
      gap: space[3],
    },
    penaltyLabel: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
      textAlign:  'center',
    },
    penaltyBtns: {
      flexDirection: 'row',
      gap:           space[3],
    },
    penaltyBtn: {
      flex:              1,
      paddingVertical:   space[2],
      paddingHorizontal: space[3],
      borderRadius:      radius.full,
      borderWidth:       1,
      borderColor:       t.border,
      alignItems:        'center',
    },
    penaltyBtn_active: {
      backgroundColor: t.primary,
      borderColor:     t.primary,
    },
    penaltyBtnText: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.caption,
      color:         t.textSecondary,
      textTransform: 'uppercase',
    },
    penaltyBtnText_active: {
      color: '#FFFFFF',
    },
  })
}