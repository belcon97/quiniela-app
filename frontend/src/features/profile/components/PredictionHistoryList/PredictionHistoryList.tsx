import { View, Text } from "react-native";
// Styles
import { styles } from "./PredictionHistoryList.styles";
// Components
import { PredictionCard } from "../PredictionCard/PredictionCard";
// Types
import type { Prediction } from "../../types/profile.types";

interface PredictionHistoryListProps {
  predictions: Prediction[];
}

export function PredictionHistoryList({ predictions }: PredictionHistoryListProps) {
  if (predictions.length === 0) {
    return (
      <View style={styles.predictionHistoryList__empty}>
        <Text style={styles.predictionHistoryList__emptyText}>
          No hay historial de predicciones
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.predictionHistoryList}>
      {predictions.map((prediction) => (
        <PredictionCard key={prediction.id} prediction={prediction} />
      ))}
    </View>
  );
}