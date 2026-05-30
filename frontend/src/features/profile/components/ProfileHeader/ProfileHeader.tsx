import { View, Text } from "react-native";
import { styles } from "./ProfileHeader.styles";
import { Avatar } from "@/ui/Avatar/Avatar";
import { getInitials } from "@/utils/getInitials";

interface ProfileHeaderProps {
  name: string;
  username: string;
  favoriteTeam?: string | null;
}

export function ProfileHeader({ name, username, favoriteTeam }: ProfileHeaderProps) {
  const initials = getInitials(name);

  return (
    <View style={styles.container}>
      <Avatar initials={initials} size="large" favoriteTeam={favoriteTeam} />
      <View style={styles.container__info}>
        <Text style={styles.container__username}>{username}</Text>
        <Text style={styles.container__name}>{name}</Text>
      </View>
    </View>
  );
}