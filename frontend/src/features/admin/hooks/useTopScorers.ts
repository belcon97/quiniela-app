import { useState } from "react";
// Store
import { useAuthStore } from "@/store/authStore";
// Services
import { adminTopScorerService } from "@/features/admin/services/adminTopScorerService";
// Types
import type { TopScorer } from "@/shared/types";

export function useTopScorers() {
  const { token } = useAuthStore();

  // Lista 
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Crear 
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  // Actualizar goles 
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  // Eliminar 
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Período de selección 
  const [togglingSelection, setTogglingSelection] = useState(false);
  const [selectionError, setSelectionError] = useState("");
  const [selectionSuccess, setSelectionSuccess] = useState("");

  // Cerrar torneo 
  const [closing, setClosing] = useState(false);
  const [closeError, setCloseError] = useState("");
  const [closeSuccess, setCloseSuccess] = useState("");

  const fetchTopScorers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminTopScorerService.getTopScorers(token);
      setTopScorers(data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (payload: {
    name: string;
    team: string;
    flag: string;
  }) => {
    if (!token) return;
    setCreating(true);
    setCreateError("");
    setCreateSuccess("");
    try {
      const result = await adminTopScorerService.createTopScorer(
        token,
        payload,
      );
      setCreateSuccess(result.message);
      setLoaded(false);
    } catch (error) {
      if (error instanceof Error) setCreateError(error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateGoals = async (id: string, goals: number) => {
    if (!token) return;
    setUpdating(true);
    setUpdateError("");
    try {
      await adminTopScorerService.updateGoals(token, id, goals);
      setTopScorers((prev) =>
        prev.map((scorer) =>
          scorer.id === id ? { ...scorer, goals } : scorer,
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
      await adminTopScorerService.deleteTopScorer(token, id);
      setTopScorers((prev) => prev.filter((scorer) => scorer.id !== id));
    } catch (error) {
      if (error instanceof Error) setDeleteError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleSelection = async (isActive: boolean) => {
    if (!token) return;
    setTogglingSelection(true);
    setSelectionError("");
    setSelectionSuccess("");
    try {
      const result = isActive
        ? await adminTopScorerService.closeSelection(token)
        : await adminTopScorerService.openSelection(token);
      setSelectionSuccess(result.message);
      setTopScorers((prev) =>
        prev.map((scorer) => ({ ...scorer, isActive: !isActive })),
      );
    } catch (error) {
      if (error instanceof Error) setSelectionError(error.message);
    } finally {
      setTogglingSelection(false);
    }
  };

  const handleCloseTopScorer = async () => {
    if (!token) return;
    setClosing(true);
    setCloseError("");
    setCloseSuccess("");
    try {
      const result = await adminTopScorerService.closeTopScorer(token);
      setCloseSuccess(result.message);
      await fetchTopScorers();
    } catch (error) {
      if (error instanceof Error) setCloseError(error.message);
    } finally {
      setClosing(false);
    }
  };

  return {
    topScorers,
    loading,
    loaded,
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
    clearCreateError: () => setCreateError(""),
    clearCreateSuccess: () => setCreateSuccess(""),
    clearUpdateError: () => setUpdateError(""),
    clearDeleteError: () => setDeleteError(""),
    clearSelectionError: () => setSelectionError(""),
    clearSelectionSuccess: () => setSelectionSuccess(""),
    clearCloseError: () => setCloseError(""),
    clearCloseSuccess: () => setCloseSuccess(""),
  };
}
