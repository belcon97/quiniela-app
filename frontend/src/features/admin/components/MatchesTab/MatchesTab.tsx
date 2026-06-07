import { useState, useEffect } from "react";
import { View, Text, ScrollView, Platform, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
import { useMatches } from "@/features/admin/hooks/useMatches";
// Components
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { SelectField } from "@/shared/ui/SelectField/SelectField";
import { CountryPicker } from "@/shared/components/CountryPicker/CountryPicker";
import { StateView } from "@/shared/ui/StateView/StateView";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { Chip } from "@/shared/ui/Chip/Chip";

import { AdminSubTabs } from "@/features/admin/components/AdminSubTabs/AdminSubTabs";
import { MatchResultCard } from "@/features/admin/components/MatchResultCard/MatchResultCard";
import { ResultModal } from "@/features/admin/components/ResultModal/ResultModal";
import { GroupPicker } from "@/features/admin/components/GroupPicker/GroupPicker";
// Utils
import { groupByKey } from "@/shared/utils/groupByKey";
import { formatMatchDate } from "@/shared/utils/formatDate";
import { sortGroups } from "@/shared/utils/sortGroups";
import {
  formatDateLabel,
  formatTimeLabel,
} from "@/shared/utils/formatDateLabel";
// Styles
import { makeStyles } from "./MatchesTab.styles";
// Types
import type { Match, CountryOption } from "@/shared/types";

const SUB_TABS = [
  { key: "create", label: "CREAR PARTIDO" },
  { key: "list", label: "PARTIDOS" },
];

export function MatchesTab() {
  const styles = useStyles(makeStyles);
  const {
    matches,
    loading,
    loaded,
    creating,
    createError,
    createSuccess,
    fetchMatches,
    handleCreate,
    handleUpdateScore,
    handleDelete,
    clearUpdateError,
  } = useMatches();

  const [subTab, setSubTab] = useState("create");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [matchToEdit, setMatchToEdit] = useState<Match | null>(null);
  const [matchToDelete, setMatchToDelete] = useState<Match | null>(null);

  // Pickers
  const [homePickerVisible, setHomePickerVisible] = useState(false);
  const [awayPickerVisible, setAwayPickerVisible] = useState(false);
  const [groupPickerVisible, setGroupPickerVisible] = useState(false);

  // DateTimePicker mobile
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Form
  const [homeTeam, setHomeTeam] = useState<CountryOption | null>(null);
  const [awayTeam, setAwayTeam] = useState<CountryOption | null>(null);
  const [group, setGroup] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (subTab === "list" && !loaded) fetchMatches();
  }, [subTab]);

  const grouped = groupByKey(matches, "group");
  const groups = sortGroups(Object.keys(grouped));
  const activeGroup = selectedGroup || groups[0] || "";
  const filteredMatches = grouped[activeGroup] ?? [];

  const handleSubmitCreate = async () => {
    if (!homeTeam || !awayTeam || !group) return;

    const finalDate =
      Platform.OS === "web"
        ? new Date(`${date}T${time}:00.000Z`)
        : selectedDate;

    if (!finalDate || isNaN(finalDate.getTime())) return;

    await handleCreate({
      homeTeam: homeTeam.label,
      homeFlag: homeTeam.icon,
      awayTeam: awayTeam.label,
      awayFlag: awayTeam.icon,
      group,
      date: finalDate,
    });
  };

  return (
    <View style={styles.container}>
      {/* SubTabs */}
      <AdminSubTabs options={SUB_TABS} active={subTab} onChange={setSubTab} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  Crear partido  */}
        {subTab === "create" && (
          <>
            {/* Equipo local */}
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>EQUIPO LOCAL</Text>
              <SelectField
                placeholder="Seleccioná el equipo local"
                value={homeTeam?.label}
                flagUrl={homeTeam?.icon}
                onPress={() => setHomePickerVisible(true)}
              />
            </View>

            {/* Equipo visitante */}
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>EQUIPO VISITANTE</Text>
              <SelectField
                placeholder="Seleccioná el equipo visitante"
                value={awayTeam?.label}
                flagUrl={awayTeam?.icon}
                onPress={() => setAwayPickerVisible(true)}
              />
            </View>

            {/* Datos del partido */}
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>DATOS DEL PARTIDO</Text>

              <Text style={styles.formTitle}>GRUPO / FASE</Text>
              <SelectField
                placeholder="Seleccioná el grupo o fase"
                value={group || undefined}
                onPress={() => setGroupPickerVisible(true)}
              />

              {/* Fecha y hora  */}
              {Platform.OS === "web" ? (
                // Web
                <View style={styles.formRow}>
                  <View style={styles.formRowItem}>
                    <Text style={styles.formTitle}>FECHA</Text>
                    {/* @ts-ignore */}
                    <input
                      type="date"
                      value={date}
                      onChange={(e: any) => setDate(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        backgroundColor: "#F9FAFB",
                        color: "#111827",
                        boxSizing: "border-box",
                        outline: "none",
                      }}
                    />
                  </View>
                  <View style={styles.formRowItem}>
                    <Text style={styles.formTitle}>HORA (UTC)</Text>
                    {/* @ts-ignore */}
                    <input
                      type="time"
                      value={time}
                      onChange={(e: any) => setTime(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        backgroundColor: "#F9FAFB",
                        color: "#111827",
                        boxSizing: "border-box",
                        outline: "none",
                      }}
                    />
                  </View>
                </View>
              ) : (
                // Mobile
                <View style={styles.formSection}>
                  <Text style={styles.formTitle}>FECHA Y HORA (UTC)</Text>

                  <Pressable
                    style={styles.dateField}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateFieldText}>
                      {formatDateLabel(selectedDate)}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.dateField}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={styles.dateFieldText}>
                      {formatTimeLabel(selectedDate)}
                    </Text>
                  </Pressable>

                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="default"
                      onChange={(_, selected) => {
                        setShowDatePicker(false);
                        if (selected) {
                          const updated = new Date(selectedDate);
                          updated.setUTCFullYear(
                            selected.getUTCFullYear(),
                            selected.getUTCMonth(),
                            selected.getUTCDate(),
                          );
                          setSelectedDate(updated);
                        }
                      }}
                    />
                  )}

                  {showTimePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="time"
                      display="default"
                      is24Hour
                      onChange={(_, selected) => {
                        setShowTimePicker(false);
                        if (selected) {
                          const updated = new Date(selectedDate);
                          updated.setUTCHours(
                            selected.getUTCHours(),
                            selected.getUTCMinutes(),
                          );
                          setSelectedDate(updated);
                        }
                      }}
                    />
                  )}
                </View>
              )}
            </View>

            {/* Feedback */}
            {createError ? (
              <Text style={[styles.feedbackText, styles.feedbackText_error]}>
                {createError}
              </Text>
            ) : null}
            {createSuccess ? (
              <Text style={[styles.feedbackText, styles.feedbackText_success]}>
                {createSuccess}
              </Text>
            ) : null}

            <Button onPress={handleSubmitCreate} disabled={creating}>
              {creating ? "CREANDO..." : "+ CREAR PARTIDO"}
            </Button>
          </>
        )}

        {/* Lista de partidos  */}
        {subTab === "list" && (
          <>
            {loading && <LoadingState />}

            {!loading && matches.length === 0 && (
              <StateView icon="calendar" title="SIN PARTIDOS" />
            )}

            {!loading && matches.length > 0 && (
              <>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chips}>
                    {groups.map((g) => (
                      <Chip
                        key={g}
                        isActive={activeGroup === g}
                        onPress={() => setSelectedGroup(g)}
                      >
                        {g}
                      </Chip>
                    ))}
                  </View>
                </ScrollView>

                {filteredMatches.map((match) => (
                  <MatchResultCard
                    key={match.id}
                    match={match}
                    date={formatMatchDate(match.date)}
                    onEdit={() => setMatchToEdit(match)}
                    onDelete={() => setMatchToDelete(match)}
                  />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      {/* Pickers  */}
      <CountryPicker
        visible={homePickerVisible}
        title="EQUIPO LOCAL"
        onSelect={(country) => setHomeTeam(country)}
        onClose={() => setHomePickerVisible(false)}
      />

      <CountryPicker
        visible={awayPickerVisible}
        title="EQUIPO VISITANTE"
        onSelect={(country) => setAwayTeam(country)}
        onClose={() => setAwayPickerVisible(false)}
      />

      <GroupPicker
        visible={groupPickerVisible}
        selected={group}
        onSelect={(g) => setGroup(g)}
        onClose={() => setGroupPickerVisible(false)}
      />

      {/* Result Modal */}
      {matchToEdit && (
        <ResultModal
          visible={!!matchToEdit}
          homeTeam={matchToEdit.homeTeam}
          awayTeam={matchToEdit.awayTeam}
          group={matchToEdit.group ?? ""}
          onConfirm={async (homeScore, awayScore, penaltyWinner) => {
            await handleUpdateScore(
              matchToEdit.id,
              homeScore,
              awayScore,
              penaltyWinner,
            );
            setMatchToEdit(null);
            clearUpdateError();
          }}
          onClose={() => {
            setMatchToEdit(null);
            clearUpdateError();
          }}
        />
      )}

      {/* Confirm Delete */}
      {matchToDelete && (
        <ConfirmModal
          visible={!!matchToDelete}
          title="ELIMINAR PARTIDO"
          subtitle={`¿Eliminás ${matchToDelete.homeTeam} vs ${matchToDelete.awayTeam}?`}
          confirmLabel="ELIMINAR"
          onConfirm={async () => {
            await handleDelete(matchToDelete.id);
            setMatchToDelete(null);
          }}
          onClose={() => setMatchToDelete(null)}
        />
      )}
    </View>
  );
}
