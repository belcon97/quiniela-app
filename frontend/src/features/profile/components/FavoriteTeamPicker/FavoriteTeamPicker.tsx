import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "./FavoriteTeamPicker.styles";
import { colors } from "@/styles/theme";
import { WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";
import { profileService } from "../../services/profileService";
import { useAuthStore } from "@/store/authStore";
import type { SelectOption } from "@/ui/Select/Select.types";

interface FavoriteTeamPickerProps {
  visible: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function FavoriteTeamPicker({
  visible,
  onClose,
  onSaved,
}: FavoriteTeamPickerProps) {
  const { token } = useAuthStore();
  const setFavoriteTeam = useAuthStore((state) => state.setFavoriteTeam);

  const [selected, setSelected] = useState<SelectOption | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!selected || !token) return;
    setSaving(true);
    setError("");
    try {
      await profileService.updateFavoriteTeam(token, selected.label);
      // Actualiza el store para que home tenga el dato inmediatamente
      setFavoriteTeam(selected.label);
      onSaved();
      onClose();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>¿Cuál es tu equipo favorito?</Text>
            <Text style={styles.subtitle}>
              Te mostraremos un contador con el tiempo que falta para su próximo partido.
            </Text>
          </View>

          {/* Lista de países */}
          <FlatList
            data={WORLD_CUP_COUNTRIES}
            keyExtractor={(item) => item.value}
            style={styles.list}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.option,
                  selected?.value === item.value && styles.option__active,
                ]}
                onPress={() => setSelected(item)}
              >
                {item.icon && (
                  <Image
                    source={{ uri: item.icon }}
                    style={styles.flag}
                    resizeMode="cover"
                  />
                )}
                <Text style={[
                  styles.option__label,
                  selected?.value === item.value && styles.option__label_active,
                ]}>
                  {item.label}
                </Text>
                {item.code && (
                  <Text style={styles.option__code}>{item.code}</Text>
                )}
              </Pressable>
            )}
          />

          {/* Error */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Botones */}
          <View style={styles.buttons}>
            <Pressable style={styles.skipBtn} onPress={onClose}>
              <Text style={styles.skipBtn__text}>Omitir por ahora</Text>
            </Pressable>
            <Pressable
              style={[
                styles.saveBtn,
                (!selected || saving) && styles.saveBtn__disabled,
              ]}
              onPress={handleSave}
              disabled={!selected || saving}
            >
              {saving ? (
                <ActivityIndicator color={colors.background} size="small" />
              ) : (
                <Text style={styles.saveBtn__text}>Guardar</Text>
              )}
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
}