import { ActivityIndicator } from "react-native";
// Components
import { ProfileView } from "../ProfileView/ProfileView";
// Services
import { usePublicProfile } from "../../hooks/usePublicProfile";

interface PublicProfileProps {
  username: string;
}

export function PublicProfile({ username }: PublicProfileProps) {
  const { publicData, loading } = usePublicProfile(username);

  if (loading) return <ActivityIndicator />;
  if (!publicData) return null;
  return (
    <ProfileView
      position={publicData.position}
      totalPoints={publicData.totalPoints}
      predictionsHistory={publicData.predictionsHistory}
      username={publicData.username}
      name={publicData.name}
      isOwner={false}
    />
  );
}
