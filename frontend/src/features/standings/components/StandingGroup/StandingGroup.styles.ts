import { StyleSheet } from 'react-native'
import { font, fontSize, space, radius } from '@/theme'
import type { Theme } from '@/theme'

export function makeStyles(t: Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: t.bgElev,
      borderRadius:    radius.lg,
      borderWidth:     1,
      borderColor:     t.border,
      overflow:        'hidden',
    },

    // Header
    header: {
      flexDirection:     'row',
      alignItems:        'center',
      justifyContent:    'space-between',
      paddingHorizontal: space[4],
      paddingVertical:   space[3],
      borderBottomWidth: 1,
      borderBottomColor: t.border,
    },
    groupName: {
      fontFamily:    font.archiveBlack,
      fontSize:      fontSize.h3,
      color:         t.textPrimary,
      textTransform: 'uppercase',
      letterSpacing: -0.3,
    },
    classify: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           space[1],
    },
    classifyDot: {
      width:        6,
      height:       6,
      borderRadius: 3,
      backgroundColor: t.secondary,
    },
    classifyText: {
      fontFamily: font.notoBold,
      fontSize:   fontSize.micro,
      color:      t.secondary,
      letterSpacing: 0.5,
    },

    // Column headers
    colHeaders: {
      flexDirection:     'row',
      alignItems:        'center',
      paddingHorizontal: space[4],
      paddingVertical:   space[2],
      gap:               space[2],
    },
    colTeam: {
      flex:       1,
      fontFamily: font.notoBold,
      fontSize:   fontSize.micro,
      color:      t.textSecondary,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    colStats: {
      flexDirection: 'row',
      gap:           space[3],
    },
    col: {
      fontFamily:    font.notoBold,
      fontSize:      fontSize.micro,
      color:         t.textSecondary,
      width:         16,
      textAlign:     'center',
      letterSpacing: 0.5,
    },
    col_pts: {
      width: 20,
    },

    // Rows container
    rows: {
      paddingHorizontal: space[4],
    },
  })
}