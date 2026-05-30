import { View, Text, Image } from "react-native";
import { styles } from "./FavoriteTeamBadge.styles";
import { WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";

interface FavoriteTeamBadgeProps {
  team: string;
}

export function FavoriteTeamBadge({ team }: FavoriteTeamBadgeProps) {
  const country = WORLD_CUP_COUNTRIES.find((c) => c.label === team);

  return (
    <View style={styles.container}>
      {country?.icon && (
        <Image
          source={{ uri: country.icon }}
          style={styles.flag}
          resizeMode="cover"
        />
      )}
      <Text style={styles.team}>{team}</Text>
    </View>
  );
}