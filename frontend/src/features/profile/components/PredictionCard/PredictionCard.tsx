import { View, Text, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { Flag } from '@/shared/ui/Flag/Flag'
import { ScoreInput } from '@/shared/ui/ScoreInput/ScoreInput'
// Styles
import { makeStyles } from './PredictionCard.styles'

interface Team {
  name:    string
  flagUrl: string
}

interface PredictionCardProps {
  home:              Team
  away:              Team
  date:              string
  homeScore:         number
  awayScore:         number
  hasWildcard?:      boolean
  isWildcardActive?: boolean
  onHomeChange:      (value: number) => void
  onAwayChange:      (value: number) => void
  onWildcard?:       () => void
}

export function PredictionCard({
  home,
  away,
  date,
  homeScore,
  awayScore,
  hasWildcard      = false,
  isWildcardActive = false,
  onHomeChange,
  onAwayChange,
  onWildcard,
}: PredictionCardProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  return (
    <View style={styles.card}>

      {/* Teams + inputs */}
      <View style={styles.teams}>

        {/* Home */}
        <View style={styles.team}>
          <Flag uri={home.flagUrl} name={home.name} size="lg" />
          <Text style={styles.teamName}>{home.name}</Text>
          <ScoreInput value={homeScore} onChange={onHomeChange} />
        </View>

        {/* Separator */}
        <Text style={styles.separator}>:</Text>

        {/* Away */}
        <View style={styles.team}>
          <Flag uri={away.flagUrl} name={away.name} size="lg" />
          <Text style={styles.teamName}>{away.name}</Text>
          <ScoreInput value={awayScore} onChange={onAwayChange} />
        </View>

      </View>

      {/* Meta */}
      <View style={styles.meta}>
        <Feather name="calendar" size={12} color={theme.textSecondary} />
        <Text style={styles.metaText}>{date}</Text>
      </View>

      {/* Wildcard */}
      {hasWildcard && (
        <Pressable
          onPress={onWildcard}
          style={[
            styles.wildcard,
            isWildcardActive && styles.wildcard_active,
          ]}
        >
          <Text style={[
            styles.wildcardText,
            isWildcardActive && styles.wildcardText_active,
          ]}>
            ×2 COMODÍN
          </Text>
        </Pressable>
      )}

    </View>
  )
}