import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./RankingList.styles";
// Components
import { RankingRow } from "@/ui/RankingRow/RankingRow";
// Store
import { useAuthStore } from "@/store/authStore";
// Types
import type { RankingEntry } from "@/features/ranking/types/ranking.types";

interface RankingListProps {
  ranking: RankingEntry[];
  myPosition: number | null;
  onUserPress: (username: string) => void;
  onRankingPress: () => void;
}

export function RankingList({
  ranking,
  myPosition,
  onUserPress,
  onRankingPress,
}: RankingListProps) {
  const user = useAuthStore((state) => state.user);

  const top5 = ranking.slice(0, 5);
  const isMeInTop5 = top5.some((item) => item.username === user?.username);
  const myRankingEntry = ranking.find((item) => item.username === user?.username);

  return (
    <View style={styles.rankingList}>

      {/* Header — título y ver más */}
      <View style={styles.rankingList__header}>
        <View style={styles.rankingList__titleRow}>
          <MaterialIcons name="leaderboard" size={22} color={colors.primary} />
          <Text style={styles.rankingList__title}>Ranking general</Text>
        </View>
        <Pressable onPress={onRankingPress} style={styles.rankingList__seeAll}>
          <Text style={styles.rankingList__seeAllText}>Ver más</Text>
          <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
        </Pressable>
      </View>

      {/* Contenedor lista */}
      <View style={styles.rankingList__container}>

        {/* Columnas */}
        <View style={styles.rankingList__columns}>
          <Text style={styles.rankingList__column}>POS</Text>
          <Text style={[styles.rankingList__column, styles.rankingList__column__user]}>USER</Text>
          <Text style={styles.rankingList__column}>POINTS</Text>
        </View>

        {/* Top 5 */}
        {top5.map((item) => (
          <RankingRow
            key={item.username}
            ranking={item}
            isMe={item.username === user?.username}
            onPress={() => onUserPress(item.username)}
          />
        ))}

        {/* Mi posicion si no estoy en top 5 */}
        {!isMeInTop5 && myRankingEntry && (
          <RankingRow
            ranking={myRankingEntry}
            isMe
            onPress={() => onUserPress(myRankingEntry.username)}
          />
        )}

        {/* Sin posicion */}
        {myPosition === null && (
          <Text style={styles.rankingList__empty}>
            Aún no tenés predicciones cargadas
          </Text>
        )}
      </View>
    </View>
  );
}