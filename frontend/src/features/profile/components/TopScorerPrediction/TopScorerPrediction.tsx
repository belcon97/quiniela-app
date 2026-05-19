import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./TopScorerPrediction.styles";

// Services
import { topScorerService } from "@/features/topScorer/services/topScorerService";
import type {
  TopScorer,
  TopScorerPrediction as TopScorerPredictionType,
} from "@/features/topScorer/services/topScorerService";

// Components
import Button from "@/ui/Button/Button";
import ErrorBanner from "@/ui/ErrorBanner/ErrorBanner";

// Store
import { useAuthStore } from "@/store/authStore";

export function TopScorerPrediction() {
  const { token } = useAuthStore();

  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [myPrediction, setMyPrediction] =
    useState<TopScorerPredictionType | null>(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<string | null>(null); // topScorerId
  const [customName, setCustomName] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const [scorers, prediction] = await Promise.all([
          topScorerService.getTopScorers(),
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
    if (!selected && !customName.trim()) {
      setError({
        visible: true,
        message: "Seleccioná un goleador o ingresá un nombre*",
      });
      return;
    }

    setSaving(true);
    setError({ visible: false, message: "" });

    try {
      await topScorerService.createPrediction(token, {
        topScorerId: isCustom ? undefined : (selected ?? undefined),
        customName: isCustom ? customName : undefined,
      });
      // Refetch predicción
      const prediction = await topScorerService.getMyPrediction(token);
      setMyPrediction(prediction);
      setSuccess("¡Predicción guardada!");
    } catch (err) {
      if (err instanceof Error) {
        setError({ visible: true, message: err.message });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.topScorer}>
      <View style={styles.topScorer__header}>
        <Feather name="award" size={16} color="#854D0E" />
        <Text style={styles.topScorer__title}>Goleador del torneo</Text>
      </View>

      {myPrediction ? (
        // Ya tiene predicción — mostrar
        <View style={styles.topScorer__saved}>
          <Feather name="check-circle" size={20} color="#00A651" />
          <View style={styles.topScorer__savedInfo}>
            <Text style={styles.topScorer__savedLabel}>Tu predicción</Text>
            <Text style={styles.topScorer__savedName}>
              {myPrediction.topScorer?.name ?? myPrediction.customName ?? "—"}
            </Text>
            {myPrediction.points > 0 && (
              <Text style={styles.topScorer__savedPoints}>
                +{myPrediction.points} pts
              </Text>
            )}
          </View>
        </View>
      ) : (
        // Sin predicción — mostrar form
        <View>
          <Text style={styles.topScorer__subtitle}>
            Elegí quién será el máximo goleador. Vale +3 pts si acertás.
          </Text>

          {/* Lista de candidatos */}
          {topScorers.map((scorer) => (
            <TouchableOpacity
              key={scorer.id}
              style={[
                styles.topScorer__option,
                selected === scorer.id &&
                  !isCustom &&
                  styles.topScorer__option_active,
              ]}
              onPress={() => {
                setSelected(scorer.id);
                setIsCustom(false);
              }}
            >
              {scorer.flag ? (
                <Image
                  source={{ uri: scorer.flag }}
                  style={styles.topScorer__flag}
                  resizeMode="cover"
                />
              ) : null}
              <View style={styles.topScorer__optionInfo}>
                <Text style={styles.topScorer__optionName}>{scorer.name}</Text>
                <Text style={styles.topScorer__optionTeam}>{scorer.team}</Text>
              </View>
              {selected === scorer.id && !isCustom && (
                <Feather name="check" size={16} color="#001F5B" />
              )}
            </TouchableOpacity>
          ))}

          {/* Opción "Otro" */}
          <TouchableOpacity
            style={[
              styles.topScorer__option,
              isCustom && styles.topScorer__option_active,
            ]}
            onPress={() => {
              setIsCustom(true);
              setSelected(null);
            }}
          >
            <View
              style={[
                styles.topScorer__flag,
                styles.topScorer__flagPlaceholder,
              ]}
            >
              <Feather name="edit-2" size={14} color="#98A2B3" />
            </View>
            <Text style={styles.topScorer__optionName}>Otro</Text>
            {isCustom && <Feather name="check" size={16} color="#001F5B" />}
          </TouchableOpacity>

          {isCustom && (
            <TextInput
              style={styles.topScorer__customInput}
              value={customName}
              onChangeText={setCustomName}
              placeholder="Nombre del goleador"
              placeholderTextColor="#98A2B3"
            />
          )}

          {success ? (
            <View style={styles.topScorer__successBanner}>
              <Feather name="check-circle" size={16} color="#00A651" />
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
