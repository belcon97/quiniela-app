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
import Input from "@/ui/Input/Input";
import {ErrorBanner} from "@/ui/ErrorBanner/ErrorBanner";
import { Button } from "@/ui/Button/Button";

// Types
import type { Match } from "@/types/shared.types";

// Styles
import { styles } from "./MatchesList.styles";
import { colors } from "@/styles/theme";

// Utils
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";

interface MatchesListProps {
  matches: Match[];
  loading: boolean;
  updating: boolean;
  updateError: string;
  deleting: boolean;
  deleteError: string;
  onUpdateScore: (id: string, homeScore: number, awayScore: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onClearUpdateError: () => void;
  onClearDeleteError: () => void;
}

export function MatchesList({
  matches,
  loading,
  updating,
  updateError,
  deleting,
  deleteError,
  onUpdateScore,
  onDelete,
  onClearUpdateError,
  onClearDeleteError,
}: MatchesListProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [deletingMatch, setDeletingMatch] = useState<Match | null>(null);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const handleOpenUpdate = (match: Match) => {
    setSelectedMatch(match);
    setHomeScore(match.homeScore?.toString() ?? "");
    setAwayScore(match.awayScore?.toString() ?? "");
    onClearUpdateError();
  };

  const handleUpdate = async () => {
    if (!selectedMatch) return;
    await onUpdateScore(
      selectedMatch.id,
      Number(homeScore),
      Number(awayScore)
    );
    setSelectedMatch(null);
  };

  const handleDelete = async () => {
    if (!deletingMatch) return;
    await onDelete(deletingMatch.id);
    setDeletingMatch(null);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View style={styles.centered}>
        <Feather name="inbox" size={40} color={colors.neutral400} />
        <Text style={styles.emptyText}>No hay partidos cargados</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scroll}>
        {matches.map((match) => {
          const isCompleted = match.status === "completed";
          return (
            <View key={match.id} style={styles.card}>
              {/* Header */}
              <View style={styles.card__header}>
                <Text style={styles.card__group}>{match.group}</Text>
                <View style={[
                  styles.badge,
                  isCompleted ? styles.badge__completed : styles.badge__pending
                ]}>
                  <Text style={[
                    styles.badge__text,
                    isCompleted ? styles.badge__text_completed : styles.badge__text_pending
                  ]}>
                    {isCompleted ? "Finalizado" : "Pendiente"}
                  </Text>
                </View>
              </View>

              {/* Equipos */}
              <View style={styles.card__teams}>
                <View style={styles.team}>
                  {match.homeFlag ? (
                    <Image
                      source={{ uri: match.homeFlag }}
                      style={styles.flag}
                    />
                  ) : null}
                  <Text style={styles.teamName}>{match.homeTeam}</Text>
                </View>

                <Text style={styles.score}>
                  {isCompleted
                    ? `${match.homeScore} - ${match.awayScore}`
                    : "vs"}
                </Text>

                <View style={styles.team}>
                  {match.awayFlag ? (
                    <Image
                      source={{ uri: match.awayFlag }}
                      style={styles.flag}
                    />
                  ) : null}
                  <Text style={styles.teamName}>{match.awayTeam}</Text>
                </View>
              </View>

              {/* Fecha */}
              <Text style={styles.date}>{formatDate(match.date)}</Text>

              {/* Acciones */}
              <View style={styles.card__actions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleOpenUpdate(match)}
                >
                  <Feather name="edit-2" size={14} color={colors.primary} />
                  <Text style={styles.actionBtn__text}>Resultado</Text>
                </TouchableOpacity>

                {!isCompleted && (
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.actionBtn__danger]}
                    onPress={() => setDeletingMatch(match)}
                  >
                    <Feather name="trash-2" size={14} color={colors.error} />
                    <Text style={styles.actionBtn__text_danger}>Eliminar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Modal actualizar resultado */}
      <Modal
        visible={!!selectedMatch}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMatch(null)}
      >
        <View style={styles.modal__overlay}>
          <View style={styles.modal}>
            <View style={styles.modal__header}>
              <Text style={styles.modal__title}>Actualizar resultado</Text>
              <TouchableOpacity onPress={() => setSelectedMatch(null)}>
                <Feather name="x" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modal__subtitle}>
              {selectedMatch?.homeTeam} vs {selectedMatch?.awayTeam}
            </Text>

            <View style={styles.modal__scores}>
              <View style={styles.modal__scoreField}>
                <Text style={styles.modal__scoreLabel}>
                  {selectedMatch?.homeTeam}
                </Text>
                <Input
                  value={homeScore}
                  onChangeText={setHomeScore}
                  placeholder="0"
                />
              </View>
              <Text style={styles.modal__separator}>:</Text>
              <View style={styles.modal__scoreField}>
                <Text style={styles.modal__scoreLabel}>
                  {selectedMatch?.awayTeam}
                </Text>
                <Input
                  value={awayScore}
                  onChangeText={setAwayScore}
                  placeholder="0"
                />
              </View>
            </View>

            <ErrorBanner
              message={updateError}
              visible={!!updateError}
              onHide={onClearUpdateError}
            />

            <View style={styles.modal__actions}>
              <TouchableOpacity
                style={styles.modal__cancelBtn}
                onPress={() => setSelectedMatch(null)}
              >
                <Text style={styles.modal__cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modal__saveBtn, updating && { opacity: 0.6 }]}
                onPress={handleUpdate}
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

      {/* Modal confirmar eliminar */}
      <Modal
        visible={!!deletingMatch}
        transparent
        animationType="fade"
        onRequestClose={() => setDeletingMatch(null)}
      >
        <View style={styles.modal__overlay}>
          <View style={styles.modal}>
            <Text style={styles.modal__title}>Eliminar partido</Text>
            <Text style={styles.modal__subtitle}>
              ¿Confirmás que querés eliminar{" "}
              {deletingMatch?.homeTeam} vs {deletingMatch?.awayTeam}?
            </Text>

            <ErrorBanner
              message={deleteError}
              visible={!!deleteError}
              onHide={onClearDeleteError}
            />

            <View style={styles.modal__actions}>
              <TouchableOpacity
                style={styles.modal__cancelBtn}
                onPress={() => setDeletingMatch(null)}
              >
                <Text style={styles.modal__cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modal__saveBtn,
                  styles.modal__saveBtn_danger,
                  deleting && { opacity: 0.6 },
                ]}
                onPress={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color={colors.background} size="small" />
                ) : (
                  <Text style={styles.modal__saveText}>Eliminar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}