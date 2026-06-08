import { create } from "zustand";
import type { Match } from "@/shared/types";
import type { Prediction } from "@/features/profile/types/profile.types";

interface PredictionState {
  pendingMatches: Match[];
  hasPendingMatches: boolean;
  myPredictions: Prediction[];
}

interface PredictionActions {
  setPendingMatches: (matches: Match[]) => void;
  setHasPendingMatches: (value: boolean) => void;
  setMyPredictions: (predictions: Prediction[]) => void;
  clearPredictions: () => void;
}

export const usePredictionStore = create<PredictionState & PredictionActions>(
  (set) => ({
    pendingMatches: [],
    hasPendingMatches: false,
    myPredictions: [],

    setPendingMatches: (matches) =>
      set({ pendingMatches: matches, hasPendingMatches: matches.length > 0 }),

    setHasPendingMatches: (value) => set({ hasPendingMatches: value }),

    setMyPredictions: (predictions) => set({ myPredictions: predictions }),

    clearPredictions: () =>
      set({ pendingMatches: [], hasPendingMatches: false, myPredictions: [] }),
  }),
);
