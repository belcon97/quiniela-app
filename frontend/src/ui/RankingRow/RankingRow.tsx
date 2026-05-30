import { View, Text, Pressable } from "react-native";
// Styles
import { styles } from "./RankingRow.styles";
// Components
import { Avatar } from "../Avatar/Avatar";
// Utils
import { getInitials } from "@/utils/getInitials";
import { formatPosition } from "@/utils/formatPosition";
// Types
import type { RankingEntry } from "@/features/ranking/types/ranking.types";

interface RankingRowProps {
  ranking: RankingEntry;
  isMe?: boolean;
  onPress?: () => void;
}

export function RankingRow({ ranking, isMe, onPress }: RankingRowProps) {
  const initials = getInitials(ranking.name);
  const isFirst = ranking.position === 1;

  return (
    <Pressable
      style={[styles.row, isMe && styles.row__active]}
      onPress={onPress}
    >
      {/* Posicion */}
      <Text
        style={[
          styles.row__position,
          isFirst && styles.row__position__first,
          isMe && styles.row__position__active,
        ]}
      >
        {formatPosition(ranking.position)}
      </Text>

      {/* Usuario */}
      <View style={styles.row__info}>
        <Avatar initials={initials} favoriteTeam={ranking.favoriteTeam} />
        <View style={styles.row__userInfo}>
          <Text style={[styles.row__name, isMe && styles.row__name__active]}>
            {ranking.username}
          </Text>
          <Text
            style={[styles.row__username, isMe && styles.row__username__active]}
          >
            {ranking.name}
          </Text>
        </View>
      </View>

      {/* Puntos */}
      <Text style={[styles.row__points, isMe && styles.row__points__active]}>
        {ranking.totalPoints}
      </Text>
    </Pressable>
  );
}
