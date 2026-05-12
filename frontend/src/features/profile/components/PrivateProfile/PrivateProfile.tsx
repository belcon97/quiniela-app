import { ActivityIndicator, ScrollView } from "react-native";

import { ProfileView } from "../ProfileView/ProfileView";
import { MatchPredictionList } from "../MatchPredictionList/MatchPredictionList";
import { useAuthStore } from "@/store/authStore";
import { usePrivateProfile } from "../../hooks/usePrivateProfile";

export function PrivateProfile() {
  const user = useAuthStore((state) => state.user);
  const { privateData, loading, refetch } = usePrivateProfile();

  if (loading) return <ActivityIndicator />;
  if (!user || !privateData) return null;

  return (
    <ScrollView>
      <ProfileView
        position={privateData.position}
        totalPoints={privateData.totalPoints}
        predictionsHistory={privateData.predictionsHistory}
        predictionsPending={privateData.predictionsPending}
        username={user.username}
        name={user.name}
        isOwner
      />
      <MatchPredictionList
        matches={privateData.matchesWithoutPredictions}
        onSaved={refetch}
      />
    </ScrollView>
  );
}
