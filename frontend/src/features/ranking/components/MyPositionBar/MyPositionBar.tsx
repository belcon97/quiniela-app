import { View, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { Flag } from '@/shared/ui/Flag/Flag'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
// Types
import type { RankingEntry } from '@/shared/types'
// Styles
import { makeStyles } from './MyPositionBar.styles'

interface MyPositionBarProps {
  entry:     RankingEntry
  flagUrl:   string
  movement?: number
}

export function MyPositionBar({ entry, flagUrl, movement }: MyPositionBarProps) {
  const styles = useStyles(makeStyles)

  const movementLabel = () => {
    if (!movement) return null
    const puestos = Math.abs(movement) === 1 ? 'puesto' : 'puestos'
    if (movement > 0) return `Subiste ${movement} ${puestos} esta jornada`
    if (movement < 0) return `Bajaste ${Math.abs(movement)} ${puestos} esta jornada`
    return null
  }

  const label = movementLabel()

  return (
    <View style={styles.container}>

      {/* position */}
      <Text style={styles.position}>{entry.position}</Text>

      {/* Flag o Avatar */}
      {flagUrl
        ? <Flag uri={flagUrl} name={entry.name} size="sm" />
        : <Avatar name={entry.name} size="sm" />
      }

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>TÚ · {entry.name}</Text>
        {label && movement && (
          <View style={styles.movement}>
            <Feather
              name={movement > 0 ? 'arrow-up' : 'arrow-down'}
              size={12}
              color="rgba(255, 255, 255, 0.7)"
            />
            <Text style={styles.movementText}>{label}</Text>
          </View>
        )}
      </View>

      {/* points */}
      <View style={styles.pointsSection}>
        <Text style={styles.points}>{entry.totalPoints}</Text>
        <Text style={styles.pointsLabel}>PTS</Text>
      </View>

    </View>
  )
}