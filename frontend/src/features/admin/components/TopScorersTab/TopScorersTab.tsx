import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
// Hooks
import { useStyles } from "@/shared/hooks/useStyles";
import { useTopScorers } from "@/features/admin/hooks/useTopScorers";
// Components
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { SelectField } from "@/shared/ui/SelectField/SelectField";
import { CountryPicker } from "@/shared/components/CountryPicker/CountryPicker";
import { StateView } from "@/shared/ui/StateView/StateView";
import { LoadingState } from "@/shared/ui/LoadingState/LoadingState";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";

import { AdminSubTabs } from "@/features/admin/components/AdminSubTabs/AdminSubTabs";
import { TopScorerCard } from "@/features/admin/components/TopScorerCard/TopScorerCard";
import { GoalsModal } from "@/features/admin/components/GoalsModal/GoalsModal";
// Styles
import { makeStyles } from "./TopScorersTab.styles";
// Types
import type { TopScorer, CountryOption } from "@/shared/types";

const SUB_TABS = [
  { key: "create", label: "AGREGAR" },
  { key: "list", label: "GOLEADORES" },
];

export function TopScorersTab() {
  const styles = useStyles(makeStyles);
  const {
    topScorers,
    loading,
    loaded,
    creating,
    createError,
    createSuccess,
    deleting,
    fetchTopScorers,
    handleCreate,
    handleUpdateGoals,
    handleDelete,
  } = useTopScorers();

  const [subTab, setSubTab] = useState("create");
  const [scorerToEdit, setScorerToEdit] = useState<TopScorer | null>(null);
  const [scorerToDelete, setScorerToDelete] = useState<TopScorer | null>(null);

  // Picker
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [country, setCountry] = useState<CountryOption | null>(null);

  useEffect(() => {
    if (subTab === "list" && !loaded) fetchTopScorers();
  }, [subTab]);

  const handleSubmitCreate = async () => {
    if (!name.trim() || !country) return;
    await handleCreate({
      name: name.trim(),
      team: country.label,
      flag: country.icon,
    });
    setName("");
    setCountry(null);
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
        {/* Agregar goleador */}
        {subTab === "create" && (
          <>
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>AGREGAR CANDIDATO</Text>

              <Input
                label="NOMBRE"
                placeholder="Lionel Messi"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.formTitle}>SELECCIÓN</Text>
              <SelectField
                placeholder="Seleccioná el país"
                value={country?.label}
                flagUrl={country?.icon}
                onPress={() => setCountryPickerVisible(true)}
              />
            </View>

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
              {creating ? "AGREGANDO..." : "+ AGREGAR GOLEADOR"}
            </Button>
          </>
        )}

        {/* Lista de goleadores  */}
        {subTab === "list" && (
          <>
            {loading && <LoadingState />}

            {!loading && topScorers.length === 0 && (
              <StateView icon="award" title="SIN GOLEADORES" />
            )}

            {!loading &&
              topScorers.map((scorer) => (
                <TopScorerCard
                  key={scorer.id}
                  player={scorer}
                  onGoals={() => setScorerToEdit(scorer)}
                  onDelete={() => setScorerToDelete(scorer)}
                />
              ))}
          </>
        )}
      </ScrollView>

      {/* Country Picker */}
      <CountryPicker
        visible={countryPickerVisible}
        title="SELECCIÓN"
        onSelect={(c) => setCountry(c)}
        onClose={() => setCountryPickerVisible(false)}
      />

      {/* Goals Modal */}
      {scorerToEdit && (
        <GoalsModal
          visible={!!scorerToEdit}
          playerName={scorerToEdit.name}
          currentGoals={scorerToEdit.goals}
          onConfirm={async (goals) => {
            await handleUpdateGoals(scorerToEdit.id, goals);
            setScorerToEdit(null);
          }}
          onClose={() => setScorerToEdit(null)}
        />
      )}

      {/* Confirm Delete */}
      {scorerToDelete && (
        <ConfirmModal
          visible={!!scorerToDelete}
          title="ELIMINAR GOLEADOR"
          subtitle={`¿Eliminás a ${scorerToDelete.name}?`}
          confirmLabel="ELIMINAR"
          onConfirm={async () => {
            await handleDelete(scorerToDelete.id);
            setScorerToDelete(null);
          }}
          onClose={() => setScorerToDelete(null)}
        />
      )}
    </View>
  );
}
