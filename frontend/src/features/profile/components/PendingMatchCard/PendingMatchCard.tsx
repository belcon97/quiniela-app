// React Native
import { View, Text, TextInput, Pressable, Platform } from 'react-native'

// Externos
import Feather from '@expo/vector-icons/Feather'

// Hooks
import { useTheme } from '@/theme'
import { useStyles } from '@/shared/hooks/useStyles'

// Components
import { Flag } from '@/shared/ui/Flag/Flag'

// Utils
import { formatMatchDate } from '@/shared/utils/formatDate'

// Styles
import { makeStyles } from './PendingMatchCard.styles'

// Types
import type { Match } from '@/shared/types'

interface PendingMatchCardProps {
  match:             Match
  homeScore:         string
  awayScore:         string
  isWildcard:        boolean
  wildcardUsed:      boolean
  wildcardAvailable: boolean
  group:             string
  onHomeChange:      (value: string) => void
  onAwayChange:      (value: string) => void
  onWildcard:        () => void
  onPenaltyWinner:   (winner: 'home' | 'away') => void
  penaltyWinner:     'home' | 'away' | null
}

export function PendingMatchCard({
  match,
  homeScore,
  awayScore,
  isWildcard,
  wildcardUsed,
  wildcardAvailable,
  group,
  onHomeChange,
  onAwayChange,
  onWildcard,
  onPenaltyWinner,
  penaltyWinner,
}: PendingMatchCardProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  // Penales — solo fase eliminatoria con empate
  const isGroupStage = group.startsWith('Grupo')
  const isTied       = homeScore !== '' && awayScore !== '' && homeScore === awayScore
  const isKnockout   = !isGroupStage && isTied

  return (
    <View style={styles.card}>

      {/* Match */}
      <View style={styles.match}>

        {/* Home */}
        <View style={styles.team}>
          <Flag uri={match.homeFlag} name={match.homeTeam} size="md" />
          <Text style={styles.teamName} numberOfLines={2}>
            {match.homeTeam}
          </Text>
        </View>

        {/* Score inputs */}
        <View style={styles.scoreRow}>
          <TextInput
            style={[styles.input, homeScore !== '' && styles.input_filled]}
            value={homeScore}
            onChangeText={v => onHomeChange(v.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            maxLength={2}
            placeholder="0"
            placeholderTextColor={theme.textDisabled}
            textAlign="center"
            {...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {})}
          />
          <Text style={styles.separator}>:</Text>
          <TextInput
            style={[styles.input, awayScore !== '' && styles.input_filled]}
            value={awayScore}
            onChangeText={v => onAwayChange(v.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            maxLength={2}
            placeholder="0"
            placeholderTextColor={theme.textDisabled}
            textAlign="center"
            {...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {})}
          />
        </View>

        {/* Away */}
        <View style={styles.team}>
          <Flag uri={match.awayFlag} name={match.awayTeam} size="md" />
          <Text style={styles.teamName} numberOfLines={2}>
            {match.awayTeam}
          </Text>
        </View>

      </View>

      {/* Meta */}
      <View style={styles.meta}>
        <Feather name="calendar" size={12} color={theme.textSecondary} />
        <Text style={styles.metaText}>{formatMatchDate(match.date)}</Text>
      </View>

      {/* Wildcard */}
      {wildcardAvailable || isWildcard ? (
        <Pressable
          style={[
            styles.wildcardBtn,
            isWildcard && styles.wildcardBtn_active,
            wildcardUsed && !isWildcard && styles.wildcardBtn_disabled,
          ]}
          onPress={onWildcard}
          disabled={wildcardUsed && !isWildcard}
        >
          <Text style={[
            styles.wildcardText,
            isWildcard && styles.wildcardText_active,
          ]}>
            ×2 COMODÍN
          </Text>
        </Pressable>
      ) : null}

      {/* Penales — solo eliminatoria con empate */}
      {isKnockout && (
        <View style={styles.penalty}>
          <Text style={styles.penaltyLabel}>¿Quién gana en penales?</Text>
          <View style={styles.penaltyBtns}>
            <Pressable
              style={[styles.penaltyBtn, penaltyWinner === 'home' && styles.penaltyBtn_active]}
              onPress={() => onPenaltyWinner('home')}
            >
              <Text style={[styles.penaltyBtnText, penaltyWinner === 'home' && styles.penaltyBtnText_active]}>
                {match.homeTeam}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.penaltyBtn, penaltyWinner === 'away' && styles.penaltyBtn_active]}
              onPress={() => onPenaltyWinner('away')}
            >
              <Text style={[styles.penaltyBtnText, penaltyWinner === 'away' && styles.penaltyBtnText_active]}>
                {match.awayTeam}
              </Text>
            </Pressable>
          </View>
        </View>
      )}

    </View>
  )
}