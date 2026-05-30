import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./RankingHeroCard.styles";
// Components
import { Avatar } from "@/ui/Avatar/Avatar";
// Utils
import { getInitials } from "@/utils/getInitials";
// Types
import type { RankingEntry } from "@/features/ranking/types/ranking.types";

interface RankingHeroCardProps {
  entry: RankingEntry;
  onPress: () => void;
}

export function RankingHeroCard({ entry, onPress }: RankingHeroCardProps) {
  const initials = getInitials(entry.name);

  return (
    <Pressable style={styles.heroCard} onPress={onPress}>
      <MaterialIcons
        name="emoji-events"
        size={28}
        color={colors.secondary}
        style={styles.heroCard__trophy}
      />
      <Avatar
        initials={initials}
        favoriteTeam={entry.favoriteTeam}
      />
      <Text style={styles.heroCard__position}>#1</Text>
      <Text style={styles.heroCard__username}>{entry.username}</Text>
      <Text style={styles.heroCard__name}>{entry.name}</Text>
      <View style={styles.heroCard__badge}>
        <Text style={styles.heroCard__badgeText}>{entry.totalPoints} pts</Text>
      </View>
    </Pressable>
  );
}