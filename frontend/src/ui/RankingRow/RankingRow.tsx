import { View, Text } from "react-native";
import { styles } from "./RankingRow.styles";

// Components
import { Avatar } from "../Avatar/Avatar";

// Types
import type { RankingEntry } from "../../features/home/types/home.types";

// Utils
import { getInitials } from "../../utils/getInitials";

interface RankingRowProps {
  ranking: RankingEntry;
  isMe?: boolean;
}

export function RankingRow({ ranking, isMe }: RankingRowProps) {
  const initials = getInitials(ranking.name);

  return (
    <View style={[styles.row, isMe && styles.rowActive]}>
      <Text style={styles.position}>{ranking.position}</Text>

      <View style={styles.info}>
        <Avatar initials={initials} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{ranking.name}</Text>
          <Text style={styles.username}>@{ranking.username}</Text>
        </View>
      </View>

      <Text style={styles.points}>{ranking.totalPoints} pts</Text>
    </View>
  );
}
