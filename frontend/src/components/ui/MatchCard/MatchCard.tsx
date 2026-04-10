import { View, Text } from "react-native";
import { styles } from "./MatchCard.styles";
import { Ionicons } from "@expo/vector-icons";

// Types
import { UpcomingMatch } from "../../../types/home.types";
// Utils
import { formatDate } from "../../../utils/formatDate";

interface Props {
  match: UpcomingMatch;
}

export function MatchCard({ match }: Props) {
  return (
    <View style={styles.card}>
      {/* Estadio */}
      <Text style={styles.stadium}>{match.stadium}</Text>

      {/* Equipos */}
      <View style={styles.teamsRow}>
        <View style={styles.team}>
          {match.homeFlag ? (
            <Text style={styles.flag}>{match.homeFlag}</Text>
          ) : (
            <Ionicons name="flag-outline" size={36} color="#ccc" />
          )}
          <Text style={styles.teamName}>{match.homeTeam}</Text>
        </View>

        <Text style={styles.vs}>vs</Text>

        <View style={styles.team}>
          {match.awayFlag ? (
            <Text style={styles.flag}>{match.awayFlag}</Text>
          ) : (
            <Ionicons name="flag-outline" size={36} color="#ccc" />
          )}
          <Text style={styles.teamName}>{match.awayTeam}</Text>
        </View>
      </View>

      {/* Fecha */}
      <Text style={styles.date}>{formatDate(match.date)}</Text>
    </View>
  );
}
