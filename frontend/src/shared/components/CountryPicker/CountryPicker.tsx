import { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
// Hooks
import { useTheme } from "@/theme";
import { useStyles } from "@/shared/hooks/useStyles";
// Components
import { BottomSheet } from "@/shared/ui/BottomSheet/BottomSheet";
import { Flag } from "@/shared/ui/Flag/Flag";
// Data
import { WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";
// Types
import type { CountryOption } from "@/shared/types";
// Styles
import { makeStyles } from "./CountryPicker.styles";

interface CountryPickerProps {
  visible: boolean;
  title?: string;
  onSelect: (country: CountryOption) => void;
  onClose: () => void;
}

export function CountryPicker({
  visible,
  title = "SELECCIONÁ EL PAÍS",
  onSelect,
  onClose,
}: CountryPickerProps) {
  const theme = useTheme();
  const styles = useStyles(makeStyles);

  const [query, setQuery] = useState("");

  // Filtra por nombre o codigo
  const filtered = useMemo(
    () =>
      WORLD_CUP_COUNTRIES.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const handleSelect = (country: (typeof WORLD_CUP_COUNTRIES)[0]) => {
    onSelect({
      label: country.label,
      value: country.value,
      icon: country.icon,
      code: country.code,
    });
    setQuery("");
    onClose();
  };

  return (
    <BottomSheet visible={visible} title={title} onClose={onClose}>
      {/* Search */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchRow}>
          <Feather name="search" size={16} color={theme.textSecondary} />
          <TextInput
            style={[
              styles.searchInput,
              Platform.OS === "web" && ({ outlineStyle: "none" } as any),
            ]}
            placeholder="Buscar por nombre o código..."
            placeholderTextColor={theme.textDisabled}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Feather name="x" size={16} color={theme.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.value}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => handleSelect(item)}>
            {/* Flag */}
            <Flag uri={item.icon} name={item.label} size="sm" />

            {/* Name */}
            <Text style={styles.rowName}>{item.label}</Text>

            {/* Code */}
            <Text style={styles.rowCode}>{item.code}</Text>
          </Pressable>
        )}
      />
    </BottomSheet>
  );
}
