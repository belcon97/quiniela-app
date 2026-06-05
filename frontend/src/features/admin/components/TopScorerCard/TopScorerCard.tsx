import { View, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { Flag } from '@/shared/ui/Flag/Flag'
import { Button } from '@/shared/ui/Button/Button'
// Types
import type { TopScorer } from '@/shared/types'
// Styles
import { makeStyles } from './TopScorerCard.styles'

interface TopScorerCardProps {
  player:    TopScorer
  onGoals:   () => void
  onDelete:  () => void
}

export function TopScorerCard({
  player,
  onGoals,
  onDelete,
}: TopScorerCardProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.card}>

      {/* Top */}
      <View style={styles.top}>

        {/* Flag */}
        <Flag uri={player.flag} name={player.team} size="md" />

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.team}>{player.team}</Text>
        </View>

        {/* Goles */}
        <View style={styles.goalsSection}>
          <Text style={styles.goals}>{player.goals}</Text>
          <Text style={styles.goalsLabel}>
            {player.goals === 1 ? 'gol' : 'goles'}
          </Text>
        </View>

      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.actionBtn}>
          <Button
            variant="outline"
            icon={<Feather name="edit-2" size={16} color={theme.textPrimary} />}
            onPress={onGoals}
          >
            Goles
          </Button>
        </View>
        <View style={styles.actionBtn}>
          <Button
            variant="danger"
            icon={<Feather name="trash-2" size={16} color="#fff" />}
            onPress={onDelete}
          >
            Eliminar
          </Button>
        </View>
      </View>

    </View>
  )
}