import { View, Text } from "react-native";

interface PublicProfileProps {
  username: string;
}

export function PublicProfile({ username }: PublicProfileProps) {
  return (
    <View>
      <Text>PublicProfile {username}</Text>
    </View>
  );
}
