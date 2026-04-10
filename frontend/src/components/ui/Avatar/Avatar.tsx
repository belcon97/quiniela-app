import { View, Text } from "react-native";

import { styles } from "./Avatar.styles";

interface Props {
  initials: string;
}

export function Avatar({ initials }: Props) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}
