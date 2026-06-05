import { View, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { Flag } from '@/shared/ui/Flag/Flag'
import { Button } from '@/shared/ui/Button/Button'
// Types
import type { Match } from '@/shared/types'
// Styles
import { makeStyles } from './MatchResultCard.styles'

interface MatchResultCardProps {
  match:     Match
  date:      string
  onEdit:    () => void
  onDelete:  () => void
}

export function MatchResultCard({
  match,
  date,
  onEdit,
  onDelete,
}: MatchResultCardProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  const isFinal = match.status === 'completed' ||
    (match.homeScore !== null && match.awayScore !== null)

  return (
    <View style={styles.card}>

      {/* Badge */}
      <View style={[styles.badge, isFinal && styles.badge_final]}>
        <Text style={[styles.badgeText, isFinal && styles.badgeText_final]}>
          {isFinal ? `FINAL · ${match.homeScore}-${match.awayScore}` : 'PENDIENTE'}
        </Text>
      </View>

      {/* Match */}
      <View style={styles.match}>

        {/* Home */}
        <View style={styles.team}>
          <Flag uri={match.homeFlag} name={match.homeTeam} size="md" />
          <Text style={styles.teamName}>{match.homeTeam}</Text>
        </View>

        {/* VS */}
        <Text style={styles.vs}>VS</Text>

        {/* Away */}
        <View style={styles.team}>
          <Flag uri={match.awayFlag} name={match.awayTeam} size="md" />
          <Text style={styles.teamName}>{match.awayTeam}</Text>
        </View>

      </View>

      {/* Date */}
      <Text style={styles.date}>{date}</Text>

      {/* Actions */}
      {!isFinal && (
        <View style={styles.actions}>
          <View style={styles.actionBtn}>
            <Button
              variant="outline"
              icon={<Feather name="edit-2" size={16} color={theme.textPrimary} />}
              onPress={onEdit}
            >
              Resultado
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
      )}

    </View>
  )
}