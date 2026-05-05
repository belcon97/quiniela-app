import { View, Text, ActivityIndicator } from "react-native";

// Components
import { RankingRow } from "@/ui/RankingRow/RankingRow";

// Types
import type { RankingEntry } from "@/features/home/types/home.types";

// Store
import { useAuthStore } from "@/store/authStore";

interface RankingListProps {
  loading: boolean;
  ranking: RankingEntry[];
  myPosition: number | null;
  onUserPress: (username: string) => void;
}

export function RankingList({
  ranking,
  loading,
  myPosition,
  onUserPress,
}: RankingListProps) {
  const user = useAuthStore((state) => state.user);

  if (loading) return <ActivityIndicator />;

  const top5 = ranking.slice(0, 5);

  const isMeInTop5 = top5.some((item) => item.username === user?.username);
  const myRankingEntry = ranking.find(
    (item) => item.username === user?.username,
  );

  return (
    <View>
      <View>
        <Text>RANKING GENERAL</Text>
      </View>

      <View>
        {top5.map((item) => (
          <RankingRow
            key={item.username}
            ranking={item}
            isMe={item.username === user?.username}
            onPress={() => onUserPress?.(item.username)}
          />
        ))}
      </View>

      {!isMeInTop5 && myRankingEntry ? (
        <RankingRow
          ranking={myRankingEntry}
          isMe
          onPress={() => onUserPress?.(myRankingEntry.username)}
        />
      ) : null}

      {myPosition === null ? (
        <Text>No has ingresado tus resultados</Text>
      ) : null}
    </View>
  );
}
