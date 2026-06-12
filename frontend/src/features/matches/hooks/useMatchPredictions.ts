import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { matchesService } from "../services/matchesService";
import type { MatchPredictionsData } from "../types/matches.types";

export function useMatchPredictions() {
  const token = useAuthStore((state) => state.token);

  const [data, setData] = useState<Record<string, MatchPredictionsData>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const fetchPredictions = async (matchId: string) => {
    if (!token || data[matchId]) return;
    setLoading((prev) => ({ ...prev, [matchId]: true }));
    try {
      const result = await matchesService.getMatchPredictions(token, matchId);
      setData((prev) => ({ ...prev, [matchId]: result }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, [matchId]: false }));
    }
  };

  return { data, loading, fetchPredictions };
}