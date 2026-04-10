import { View, Text, ActivityIndicator } from "react-native";

// Types
import { RankingEntry } from "../../types/home.types";

// Components
import { RankingRow } from "../ui/RankingRow/RankingRow";

interface Props {
  loading: boolean;
  ranking: RankingEntry[];
  myRanking: RankingEntry | undefined;
}

export function RankingList({ ranking, loading, myRanking }: Props) {
  if (loading) return <ActivityIndicator />;

  const top5 = ranking.slice(0, 5);

  const isMeInTop5 = top5.some(
    (position) => position.position === myRanking?.position,
  );

  return (
    <View>
      <View>
        <Text> RANKING GENERAL </Text>
      </View>

      <View>
        {top5.map((item) => (
          <RankingRow
            key={item.username}
            ranking={item}
            isMe={item.username === myRanking?.username}
          />
        ))}
      </View>

      {!isMeInTop5 && myRanking ? (
        <RankingRow ranking={myRanking} isMe />
      ) : null}

      {!myRanking ? <Text>No has ingresado tus resultados</Text> : null}
    </View>
  );
}
