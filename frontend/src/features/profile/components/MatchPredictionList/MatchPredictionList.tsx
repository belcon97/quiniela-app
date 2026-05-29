import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./MatchPredictionList.styles";
// Components
import { Button } from "@/ui/Button/Button";
import { ErrorBanner } from "@/ui/ErrorBanner/ErrorBanner";
import { MatchPredictionCard } from "../MatchPredictionCard/MatchPredictionCard";
// Services
import { profileService } from "../../services/profileService";
// Store
import { useAuthStore } from "@/store/authStore";
// Types
import type { Match } from "@/shared/types/shared.types";
import type { PredictionInput, GroupedMatches } from "@/features/profile/types/matchPredictionList.types";

interface MatchPredictionListProps {
  matches: Match[];
  onSaved: () => void;
}

function groupMatchesByGroup(matches: Match[]): GroupedMatches[] {
  const map = new Map<string, Match[]>();
  for (const match of matches) {
    const group = match.group ?? "Sin grupo";
    if (!map.has(group)) map.set(group, []);
    map.get(group)!.push(match);
  }
  return Array.from(map.entries()).map(([group, matches]) => ({ group, matches }));
}

export function MatchPredictionList({ matches, onSaved }: MatchPredictionListProps) {
  const { token } = useAuthStore();

  const [inputs, setInputs] = useState<Record<string, PredictionInput>>(() =>
    Object.fromEntries(
      matches.map((m) => [m.id, {
        matchId: m.id,
        homeScore: "",
        awayScore: "",
        isWildcard: false,
        penaltyWinner: null,
      }])
    )
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });
  const [wildcardUsed, setWildcardUsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);

  const grouped = groupMatchesByGroup(matches);

  const handleScoreChange = (matchId: string, field: "homeScore" | "awayScore", value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    setInputs((prev) => ({ ...prev, [matchId]: { ...prev[matchId], [field]: numeric } }));
  };

  const handleWildcard = (matchId: string) => {
    setInputs((prev) => {
      const current = prev[matchId].isWildcard;
      const updated = Object.fromEntries(
        Object.entries(prev).map(([id, input]) => [id, { ...input, isWildcard: false }])
      );
      updated[matchId].isWildcard = !current;
      setWildcardUsed(!current);
      return updated;
    });
  };

  const handlePenaltyWinner = (matchId: string, winner: "home" | "away") => {
    setInputs((prev) => ({ ...prev, [matchId]: { ...prev[matchId], penaltyWinner: winner } }));
  };

  const handleSave = async () => {
    if (!token) return;

    const filled = Object.values(inputs).filter(
      (p) => p.homeScore.trim() !== "" && p.awayScore.trim() !== ""
    );

    if (filled.length === 0) {
      setError({ visible: true, message: "Ingresá al menos una predicción*" });
      return;
    }

    setSaving(true);
    setError({ visible: false, message: "" });

    try {
      await profileService.createPredictions(token, filled.map((p) => ({
        matchId: p.matchId,
        homeScore: Number(p.homeScore),
        awayScore: Number(p.awayScore),
        isWildcard: p.isWildcard,
        penaltyWinner: p.penaltyWinner ?? undefined,
      })));
      onSaved();
    } catch (err) {
      if (err instanceof Error) setError({ visible: true, message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (matches.length === 0) {
    return (
      <View style={styles.matchPredictionList__empty}>
        <MaterialIcons name="check-circle" size={32} color={colors.secondary} />
        <Text style={styles.matchPredictionList__emptyText}>
          Ya predijiste todos los partidos disponibles
        </Text>
      </View>
    );
  }

  const currentGroup = grouped[activeGroup];

  return (
    <View style={styles.matchPredictionList}>

      {/* Header */}
      <View style={styles.matchPredictionList__header}>
        <Text style={styles.matchPredictionList__title}>Predicciones Pendientes</Text>
      </View>

      {/* Selector de grupos — carrusel */}
      <FlatList
        data={grouped}
        keyExtractor={(item) => item.group}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.matchPredictionList__groups}
        renderItem={({ item, index }) => (
          <Pressable
            style={[
              styles.matchPredictionList__groupBtn,
              activeGroup === index && styles.matchPredictionList__groupBtn__active,
            ]}
            onPress={() => setActiveGroup(index)}
          >
            <Text style={[
              styles.matchPredictionList__groupLabel,
              activeGroup === index && styles.matchPredictionList__groupLabel__active,
            ]}>
              {item.group}
            </Text>
          </Pressable>
        )}
      />

      {/* Partidos del grupo activo */}
      <View style={styles.matchPredictionList__cards}>
        {currentGroup.matches.map((match) => (
          <MatchPredictionCard
            key={match.id}
            match={match}
            group={currentGroup.group}
            input={inputs[match.id]}
            wildcardUsed={wildcardUsed}
            onScoreChange={handleScoreChange}
            onWildcard={handleWildcard}
            onPenaltyWinner={handlePenaltyWinner}
          />
        ))}
      </View>

      {/* Footer — error y guardar */}
      <View style={styles.matchPredictionList__footer}>
        <ErrorBanner
          message={error.message}
          visible={error.visible}
          onHide={() => setError({ visible: false, message: "" })}
        />
        <Button onPress={handleSave} variant="primary" disabled={saving}>
          {saving ? "Guardando..." : "Guardar predicciones"}
        </Button>
      </View>

    </View>
  );
}