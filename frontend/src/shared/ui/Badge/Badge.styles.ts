import { StyleSheet } from 'react-native'
import { radius, space, fontSize, font, palette } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    badge: {
      flexDirection:     'row',
      alignItems:        'center',
      gap:               space[1],
      paddingVertical:   5,
      paddingHorizontal: space[2],
      borderRadius:      radius.xs,
    },
    label: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      fontWeight:    '700',
      letterSpacing: 1,
    },

    // Variants
    live: {
      backgroundColor: palette.red,
    },
    soon: {
      backgroundColor: palette.navy,
    },
    win: {
      backgroundColor: t.semantic.winSoft,
    },
    loss: {
      backgroundColor: t.semantic.lossSoft,
    },
    partial: {
      backgroundColor: 'rgba(255, 194, 14, 0.18)',
    },
    final: {
      backgroundColor: t.bgOverlay2,
    },


    label_live:    { color: '#FFFFFF' },
    label_soon:    { color: '#FFFFFF' },
    label_win:     { color: t.semantic.win },
    label_loss:    { color: t.semantic.loss },
    label_partial: { color: palette.gold },
    label_final:   { color: t.textDisabled },

    pulse: {
      width:         7,
      height:        7,
      borderRadius:  radius.full,
      backgroundColor: '#FFFFFF',
    },
  })
}