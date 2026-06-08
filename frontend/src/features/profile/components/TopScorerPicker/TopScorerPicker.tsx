import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
import { useAuthStore } from "@/store/authStore";
// Components
import { Flag } from "@/shared/ui/Flag/Flag";
import { Button } from "@/shared/ui/Button/Button";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { StateView } from "@/shared/ui/StateView/StateView";
// Services
import { profileService } from "@/features/profile/services/profileService";
// Styles
import { makeStyles } from "./TopScorerPicker.styles";
// Types
import type { TopScorer } from "@/shared/types";

interface TopScorerPickerProps {
  onDone: () => void;
}

export function TopScorerPicker({ onDone }: TopScorerPickerProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);
  const token = useAuthStore((state) => state.token);

  const [scorers, setScorers] = useState<TopScorer[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScorers = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          `${require("@/constants/api").BASE_URL}/top-scorers`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setScorers(data.filter((s: TopScorer) => s.isActive));
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchScorers();
  }, []);

  const handleSave = async () => {
    if (!selected || !token) return;
    try {
      setSaving(true);
      await fetch(
        `${require("@/constants/api").BASE_URL}/top-scorers/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ topScorerId: selected }),
        },
      );
      onDone();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GOLEADOR{"\n"}DEL TORNEO</Text>
        <Text style={styles.subtitle}>
        El goleador lo deben colocar de forma obligatoria antes del primer partido, el cual no tendrá cambio luego de ser seleccionado, si tu goleador no esta en esta lista contactanos al privado.
        </Text> 
      </View>

      {/* Lista */}
      {loading && <LoadingState />}

      {!loading && scorers.length === 0 && (
        <StateView icon="award" title="SIN GOLEADORES" />
      )}

      {!loading && scorers.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.list}>
            {scorers.map((scorer) => (
              <Pressable
                key={scorer.id}
                style={[
                  styles.card,
                  selected === scorer.id && styles.card_selected,
                ]}
                onPress={() => setSelected(scorer.id)}
              >
                <Flag uri={scorer.flag} name={scorer.team} size="sm" />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{scorer.name}</Text>
                  <Text style={styles.cardTeam}>{scorer.team}</Text>
                </View>
                {selected === scorer.id && (
                  <View style={styles.checkIcon}>
                    <Feather name="check" size={14} color="#FFFFFF" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <Button
        onPress={handleSave}
        disabled={!selected || saving}
        icon={<Feather name="check" size={16} color="#fff" />}
        iconPosition="right"
      >
        {saving ? "GUARDANDO..." : "CONFIRMAR GOLEADOR"}
      </Button>
    </View>
  );
}
