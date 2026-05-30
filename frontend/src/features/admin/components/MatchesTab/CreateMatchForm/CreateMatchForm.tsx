import { useState } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Components
import { Button } from "@/ui/Button/Button";
import { ErrorBanner } from "@/ui/ErrorBanner/ErrorBanner";
import Input from "@/ui/Input/Input";
import Select from "@/ui/Select/Select";

// Data
import { WORLD_CUP_COUNTRIES, WORLD_CUP_PHASES } from "@/data/worldCup2026";

// Types
import type { MatchForm } from "@/features/admin/types/admin.types";

// Styles
import { styles } from "./CreateMatchForm.styles";
import { colors, spacing } from "@/styles/theme";

interface CreateMatchFormProps {
  onCreate: (data: {
    homeTeam: string;
    homeFlag: string;
    awayTeam: string;
    awayFlag: string;
    group: string;
    stadium: string;
    date: Date;
  }) => Promise<void>;
  creating: boolean;
  createError: string;
  createSuccess: string;
  onClearError: () => void;
  onClearSuccess: () => void;
}

const EMPTY_FORM: MatchForm = {
  homeTeam: "",
  homeFlag: "",
  homeCountryValue: "",
  awayTeam: "",
  awayFlag: "",
  awayCountryValue: "",
  group: "",
  stadium: "",
  date: "",
  time: "",
};

