import { View, Text } from 'react-native'
import { useStyles } from '@/shared/hooks/useStyles'
import { Flag } from '@/shared/ui/Flag/Flag'
import { Badge } from '@/shared/ui/Badge/Badge'
import { makeStyles } from './MatchHistoryCard.styles'
import { formatMatchDate } from '@/shared/utils/formatDate'

// Types
import type { BadgeVariant } from '@/shared/types'
import type { Prediction } from '@/features/profile/types/profile.types'

interface MatchHistoryCardProps {
  prediction: Prediction
  badge:      BadgeVariant
}

export function MatchHistoryCard({ prediction, badge }: MatchHistoryCardProps) {
  const styles = useStyles(makeStyles)
  const { match } = prediction

  const borderStyle =
    badge === 'win'     ? styles.card_win     :
    badge === 'partial' ? styles.card_partial :
    badge === 'soon'    ? styles.card_soon    :
    badge === 'loss'    ? styles.card_loss    :
    null

  const badgeLabel =
    badge === 'win'     ? '+3 PTS' :
    badge === 'partial' ? '+1 PT'  :
    badge === 'loss'    ? '0 PTS'  :
    badge === 'soon'    ? 'PRONTO' :
    'FINAL'

  const predScore  = `${prediction.homeScore}-${prediction.awayScore}`
  const finalScore = match.homeScore !== null && match.awayScore !== null
    ? `${match.homeScore}-${match.awayScore}`
    : null

  return (
    <View style={[styles.card, borderStyle]}>

      {/* Flags */}
      <View style={styles.flags}>
        <View style={styles.flag1}>
          <Flag uri={match.homeFlag} name={match.homeTeam} size="sm" />
        </View>
        <View style={styles.flag2}>
          <Flag uri={match.awayFlag} name={match.awayTeam} size="sm" />
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.teams}>
          {match.homeTeam} VS {match.awayTeam}
        </Text>
        <Text style={styles.meta}>
          Pred: {predScore} · {finalScore ? `Final: ${finalScore}` : 'Pronto'} · {formatMatchDate(match.date)}
        </Text>
      </View>

      {/* Badge */}
      <Badge variant={badge}>{badgeLabel}</Badge>

    </View>
  )
}