import { useState } from "react";
// Store
import { useAuthStore } from "@/store/authStore";
// Services
import * as adminMatchService from "@/features/admin/services/adminMatchService";
// Types
import type { Match } from "@/shared/types";

export function useMatches() {
  const { token } = useAuthStore();

  // Lista
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Crear
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  // Actualizar resultado
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  // Eliminar
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchMatches = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminMatchService.getMatches(token);
      setMatches(data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (matchData: {
    homeTeam: string;
    homeFlag: string;
    awayTeam: string;
    awayFlag: string;
    group: string;
    date: Date;
  }) => {
    if (!token) return;
    setCreating(true);
    setCreateError("");
    setCreateSuccess("");
    try {
      const result = await adminMatchService.createMatch(token, matchData);
      setCreateSuccess(result.message);
      setLoaded(false);
    } catch (error) {
      if (error instanceof Error) setCreateError(error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateScore = async (
    id: string,
    homeScore: number,
    awayScore: number,
    penaltyWinner?: "home" | "away",
  ) => {
    if (!token) return;
    setUpdating(true);
    setUpdateError("");
    try {
      await adminMatchService.updateMatchScore(
        token,
        id,
        homeScore,
        awayScore,
        penaltyWinner,
      );
      setMatches((prev) =>
        prev.map((match) =>
          match.id === id
            ? { ...match, homeScore, awayScore, status: "completed" }
            : match,
        ),
      );
    } catch (error) {
      if (error instanceof Error) setUpdateError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await adminMatchService.deleteMatch(token, id);
      setMatches((prev) => prev.filter((match) => match.id !== id));
    } catch (error) {
      if (error instanceof Error) setDeleteError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return {
    matches,
    loading,
    loaded,
    creating,
    createError,
    createSuccess,
    updating,
    updateError,
    deleting,
    deleteError,
    fetchMatches,
    handleCreate,
    handleUpdateScore,
    handleDelete,
    clearCreateError: () => setCreateError(""),
    clearUpdateError: () => setUpdateError(""),
    clearDeleteError: () => setDeleteError(""),
    clearCreateSuccess: () => setCreateSuccess(""),
  };
}
