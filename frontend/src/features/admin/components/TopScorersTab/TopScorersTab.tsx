import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

// Components
import { Button } from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import {ErrorBanner} from "@/ui/ErrorBanner/ErrorBanner";
import Select from "@/ui/Select/Select";

// Hooks
import { useTopScorers } from "@/features/admin/hooks/useTopScorers";

// Data
import { WORLD_CUP_COUNTRIES } from "@/data/worldCup2026";

// Styles
import { styles } from "./TopScorersTab.styles";
import { colors } from "@/styles/theme";

type SubTab = "create" | "list";

const SUBTABS: { key: SubTab; label: string }[] = [
  { key: "create", label: "Agregar" },
  { key: "list", label: "Goleadores" },
];

export function TopScorersTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("create");

  // Form crear
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [flag, setFlag] = useState("");
  const [countryValue, setCountryValue] = useState("");

  // Modal actualizar goles
  const [editingScorer, setEditingScorer] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [goals, setGoals] = useState("");

  const {
    topScorers,
    loading,
    creating,
    createError,
    createSuccess,
    updating,
    updateError,
    deleting,
    deleteError,
    togglingSelection,
    selectionError,
    selectionSuccess,
    closing,
    closeError,
    closeSuccess,
    fetchTopScorers,
    handleCreate,
    handleUpdateGoals,
    handleDelete,
    handleToggleSelection,
    handleCloseTopScorer,
    clearCreateError,
    clearCreateSuccess,
    clearUpdateError,
    clearDeleteError,
    clearSelectionError,
    clearSelectionSuccess,
    clearCloseError,
    clearCloseSuccess,
  } = useTopScorers();

  const handleSubTabChange = (tab: SubTab) => {
    setActiveSubTab(tab);
    if (tab === "list") fetchTopScorers();
  };

  const handleSubmitCreate = async () => {
    if (!name.trim() || !team.trim() || !flag.trim()) return;
    await handleCreate({ name, team, flag });
    setName("");
    setTeam("");
    setFlag("");
    setCountryValue("");
  };

  const handleSubmitGoals = async () => {
    if (!editingScorer) return;
    await handleUpdateGoals(editingScorer, Number(goals));
    setEditingScorer(null);
    setGoals("");
  };

  // Si hay goleadores activos, el período está abierto
  const selectionOpen = topScorers.some((s) => s.isActive);

  return (
    <View style={styles.container}>
      {/* Subtabs */}
      <View style={styles.subtabs}>
        {SUBTABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.subtab,
              activeSubTab === tab.key && styles.subtab__active,
            ]}
            onPress={() => handleSubTabChange(tab.key)}
          >
            <Text
              style={[
                styles.subtab__label,
                activeSubTab === tab.key && styles.subtab__label_active,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Crear goleador */}
      {activeSubTab === "create" && (
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Agregar candidato</Text>

          <Text style={styles.label}>Nombre</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Lionel Messi"
          />

          <Text style={[styles.label, { marginTop: 8 }]}>Selección</Text>
          <Select
            options={WORLD_CUP_COUNTRIES}
            value={countryValue}
            onChange={(value) => {
              const country = WORLD_CUP_COUNTRIES.find((c) => c.value === value);
              setCountryValue(value);
              setTeam(country?.label ?? "");
              setFlag(country?.icon ?? "");
            }}
            placeholder="Seleccioná el país"
            searchable
          />

          {createSuccess ? (
            <View style={styles.successBanner}>
              <Feather name="check-circle" size={16} color={colors.secondary} />
              <Text style={styles.successBanner__text}>{createSuccess}</Text>
            </View>
          ) : null}

          <ErrorBanner
            message={createError}
            visible={!!createError}
            onHide={clearCreateError}
          />

          <Button onPress={handleSubmitCreate} disabled={creating}>
            {creating ? "Agregando..." : "Agregar goleador"}
          </Button>
        </ScrollView>
      )}

      {/* Lista de goleadores */}
      {activeSubTab === "list" && (
        <ScrollView contentContainerStyle={styles.scroll}>
          {loading ? (
            <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
          ) : topScorers.length === 0 ? (
            <View style={styles.empty}>
              <Feather name="award" size={40} color={colors.neutral400} />
              <Text style={styles.emptyText}>No hay goleadores cargados</Text>
            </View>
          ) : (
            topScorers.map((scorer) => (
              <View key={scorer.id} style={styles.card}>
                <View style={styles.card__info}>
                  {scorer.flag ? (
                    <Image
                      source={{ uri: scorer.flag }}
                      style={styles.flag}
                    />
                  ) : null}
                  <View style={styles.card__text}>
                    <Text style={styles.card__name}>{scorer.name}</Text>
                    <Text style={styles.card__team}>{scorer.team}</Text>
                  </View>
                  <View style={styles.card__right}>
                    <Text style={styles.card__goals}>{scorer.goals} goles</Text>
                    {scorer.isWinner && (
                      <View style={styles.badge__winner}>
                        <Text style={styles.badge__winner_text}>Ganador</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.card__actions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {
                      setEditingScorer(scorer.id);
                      setEditingName(scorer.name);
                      setGoals(scorer.goals.toString());
                    }}
                  >
                    <Feather name="edit-2" size={14} color={colors.primary} />
                    <Text style={styles.actionBtn__text}>Goles</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, styles.actionBtn__danger]}
                    onPress={() => handleDelete(scorer.id)}
                    disabled={deleting}
                  >
                    <Feather name="trash-2" size={14} color={colors.error} />
                    <Text style={styles.actionBtn__text_danger}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          {/* Período de selección */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Período de selección</Text>
            {selectionSuccess ? (
              <View style={styles.successBanner}>
                <Feather name="check-circle" size={16} color={colors.secondary} />
                <Text style={styles.successBanner__text}>{selectionSuccess}</Text>
              </View>
            ) : null}
            <ErrorBanner
              message={selectionError}
              visible={!!selectionError}
              onHide={clearSelectionError}
            />
            <Button
              onPress={() => handleToggleSelection(selectionOpen)}
              variant={selectionOpen ? "outlined" : "primary"}
              disabled={togglingSelection}
            >
              {togglingSelection
                ? "Procesando..."
                : selectionOpen
                ? "Cerrar selección"
                : "Abrir selección"}
            </Button>
          </View>

          {/* Cerrar torneo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fin del torneo</Text>
            {closeSuccess ? (
              <View style={styles.successBanner}>
                <Feather name="check-circle" size={16} color={colors.secondary} />
                <Text style={styles.successBanner__text}>{closeSuccess}</Text>
              </View>
            ) : null}
            <ErrorBanner
              message={closeError}
              visible={!!closeError}
              onHide={clearCloseError}
            />
            <Button
              onPress={handleCloseTopScorer}
              variant="secondary"
              disabled={closing}
            >
              {closing ? "Procesando..." : "Definir ganador y sumar puntos"}
            </Button>
          </View>
        </ScrollView>
      )}

      {/* Modal actualizar goles */}
      <Modal
        visible={!!editingScorer}
        transparent
        animationType="slide"
        onRequestClose={() => setEditingScorer(null)}
      >
        <View style={styles.modal__overlay}>
          <View style={styles.modal}>
            <View style={styles.modal__header}>
              <Text style={styles.modal__title}>Actualizar goles</Text>
              <TouchableOpacity onPress={() => setEditingScorer(null)}>
                <Feather name="x" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modal__subtitle}>{editingName}</Text>

            <Input
              value={goals}
              onChangeText={setGoals}
              placeholder="0"
            />

            <ErrorBanner
              message={updateError}
              visible={!!updateError}
              onHide={clearUpdateError}
            />

            <View style={styles.modal__actions}>
              <TouchableOpacity
                style={styles.modal__cancelBtn}
                onPress={() => setEditingScorer(null)}
              >
                <Text style={styles.modal__cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modal__saveBtn, updating && { opacity: 0.6 }]}
                onPress={handleSubmitGoals}
                disabled={updating}
              >
                {updating ? (
                  <ActivityIndicator color={colors.background} size="small" />
                ) : (
                  <Text style={styles.modal__saveText}>Guardar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}