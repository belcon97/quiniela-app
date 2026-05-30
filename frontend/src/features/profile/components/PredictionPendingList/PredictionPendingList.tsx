import { View, Text } from "react-native";
import { styles } from "./PredictionPendingList.styles";
import { PredictionCard } from "../PredictionCard/PredictionCard";
import { useAuthStore } from "@/store/authStore";
import { PredictionPendingOverlay } from "./PredictionPendingOverlay/PredictionPendingOverlay";
import type { Prediction } from "../../types/profile.types";

interface PredictionPendingListProps {
  predictions: Prediction[];
  isPublic?: boolean;
}

export function PredictionPendingList({ predictions, isPublic = false }: PredictionPendingListProps) {
  const hasPendingMatches = useAuthStore((state) => state.hasPendingMatches);

  // Si es perfil público y el usuario tiene partidos pendientes → overlay
  const showOverlay = isPublic && hasPendingMatches;

  if (predictions.length === 0) {
    return (
      <View style={styles.predictionPendingList__empty}>
        <Text style={styles.predictionPendingList__emptyText}>
          No tenés predicciones pendientes
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.predictionPendingList, { position: "relative" }]}>
      {predictions.map((prediction) => (
        <PredictionCard key={prediction.id} prediction={prediction} />
      ))}
      {showOverlay && <PredictionPendingOverlay />}
    </View>
  );
}