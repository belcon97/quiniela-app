import { FlatList, ActivityIndicator, View } from "react-native";
import { styles } from "./UpcomingMatches.styles";

// Components
import { MatchCard } from "../ui/MatchCard/MatchCard";

// Types
import type { UpcomingMatch } from "../../types/home.types";

interface UpcomingMatchesProps {
  matches: UpcomingMatch[];
  loading: boolean;
}

export function UpcomingMatches({ matches, loading }: UpcomingMatchesProps) {
  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCard match={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
