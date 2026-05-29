import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// Styles
import { styles } from "./MatchCard.styles";
import { colors } from "@/styles/theme";
// Utils
import { formatDate } from "@/utils/formatDate";
// Types
import type { Match } from "@/shared/types/shared.types";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <View style={styles.card}>

      {/* Header */}
      <View style={styles.card__header}>
        <MaterialIcons name="location-on" size={12} color={colors.textMuted} />
        <Text style={styles.card__stadium}>{match.stadium}</Text>
      </View>

      {/* Teams */}
      <View style={styles.card__teamsRow}>
        <View style={styles.card__team}>
          {match.homeFlag ? (
            <Image
              source={{ uri: match.homeFlag }}
              style={styles.card__flag}
              resizeMode="cover"
            />
          ) : (
            <MaterialIcons name="flag" size={36} color={colors.neutral400} />
          )}
          <Text style={styles.card__teamName}>{match.homeTeam}</Text>
        </View>

        <Text style={styles.card__vs}>VS</Text>

        <View style={styles.card__team}>
          {match.awayFlag ? (
            <Image
              source={{ uri: match.awayFlag }}
              style={styles.card__flag}
              resizeMode="cover"
            />
          ) : (
            <MaterialIcons name="flag" size={36} color={colors.neutral400} />
          )}
          <Text style={styles.card__teamName}>{match.awayTeam}</Text>
        </View>
      </View>

      {/* Footer — fecha */}
      <Text style={styles.card__date}>{formatDate(match.date)}</Text>
    </View>
  );
}