import { View, Text } from 'react-native'
// Hooks
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { Flag } from '@/shared/ui/Flag/Flag'
// Types
import type { TeamStanding } from '@/shared/utils/calculateStandings'
// Styles
import { makeStyles } from './StandingRow.styles'

interface StandingRowProps {
  standing:     TeamStanding
  position:     number
  isFavorite?:  boolean
}

export function StandingRow({
  standing,
  position,
  isFavorite = false,
}: StandingRowProps) {
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.row}>

      {/* Posición */}
      <Text style={styles.position}>{position}</Text>

      {/* Flag */}
      <Flag uri={standing.flagUrl} name={standing.teamName} size="sm" />

      {/* Team info */}
      <View style={styles.teamInfo}>
        <Text style={styles.teamName} numberOfLines={1}>
          {standing.teamName}
        </Text>
        {isFavorite && (
          <View style={styles.favBadge}>
            <Text style={styles.favText}>FAV</Text>
          </View>
        )}
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.stat}>{standing.played}</Text>
        <Text style={styles.stat}>{standing.won}</Text>
        <Text style={styles.stat}>{standing.drawn}</Text>
        <Text style={styles.stat}>{standing.lost}</Text>
        <Text style={styles.stat}>{standing.gd > 0 ? `+${standing.gd}` : standing.gd}</Text>
        <Text style={styles.stat_pts}>{standing.points}</Text>
      </View>

    </View>
  )
}