import { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useStyles } from "@/shared/hooks/useStyles";
import { useTheme } from "@/theme";
import { usePublicProfile } from "@/features/profile/hooks/usePublicProfile";
import { usePredictionStore } from "@/store/predictionStore";
import { TabSwitch } from "@/shared/ui/TabSwitch/TabSwitch";
import { MatchHistoryCard } from "@/shared/components/MatchHistoryCard/MatchHistoryCard";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { StateView } from "@/shared/ui/StateView/StateView";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader/ProfileHeader";
import { getTeamBanner, WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";
import { getBadgeFromPoints } from "@/shared/utils/getBadgeFromPoints";
import { makeStyles } from "./Profile.styles";

interface PublicProfileProps {
  username: string;
}

export function PublicProfile({ username }: PublicProfileProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);

  const { publicData, loading, error } = usePublicProfile(username);
  const hasPendingMatches = usePredictionStore(
    (state) => state.hasPendingMatches,
  );
  const myPredictions = usePredictionStore((state) => state.myPredictions);

  const [activeTab, setActiveTab] = useState(0);

  const favoriteTeam =
    publicData?.favoriteTeam === "nobody"
      ? null
      : (publicData?.favoriteTeam ?? null);
  const country = WORLD_CUP_COUNTRIES.find(
    (c) => c.label.toLowerCase() === favoriteTeam?.toLowerCase(),
  );
  const banner = getTeamBanner(country?.value ?? "");

  if (loading) return <LoadingState />;
  if (error) return <StateView icon="wifi-off" title="ERROR" message={error} />;
  if (!publicData) return null;

  // Predicciones compartidas
  const myMatchIds = new Set(myPredictions.map((p) => p.matchId));
  const sharedPredictions = publicData.predictionsPending.filter((p) =>
    myMatchIds.has(p.matchId),
  );

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
          flagUrl={country?.icon ?? ""}
          banner={banner}
          wildcardAvailable={!publicData.wildcardUsed}
          totalPoints={publicData.totalPoints}
          position={publicData.position}
          topScorerName={
            publicData.topScorerPrediction?.topScorer?.name ?? null
          }
        />

        {/* Tabs */}
        <View style={styles.tabs}>
          <TabSwitch
            options={["HISTORIAL", "PREDICCIONES"]}
            activeIndex={activeTab}
            onChange={setActiveTab}
          />
        </View>

        {/* Historial */}
        {activeTab === 0 && (
          <View style={styles.padded}>
            {publicData.predictionsHistory.length === 0 ? (
              <StateView
                icon="clock"
                title="SIN HISTORIAL"
                message="Todavía no hay partidos finalizados."
              />
            ) : (
              publicData.predictionsHistory.map((prediction) => (
                <MatchHistoryCard
                  key={prediction.id}
                  prediction={prediction}
                  badge={getBadgeFromPoints(prediction.points)}
                />
              ))
            )}
          </View>
        )}

        {/* Predicciones */}
        {activeTab === 1 && (
          <View style={styles.padded}>
            {sharedPredictions.length === 0 ? (
              hasPendingMatches ? (
                <View style={styles.overlay}>
                  <Feather name="lock" size={32} color={theme.textSecondary} />
                  <Text style={styles.overlayTitle}>PREDICCIONES OCULTAS</Text>
                  <Text style={styles.overlayText}>
                    Todavía tenés partidos sin predecir. Las predicciones de
                    otros usuarios se revelan cuando completás las tuyas.
                  </Text>
                </View>
              ) : (
                <StateView
                  icon="check-circle"
                  title="SIN PREDICCIONES EN COMÚN"
                  message="No tienen partidos predichos en común todavía."
                />
              )
            ) : (
              sharedPredictions.map((prediction) => (
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
  );
}
