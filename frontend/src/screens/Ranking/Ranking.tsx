import { View } from 'react-native'
// Hooks
import { useAuthStore } from '@/store/authStore'
import { useRanking } from '@/features/ranking/hooks/useRanking'
import { useStyles } from '@/shared/hooks/useStyles'
// Components
import { Layout } from '@/layout/Layout'
import { PodiumCard } from '@/features/ranking/components/PodiumCard/PodiumCard'
import { RankingRow } from '@/features/ranking/components/RankingRow/RankingRow'
import { MyPositionBar } from '@/features/ranking/components/MyPositionBar/MyPositionBar'
import { LoadingState } from '@/shared/ui/LoadingState/LoadingState'
import { StateView } from '@/shared/ui/StateView/StateView'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
// Utils
import { getFlagByTeam } from '@/shared/utils/getFlagByTeam'
// Styles
import { makeStyles } from './Ranking.styles'
// Types
import type { Theme } from '@/theme'

export function Ranking() {
  const styles   = useStyles(makeStyles)
  const user     = useAuthStore(state => state.user)
  const { ranking, loading, error } = useRanking()

  const podium  = ranking
    .filter(entry => entry.position <= 3)
    .sort((a, b) => {
      const order: Record<number, number> = { 1: 1, 2: 0, 3: 2 }
      return order[a.position] - order[b.position]
    })

  const rest    = ranking.filter(entry => entry.position > 3)
  const myEntry = ranking.find(entry => entry.username === user?.username)

  return (
    <Layout>

      {/* Loading */}
      {loading && <LoadingState />}

      {/* Error */}
      {!loading && error && (
        <StateView icon="wifi-off" title="ERROR" message={error} />
      )}

      {/* Content */}
      {!loading && !error && (
        <View style={styles.screen}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >

            {/* Podio */}
            {podium.length > 0 && (
              <View style={styles.podium}>
                {podium.map(entry => (
                  <PodiumCard
                    key={entry.id}
                    entry={entry}
                    flagUrl={getFlagByTeam(entry.favoriteTeam)}
                  />
                ))}
              </View>
            )}

            {/* Clasificación */}
            {rest.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>CLASIFICACIÓN · PTS</Text>
                <View style={styles.list}>
                  {rest.map(entry => (
                    <RankingRow
                      key={entry.id}
                      entry={entry}
                      flagUrl={getFlagByTeam(entry.favoriteTeam)}
                    />
                  ))}
                </View>
              </>
            )}

            {ranking.length === 0 && (
              <StateView icon="bar-chart-2" title="SIN RANKING" />
            )}

          </ScrollView>

          {/* Mi posición */}
          {myEntry && (
            <MyPositionBar
              entry={myEntry}
              flagUrl={getFlagByTeam(myEntry.favoriteTeam)}
            />
          )}

        </View>
      )}

    </Layout>
  )
}