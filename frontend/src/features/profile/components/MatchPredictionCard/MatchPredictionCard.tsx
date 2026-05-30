import { View, Text, TextInput, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./MatchPredictionCard.styles";
// Types
import type { Match } from "@/types/shared.types";
import type { PredictionInput } from "@/features/profile/types/matchPredictionList.types";

interface MatchPredictionCardProps {
  match: Match;
  group: string;
  input: PredictionInput;
  wildcardUsed: boolean;
  onScoreChange: (
    matchId: string,
    field: "homeScore" | "awayScore",
    value: string,
  ) => void;
  onWildcard: (matchId: string) => void;
  onPenaltyWinner: (matchId: string, winner: "home" | "away") => void;
}

export function MatchPredictionCard({
  match,
  group,
  input,
  wildcardUsed,
  onScoreChange,
  onWildcard,
  onPenaltyWinner,
}: MatchPredictionCardProps) {
  const dateStr = new Date(match.date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isGroupStage = group.startsWith("Grupo");
  const isTied =
    input?.homeScore !== "" &&
    input?.awayScore !== "" &&
    input?.homeScore === input?.awayScore;
  const isKnockout = !isGroupStage && isTied;

  return (
    <View style={styles.card}>
      {/* Equipos y marcador */}
      <View style={styles.card__teams}>
        <View style={styles.card__team}>
          {match.homeFlag && (
            <Image
              source={{ uri: match.homeFlag }}
              style={styles.card__flag}
              resizeMode="cover"
            />
          )}
          <Text style={styles.card__teamName}>{match.homeTeam}</Text>
        </View>

        <View style={styles.card__inputs}>
          <TextInput
            style={[
              styles.card__input,
              input?.homeScore && styles.card__input__filled,
            ]}
            value={input?.homeScore ?? ""}
            onChangeText={(v) => onScoreChange(match.id, "homeScore", v)}
            keyboardType="numeric"
            maxLength={2}
            placeholder="0"
            placeholderTextColor={colors.textPlaceholder}
          />
          <Text style={styles.card__separator}>:</Text>
          <TextInput
            style={[
              styles.card__input,
              input?.awayScore && styles.card__input__filled,
            ]}
            value={input?.awayScore ?? ""}
            onChangeText={(v) => onScoreChange(match.id, "awayScore", v)}
            keyboardType="numeric"
            maxLength={2}
            placeholder="0"
            placeholderTextColor={colors.textPlaceholder}
          />
        </View>

        <View style={styles.card__team}>
          {match.awayFlag && (
            <Image
              source={{ uri: match.awayFlag }}
              style={styles.card__flag}
              resizeMode="cover"
            />
          )}
          <Text style={styles.card__teamName}>{match.awayTeam}</Text>
        </View>
      </View>

      {/* Meta — fecha y estadio */}
      <View style={styles.card__meta}>
        <MaterialIcons
          name="calendar-today"
          size={11}
          color={colors.textPlaceholder}
        />
        <Text style={styles.card__metaText}>{dateStr}</Text>
        <Text style={styles.card__metaText}>·</Text>
        <MaterialIcons
          name="location-on"
          size={11}
          color={colors.textPlaceholder}
        />
        <Text style={styles.card__metaText}>{match.stadium}</Text>
      </View>

      {/* Comodín  */}
      <Pressable
        style={[
          styles.card__wildcard,
          input?.isWildcard && styles.card__wildcard__active,
          wildcardUsed && !input?.isWildcard && styles.card__wildcard__disabled,
        ]}
        onPress={() => onWildcard(match.id)}
        disabled={wildcardUsed && !input?.isWildcard}
      >
        <Text
          style={[
            styles.card__wildcardText,
            input?.isWildcard && styles.card__wildcardText__active,
          ]}
        >
          ×2 Comodín
        </Text>
      </Pressable>

      {/* Penales — solo fase eliminatoria con empate */}
      {isKnockout && (
        <View style={styles.card__penalty}>
          <Text style={styles.card__penaltyLabel}>¿Quién gana en penales?</Text>
          <View style={styles.card__penaltyBtns}>
            <Pressable
              style={[
                styles.card__penaltyBtn,
                input?.penaltyWinner === "home" &&
                  styles.card__penaltyBtn__active,
              ]}
              onPress={() => onPenaltyWinner(match.id, "home")}
            >
              <Text
                style={[
                  styles.card__penaltyBtnText,
                  input?.penaltyWinner === "home" &&
                    styles.card__penaltyBtnText__active,
                ]}
              >
                {match.homeTeam}
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.card__penaltyBtn,
                input?.penaltyWinner === "away" &&
                  styles.card__penaltyBtn__active,
              ]}
              onPress={() => onPenaltyWinner(match.id, "away")}
            >
              <Text
                style={[
                  styles.card__penaltyBtnText,
                  input?.penaltyWinner === "away" &&
                    styles.card__penaltyBtnText__active,
                ]}
              >
                {match.awayTeam}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
