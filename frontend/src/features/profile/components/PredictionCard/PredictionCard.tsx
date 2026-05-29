import { View, Text, Image } from "react-native";
// Styles
import { styles } from "./PredictionCard.styles";
// Utils
import { formatDate } from "@/utils/formatDate";
// Types
import type { Prediction } from "../../types/profile.types";

interface PredictionCardProps {
  prediction: Prediction;
}

function getPointsStyle(points: number) {
  if (points >= 3) return styles.card__bar__green;
  if (points === 1) return styles.card__bar__yellow;
  return styles.card__bar__red;
}

function getPointsLabel(points: number) {
  if (points >= 3) return `+${points}PTS`;
  if (points === 1) return "+1PT";
  return "0PTS";
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const { match, homeScore, awayScore, points } = prediction;

  return (
    <View style={styles.card}>

      {/* Borde de color */}
      <View style={[styles.card__bar, getPointsStyle(points)]} />

      {/* Banderas */}
      <View style={styles.card__flags}>
        <Image source={{ uri: match.homeFlag }} style={styles.card__flag} resizeMode="cover" />
        <Image source={{ uri: match.awayFlag }} style={styles.card__flag} resizeMode="cover" />
      </View>

      {/* Info */}
      <View style={styles.card__info}>
        <Text style={styles.card__matchName}>
          {match.homeTeam} vs {match.awayTeam}
        </Text>
        <Text style={styles.card__scores}>
          Pred: {homeScore} - {awayScore} · Final: {match.homeScore} - {match.awayScore}
        </Text>
        <Text style={styles.card__date}>{formatDate(match.date)}</Text>
      </View>

      {/* Badge puntos */}
      <View style={[styles.card__badge, getPointsStyle(points)]}>
        <Text style={styles.card__badgeText}>{getPointsLabel(points)}</Text>
      </View>

    </View>
  );
}