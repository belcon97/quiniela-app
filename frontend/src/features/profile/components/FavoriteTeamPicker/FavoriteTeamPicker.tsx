import { useState } from "react";
import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
import { useAuthStore } from "@/store/authStore";
// Components
import { Button } from "@/shared/ui/Button/Button";
import { SelectField } from "@/shared/ui/SelectField/SelectField";
import { CountryPicker } from "@/shared/components/CountryPicker/CountryPicker";
// Services
import { profileService } from "@/features/profile/services/profileService";
// Styles
import { makeStyles } from "./FavoriteTeamPicker.styles";
// Types
import type { CountryOption } from "@/shared/types";

interface FavoriteTeamPickerProps {
  onDone: () => void;
}

export function FavoriteTeamPicker({ onDone }: FavoriteTeamPickerProps) {
  const styles = useStyles(makeStyles);
  const token = useAuthStore((state) => state.token);
  const setFavoriteTeam = useAuthStore((state) => state.setFavoriteTeam);

  const [country, setCountry] = useState<CountryOption | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!country || !token) return;
    try {
      setSaving(true);
      await profileService.updateFavoriteTeam(token, country.label);
      setFavoriteTeam(country.label);
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
        <Text style={styles.title}>TU EQUIPO{"\n"}FAVORITO</Text>
        <Text style={styles.subtitle}>
          Elegí el equipo que vas a seguir. Vas a ver su próximo partido en tu
          inicio.
        </Text>
      </View>

      {/* Selector */}
      <SelectField
        placeholder="Seleccioná tu equipo"
        value={country?.label}
        flagUrl={country?.icon}
        onPress={() => setPickerVisible(true)}
      />

      {/* Error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Botón */}
      <Button
        onPress={handleSave}
        disabled={!country || saving}
        icon={<Feather name="check" size={16} color="#fff" />}
        iconPosition="right"
      >
        {saving ? "GUARDANDO..." : "CONFIRMAR EQUIPO"}
      </Button>

      {/* Country Picker */}
      <CountryPicker
        visible={pickerVisible}
        title="TU EQUIPO FAVORITO"
        onSelect={(c) => setCountry(c)}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  );
}
