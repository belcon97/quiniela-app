import { View, ScrollView, ActivityIndicator } from "react-native";
// Styles
import { styles } from "./PrivateProfile.styles";
// Components
import { ProfileView } from "../ProfileView/ProfileView";
import { ProfileBadges } from "../ProfileBadges/ProfileBadges";
import { MatchPredictionList } from "../MatchPredictionList/MatchPredictionList";
import { TopScorerPrediction } from "../TopScorerPrediction/TopScorerPrediction";
// Hooks
import { usePrivateProfile } from "../../hooks/usePrivateProfile";
// Store
import { useAuthStore } from "@/store/authStore";

export function PrivateProfile() {
  const user = useAuthStore((state) => state.user);
  const { privateData, topScorerPrediction, loading, refetch } = usePrivateProfile();

  if (loading) {
    return (
      <View style={styles.privateProfile__loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user || !privateData) return null;

  // Comodin disponible si ninguna prediccion pendiente lo usa
  const wildcardAvailable = !privateData.predictionsPending.some(
    (p) => p.isWildcard
  );

  // Nombre del goleador predicho
  const topScorerName =
    topScorerPrediction?.topScorer?.name ??
    topScorerPrediction?.customName ??
    null;

  return (
    <ScrollView style={styles.privateProfile}>
      <ProfileView
        position={privateData.position}
        totalPoints={privateData.totalPoints}
        predictionsHistory={privateData.predictionsHistory}
        predictionsPending={privateData.predictionsPending}
        username={user.username}
        name={user.name}
      />
      <ProfileBadges
        wildcardAvailable={wildcardAvailable}
        topScorerName={topScorerName}
      />
      <MatchPredictionList
        matches={privateData.matchesWithoutPredictions}
        onSaved={refetch}
      />
      <TopScorerPrediction />
    </ScrollView>
  );
}