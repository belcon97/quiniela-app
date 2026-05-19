import { View, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./TopScorersList.styles";
import type { TopScorer } from "@/features/topScorer/services/topScorerService";

interface TopScorersListProps {
  topScorers: TopScorer[];
}

const MEDALS = ["🥇", "🥈", "🥉"];

export function TopScorersList({ topScorers }: TopScorersListProps) {
  if (topScorers.length === 0) return null;

  return (
    <View style={styles.topScorers}>
      <View style={styles.topScorers__header}>
        <Feather name="award" size={14} color="#854D0E" />
        <Text style={styles.topScorers__title}>Top goleadores</Text>
      </View>

      {topScorers.map((scorer, index) => (
        <View key={scorer.id} style={styles.topScorers__row}>
          <Text style={styles.topScorers__medal}>{MEDALS[index]}</Text>
          {scorer.flag ? (
            <Image
              source={{ uri: scorer.flag }}
              style={styles.topScorers__flag}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.topScorers__flag,
                styles.topScorers__flagPlaceholder,
              ]}
            />
          )}
          <View style={styles.topScorers__info}>
            <Text style={styles.topScorers__name}>{scorer.name}</Text>
            <Text style={styles.topScorers__team}>{scorer.team}</Text>
          </View>
          <View style={styles.topScorers__goals}>
            <Text style={styles.topScorers__goalsCount}>{scorer.goals}</Text>
            <Text style={styles.topScorers__goalsLabel}>goles</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
