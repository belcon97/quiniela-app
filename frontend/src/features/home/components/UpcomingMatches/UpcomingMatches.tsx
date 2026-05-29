import { FlatList, View, Text } from "react-native";
import { styles } from "./UpcomingMatches.styles";
// Components
import { MatchCard } from "@/ui/MatchCard/MatchCard";
// Types
import type { Match } from "@/shared/types/shared.types";

interface UpcomingMatchesProps {
  matches: Match[];
}

export function UpcomingMatches({ matches }: UpcomingMatchesProps) {

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCard match={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay partidos próximos</Text>
        }
      />
    </View>
  );
}