import { create } from "zustand";
import type { Match } from "@/shared/types";

// State
interface PredictionState {
  pendingMatches: Match[];
  hasPendingMatches: boolean;
}

// Actions
interface PredictionActions {
  setPendingMatches: (matches: Match[]) => void;
  setHasPendingMatches: (value: boolean) => void;
  clearPredictions: () => void;
}

export const usePredictionStore = create<PredictionState & PredictionActions>(
  (set) => ({
    // State
    pendingMatches: [],
    hasPendingMatches: false,

    // Actions
    setPendingMatches: (matches) =>
      set({ pendingMatches: matches, hasPendingMatches: matches.length > 0 }),

    setHasPendingMatches: (value) => set({ hasPendingMatches: value }),

    // Limpia todo al hacer logout
    clearPredictions: () =>
      set({ pendingMatches: [], hasPendingMatches: false }),
  }),
);
