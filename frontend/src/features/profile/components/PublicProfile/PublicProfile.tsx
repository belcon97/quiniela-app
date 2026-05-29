import { View, ScrollView, ActivityIndicator } from "react-native";
// Styles
import { styles } from "./PublicProfile.styles";
// Components
import { ProfileView } from "../ProfileView/ProfileView";
// Hooks
import { usePublicProfile } from "../../hooks/usePublicProfile";

interface PublicProfileProps {
  username: string;
}

export function PublicProfile({ username }: PublicProfileProps) {
  const { publicData, loading } = usePublicProfile(username);

  if (loading) {
    return (
      <View style={styles.publicProfile__loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!publicData) return null;

  return (
    <ScrollView style={styles.publicProfile}>
      <ProfileView
        position={publicData.position}
        totalPoints={publicData.totalPoints}
        predictionsHistory={publicData.predictionsHistory}
        predictionsPending={publicData.predictionsPending}
        username={publicData.username}
        name={publicData.name}
      />
    </ScrollView>
  );
}