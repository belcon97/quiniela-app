import { useState, useEffect } from "react";
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
// Styles
import { styles } from "./TopScorerPrediction.styles";
// Types
import type { TopScorer, TopScorerPrediction as TopScorerPredictionType } from "@/features/topScorer/types/topScorer.types";
// Services
import { topScorerService } from "@/features/topScorer/services/topScorerService";
// Components
import { Button } from "@/ui/Button/Button";
import { ErrorBanner } from "@/ui/ErrorBanner/ErrorBanner";
// Store
import { useAuthStore } from "@/store/authStore";

export function TopScorerPrediction() {
  const { token } = useAuthStore();

  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [myPrediction, setMyPrediction] = useState<TopScorerPredictionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const [scorers, prediction] = await Promise.all([
          topScorerService.getTopScorers(token),
          topScorerService.getMyPrediction(token),
        ]);
        setTopScorers(scorers);
        setMyPrediction(prediction);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleSave = async () => {
    if (!token) return;
    if (!selected) {
      setError({ visible: true, message: "Seleccioná un goleador*" });
      return;
    }

    setSaving(true);
    setError({ visible: false, message: "" });

    try {
      await topScorerService.createPrediction(token, selected);
      const prediction = await topScorerService.getMyPrediction(token);
      setMyPrediction(prediction);
      setSuccess("¡Predicción guardada!");
    } catch (err) {
      if (err instanceof Error) setError({ visible: true, message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.topScorer}>

      {/* Header */}
      <View style={styles.topScorer__header}>
        <MaterialIcons name="emoji-events" size={22} color={colors.primary} />
        <Text style={styles.topScorer__title}>Goleador del torneo</Text>
      </View>

      {myPrediction ? (
        // Ya tiene predicción — solo muestra
        <View style={styles.topScorer__saved}>
          <MaterialIcons name="check-circle" size={20} color={colors.secondary} />
          <View style={styles.topScorer__savedInfo}>
            <Text style={styles.topScorer__savedLabel}>Tu predicción</Text>
            <Text style={styles.topScorer__savedName}>
              {myPrediction.topScorer?.name ?? "—"}
            </Text>
            {myPrediction.points > 0 && (
              <Text style={styles.topScorer__savedPoints}>+{myPrediction.points} pts</Text>
            )}
          </View>
        </View>
      ) : (
        // Sin predicción — form
        <View>
          <Text style={styles.topScorer__subtitle}>
          El goleador lo deben colocar de forma obligatoria antes del primer partido el cual no tendrá cambio luego de ser seleccionado, nosotros colocamos algunas opciones si desean colocar alguno que no este nos avisan por privado y lo agregamos. Al finalizar el mundial sabremos el máximo goleador los que lo lleguen acertar tendrá una sumatoria de 3 puntos.
          </Text>

          {/* Candidatos */}
          {topScorers.map((scorer) => (
            <Pressable
              key={scorer.id}
              style={[
                styles.topScorer__option,
                selected === scorer.id && styles.topScorer__option__active,
              ]}
              onPress={() => setSelected(scorer.id)}
            >
              {scorer.flag && (
                <Image
                  source={{ uri: scorer.flag }}
                  style={styles.topScorer__flag}
                  resizeMode="cover"
                />
              )}
              <View style={styles.topScorer__optionInfo}>
                <Text style={styles.topScorer__optionName}>{scorer.name}</Text>
                <Text style={styles.topScorer__optionTeam}>{scorer.team}</Text>
              </View>
              {selected === scorer.id && (
                <MaterialIcons name="check" size={16} color={colors.primary} />
              )}
            </Pressable>
          ))}

          {/* Success */}
          {success ? (
            <View style={styles.topScorer__successBanner}>
              <MaterialIcons name="check-circle" size={16} color={colors.secondary} />
              <Text style={styles.topScorer__successText}>{success}</Text>
            </View>
          ) : null}

          <ErrorBanner
            message={error.message}
            visible={error.visible}
            onHide={() => setError({ visible: false, message: "" })}
          />

          <Button onPress={handleSave} variant="primary" disabled={saving}>
            {saving ? "Guardando..." : "Guardar predicción"}
          </Button>
        </View>
      )}

    </View>
  );
}