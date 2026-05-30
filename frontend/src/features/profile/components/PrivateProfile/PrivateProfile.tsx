import { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
// Styles
import { styles } from "./PrivateProfile.styles";
// Components
import { RulesOnboarding } from "../RulesOnboarding/RulesOnboarding";
import { FavoriteTeamPicker } from "../FavoriteTeamPicker/FavoriteTeamPicker";
import { ProfileView } from "../ProfileView/ProfileView";
import { ProfileBadges } from "../ProfileBadges/ProfileBadges";
import { MatchPredictionList } from "../MatchPredictionList/MatchPredictionList";
import { TopScorerPrediction } from "../TopScorerPrediction/TopScorerPrediction";
// Hooks
import { usePrivateProfile } from "../../hooks/usePrivateProfile";
// Store
import { useAuthStore } from "@/store/authStore";
// Services
import { profileService } from "../../services/profileService";

export function PrivateProfile() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const { privateData, loading, refetch } = usePrivateProfile();

  const [showRules, setShowRules] = useState(false);
  const [showFavoriteTeam, setShowFavoriteTeam] = useState(false);

  // Verificamos hasReadRules y favoriteTeam cuando cargan los datos
  useEffect(() => {
    if (!privateData) return;

    if (!privateData.hasReadRules) {
      setShowRules(true);
    } else if (!privateData.favoriteTeam) {
      setShowFavoriteTeam(true);
    }
  }, [privateData]);

  const handleFinishRules = async () => {
    setShowRules(false);
    if (token) {
      await profileService.markRulesAsRead(token);
    }
    // Si no tiene equipo favorito mostramos el picker
    if (!privateData?.favoriteTeam) {
      setShowFavoriteTeam(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.privateProfile__loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user || !privateData) return null;

  const wildcardAvailable = privateData.wildcardAvailable;
  const topScorerName =
    privateData?.topScorerPrediction?.topScorer?.name ?? null;

  return (
    <>
      <ScrollView style={styles.privateProfile}>
        {/* Datos del perfil — header, stats y tabs de predicciones */}
        <ProfileView
          position={privateData.position}
          totalPoints={privateData.totalPoints}
          predictionsHistory={privateData.predictionsHistory}
          predictionsPending={privateData.predictionsPending}
          username={user.username}
          name={user.name}
          favoriteTeam={privateData.favoriteTeam}
        />

        {/* Badges — comodín y goleador */}
        <ProfileBadges
          wildcardAvailable={wildcardAvailable}
          topScorerName={topScorerName}
          isOwner={true}
        />

        {/* Partidos sin predecir */}
        <MatchPredictionList
          matches={privateData.matchesWithoutPredictions}
          onSaved={refetch}
          wildcardAvailable={wildcardAvailable}
        />

        {/* Predicción de goleador */}
        {!topScorerName && <TopScorerPrediction />}
      </ScrollView>

      {/* Onboarding de reglas — aparece si hasReadRules === false */}
      <RulesOnboarding visible={showRules} onFinish={handleFinishRules} />

      {/* Picker de equipo favorito */}
      <FavoriteTeamPicker
        visible={showFavoriteTeam}
        onClose={() => setShowFavoriteTeam(false)}
        onSaved={refetch}
      />
    </>
  );
}
