// React
import { useState } from 'react'

// React Native
import { View, ScrollView, Text } from 'react-native'

// Externos
import Feather from '@expo/vector-icons/Feather'

// Hooks
import { useStyles } from '@/shared/hooks/useStyles'
import { useTheme } from '@/theme'
import { usePublicProfile } from '@/features/profile/hooks/usePublicProfile'
import { usePredictionStore } from '@/store/predictionStore'

// Components — shared
import { TabSwitch } from '@/shared/ui/TabSwitch/TabSwitch'
import { MatchHistoryCard } from '@/shared/components/MatchHistoryCard/MatchHistoryCard'
import { LoadingState } from '@/shared/ui/LoadingState/LoadingState'
import { StateView } from '@/shared/ui/StateView/StateView'

// Components — profile
import { ProfileHeader } from '@/features/profile/components/ProfileHeader/ProfileHeader'

// Utils
import { getTeamBanner, WORLD_CUP_COUNTRIES } from '@/data/worldCup2026'
import { getBadgeFromPoints } from '@/shared/utils/getBadgeFromPoints'

// Styles
import { makeStyles } from './Profile.styles'

// ─── Props ────────────────────────────────────────────────────────────────────
interface PublicProfileProps {
  username: string
}

// ─── Componente ───────────────────────────────────────────────────────────────
export function PublicProfile({ username }: PublicProfileProps) {
  const theme  = useTheme()
  const styles = useStyles(makeStyles)

  const { publicData, loading, error } = usePublicProfile(username)
  const hasPendingMatches = usePredictionStore(state => state.hasPendingMatches)

  const [activeTab, setActiveTab] = useState(0)

  // ─── Derivados ──────────────────────────────────────────────────────────
  const favoriteTeam = publicData?.favoriteTeam ?? null
  const country      = WORLD_CUP_COUNTRIES.find(
    c => c.label.toLowerCase() === favoriteTeam?.toLowerCase()
  )
  const banner = getTeamBanner(country?.value ?? '')

  // ─── Loading / Error ──────────────────────────────────────────────────────
  if (loading)     return <LoadingState />
  if (error)       return <StateView icon="wifi-off" title="ERROR" message={error} />
  if (!publicData) return null

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <ProfileHeader
          name={publicData.name}
          username={publicData.username}
          role="user"
          favoriteTeam={favoriteTeam}
          flagUrl={country?.icon ?? ''}
          banner={banner}
          wildcardAvailable={!publicData.wildcardUsed}
          totalPoints={publicData.totalPoints}
          position={publicData.position}
          topScorerName={publicData.topScorerPrediction?.topScorer?.name ?? null}
        />

        {/* Tabs */}
        <View style={styles.tabs}>
          <TabSwitch
            options={['HISTORIAL', 'PREDICCIONES']}
            activeIndex={activeTab}
            onChange={setActiveTab}
          />
        </View>

        {/* ── Historial ──────────────────────────────────────────── */}
        {activeTab === 0 && (
          <View style={styles.padded}>
            {publicData.predictionsHistory.length === 0 ? (
              <StateView
                icon="clock"
                title="SIN HISTORIAL"
                message="Todavía no hay partidos finalizados."
              />
            ) : (
              publicData.predictionsHistory.map(prediction => (
                <MatchHistoryCard
                  key={prediction.id}
                  prediction={prediction}
                  badge={getBadgeFromPoints(prediction.points)}
                />
              ))
            )}
          </View>
        )}

        {/* ── Predicciones ───────────────────────────────────────── */}
        {activeTab === 1 && (
          <View style={styles.padded}>

            {/* Overlay — el usuario logueado tiene pendientes */}
            {hasPendingMatches ? (
              <View style={styles.overlay}>
                <Feather name="lock" size={32} color={theme.textSecondary} />
                <Text style={styles.overlayTitle}>PREDICCIONES OCULTAS</Text>
                <Text style={styles.overlayText}>
                  Todavía tenés partidos sin predecir. Las predicciones
                  de otros usuarios se revelan cuando completás las tuyas.
                </Text>
              </View>
            ) : publicData.predictionsPending.length === 0 ? (
              <StateView
                icon="check-circle"
                title="SIN PREDICCIONES"
                message="Este usuario no tiene predicciones pendientes."
              />
            ) : (
              publicData.predictionsPending.map(prediction => (
                <MatchHistoryCard
                  key={prediction.id}
                  prediction={prediction}
                  badge={getBadgeFromPoints(prediction.points)}
                />
              ))
            )}

          </View>
        )}

      </ScrollView>
    </View>
  )
}