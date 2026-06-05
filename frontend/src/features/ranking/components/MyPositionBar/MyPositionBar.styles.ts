import { StyleSheet } from 'react-native'
import { font, fontSize, space } from '@/theme'
import type { Theme } from '@/theme'

const TEXT_ON_PRIMARY       = '#FFFFFF'
const TEXT_ON_PRIMARY_MUTED = 'rgba(255, 255, 255, 0.7)'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems:    'center',
      backgroundColor: t.primary,
      padding:       space[4],
      gap:           space[3],
    },

    // position
    position: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.h2,
      color:      TEXT_ON_PRIMARY,
      minWidth:   32,
      textAlign:  'center',
    },

    // Info
    info: {
      flex: 1,
      gap:  2,
    },
    name: {
      fontFamily:    font.archivoBold,
      fontSize:      fontSize.bodySm,
      color:         TEXT_ON_PRIMARY,
      textTransform: 'uppercase',
    },
    movement: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[1],
    },
    movementText: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      TEXT_ON_PRIMARY_MUTED,
    },

    // points
    pointsSection: {
      alignItems: 'flex-end',
      gap:        2,
    },
    points: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.h2,
      color:      TEXT_ON_PRIMARY,
    },
    pointsLabel: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         TEXT_ON_PRIMARY_MUTED,
      letterSpacing: 1,
    },
  })
}