import { View, Text, ActivityIndicator } from "react-native";

// Components
import { RankingRow } from "../ui/RankingRow/RankingRow";

// Types
import type { RankingEntry } from "../../types/home.types";

// Store
import { useAuthStore } from "../../store/authStore";

interface RankingListProps {
  loading: boolean;
  ranking: RankingEntry[];
  myPosition: number | null;
}

export function RankingList({
  ranking,
  loading,
  myPosition,
}: RankingListProps) {
  const { user } = useAuthStore();

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
          />
        ))}
      </View>

      {!isMeInTop5 && myRankingEntry ? (
        <RankingRow ranking={myRankingEntry} isMe />
      ) : null}

      {myPosition === null ? (
        <Text>No has ingresado tus resultados</Text>
      ) : null}
    </View>
  );
}