export function CreateMatchForm({
  onCreate,
  creating,
  createError,
  createSuccess,
  onClearError,
  onClearSuccess,
}: CreateMatchFormProps) {
  const [form, setForm] = useState<MatchForm>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Partial<MatchForm>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const setField = (key: keyof MatchForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<MatchForm> = {};
    if (!form.homeTeam.trim()) errors.homeTeam = "Obligatorio*";
    if (!form.awayTeam.trim()) errors.awayTeam = "Obligatorio*";
    if (!form.group.trim()) errors.group = "Obligatorio*";
    if (!form.stadium.trim()) errors.stadium = "Obligatorio*";
    if (!form.date.trim()) errors.date = "Obligatorio*";
    if (!form.time.trim()) errors.time = "Obligatorio*";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatDateLabel = (date: Date) =>
    date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatTimeLabel = (date: Date) =>
    date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (!date) return;
    const updated = new Date(selectedDate);
    updated.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(updated);
    setForm((prev) => ({ ...prev, date: date.toISOString().split("T")[0] }));
    setFormErrors((prev) => ({ ...prev, date: "" }));
  };

  const handleTimeChange = (_: any, date?: Date) => {
    setShowTimePicker(false);
    if (!date) return;
    const updated = new Date(selectedDate);
    updated.setHours(date.getHours(), date.getMinutes());
    setSelectedDate(updated);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setForm((prev) => ({ ...prev, time: `${hours}:${minutes}` }));
    setFormErrors((prev) => ({ ...prev, time: "" }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await onCreate({
      homeTeam: form.homeTeam,
      homeFlag: form.homeFlag,
      awayTeam: form.awayTeam,
      awayFlag: form.awayFlag,
      group: form.group,
      stadium: form.stadium,
      date: new Date(`${form.date}T${form.time}:00`),
    });
    setForm(EMPTY_FORM);
    setSelectedDate(new Date());
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      {/* Equipo local */}
      <Text style={styles.sectionTitle}>Equipo local</Text>
      <Select
        options={WORLD_CUP_COUNTRIES}
        value={form.homeCountryValue}
        onChange={(value) => {
          const country = WORLD_CUP_COUNTRIES.find((c) => c.value === value);
          setForm((prev) => ({
            ...prev,
            homeCountryValue: value,
            homeTeam: country?.label ?? "",
            homeFlag: country?.icon ?? "",
          }));
          setFormErrors((prev) => ({ ...prev, homeTeam: "" }));
        }}
        placeholder="Seleccioná el equipo local"
        hasError={!!formErrors.homeTeam}
        searchable
      />
      {formErrors.homeTeam && (
        <Text style={styles.errorText}>{formErrors.homeTeam}</Text>
      )}

      {/* Equipo visitante */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>
        Equipo visitante
      </Text>
      <Select
        options={WORLD_CUP_COUNTRIES}
        value={form.awayCountryValue}
        onChange={(value) => {
          const country = WORLD_CUP_COUNTRIES.find((c) => c.value === value);
          setForm((prev) => ({
            ...prev,
            awayCountryValue: value,
            awayTeam: country?.label ?? "",
            awayFlag: country?.icon ?? "",
          }));
          setFormErrors((prev) => ({ ...prev, awayTeam: "" }));
        }}
        placeholder="Seleccioná el equipo visitante"
        hasError={!!formErrors.awayTeam}
        searchable
      />
      {formErrors.awayTeam && (
        <Text style={styles.errorText}>{formErrors.awayTeam}</Text>
      )}

      {/* Datos del partido */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>
        Datos del partido
      </Text>

      <Text style={styles.label}>Grupo / Fase</Text>
      <Select
        options={WORLD_CUP_PHASES}
        value={form.group}
        onChange={setField("group")}
        placeholder="Seleccioná el grupo o fase"
        hasError={!!formErrors.group}
      />
      {formErrors.group && (
        <Text style={styles.errorText}>{formErrors.group}</Text>
      )}

      <Text style={[styles.label, { marginTop: spacing.sm }]}>Estadio</Text>
      <Input
        value={form.stadium}
        onChangeText={setField("stadium")}
        placeholder="Estadio Monumental"
        hasError={!!formErrors.stadium}
      />
      {formErrors.stadium && (
        <Text style={styles.errorText}>{formErrors.stadium}</Text>
      )}

      {/* Fecha — web usa input nativo HTML, mobile usa DateTimePicker */}
      <Text style={[styles.label, { marginTop: spacing.sm }]}>Fecha</Text>
      {Platform.OS === "web" ? (
        <View style={[styles.datePicker, !!formErrors.date && styles.datePicker__error]}>
          <input
            type="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, date: e.target.value }));
              setFormErrors((prev) => ({ ...prev, date: "" }));
            }}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: form.date ? "#101828" : "#98A2B3",
            }}
          />
          <Feather name="calendar" size={18} color={colors.textPlaceholder} />
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.datePicker, !!formErrors.date && styles.datePicker__error]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={form.date ? styles.dateText : styles.datePlaceholder}>
            {form.date ? formatDateLabel(selectedDate) : "Seleccioná la fecha"}
          </Text>
          <Feather name="calendar" size={18} color={colors.textPlaceholder} />
        </TouchableOpacity>
      )}
      {formErrors.date && (
        <Text style={styles.errorText}>{formErrors.date}</Text>
      )}

      {/* Hora — web usa input nativo HTML, mobile usa DateTimePicker */}
      <Text style={[styles.label, { marginTop: spacing.sm }]}>Hora (UTC)</Text>
      {Platform.OS === "web" ? (
        <View style={[styles.datePicker, !!formErrors.time && styles.datePicker__error]}>
          <input
            type="time"
            value={form.time}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, time: e.target.value }));
              setFormErrors((prev) => ({ ...prev, time: "" }));
            }}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: form.time ? "#101828" : "#98A2B3",
            }}
          />
          <Feather name="clock" size={18} color={colors.textPlaceholder} />
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.datePicker, !!formErrors.time && styles.datePicker__error]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={form.time ? styles.dateText : styles.datePlaceholder}>
            {form.time ? formatTimeLabel(selectedDate) : "Seleccioná la hora"}
          </Text>
          <Feather name="clock" size={18} color={colors.textPlaceholder} />
        </TouchableOpacity>
      )}
      {formErrors.time && (
        <Text style={styles.errorText}>{formErrors.time}</Text>
      )}

      {/* Date pickers nativos — solo mobile */}
      {showDatePicker && Platform.OS !== "web" && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
      {showTimePicker && Platform.OS !== "web" && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
        />
      )}

      {/* Feedback */}
      {createSuccess ? (
        <View style={styles.successBanner}>
          <Feather name="check-circle" size={16} color={colors.secondary} />
          <Text style={styles.successBanner__text}>{createSuccess}</Text>
        </View>
      ) : null}

      <ErrorBanner
        message={createError}
        visible={!!createError}
        onHide={onClearError}
      />

      <Button
        onPress={handleSubmit}
        disabled={creating}
        icon={<MaterialIcons name="sports-soccer" size={18} color={colors.background} />}
      >
        {creating ? "Creando..." : "Crear partido"}
      </Button>
    </ScrollView>
  );
}