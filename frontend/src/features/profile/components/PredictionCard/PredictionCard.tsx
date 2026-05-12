import { View, Text, Image } from "react-native";
import { styles } from "./PredictionCard.styles";
import type { Prediction } from "../../types/profile.types";
import { formatDate } from "@/utils/formatDate";

interface PredictionCardProps {
  prediction: Prediction;
}

const getPointsStyle = (points: number) => {
  if (points === 3) return styles.pointsGreen;
  if (points === 1) return styles.pointsYellow;
  return styles.pointsRed;
};

const getPointsLabel = (points: number) => {
  if (points === 3) return "+3PTS";
  if (points === 1) return "+1PT";
  return "0PTS";
};

export function PredictionCard({ prediction }: PredictionCardProps) {
  const { match, homeScore, awayScore, points } = prediction;

  return (
    <View style={styles.card}>
      {/* Borde de color */}
      <View style={[styles.colorBar, getPointsStyle(points)]} />

      {/* Flags */}
      <View style={styles.flags}>
        <Image
          source={{ uri: match.homeFlag }}
          style={styles.flag}
          resizeMode="contain"
        />
        <Image
          source={{ uri: match.awayFlag }}
          style={styles.flag}
          resizeMode="contain"
        />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.matchName}>
          {match.homeTeam} vs {match.awayTeam}
        </Text>
        <Text style={styles.scores}>
          Pred: {homeScore} - {awayScore} | Final: {match.homeScore} -{" "}
          {match.awayScore}
        </Text>
      </View>

      {/* Badge puntos */}
      <View style={[styles.badge, getPointsStyle(points)]}>
        <Text style={styles.badgeText}>{getPointsLabel(points)}</Text>
      </View>
    </View>
  );
}
