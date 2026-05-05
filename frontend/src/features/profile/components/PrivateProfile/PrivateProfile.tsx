import { ActivityIndicator } from "react-native";

// Components
import { ProfileView } from "../ProfileView/ProfileView";
// Store
import { useAuthStore } from "@/store/authStore";
// Services
import { usePrivateProfile } from "../../hooks/usePrivateProfile";

export function PrivateProfile() {
  const user = useAuthStore((state) => state.user);
  const { privateData, loading } = usePrivateProfile();

  if (loading) return <ActivityIndicator />;
  if (!user || !privateData) return null;
  return (
    <ProfileView
      position={privateData.position}
      totalPoints={privateData.totalPoints}
      predictionsHistory={privateData.predictionsHistory}
      predictionsPending={privateData.predictionsPending}
      matchesWithoutPredictions={privateData.matchesWithoutPredictions}
      username={user.username}
      name={user.name}
      isOwner
    />
  );
}
