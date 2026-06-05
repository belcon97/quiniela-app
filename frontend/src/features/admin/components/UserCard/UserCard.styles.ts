import { StyleSheet } from 'react-native'
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
      gap:             space[3],
    },

    top: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[3],
    },

    info: {
      flex: 1,
      gap:  2,
    },
    name: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         t.textPrimary,
      textTransform: 'uppercase',
    },
    username: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      t.textSecondary,
    },

    badge: {
      paddingVertical:   4,
      paddingHorizontal: space[2],
      borderRadius:      radius.xs,
      borderWidth:       1,
      borderColor:       t.border,
    },
    badgeText: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         t.textSecondary,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    badge_admin: {
      borderColor:     t.primary,
      backgroundColor: t.primarySoft,
    },
    badgeText_admin: {
      color: t.primary,
    },

    meta: {
      gap: space[2],
    },
    metaRow: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[2],
    },
    metaText: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.bodySm,
      color:      t.textSecondary,
    },
    metaText_active: {
      color: t.secondary,
    },
  })
}