import { View, Text } from "react-native";
import { styles } from "./ProfileHeader.styles";

// Components
import { Avatar } from "@/ui/Avatar/Avatar";

// Utils
import { getInitials } from "@/utils/getInitials";

interface ProfileHeaderProps {
  name: string;
  username: string;
}

export function ProfileHeader({ name, username }: ProfileHeaderProps) {
  const initials = getInitials(name);

  return (
    <View style={styles.container}>
      <Avatar initials={initials} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.username}>@{username}</Text>
    </View>
  );
}
