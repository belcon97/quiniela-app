import { View, Text, Image } from "react-native";
import { styles } from "./Avatar.styles";
import { WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";

interface AvatarProps {
  initials: string;
  size?: "small" | "medium" | "large";
  favoriteTeam?: string | null;
}

export function Avatar({ initials, size = "medium", favoriteTeam }: AvatarProps) {
  const country = favoriteTeam
    ? WORLD_CUP_COUNTRIES.find((c) => c.label === favoriteTeam)
    : null;

  return (
    <View style={[styles.avatar, styles[`avatar__${size}`]]}>
      {country?.icon ? (
        <Image
          source={{ uri: country.icon }}
          style={[styles.avatar__flag, styles[`avatar__${size}`]]}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.avatar__text, styles[`avatar__text__${size}`]]}>
          {initials}
        </Text>
      )}
    </View>
  );
}