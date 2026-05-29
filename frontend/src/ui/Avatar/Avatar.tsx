import { View, Text } from "react-native";
// Styles
import { styles } from "./Avatar.styles";

interface AvatarProps {
  initials: string;
  size?: "small" | "medium" | "large";
}

export function Avatar({ initials, size = "medium" }: AvatarProps) {
  return (
    <View style={[styles.avatar, styles[`avatar__${size}`]]}>
      <Text style={[styles.avatar__text, styles[`avatar__text__${size}`]]}>
        {initials}
      </Text>
    </View>
  );
}