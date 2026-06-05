import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

const IMAGE_OVERLAY       = 'rgba(0, 0, 0, 0.10)'
const TEXT_ON_IMAGE       = '#FFFFFF'
const TEXT_ON_IMAGE_MUTED = 'rgba(255, 255, 255, 0.7)'

export function makeStyles(_t: Theme) {
  return StyleSheet.create({
    card: {
      borderRadius: radius.xl,
      overflow:     'hidden',
      height:       200,
    },
    bg: {
      flex:           1,
      justifyContent: 'flex-end',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: IMAGE_OVERLAY,
    },

    // Badge
    badge: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[1],
      position:      'absolute',
      top:           space[3],
      left:          space[4],
    },
    badgeText: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         TEXT_ON_IMAGE,
      letterSpacing: 1.28,
      textTransform: 'uppercase',
    },

    // Content
    content: {
      padding: space[4],
      gap:     space[2],
      flex:       1,
      justifyContent: 'flex-end',
    },
    teamRow: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[3],
    },
    teamName: {
      flex:          1,  
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.h1,
      color:         TEXT_ON_IMAGE,
      textTransform: 'uppercase',
      letterSpacing: -0.56,
    },
    nextMatch: {
      fontFamily: font.notoRegular,
      fontSize:   fontSize.caption,
      color:      TEXT_ON_IMAGE_MUTED,
    },

    // Countdown
    countdown: {
      flexDirection: 'row',
      gap:           space[3],
      marginTop:     space[1],
    },
    countUnit: {
      alignItems: 'center',
      gap:        2,
    },
    countNumber: {
      fontFamily: font.archiveBlack,
      fontSize:   fontSize.h2,
      color:      TEXT_ON_IMAGE,
      lineHeight: 28,
    },
    countLabel: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         TEXT_ON_IMAGE_MUTED,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  })
}