import { ScrollView } from "react-native";

// Components
import { ProfileHeader } from "../ProfileHeader/ProfileHeader";
import { ProfileStats } from "../ProfileStats/ProfileStats";
import { Tabs } from "@/ui/Tabs/Tabs";
import { PredictionHistoryList } from "../PredictionHistoryList/PredictionHistoryList";
import { PredictionPendingList } from "../PredictionPendingList/PredictionPendingList";

// Types
import type { Match } from "@/shared/types/shared.types";
import type { Prediction } from "../../types/profile.types";

interface ProfileViewProps {
  position: number | null;
  totalPoints: number;
  predictionsHistory: Prediction[];
  predictionsPending?: Prediction[];

  username: string;
  name: string;
}

export function ProfileView({
  position,
  totalPoints,
  predictionsHistory,
  predictionsPending,
  username,
  name,
}: ProfileViewProps) {
  return (
    <ScrollView>
      <ProfileHeader name={name} username={username} />
      <ProfileStats totalPoints={totalPoints} position={position} />
      <Tabs
        tabs={[
          {
            label: "Historial",
            content: <PredictionHistoryList predictions={predictionsHistory} />,
          },
          {
            label: "Predecir",
            content: (
              <PredictionPendingList predictions={predictionsPending ?? []} />
            ),
          },
        ]}
      />
    </ScrollView>
  );
}
