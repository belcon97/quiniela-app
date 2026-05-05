import { View, Text } from "react-native";
import { PredictionCard } from "../PredictionCard/PredictionCard";
import type { Prediction } from "../../types/profile.types";

interface PredictionPendingListProps {
  predictions: Prediction[];
}

export function PredictionPendingList({
  predictions,
}: PredictionPendingListProps) {
  if (predictions.length === 0) {
    return (
      <View>
        <Text>No tenés predicciones pendientes</Text>
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
