import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./MatchPredictionList.styles";

// Components
import Button from "@/ui/Button/Button";
import ErrorBanner from "@/ui/ErrorBanner/ErrorBanner";

// Services
import { profileService } from "../../services/profileService";

// Store
import { useAuthStore } from "@/store/authStore";

// Types
import type { Match } from "@/shared/types/shared.types";
import type {
  PredictionInput,
  GroupedMatches,
} from "@/features/profile/types/matchPredictionList.types";

interface MatchPredictionListProps {
  matches: Match[];
  onSaved: () => void;
}

// ── Helpers ──

const groupMatchesByGroup = (matches: Match[]): GroupedMatches[] => {
  const map = new Map<string, Match[]>();
  for (const match of matches) {
    const group = match.group ?? "Sin grupo";
    if (!map.has(group)) map.set(group, []);
    map.get(group)!.push(match);
  }
  return Array.from(map.entries()).map(([group, matches]) => ({
    group,
    matches,
  }));
};

// ── Component ──

export function MatchPredictionList({
  matches,
  onSaved,
}: MatchPredictionListProps) {
  const { token } = useAuthStore();

  const [inputs, setInputs] = useState<Record<string, PredictionInput>>(() =>
    Object.fromEntries(
      matches.map((m) => [
        m.id,
        {
          matchId: m.id,
          homeScore: "",
          awayScore: "",
          isWildcard: false,
          penaltyWinner: null,
        },
      ]),
    ),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });

  // Estado para saber si el usuario ya usó el comodín en este batch
  const [wildcardUsed, setWildcardUsed] = useState(false);

  const grouped = groupMatchesByGroup(matches);

  const handleScoreChange = (
    matchId: string,
    field: "homeScore" | "awayScore",
    value: string,
  ) => {
    const numeric = value.replace(/[^0-9]/g, "");
    setInputs((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], [field]: numeric },
    }));
  };
  const handleWildcard = (matchId: string) => {
    setInputs((prev) => {
      const current = prev[matchId].isWildcard;
      // Desactivar todos y activar solo el seleccionado
      const updated = Object.fromEntries(
        Object.entries(prev).map(([id, input]) => [
          id,
          { ...input, isWildcard: false },
        ]),
      );
      updated[matchId].isWildcard = !current;
      setWildcardUsed(!current);
      return updated;
    });
  };

  const handlePenaltyWinner = (matchId: string, winner: "home" | "away") => {
    setInputs((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], penaltyWinner: winner },
    }));
  };
  const handleSave = async () => {
    if (!token) return;

    const filled = Object.values(inputs).filter(
      (p) => p.homeScore.trim() !== "" && p.awayScore.trim() !== "",
    );

    if (filled.length === 0) {
      setError({ visible: true, message: "Ingresá al menos una predicción*" });
      return;
    }

    setSaving(true);
    setError({ visible: false, message: "" });

    try {
      await profileService.createPredictions(
        token,
        filled.map((p) => ({
          matchId: p.matchId,
          homeScore: Number(p.homeScore),
          awayScore: Number(p.awayScore),
          isWildcard: p.isWildcard,
          penaltyWinner: p.penaltyWinner ?? undefined,
        })),
      );
      onSaved();
    } catch (err) {
      if (err instanceof Error) {
        setError({ visible: true, message: err.message });
      }
    } finally {
      setSaving(false);
    }
  };

  if (matches.length === 0) {
    return (
      <View style={styles.matchPredictionList__empty}>
        <Feather name="check-circle" size={32} color="#00A651" />
        <Text style={styles.matchPredictionList__emptyText}>
          Ya predijiste todos los partidos disponibles
        </Text>
      </View>
    );
  }

  return (
    <View>
      {grouped.map(({ group, matches }) => (
        <View key={group} style={styles.matchPredictionList__group}>
          <Text style={styles.matchPredictionList__groupTitle}>{group}</Text>

          {matches.map((match) => {
            const input = inputs[match.id];
            const dateStr = new Date(match.date).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <View key={match.id} style={styles.matchPredictionList__card}>
                <View style={styles.matchPredictionList__card_teams}>
                  <View style={styles.matchPredictionList__team}>
                    {match.homeFlag ? (
                      <Image
                        source={{ uri: match.homeFlag }}
                        style={styles.matchPredictionList__flag}
                        resizeMode="contain"
                      />
                    ) : null}
                    <Text style={styles.matchPredictionList__teamName}>
                      {match.homeTeam}
                    </Text>
                  </View>

                  <View style={styles.matchPredictionList__inputs}>
                    <TextInput
                      style={[
                        styles.matchPredictionList__input,
                        input?.homeScore &&
                          styles.matchPredictionList__input_filled,
                      ]}
                      value={input?.homeScore ?? ""}
                      onChangeText={(v) =>
                        handleScoreChange(match.id, "homeScore", v)
                      }
                      keyboardType="numeric"
                      maxLength={2}
                      placeholder="0"
                      placeholderTextColor="#98A2B3"
                    />
                    <Text style={styles.matchPredictionList__separator}>:</Text>
                    <TextInput
                      style={[
                        styles.matchPredictionList__input,
                        input?.awayScore &&
                          styles.matchPredictionList__input_filled,
                      ]}
                      value={input?.awayScore ?? ""}
                      onChangeText={(v) =>
                        handleScoreChange(match.id, "awayScore", v)
                      }
                      keyboardType="numeric"
                      maxLength={2}
                      placeholder="0"
                      placeholderTextColor="#98A2B3"
                    />
                  </View>

                  <View style={styles.matchPredictionList__team}>
                    {match.awayFlag ? (
                      <Image
                        source={{ uri: match.awayFlag }}
                        style={styles.matchPredictionList__flag}
                        resizeMode="contain"
                      />
                    ) : null}
                    <Text style={styles.matchPredictionList__teamName}>
                      {match.awayTeam}
                    </Text>
                  </View>
                </View>

                <View style={styles.matchPredictionList__meta}>
                  <Feather name="calendar" size={11} color="#98A2B3" />
                  <Text style={styles.matchPredictionList__metaText}>
                    {dateStr}
                  </Text>
                  <Text style={styles.matchPredictionList__metaText}>·</Text>
                  <Feather name="map-pin" size={11} color="#98A2B3" />
                  <Text style={styles.matchPredictionList__metaText}>
                    {match.stadium}
                  </Text>
                </View>

                {/* Comodín — solo en fase de grupos */}
                {group.startsWith("Grupo") && (
                  <TouchableOpacity
                    style={[
                      styles.matchPredictionList__wildcard,
                      input?.isWildcard &&
                        styles.matchPredictionList__wildcard_active,
                      wildcardUsed &&
                        !input?.isWildcard &&
                        styles.matchPredictionList__wildcard_disabled,
                    ]}
                    onPress={() => handleWildcard(match.id)}
                    disabled={wildcardUsed && !input?.isWildcard}
                  >
                    <Text
                      style={[
                        styles.matchPredictionList__wildcardText,
                        input?.isWildcard &&
                          styles.matchPredictionList__wildcardText_active,
                      ]}
                    >
                      ×2 Comodín
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Penales — solo en fase eliminatoria con empate */}
                {!group.startsWith("Grupo") &&
                  input?.homeScore !== "" &&
                  input?.awayScore !== "" &&
                  input?.homeScore === input?.awayScore && (
                    <View style={styles.matchPredictionList__penalty}>
                      <Text style={styles.matchPredictionList__penaltyLabel}>
                        ¿Quién gana en penales?
                      </Text>
                      <View style={styles.matchPredictionList__penaltyBtns}>
                        <TouchableOpacity
                          style={[
                            styles.matchPredictionList__penaltyBtn,
                            input?.penaltyWinner === "home" &&
                              styles.matchPredictionList__penaltyBtn_active,
                          ]}
                          onPress={() => handlePenaltyWinner(match.id, "home")}
                        >
                          <Text
                            style={[
                              styles.matchPredictionList__penaltyBtnText,
                              input?.penaltyWinner === "home" &&
                                styles.matchPredictionList__penaltyBtnText_active,
                            ]}
                          >
                            {match.homeTeam}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.matchPredictionList__penaltyBtn,
                            input?.penaltyWinner === "away" &&
                              styles.matchPredictionList__penaltyBtn_active,
                          ]}
                          onPress={() => handlePenaltyWinner(match.id, "away")}
                        >
                          <Text
                            style={[
                              styles.matchPredictionList__penaltyBtnText,
                              input?.penaltyWinner === "away" &&
                                styles.matchPredictionList__penaltyBtnText_active,
                            ]}
                          >
                            {match.awayTeam}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
              </View>
            );
          })}
        </View>
      ))}

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
