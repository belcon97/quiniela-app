import { View, Text } from "react-native";
// Styles
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
      <View style={styles.container__info}>
        <Text style={styles.container__username}>{username}</Text>
        <Text style={styles.container__name}>{name}</Text>
      </View>
    </View>
  );
}