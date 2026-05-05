import { View, Text } from "react-native";
import { PredictionCard } from "../PredictionCard/PredictionCard";
import type { Prediction } from "../../types/profile.types";

interface PredictionHistoryListProps {
  predictions: Prediction[];
}

export function PredictionHistoryList({
  predictions,
}: PredictionHistoryListProps) {
  if (predictions.length === 0) {
    return (
      <View>
        <Text>No hay historial de predicciones</Text>
      </View>
    );
  }

  return (
    <View>
      {predictions.map((prediction) => (
        <PredictionCard key={prediction.id} prediction={prediction} />
      ))}
    </View>
  );
}
