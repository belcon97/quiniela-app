import { View, StyleSheet } from "react-native";
// Components
import { ProfileHeader } from "../ProfileHeader/ProfileHeader";
import { ProfileStats } from "../ProfileStats/ProfileStats";
import { FavoriteTeamBadge } from "../FavoriteTeamBadge/FavoriteTeamBadge";
import { Tabs } from "@/ui/Tabs/Tabs";
import { PredictionHistoryList } from "../PredictionHistoryList/PredictionHistoryList";
import { PredictionPendingList } from "../PredictionPendingList/PredictionPendingList";
// Types
import type { Prediction } from "../../types/profile.types";

interface ProfileViewProps {
  position: number | null;
  totalPoints: number;
  predictionsHistory: Prediction[];
  predictionsPending?: Prediction[];
  username: string;
  name: string;
  favoriteTeam?: string | null;
  isPublic?: boolean;
}

export function ProfileView({
  position,
  totalPoints,
  predictionsHistory,
  predictionsPending,
  username,
  name,
  favoriteTeam,
  isPublic = false,
}: ProfileViewProps) {
  const tabs = [
    {
      label: "Historial",
      content: <PredictionHistoryList predictions={predictionsHistory} />,
    },
    {
      label: "Predicciones",
      content: (
        <PredictionPendingList
          predictions={predictionsPending ?? []}
          isPublic={isPublic}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <ProfileHeader name={name} username={username} favoriteTeam={favoriteTeam} />
      {favoriteTeam && <FavoriteTeamBadge team={favoriteTeam} />}
      <ProfileStats totalPoints={totalPoints} position={position} />
      <Tabs tabs={tabs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});