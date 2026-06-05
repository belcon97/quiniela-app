import { FlatList } from 'react-native'
// Hooks
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { MatchPreviewCard } from '@/features/home/components/MatchPreviewCard/MatchPreviewCard'
// Utils
import { formatMatchDate } from '@/shared/utils/formatDate'
// Types
import type { UpcomingMatch } from '@/shared/types'
// Styles
import { makeStyles } from './UpcomingMatches.styles'

interface UpcomingMatchesProps {
  matches: UpcomingMatch[]
}

export function UpcomingMatches({ matches }: UpcomingMatchesProps) {
  const styles = useStyles(makeStyles)

  return (
    <FlatList
      data={matches}
      keyExtractor={match => match.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item: match }) => (
        <MatchPreviewCard
          home={{ name: match.homeTeam, flagUrl: match.homeFlag }}
          away={{ name: match.awayTeam, flagUrl: match.awayFlag }}
          date={formatMatchDate(match.date)}
        />
      )}
    />
  )
}