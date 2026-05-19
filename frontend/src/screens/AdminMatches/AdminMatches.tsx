import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./AdminMatches.styles";

// Components
import Button from "@/ui/Button/Button";
import ErrorBanner from "@/ui/ErrorBanner/ErrorBanner";
import { Tabs } from "@/ui/Tabs/Tabs";
import Select from "@/ui/Select/Select";

// Store
import { useAuthStore } from "@/store/authStore";

// Constants
import { API_ROUTES } from "@/constants";

// Services
import { topScorerService } from "@/features/topScorer/services/topScorerService";
import type { TopScorer } from "@/features/topScorer/services/topScorerService";

// Types
import type { Match } from "@/shared/types/shared.types";
import type { MatchForm, ScoreForm } from "@/features/admin/types/admin.types";

// Constants
import {
  WORLD_CUP_COUNTRIES,
  WORLD_CUP_PHASES,
} from "@/features/admin/constants/worldCup2026";

const EMPTY_FORM: MatchForm = {
  homeTeam: "",
  awayTeam: "",
  homeCountryValue: "",
  homeFlag: "",
  awayFlag: "",
  awayCountryValue: "",
  group: "",
  stadium: "",
  date: "",
  time: "",
};

export default function AdminMatches() {
  const { token, logout } = useAuthStore();

  const [activeTab, setActiveTab] = useState(0);

  // Create
  const [form, setForm] = useState<MatchForm>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Partial<MatchForm>>({});
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState("");
  const [createError, setCreateError] = useState({
    visible: false,
    message: "",
  });

  // Matches
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [matchesLoaded, setMatchesLoaded] = useState(false);

  // Update modal
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [scoreForm, setScoreForm] = useState<ScoreForm>({
    homeScore: "",
    awayScore: "",
  });
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState({
    visible: false,
    message: "",
  });

  // Top Scorers
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [loadingScorers, setLoadingScorers] = useState(false);
  const [scorersLoaded, setScorersLoaded] = useState(false);
  const [scorerForm, setScorerForm] = useState({
    name: "",
    team: "",
    flag: "",
  });
  const [creatingScorer, setCreatingScorer] = useState(false);
  const [scorerCreateError, setScorerCreateError] = useState({
    visible: false,
    message: "",
  });
  const [scorerCreateSuccess, setScorerCreateSuccess] = useState("");
  const [editingScorer, setEditingScorer] = useState<TopScorer | null>(null);
  const [editGoals, setEditGoals] = useState("");
  const [updatingGoals, setUpdatingGoals] = useState(false);
  const [goalsError, setGoalsError] = useState({ visible: false, message: "" });
  const [closing, setClosing] = useState(false);
  const [closeSuccess, setCloseSuccess] = useState("");
  const [closeError, setCloseError] = useState({ visible: false, message: "" });

  // ── Handlers: Create ──

  const setField = (key: keyof MatchForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<MatchForm> = {};
    if (!form.homeTeam.trim()) errors.homeTeam = "Obligatorio*";
    if (!form.awayTeam.trim()) errors.awayTeam = "Obligatorio*";
    if (!form.homeFlag.trim()) errors.homeFlag = "Obligatorio*";
    if (!form.awayFlag.trim()) errors.awayFlag = "Obligatorio*";
    if (!form.group.trim()) errors.group = "Obligatorio*";
    if (!form.stadium.trim()) errors.stadium = "Obligatorio*";
    if (!form.date.trim()) errors.date = "Obligatorio*";
    if (!form.time.trim()) errors.time = "Obligatorio*";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    setCreating(true);
    setCreateSuccess("");
    setCreateError({ visible: false, message: "" });
    try {
      const response = await fetch(API_ROUTES.matches, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matches: [
            {
              homeTeam: form.homeTeam,
              homeFlag: form.homeFlag,
              awayTeam: form.awayTeam,
              awayFlag: form.awayFlag,
              group: form.group,
              stadium: form.stadium,
              date: new Date(`${form.date}T${form.time}:00`),
            },
          ],
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setCreateSuccess(data.message);
      setForm(EMPTY_FORM);
      setMatchesLoaded(false);
    } catch (error) {
      if (error instanceof Error) {
        setCreateError({ visible: true, message: error.message });
      }
    } finally {
      setCreating(false);
    }
  };

  // ── Handlers: Matches ──

  const fetchMatches = async () => {
    setLoadingMatches(true);
    try {
      const response = await fetch(API_ROUTES.matches);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMatches(data);
      setMatchesLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMatches(false);
    }
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (index === 1 && !matchesLoaded) fetchMatches();
    if (index === 2 && !scorersLoaded) fetchTopScorers();
  };

  // ── Handlers: Update ──

  const handleOpenUpdate = (match: Match) => {
    setSelectedMatch(match);
    setScoreForm({
      homeScore: match.homeScore?.toString() ?? "",
      awayScore: match.awayScore?.toString() ?? "",
    });
    setUpdateError({ visible: false, message: "" });
  };

  const handleUpdate = async () => {
    if (!selectedMatch) return;
    if (!scoreForm.homeScore.trim() || !scoreForm.awayScore.trim()) {
      setUpdateError({ visible: true, message: "Ingresá ambos puntajes*" });
      return;
    }
    setUpdating(true);
    setUpdateError({ visible: false, message: "" });
    try {
      const response = await fetch(
        `${API_ROUTES.matches}/${selectedMatch.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            homeScore: Number(scoreForm.homeScore),
            awayScore: Number(scoreForm.awayScore),
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMatches((prev) =>
        prev.map((m) =>
          m.id === selectedMatch.id
            ? {
                ...m,
                homeScore: Number(scoreForm.homeScore),
                awayScore: Number(scoreForm.awayScore),
                status: "completed",
              }
            : m,
        ),
      );
      setSelectedMatch(null);
    } catch (error) {
      if (error instanceof Error) {
        setUpdateError({ visible: true, message: error.message });
      }
    } finally {
      setUpdating(false);
    }
  };

  // ── Handlers: Top Scorers ──

  const fetchTopScorers = async () => {
    setLoadingScorers(true);
    try {
      const data = await topScorerService.getTopScorers();
      setTopScorers(data);
      setScorersLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingScorers(false);
    }
  };

  const handleCreateScorer = async () => {
    if (
      !scorerForm.name.trim() ||
      !scorerForm.team.trim() ||
      !scorerForm.flag.trim()
    ) {
      setScorerCreateError({
        visible: true,
        message: "Todos los campos son obligatorios*",
      });
      return;
    }
    if (!token) return;
    setCreatingScorer(true);
    setScorerCreateSuccess("");
    setScorerCreateError({ visible: false, message: "" });
    try {
      await topScorerService.createTopScorer(token, scorerForm);
      setScorerCreateSuccess("Goleador creado correctamente");
      setScorerForm({ name: "", team: "", flag: "" });
      setScorersLoaded(false);
    } catch (error) {
      if (error instanceof Error) {
        setScorerCreateError({ visible: true, message: error.message });
      }
    } finally {
      setCreatingScorer(false);
    }
  };

  const handleUpdateGoals = async () => {
    if (!editingScorer || !token) return;
    if (!editGoals.trim() || isNaN(Number(editGoals))) {
      setGoalsError({ visible: true, message: "Ingresá un número válido*" });
      return;
    }
    setUpdatingGoals(true);
    setGoalsError({ visible: false, message: "" });
    try {
      await topScorerService.updateGoals(
        token,
        editingScorer.id,
        Number(editGoals),
      );
      setTopScorers((prev) =>
        prev.map((s) =>
          s.id === editingScorer.id ? { ...s, goals: Number(editGoals) } : s,
        ),
      );
      setEditingScorer(null);
    } catch (error) {
      if (error instanceof Error) {
        setGoalsError({ visible: true, message: error.message });
      }
    } finally {
      setUpdatingGoals(false);
    }
  };

  const handleCloseTopScorer = async () => {
    if (!token) return;
    setClosing(true);
    setCloseSuccess("");
    setCloseError({ visible: false, message: "" });
    try {
      const data = await topScorerService.closeTopScorer(token);
      setCloseSuccess(data.message);
      await fetchTopScorers();
    } catch (error) {
      if (error instanceof Error) {
        setCloseError({ visible: true, message: error.message });
      }
    } finally {
      setClosing(false);
    }
  };

  // ── Content ──

  const createContent = (
    <ScrollView
      contentContainerStyle={styles.adminMatches__scroll}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.adminMatches__section}>
        <Text style={styles.adminMatches__sectionTitle}>Equipo local</Text>
        <View style={styles.adminMatches__field}>
          <Text style={styles.adminMatches__label}>País</Text>
          <Select
            options={WORLD_CUP_COUNTRIES}
            value={form.homeCountryValue ?? ""}
            onChange={(value) => {
              const country = WORLD_CUP_COUNTRIES.find(
                (c) => c.value === value,
              );
              setForm((prev) => ({
                ...prev,
                homeCountryValue: value,
                homeTeam: country?.label ?? "",
                homeFlag: country?.icon ?? "",
              }));
              setFormErrors((prev) => ({
                ...prev,
                homeTeam: "",
                homeFlag: "",
              }));
            }}
            placeholder="Seleccioná el equipo local"
            hasError={!!formErrors.homeTeam}
            searchable
          />
          {formErrors.homeTeam && (
            <Text style={styles.adminMatches__errorText}>
              {formErrors.homeTeam}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.adminMatches__section}>
        <Text style={styles.adminMatches__sectionTitle}>Equipo visitante</Text>
        <View style={styles.adminMatches__field}>
          <Text style={styles.adminMatches__label}>País</Text>
          <Select
            options={WORLD_CUP_COUNTRIES}
            value={form.awayCountryValue ?? ""}
            onChange={(value) => {
              const country = WORLD_CUP_COUNTRIES.find(
                (c) => c.value === value,
              );
              setForm((prev) => ({
                ...prev,
                awayCountryValue: value,
                awayTeam: country?.label ?? "",
                awayFlag: country?.icon ?? "",
              }));
              setFormErrors((prev) => ({
                ...prev,
                awayTeam: "",
                awayFlag: "",
              }));
            }}
            placeholder="Seleccioná el equipo visitante"
            hasError={!!formErrors.awayTeam}
            searchable
          />
          {formErrors.awayTeam && (
            <Text style={styles.adminMatches__errorText}>
              {formErrors.awayTeam}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.adminMatches__section}>
        <Text style={styles.adminMatches__sectionTitle}>Datos del partido</Text>
        <View style={styles.adminMatches__field}>
          <Text style={styles.adminMatches__label}>Grupo / Fase</Text>
          <Select
            options={WORLD_CUP_PHASES}
            value={form.group}
            onChange={setField("group")}
            placeholder="Seleccioná el grupo o fase"
            hasError={!!formErrors.group}
          />
          {formErrors.group && (
            <Text style={styles.adminMatches__errorText}>
              {formErrors.group}
            </Text>
          )}
        </View>
        <View style={styles.adminMatches__field}>
          <Text style={styles.adminMatches__label}>Estadio</Text>
          <TextInput
            style={[
              styles.adminMatches__input,
              formErrors.stadium && styles.adminMatches__input_error,
            ]}
            value={form.stadium}
            onChangeText={setField("stadium")}
            placeholder="Estadio Monumental"
            placeholderTextColor="#98A2B3"
          />
          {formErrors.stadium && (
            <Text style={styles.adminMatches__errorText}>
              {formErrors.stadium}
            </Text>
          )}
        </View>
        <View style={styles.adminMatches__field}>
          <Text style={styles.adminMatches__label}>Fecha</Text>
          <TextInput
            style={[
              styles.adminMatches__input,
              formErrors.date && styles.adminMatches__input_error,
            ]}
            value={form.date}
            onChangeText={setField("date")}
            placeholder="2026-06-25"
            placeholderTextColor="#98A2B3"
            autoCapitalize="none"
          />
          {formErrors.date && (
            <Text style={styles.adminMatches__errorText}>
              {formErrors.date}
            </Text>
          )}
        </View>
        <View style={styles.adminMatches__field}>
          <Text style={styles.adminMatches__label}>Hora (UTC)</Text>
          <TextInput
            style={[
              styles.adminMatches__input,
              formErrors.time && styles.adminMatches__input_error,
            ]}
            value={form.time}
            onChangeText={setField("time")}
            placeholder="18:00"
            placeholderTextColor="#98A2B3"
            autoCapitalize="none"
          />
          {formErrors.time && (
            <Text style={styles.adminMatches__errorText}>
              {formErrors.time}
            </Text>
          )}
        </View>
      </View>

      {createSuccess ? (
        <View style={styles.adminMatches__successBanner}>
          <Feather name="check-circle" size={16} color="#00A651" />
          <Text style={styles.adminMatches__successBanner_text}>
            {createSuccess}
          </Text>
        </View>
      ) : null}

      <ErrorBanner
        message={createError.message}
        visible={createError.visible}
        onHide={() => setCreateError({ visible: false, message: "" })}
      />
      <Button onPress={handleCreate} variant="primary" disabled={creating}>
        {creating ? "Creando..." : "Crear partido"}
      </Button>
    </ScrollView>
  );

  const matchesContent = (
    <ScrollView contentContainerStyle={styles.adminMatches__scroll}>
      {loadingMatches ? (
        <ActivityIndicator color="#001F5B" style={{ marginTop: 40 }} />
      ) : matches.length === 0 ? (
        <View style={styles.adminMatches__empty}>
          <Feather name="inbox" size={40} color="#98A2B3" />
          <Text style={styles.adminMatches__emptyText}>
            No hay partidos cargados
          </Text>
        </View>
      ) : (
        matches.map((match) => {
          const isCompleted = match.status === "completed";
          const dateStr = new Date(match.date).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <View key={match.id} style={styles.adminMatches__card}>
              <View style={styles.adminMatches__card_header}>
                <Text style={styles.adminMatches__card_group}>
                  {match.group ?? "Sin grupo"}
                </Text>
                <View
                  style={[
                    styles.adminMatches__badge,
                    isCompleted
                      ? styles.adminMatches__badge_completed
                      : styles.adminMatches__badge_pending,
                  ]}
                >
                  <Text
                    style={[
                      styles.adminMatches__badgeText,
                      isCompleted
                        ? styles.adminMatches__badgeText_completed
                        : styles.adminMatches__badgeText_pending,
                    ]}
                  >
                    {isCompleted ? "Finalizado" : "Pendiente"}
                  </Text>
                </View>
              </View>
              <View style={styles.adminMatches__card_teams}>
                <View style={styles.adminMatches__team}>
                  {match.homeFlag ? (
                    <Image
                      source={{ uri: match.homeFlag }}
                      style={styles.adminMatches__flag}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.adminMatches__flagPlaceholder} />
                  )}
                  <Text style={styles.adminMatches__teamName}>
                    {match.homeTeam}
                  </Text>
                </View>
                <View style={styles.adminMatches__score}>
                  {isCompleted ? (
                    <Text style={styles.adminMatches__scoreText}>
                      {match.homeScore} - {match.awayScore}
                    </Text>
                  ) : (
                    <Text style={styles.adminMatches__vs}>vs</Text>
                  )}
                </View>
                <View style={styles.adminMatches__team}>
                  {match.awayFlag ? (
                    <Image
                      source={{ uri: match.awayFlag }}
                      style={styles.adminMatches__flag}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.adminMatches__flagPlaceholder} />
                  )}
                  <Text style={styles.adminMatches__teamName}>
                    {match.awayTeam}
                  </Text>
                </View>
              </View>
              <View style={styles.adminMatches__card_footer}>
                <View style={styles.adminMatches__meta}>
                  <Feather name="map-pin" size={12} color="#98A2B3" />
                  <Text style={styles.adminMatches__metaText}>
                    {match.stadium}
                  </Text>
                </View>
                <View style={styles.adminMatches__meta}>
                  <Feather name="calendar" size={12} color="#98A2B3" />
                  <Text style={styles.adminMatches__metaText}>{dateStr}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.adminMatches__updateBtn,
                  isCompleted && styles.adminMatches__updateBtn_completed,
                ]}
                onPress={() => handleOpenUpdate(match)}
              >
                <Feather
                  name="edit-2"
                  size={14}
                  color={isCompleted ? "#475467" : "#001F5B"}
                />
                <Text
                  style={[
                    styles.adminMatches__updateBtn_text,
                    isCompleted &&
                      styles.adminMatches__updateBtn_text_completed,
                  ]}
                >
                  Actualizar resultado
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </ScrollView>
  );

  const topScorersContent = (
    <ScrollView
      contentContainerStyle={styles.adminMatches__scroll}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.adminMatches__section}>
        <Text style={styles.adminMatches__sectionTitle}>Agregar goleador</Text>
        <View style={styles.adminMatches__field}>
          <Text style={styles.adminMatches__label}>Nombre</Text>
          <TextInput
            style={styles.adminMatches__input}
            value={scorerForm.name}
            onChangeText={(v) =>
              setScorerForm((prev) => ({ ...prev, name: v }))
            }
            placeholder="Lionel Messi"
            placeholderTextColor="#98A2B3"
          />
        </View>
        <View style={styles.adminMatches__field}>
          <Text style={styles.adminMatches__label}>Selección</Text>
          <Select
            options={WORLD_CUP_COUNTRIES}
            value={
              WORLD_CUP_COUNTRIES.find((c) => c.label === scorerForm.team)
                ?.value ?? ""
            }
            onChange={(value) => {
              const country = WORLD_CUP_COUNTRIES.find(
                (c) => c.value === value,
              );
              setScorerForm((prev) => ({
                ...prev,
                team: country?.label ?? "",
                flag: country?.icon ?? "",
              }));
            }}
            placeholder="Seleccioná el país"
            searchable
          />
        </View>

        {scorerCreateSuccess ? (
          <View style={styles.adminMatches__successBanner}>
            <Feather name="check-circle" size={16} color="#00A651" />
            <Text style={styles.adminMatches__successBanner_text}>
              {scorerCreateSuccess}
            </Text>
          </View>
        ) : null}

        <ErrorBanner
          message={scorerCreateError.message}
          visible={scorerCreateError.visible}
          onHide={() => setScorerCreateError({ visible: false, message: "" })}
        />
        <Button
          onPress={handleCreateScorer}
          variant="primary"
          disabled={creatingScorer}
        >
          {creatingScorer ? "Creando..." : "Agregar goleador"}
        </Button>
      </View>

      <View style={styles.adminMatches__section}>
        <Text style={styles.adminMatches__sectionTitle}>Goleadores</Text>
        {loadingScorers ? (
          <ActivityIndicator color="#001F5B" />
        ) : topScorers.length === 0 ? (
          <View style={styles.adminMatches__empty}>
            <Feather name="award" size={40} color="#98A2B3" />
            <Text style={styles.adminMatches__emptyText}>
              No hay goleadores cargados
            </Text>
          </View>
        ) : (
          topScorers.map((scorer) => (
            <View key={scorer.id} style={styles.adminMatches__card}>
              <View style={styles.adminMatches__card_teams}>
                <View style={styles.adminMatches__team}>
                  {scorer.flag ? (
                    <Image
                      source={{ uri: scorer.flag }}
                      style={styles.adminMatches__flag}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.adminMatches__flagPlaceholder} />
                  )}
                  <Text style={styles.adminMatches__teamName}>
                    {scorer.name}
                  </Text>
                </View>
                <View style={styles.adminMatches__score}>
                  <Text style={styles.adminMatches__scoreText}>
                    {scorer.goals} goles
                  </Text>
                </View>
                {scorer.isWinner && (
                  <View
                    style={[
                      styles.adminMatches__badge,
                      styles.adminMatches__badge_completed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.adminMatches__badgeText,
                        styles.adminMatches__badgeText_completed,
                      ]}
                    >
                      Ganador
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={styles.adminMatches__updateBtn}
                onPress={() => {
                  setEditingScorer(scorer);
                  setEditGoals(scorer.goals.toString());
                }}
              >
                <Feather name="edit-2" size={14} color="#001F5B" />
                <Text style={styles.adminMatches__updateBtn_text}>
                  Actualizar goles
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <View style={styles.adminMatches__section}>
        <Text style={styles.adminMatches__sectionTitle}>Fin del torneo</Text>
        {closeSuccess ? (
          <View style={styles.adminMatches__successBanner}>
            <Feather name="check-circle" size={16} color="#00A651" />
            <Text style={styles.adminMatches__successBanner_text}>
              {closeSuccess}
            </Text>
          </View>
        ) : null}
        <ErrorBanner
          message={closeError.message}
          visible={closeError.visible}
          onHide={() => setCloseError({ visible: false, message: "" })}
        />
        <Button
          onPress={handleCloseTopScorer}
          variant="secondary"
          disabled={closing}
        >
          {closing ? "Cerrando..." : "Definir ganador y sumar puntos"}
        </Button>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.adminMatches}>
      <View style={styles.adminMatches__header}>
        <View>
          <Text style={styles.adminMatches__title}>Panel Admin</Text>
          <Text style={styles.adminMatches__subtitle}>Gestión de partidos</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <Feather name="log-out" size={20} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      <View style={styles.adminMatches__content}>
        <Tabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={[
            { label: "Crear partido", content: createContent },
            { label: "Partidos", content: matchesContent },
            { label: "Goleadores", content: topScorersContent },
          ]}
        />
      </View>

      {/* Update Match Modal */}
      <Modal
        visible={!!selectedMatch}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMatch(null)}
      >
        <View style={styles.adminMatches__modal_overlay}>
          <View style={styles.adminMatches__modal}>
            <View style={styles.adminMatches__modal_header}>
              <Text style={styles.adminMatches__modal_title}>
                Actualizar resultado
              </Text>
              <TouchableOpacity onPress={() => setSelectedMatch(null)}>
                <Feather name="x" size={20} color="#101828" />
              </TouchableOpacity>
            </View>
            <Text style={styles.adminMatches__modal_subtitle}>
              {selectedMatch?.homeTeam} vs {selectedMatch?.awayTeam}
            </Text>
            <View style={styles.adminMatches__modal_scores}>
              <View style={styles.adminMatches__modal_scoreField}>
                <Text style={styles.adminMatches__modal_scoreLabel}>
                  {selectedMatch?.homeTeam}
                </Text>
                <TextInput
                  style={styles.adminMatches__modal_scoreInput}
                  value={scoreForm.homeScore}
                  onChangeText={(t) =>
                    setScoreForm((prev) => ({ ...prev, homeScore: t }))
                  }
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="0"
                  placeholderTextColor="#98A2B3"
                />
              </View>
              <Text style={styles.adminMatches__modal_separator}>:</Text>
              <View style={styles.adminMatches__modal_scoreField}>
                <Text style={styles.adminMatches__modal_scoreLabel}>
                  {selectedMatch?.awayTeam}
                </Text>
                <TextInput
                  style={styles.adminMatches__modal_scoreInput}
                  value={scoreForm.awayScore}
                  onChangeText={(t) =>
                    setScoreForm((prev) => ({ ...prev, awayScore: t }))
                  }
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="0"
                  placeholderTextColor="#98A2B3"
                />
              </View>
            </View>
            <ErrorBanner
              message={updateError.message}
              visible={updateError.visible}
              onHide={() => setUpdateError({ visible: false, message: "" })}
            />
            <View style={styles.adminMatches__modal_actions}>
              <TouchableOpacity
                style={styles.adminMatches__modal_cancelBtn}
                onPress={() => setSelectedMatch(null)}
              >
                <Text style={styles.adminMatches__modal_cancelText}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.adminMatches__modal_saveBtn,
                  updating && { opacity: 0.6 },
                ]}
                onPress={handleUpdate}
                disabled={updating}
              >
                {updating ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Feather name="check" size={14} color="#fff" />
                    <Text style={styles.adminMatches__modal_saveText}>
                      Guardar
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Update Goals Modal */}
      <Modal
        visible={!!editingScorer}
        transparent
        animationType="slide"
        onRequestClose={() => setEditingScorer(null)}
      >
        <View style={styles.adminMatches__modal_overlay}>
          <View style={styles.adminMatches__modal}>
            <View style={styles.adminMatches__modal_header}>
              <Text style={styles.adminMatches__modal_title}>
                Actualizar goles
              </Text>
              <TouchableOpacity onPress={() => setEditingScorer(null)}>
                <Feather name="x" size={20} color="#101828" />
              </TouchableOpacity>
            </View>
            <Text style={styles.adminMatches__modal_subtitle}>
              {editingScorer?.name}
            </Text>
            <View style={styles.adminMatches__modal_scores}>
              <View style={styles.adminMatches__modal_scoreField}>
                <Text style={styles.adminMatches__modal_scoreLabel}>Goles</Text>
                <TextInput
                  style={styles.adminMatches__modal_scoreInput}
                  value={editGoals}
                  onChangeText={setEditGoals}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="0"
                  placeholderTextColor="#98A2B3"
                />
              </View>
            </View>
            <ErrorBanner
              message={goalsError.message}
              visible={goalsError.visible}
              onHide={() => setGoalsError({ visible: false, message: "" })}
            />
            <View style={styles.adminMatches__modal_actions}>
              <TouchableOpacity
                style={styles.adminMatches__modal_cancelBtn}
                onPress={() => setEditingScorer(null)}
              >
                <Text style={styles.adminMatches__modal_cancelText}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.adminMatches__modal_saveBtn,
                  updatingGoals && { opacity: 0.6 },
                ]}
                onPress={handleUpdateGoals}
                disabled={updatingGoals}
              >
                {updatingGoals ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Feather name="check" size={14} color="#fff" />
                    <Text style={styles.adminMatches__modal_saveText}>
                      Guardar
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
