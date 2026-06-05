import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    wrapper: {
      gap: space[2],
    },

    // Label
    label: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      fontWeight:    '700',
      letterSpacing: 1.28,
      textTransform: 'uppercase',
      color:         t.textSecondary,
    },


    field: {
      flexDirection:     'row',
      alignItems:        'center',
      backgroundColor:   t.bgSunken,
      borderWidth:       1.5,
      borderColor:       t.border,
      borderRadius:      radius.md,
      paddingHorizontal: space[4],
      minHeight:         52,
      gap:               space[3],
    },
    field_focused: {
      borderColor: t.primary,
    },

    content: {
      flex:          1,
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[3],
    },
    value: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.body,
      color:      t.textPrimary,
      flex:       1,
    },
    placeholder: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.body,
      color:      t.textDisabled,
      flex:       1,
    },

    chevron: {
      marginLeft: space[2],
    },
  })
}