import { useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./Select.styles";
import type { SelectOption } from "./Select.types";

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  hasError?: boolean;
  searchable?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Seleccioná una opción",
  hasError = false,
  searchable = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = options.find((o) => o.value === value);

  // Normaliza acentos y busca por label o code
  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const query = normalize(search);
    return options.filter((o) =>
      normalize(o.label).includes(query) ||
      (o.code && normalize(o.code).includes(query))
    );
  }, [search, options]);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
    setSearch("");
  };

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        style={[
          styles.select,
          hasError && styles.select_error,
          open && styles.select_open,
        ]}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        {selected?.icon ? (
          <Image
            source={{ uri: selected.icon }}
            style={styles.select__icon}
            resizeMode="cover"
          />
        ) : null}

        <Text
          style={selected ? styles.select__value : styles.select__placeholder}
        >
          {selected ? selected.label : placeholder}
        </Text>

        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color="#98A2B3"
          style={styles.select__chevron}
        />
      </TouchableOpacity>

      {/* Sheet Modal */}
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.select__overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <TouchableOpacity
            style={styles.select__sheet}
            activeOpacity={1}
            onPress={() => {}}
          >
            <View style={styles.select__sheetHeader}>
              <Text style={styles.select__sheetTitle}>{placeholder}</Text>

              {searchable && (
                <View style={styles.select__search}>
                  <Feather name="search" size={16} color="#98A2B3" />
                  <TextInput
                    style={styles.select__searchInput}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar por nombre o código..."
                    placeholderTextColor="#98A2B3"
                    autoFocus
                  />
                  {search.length > 0 && (
                    <TouchableOpacity onPress={() => setSearch("")}>
                      <Feather name="x" size={16} color="#98A2B3" />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => (
                <View style={styles.select__divider} />
              )}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    style={[
                      styles.select__option,
                      isSelected && styles.select__option_selected,
                    ]}
                    onPress={() => handleSelect(item)}
                  >
                    {item.icon ? (
                      <Image
                        source={{ uri: item.icon }}
                        style={styles.select__optionIcon}
                        resizeMode="cover"
                      />
                    ) : null}
                    <Text
                      style={[
                        styles.select__optionLabel,
                        isSelected && styles.select__optionLabel_selected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.code && (
                      <Text style={styles.select__optionCode}>{item.code}</Text>
                    )}
                    {isSelected && (
                      <Feather
                        name="check"
                        size={16}
                        color="#001F5B"
                        style={styles.select__check}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}