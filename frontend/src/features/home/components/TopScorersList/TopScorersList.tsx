import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./TopScorersList.styles";
// Utils
import { formatPosition } from "@/utils/formatPosition";
// Types
import type { TopScorer } from "@/features/topScorer/types/topScorer.types";

interface TopScorersListProps {
  topScorers: TopScorer[];
}

export function TopScorersList({ topScorers }: TopScorersListProps) {
  const top3 = topScorers.slice(0, 3);

  if (top3.length === 0) return null;

  return (
    <View style={styles.topScorers}>

      {/* Header */}
      <View style={styles.topScorers__header}>
        <MaterialIcons name="emoji-events" size={22} color={colors.primary} />
        <Text style={styles.topScorers__title}>Top goleadores</Text>
      </View>

      {/* Lista */}
      <View style={styles.topScorers__container}>
        {top3.map((scorer, index) => (
          <View key={scorer.id} style={styles.topScorers__row}>

            {/* Posicion */}
            <Text style={styles.topScorers__position}>
              {formatPosition(index + 1)}
            </Text>

            {/* Bandera */}
            {scorer.flag ? (
              <Image
                source={{ uri: scorer.flag }}
                style={styles.topScorers__flag}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.topScorers__flag, styles.topScorers__flag__placeholder]} />
            )}

            {/* Info */}
            <View style={styles.topScorers__info}>
              <Text style={styles.topScorers__name}>{scorer.name}</Text>
              <Text style={styles.topScorers__team}>{scorer.team}</Text>
            </View>

            {/* Goles */}
            <View style={styles.topScorers__goals}>
              <Text style={styles.topScorers__goals__count}>{scorer.goals}</Text>
              <Text style={styles.topScorers__goals__label}>goles</Text>
            </View>

          </View>
        ))}
      </View>

    </View>
  );
}