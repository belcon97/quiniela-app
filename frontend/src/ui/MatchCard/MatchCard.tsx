import { View, Text, Image } from "react-native";
import { styles } from "./MatchCard.styles";
import { Ionicons } from "@expo/vector-icons";
import type { Match } from "@/shared/types/shared.types";
import { formatDate } from "@/utils/formatDate";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.stadium}>{match.stadium}</Text>

      <View style={styles.teamsRow}>
        <View style={styles.team}>
          {match.homeFlag ? (
            <Image
              source={{ uri: match.homeFlag }}
              style={styles.flag}
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="flag-outline" size={36} color="#ccc" />
          )}
          <Text style={styles.teamName}>{match.homeTeam}</Text>
        </View>

        <Text style={styles.vs}>vs</Text>

        <View style={styles.team}>
          {match.awayFlag ? (
            <Image
              source={{ uri: match.awayFlag }}
              style={styles.flag}
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="flag-outline" size={36} color="#ccc" />
          )}
          <Text style={styles.teamName}>{match.awayTeam}</Text>
        </View>
      </View>

      <Text style={styles.date}>{formatDate(match.date)}</Text>
    </View>
  );
}
